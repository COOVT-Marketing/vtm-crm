(function () {
  "use strict";

  // ─── CONFIG ───────────────────────────────────────────────────
  const SHEET_ID = "11SF4e1EvNZ0ysBLt6UJXufu6CbimL_iRTWHI3VNrDyw";
  const SHEET_NAME = "Auto";
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
  const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZo2WecH8AbJ2rx6-YM7nVzO6D7l7Qn8tMmYQdVMopnIyuCy3SkfZibVS5ibHFtces-w/exec";

  const BILLABLE_THRESHOLD_SECONDS = 120;
  const SESSION_KEY = "vtm_publisher_session";

  const COL_MAP = {
    timestamp: ["timestamp", "date", "time"],
    agent: ["agent name", "agent", "agentname"],
    phone: ["phone", "phone number", "phonenumber"],
    firstName: ["first name", "firstname", "first"],
    lastName: ["last name", "lastname", "last"],
    age: ["age"],
    state: ["state"],
    zip: ["zip", "zipcode", "zip code"],
    dob: ["dob", "date of birth", "birthdate"],
    company: ["company", "client", "publisher"],
    campaign: ["campaign"],
    did: ["did", "d.i.d"],
    comments: ["comments", "comment", "notes"],
    payout: ["payout", "bid", "bid/payout", "amount", "pay"],
    duration: ["duration", "call duration", "talk time", "minutes", "seconds", "call time"],
    statusOverride: ["status override", "qa status", "status", "billable status", "override status"],
  };

  let rawData = [];
  let filteredData = [];
  let localPayouts = {};
  let currentUser = null; // { company, username }

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  function showToast(msg, duration = 2800) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), duration);
  }

  function parseCSV(text) {
    const rows = [];
    let current = "";
    let inQuotes = false;
    let row = [];
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const next = text[i + 1];
      if (c === '"' && inQuotes && next === '"') {
        current += '"';
        i++;
      } else if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === "," && !inQuotes) {
        row.push(current);
        current = "";
      } else if ((c === "\n" || c === "\r") && !inQuotes) {
        if (current || row.length) {
          row.push(current);
          rows.push(row);
          row = [];
          current = "";
        }
        if (c === "\r" && next === "\n") i++;
      } else {
        current += c;
      }
    }
    if (current || row.length) {
      row.push(current);
      rows.push(row);
    }
    return rows;
  }

  function normalizeHeader(h) {
    return (h || "").toString().trim().toLowerCase().replace(/\s+/g, " ");
  }

  function mapColumns(headers) {
    const map = {};
    headers.forEach((h, idx) => {
      const norm = normalizeHeader(h);
      for (const [key, aliases] of Object.entries(COL_MAP)) {
        if (aliases.some((a) => norm === a || norm.includes(a))) {
          map[key] = idx;
          break;
        }
      }
    });
    return map;
  }

  function parseNumber(val) {
    if (val == null || val === "") return 0;
    const n = parseFloat(String(val).replace(/[^0-9.-]/g, ""));
    return isNaN(n) ? 0 : n;
  }

  function formatCurrency(n) {
    return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatDate(str) {
    if (!str) return "—";
    let d = new Date(str);
    if (isNaN(d.getTime())) return str;
    const hasTZ = /[zZ]|[+\-]\d{2}:?\d{2}$/.test(String(str).trim());
    if (!hasTZ) {
      const parts = String(str).match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);
      if (parts) {
        const y = +parts[1], mo = +parts[2] - 1, day = +parts[3];
        const h = +parts[4], mi = +parts[5], s = +(parts[6] || 0);
        d = new Date(Date.UTC(y, mo, day, h - 5, mi, s)); // PKT = UTC+5
      }
    }
    return d.toLocaleString("en-US", {
      timeZone: "America/New_York",
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: true
    });
  }

  function formatDuration(seconds) {
    if (!seconds || seconds <= 0) return "—";
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return m > 0 ? m + "m " + s + "s" : s + "s";
  }

  function resolveStatus(durationSeconds, override) {
    const o = (override || "").toString().trim().toLowerCase().replace(/[\s_-]+/g, "");
    if (o === "billable" || o === "billed") return "billable";
    if (o === "nonbillable" || o === "nb") return "nonbillable";
    if (o === "rejected" || o === "reject" || o === "qa" || o === "qarejected") return "rejected";
    if (o === "pending") return "pending";
    if (durationSeconds == null || durationSeconds === "" || Number(durationSeconds) <= 0) return "pending";
    const sec = Number(durationSeconds);
    if (isNaN(sec) || sec <= 0) return "pending";
    return sec >= BILLABLE_THRESHOLD_SECONDS ? "billable" : "nonbillable";
  }

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function debounce(fn, ms) {
    let t;
    return function () {
      const args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }

  /** Company from URL: ?company=Leadzone */
  function getCompanyFromUrl() {
    const p = new URLSearchParams(window.location.search);
    return (p.get("company") || "").trim();
  }

  // ─── SESSION ──────────────────────────────────────────────────
  function loadSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.company || !data.username) return null;
      // Session must match the company in the URL
      const urlCompany = getCompanyFromUrl();
      if (urlCompany && data.company.toLowerCase() !== urlCompany.toLowerCase()) {
        clearSession();
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveSession(company, username) {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ company: company, username: username, ts: Date.now() })
    );
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ─── AUTH ─────────────────────────────────────────────────────
  async function attemptLogin(company, username, password) {
    const payload = {
      submissionType: "PUBLISHER_LOGIN",
      company: company.trim(),
      username: username.trim(),
      password: password
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow"
      });
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        const m = text.match(/\{[\s\S]*\}/);
        if (m) json = JSON.parse(m[0]);
        else throw new Error("Invalid response from server");
      }
      if (json.status === "success" && json.company && json.username) {
        return { ok: true, company: json.company, username: json.username };
      }
      return { ok: false, message: json.message || "Invalid username or password" };
    } catch (err) {
      console.warn("CORS login failed, trying GET…", err.message);
      try {
        const url =
          APPS_SCRIPT_URL +
          "?action=login" +
          "&company=" + encodeURIComponent(company.trim()) +
          "&username=" + encodeURIComponent(username.trim()) +
          "&password=" + encodeURIComponent(password);
        const res = await fetch(url, { method: "GET", redirect: "follow" });
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch (e) {
          const m = text.match(/\{[\s\S]*\}/);
          if (m) json = JSON.parse(m[0]);
          else throw new Error("Invalid response");
        }
        if (json.status === "success" && json.company && json.username) {
          return { ok: true, company: json.company, username: json.username };
        }
        return { ok: false, message: json.message || "Invalid username or password" };
      } catch (err2) {
        console.error(err2);
        return {
          ok: false,
          message: "Unable to reach login server. Check Apps Script deployment (Execute as: Me, Who has access: Anyone)."
        };
      }
    }
  }

  // ─── DATA FETCH ───────────────────────────────────────────────
  async function fetchSheetData() {
    try {
      const res = await fetch(CSV_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("CSV fetch failed");
      const text = await res.text();
      if (text.trim().startsWith("<!DOCTYPE") || text.includes("Sign in")) {
        throw new Error("Sheet is not publicly accessible");
      }
      const rows = parseCSV(text);
      if (rows.length < 2) return [];
      const headers = rows[0];
      const col = mapColumns(headers);
      return rows.slice(1).map(function (r, i) {
        const duration = parseNumber(r[col.duration]);
        const override = col.statusOverride != null ? (r[col.statusOverride] || "") : "";
        return {
          _id: "r" + i,
          timestamp: r[col.timestamp] || "",
          agent: r[col.agent] || "",
          phone: r[col.phone] || "",
          firstName: r[col.firstName] || "",
          lastName: r[col.lastName] || "",
          age: r[col.age] || "",
          state: r[col.state] || "",
          zip: r[col.zip] || "",
          dob: r[col.dob] || "",
          company: r[col.company] || "",
          campaign: r[col.campaign] || "",
          did: r[col.did] || "",
          comments: r[col.comments] || "",
          payout: parseNumber(r[col.payout]),
          duration: duration,
          status: resolveStatus(duration, override)
        };
      }).filter(function (r) {
        return r.timestamp || r.phone || r.firstName || r.agent;
      });
    } catch (err) {
      console.warn("CSV failed, trying JSON…", err.message);
      const res = await fetch(JSON_URL, { cache: "no-store" });
      const text = await res.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\)/);
      if (!match) {
        throw new Error("Unable to parse sheet response. Make sure the sheet is shared publicly (Anyone with the link → Viewer).");
      }
      const obj = JSON.parse(match[1]);
      const table = obj.table;
      const headers = table.cols.map(function (c) { return c.label || ""; });
      const col = mapColumns(headers);
      return table.rows.map(function (row, i) {
        const cells = row.c || [];
        const get = function (key) {
          const idx = col[key];
          if (idx == null || !cells[idx]) return "";
          return cells[idx].v != null ? cells[idx].v : (cells[idx].f || "");
        };
        const duration = parseNumber(get("duration"));
        return {
          _id: "r" + i,
          timestamp: get("timestamp"),
          agent: get("agent"),
          phone: get("phone"),
          firstName: get("firstName"),
          lastName: get("lastName"),
          age: get("age"),
          state: get("state"),
          zip: get("zip"),
          dob: get("dob"),
          company: get("company"),
          campaign: get("campaign"),
          did: get("did"),
          comments: get("comments"),
          payout: parseNumber(get("payout")),
          duration: duration,
          status: resolveStatus(duration, get("statusOverride"))
        };
      }).filter(function (r) {
        return r.timestamp || r.phone || r.firstName || r.agent;
      });
    }
  }

  function applyCompanyFilter(data) {
    if (!currentUser || !currentUser.company) return data;
    const companyLower = currentUser.company.toLowerCase();
    return data.filter(function (r) {
      return (r.company || "").toLowerCase() === companyLower;
    });
  }

  function getEffectivePayout(row) {
    // Non-billable always $0; payout is read-only from sheet (admin only)
    if (row.status === "nonbillable" || row.status === "rejected") return 0;
    return row.payout;
  }

  function updateMetrics(data) {
    const total = data.length;
    const billableRows = data.filter(function (r) { return r.status === "billable"; });
    const nonBillableRows = data.filter(function (r) { return r.status === "nonbillable"; });

    let sumPayout = 0;
    let sumDuration = 0;
    let durationCount = 0;

    billableRows.forEach(function (r) {
      sumPayout += getEffectivePayout(r);
    });

    data.forEach(function (r) {
      if (r.duration > 0) {
        sumDuration += r.duration;
        durationCount++;
      }
    });

    const avgPayout = billableRows.length ? sumPayout / billableRows.length : 0;
    const avgDuration = durationCount ? sumDuration / durationCount : null;

    const el = function (id) { return document.getElementById(id); };
    if (el("mTotalSales")) {
      el("mTotalSales").textContent = total.toLocaleString();
      const sub = el("mTotalSales").parentElement && el("mTotalSales").parentElement.querySelector(".metric-sub");
      if (sub) sub.textContent = billableRows.length + " billable · " + nonBillableRows.length + " rejected";
    }
    if (el("mTotalPayout")) el("mTotalPayout").textContent = formatCurrency(sumPayout);
    if (el("mAvgPayout")) el("mAvgPayout").textContent = formatCurrency(avgPayout);
    if (el("mAvgDuration")) el("mAvgDuration").textContent = avgDuration != null ? formatDuration(avgDuration) : "—";
  }

  function applyFilters() {
    const q = ($("#searchInput") && $("#searchInput").value || "").toLowerCase().trim();
    const agent = ($("#filterAgent") && $("#filterAgent").value) || "";
    const from = ($("#filterFrom") && $("#filterFrom").value) || "";
    const to = ($("#filterTo") && $("#filterTo").value) || "";
    const billableFilter = ($("#filterBillable") && $("#filterBillable").value) || "";

    filteredData = rawData.filter(function (r) {
      if (agent && r.agent !== agent) return false;
      if (billableFilter && r.status !== billableFilter) return false;
      if (from) {
        const d = new Date(r.timestamp);
        if (!isNaN(d) && d < new Date(from)) return false;
      }
      if (to) {
        const d = new Date(r.timestamp);
        const end = new Date(to);
        end.setHours(23, 59, 59);
        if (!isNaN(d) && d > end) return false;
      }
      if (q) {
        const hay = [r.agent, r.firstName, r.lastName, r.phone, r.company, r.campaign, r.state, r.zip, r.comments, r.did].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    renderTable();
    updateMetrics(filteredData);
  }

  function populateAgentFilter(data) {
    const agents = [];
    const seen = {};
    data.forEach(function (r) {
      if (r.agent && !seen[r.agent]) {
        seen[r.agent] = true;
        agents.push(r.agent);
      }
    });
    agents.sort();
    const sel = $("#filterAgent");
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">All Agents</option>';
    agents.forEach(function (a) {
      const opt = document.createElement("option");
      opt.value = a;
      opt.textContent = a;
      sel.appendChild(opt);
    });
    if (current) sel.value = current;
  }

  function billableBadge(status) {
    if (status === "billable") return '<span class="badge badge-billable">Billable</span>';
    if (status === "nonbillable") return '<span class="badge badge-nonbillable">Non-Billable</span>';
    if (status === "rejected") return '<span class="badge badge-rejected">Rejected</span>';
    if (status === "pending") return '<span class="badge badge-pending">Pending</span>';
    return '<span class="badge badge-unknown">Unknown</span>';
  }

  function renderTable() {
    const tbody = $("#tableBody");
    const empty = $("#emptyState");
    const countEl = $("#tableCount");
    if (!tbody) return;

    if (countEl) {
      countEl.textContent = filteredData.length + " record" + (filteredData.length !== 1 ? "s" : "");
    }

    if (!filteredData.length) {
      tbody.innerHTML = "";
      if (empty) empty.classList.remove("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");

    tbody.innerHTML = filteredData.map(function (r) {
      const payout = getEffectivePayout(r);
      const isNonBillable = r.status === "nonbillable" || r.status === "rejected";
      return (
        '<tr data-id="' + r._id + '" style="' + (isNonBillable ? "opacity:0.75;" : "") + '">' +
        "<td>" + formatDate(r.timestamp) + "</td>" +
        "<td>" + (escapeHtml(r.phone) || "—") + "</td>" +
        "<td>" + (escapeHtml(r.state) || "—") + "</td>" +
        "<td>" + formatDuration(r.duration) + "</td>" +
        "<td>" + billableBadge(r.status) + "</td>" +
        '<td class="payout-cell">' + formatCurrency(payout) + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  function exportCSV() {
    if (!filteredData.length) {
      showToast("No data to export");
      return;
    }
    const headers = [
      "Timestamp", "Phone", "State", "Duration (sec)", "Status", "Payout"
    ];
    const lines = [headers.join(",")];
    filteredData.forEach(function (r) {
      const statusLabel =
        r.status === "billable" ? "Billable" :
        r.status === "nonbillable" ? "Non-Billable" :
        r.status === "rejected" ? "Rejected" :
        r.status === "pending" ? "Pending" : "Unknown";
      const row = [
        formatDate(r.timestamp), r.phone, r.state,
        r.duration || "", statusLabel,
        getEffectivePayout(r).toFixed(2)
      ].map(function (v) {
        return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
      });
      lines.push(row.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vtm-publisher-export-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported");
  }

  // ─── LOGIN UI ─────────────────────────────────────────────────
  function buildLoginUI() {
    const root = document.getElementById("root");
    if (!root) return;

    const urlCompany = getCompanyFromUrl();

    // No company in URL → show guidance
    if (!urlCompany) {
      root.innerHTML =
        '<div class="login-screen">' +
        '<div class="login-card">' +
        '<div class="login-brand">' +
        '<img src="logo.png" alt="Vocal Tech Marketing" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'">' +
        '<div class="brand-fallback" style="display:none;">VT</div>' +
        "<h1>Vocal Tech Marketing</h1>" +
        "<p>Publisher Portal</p>" +
        "</div>" +
        '<div class="login-error show" style="display:block;">' +
        "Missing company link.<br><br>" +
        "Please open your dedicated portal URL, for example:<br>" +
        "<strong>crm.vocaltechmarketing.com/publisher/?company=Leadzone</strong>" +
        "</div>" +
        '<div class="login-footer">Contact VTM admin for your company login link.</div>' +
        "</div></div>";
      return;
    }

    root.innerHTML =
      '<div class="login-screen">' +
      '<div class="login-card">' +
      '<div class="login-brand">' +
      '<img src="logo.png" alt="Vocal Tech Marketing" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'">' +
      '<div class="brand-fallback" style="display:none;">VT</div>' +
      "<h1>Vocal Tech Marketing</h1>" +
      "<p>Publisher Portal · <strong>" + escapeHtml(urlCompany) + "</strong></p>" +
      "</div>" +
      '<div class="login-error" id="loginError"></div>' +
      '<form id="loginForm">' +
      '<div class="login-field">' +
      '<label for="loginUsername">Username</label>' +
      '<input type="text" id="loginUsername" name="username" required placeholder="Your username" autocomplete="username" autofocus />' +
      "</div>" +
      '<div class="login-field">' +
      '<label for="loginPassword">Password</label>' +
      '<input type="password" id="loginPassword" name="password" required placeholder="••••••••" autocomplete="current-password" />' +
      "</div>" +
      '<button type="submit" class="login-btn" id="loginBtn">' +
      '<i class="ti ti-login"></i> Sign In' +
      "</button>" +
      "</form>" +
      '<div class="login-footer">Contact VTM admin if you need access credentials.</div>' +
      "</div></div>";

    $("#loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = $("#loginUsername").value.trim();
      const password = $("#loginPassword").value;
      const errEl = $("#loginError");
      const btn = $("#loginBtn");

      if (!username || !password) {
        errEl.textContent = "Please enter username and password.";
        errEl.classList.add("show");
        return;
      }

      errEl.classList.remove("show");
      btn.disabled = true;
      btn.innerHTML = '<i class="ti ti-loader"></i> Signing in…';

      const result = await attemptLogin(urlCompany, username, password);

      if (result.ok) {
        currentUser = { company: result.company, username: result.username };
        saveSession(result.company, result.username);
        showDashboard();
      } else {
        errEl.textContent = result.message || "Invalid username or password.";
        errEl.classList.add("show");
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-login"></i> Sign In';
      }
    });
  }

  // ─── DASHBOARD UI ─────────────────────────────────────────────
  function buildDashboardUI() {
    const root = document.getElementById("root");
    if (!root) return;

    const companyName = currentUser ? currentUser.company : "Publisher";
    const userName = currentUser ? currentUser.username : "";

    root.innerHTML =
      '<div id="loading" class="loading-overlay hidden">' +
      '<div class="spinner"></div>' +
      '<div style="color:var(--text-muted);font-size:0.9rem;">Loading live data…</div>' +
      "</div>" +
      '<header class="header">' +
      '<div class="header-inner">' +
      '<div class="brand">' +
      '<img src="logo.png" alt="Vocal Tech Marketing" id="logoImg" onerror="this.style.display=\'none\';document.getElementById(\'logoFallback\').style.display=\'grid\'">' +
      '<div class="brand-fallback" id="logoFallback" style="display:none;">VT</div>' +
      '<div class="brand-text"><h1>Vocal Tech Marketing</h1><span>Publisher Portal</span></div>' +
      "</div>" +
      '<div class="header-actions">' +
      '<span class="user-badge"><i class="ti ti-building"></i> ' + escapeHtml(companyName) +
      (userName ? ' · ' + escapeHtml(userName) : "") + "</span>" +
      '<button class="btn" id="btnRefresh" title="Refresh data"><i class="ti ti-refresh"></i> Refresh</button>' +
      '<button class="btn btn-primary" id="btnExport" title="Export CSV"><i class="ti ti-download"></i> Export</button>' +
      '<button class="btn btn-logout" id="btnLogout" title="Sign out"><i class="ti ti-logout"></i> Logout</button>' +
      "</div></div></header>" +
      '<main class="container">' +
      '<div class="metrics">' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-chart-bar"></i> Total Sales</div><div class="metric-value" id="mTotalSales">—</div><div class="metric-sub">Billable · Rejected</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-currency-dollar"></i> Total Payout</div><div class="metric-value" id="mTotalPayout">—</div><div class="metric-sub">Billable sales only</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-calculator"></i> Avg Payout</div><div class="metric-value" id="mAvgPayout">—</div><div class="metric-sub">Per billable sale</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-clock"></i> Avg Duration</div><div class="metric-value" id="mAvgDuration">—</div><div class="metric-sub">All calls</div></div>' +
      "</div>" +
      '<div class="filters">' +
      '<div class="search-wrap"><i class="ti ti-search"></i><input type="text" class="search-input" id="searchInput" placeholder="Search name, phone, agent…" /></div>' +
      '<div><span class="filter-label">Agent</span><select class="filter-select" id="filterAgent"><option value="">All Agents</option></select></div>' +
      '<div><span class="filter-label">Status</span><select class="filter-select" id="filterBillable">' +
      '<option value="">All Status</option>' +
      '<option value="billable">Billable</option>' +
      '<option value="nonbillable">Non-Billable</option>' +
      '<option value="rejected">Rejected</option>' +
      '<option value="pending">Pending</option>' +
      "</select></div>" +
      '<div><span class="filter-label">From</span><input type="date" class="filter-date" id="filterFrom" /></div>' +
      '<div><span class="filter-label">To</span><input type="date" class="filter-date" id="filterTo" /></div>' +
      '<button class="btn" id="btnClearFilters"><i class="ti ti-x"></i> Clear</button>' +
      "</div>" +
      '<div class="table-card">' +
      '<div class="table-header"><h2>Sales Records — ' + escapeHtml(companyName) + '</h2><span class="table-count" id="tableCount">0 records</span></div>' +
      '<div class="table-wrap"><table><thead><tr>' +
      "<th>Timestamp</th><th>Phone</th><th>State</th><th>Duration</th><th>Status</th><th>Payout ($)</th>" +
      '</tr></thead><tbody id="tableBody"></tbody></table>' +
      '<div id="emptyState" class="empty-state hidden"><i class="ti ti-database-off"></i><div>No records match your filters.</div></div>' +
      "</div></div>" +
      "</main>" +
      '<div class="toast" id="toast"></div>';

    $("#btnRefresh") && $("#btnRefresh").addEventListener("click", loadData);
    $("#btnExport") && $("#btnExport").addEventListener("click", exportCSV);
    $("#btnLogout") && $("#btnLogout").addEventListener("click", function () {
      clearSession();
      currentUser = null;
      buildLoginUI();
    });
    $("#searchInput") && $("#searchInput").addEventListener("input", debounce(applyFilters, 220));
    $("#filterAgent") && $("#filterAgent").addEventListener("change", applyFilters);
    $("#filterBillable") && $("#filterBillable").addEventListener("change", applyFilters);
    $("#filterFrom") && $("#filterFrom").addEventListener("change", applyFilters);
    $("#filterTo") && $("#filterTo").addEventListener("change", applyFilters);
    $("#btnClearFilters") && $("#btnClearFilters").addEventListener("click", function () {
      if ($("#searchInput")) $("#searchInput").value = "";
      if ($("#filterAgent")) $("#filterAgent").value = "";
      if ($("#filterBillable")) $("#filterBillable").value = "";
      if ($("#filterFrom")) $("#filterFrom").value = "";
      if ($("#filterTo")) $("#filterTo").value = "";
      applyFilters();
    });
  }

  function showDashboard() {
    buildDashboardUI();
    loadData();
  }

  async function loadData() {
    const loading = $("#loading");
    if (loading) loading.classList.remove("hidden");

    try {
      const data = await fetchSheetData();
      rawData = applyCompanyFilter(data);
      populateAgentFilter(rawData);
      applyFilters();
      const lu = $("#lastUpdated");
      if (lu) lu.textContent = "Last updated: " + new Date().toLocaleString();
      showToast("Loaded " + rawData.length + " records for " + currentUser.company);
    } catch (err) {
      console.error(err);
      const tbody = $("#tableBody");
      const empty = $("#emptyState");
      if (tbody) tbody.innerHTML = "";
      if (empty) {
        empty.classList.remove("hidden");
        empty.innerHTML =
          '<i class="ti ti-alert-triangle" style="color:var(--warning)"></i>' +
          '<div style="margin-top:0.5rem;max-width:420px;margin-left:auto;margin-right:auto;">' +
          "<strong>Unable to load sheet data</strong><br><br>" +
          "Make sure the Google Sheet is shared as<br>" +
          "<em>“Anyone with the link → Viewer”</em><br><br>" +
          '<small style="color:var(--text-dim)">' + escapeHtml(err.message) + "</small></div>";
      }
      updateMetrics([]);
      showToast("Failed to load data – check sheet permissions", 4000);
    } finally {
      if (loading) loading.classList.add("hidden");
    }
  }

  // Boot
  currentUser = loadSession();
  if (currentUser) {
    showDashboard();
  } else {
    buildLoginUI();
  }
})();
