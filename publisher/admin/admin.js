(function () {
  "use strict";

  const SHEET_ID = "11SF4e1EvNZ0ysBLt6UJXufu6CbimL_iRTWHI3VNrDyw";
  const SHEET_NAME = "Auto";
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
  const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZo2WecH8AbJ2rx6-YM7nVzO6D7l7Qn8tMmYQdVMopnIyuCy3SkfZibVS5ibHFtces-w/exec";

  const BILLABLE_THRESHOLD_SECONDS = 120;
  const SESSION_KEY = "vtm_admin_session";

  // Sheet timestamps are Pakistan Standard Time (UTC+5)
  const SHEET_TZ_OFFSET_HOURS = 5;

  const COL_MAP = {
    timestamp: ["timestamp", "date", "time"],
    agent: ["agent name", "agent", "agentname"],
    phone: ["phone", "phone number", "phonenumber"],
    firstName: ["first name", "firstname", "first"],
    lastName: ["last name", "lastname", "last"],
    age: ["age"],
    state: ["state"],
    company: ["company", "client", "publisher"],
    payout: ["payout", "bid", "bid/payout", "amount", "pay"],
    duration: ["duration", "call duration", "talk time", "minutes", "seconds", "call time"],
    statusOverride: ["status override", "qa status", "status", "billable status", "override status"],
    adminLocked: ["admin locked", "locked", "qa locked", "edit locked"]
  };

  let rawData = [];
  let filteredData = [];
  let currentUser = null;

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
    let current = "", inQuotes = false, row = [];
    for (let i = 0; i < text.length; i++) {
      const c = text[i], next = text[i + 1];
      if (c === '"' && inQuotes && next === '"') { current += '"'; i++; }
      else if (c === '"') inQuotes = !inQuotes;
      else if (c === "," && !inQuotes) { row.push(current); current = ""; }
      else if ((c === "\n" || c === "\r") && !inQuotes) {
        if (current || row.length) { row.push(current); rows.push(row); row = []; current = ""; }
        if (c === "\r" && next === "\n") i++;
      } else current += c;
    }
    if (current || row.length) { row.push(current); rows.push(row); }
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

  /** Parse sheet timestamp as PKT and display in US Eastern */

  /** Parse sheet timestamp as Pakistan Standard Time (UTC+5) → Date (UTC) */
  function parseSheetTimestamp(str) {
    if (!str) return null;
    const s = String(str).trim();
    if (!s) return null;
    const hasTZ = /[zZ]|[+\-]\d{2}:?\d{2}$/.test(s);
    if (hasTZ) {
      const d = new Date(s);
      return isNaN(d.getTime()) ? null : d;
    }
    // YYYY-MM-DD HH:MM:SS or YYYY/MM/DD
    let parts = s.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
    if (parts) {
      const y = +parts[1], mo = +parts[2] - 1, day = +parts[3];
      const h = +(parts[4] || 0), mi = +(parts[5] || 0), sec = +(parts[6] || 0);
      return new Date(Date.UTC(y, mo, day, h - 5, mi, sec)); // PKT → UTC
    }
    // DD/MM/YYYY HH:MM:SS
    parts = s.match(/(\d{1,2})[\/](\d{1,2})[\/](\d{4})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
    if (parts) {
      const day = +parts[1], mo = +parts[2] - 1, y = +parts[3];
      const h = +(parts[4] || 0), mi = +(parts[5] || 0), sec = +(parts[6] || 0);
      return new Date(Date.UTC(y, mo, day, h - 5, mi, sec));
    }
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  /** Calendar date YYYY-MM-DD in US Eastern (for date filters) */
  function getEasternDateKey(str) {
    const d = parseSheetTimestamp(str);
    if (!d) return "";
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(d);
    const get = function (type) {
      const x = parts.find(function (p) { return p.type === type; });
      return x ? x.value : "00";
    };
    return get("year") + "-" + get("month") + "-" + get("day");
  }

  function formatDateEastern(str) {
    if (!str) return "—";
    const d = parseSheetTimestamp(str);
    if (!d) return str;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).formatToParts(d);
    const get = function (type) {
      const x = parts.find(function (p) { return p.type === type; });
      return x ? x.value : "00";
    };
    return get("year") + "-" + get("month") + "-" + get("day") + " " + get("hour") + ":" + get("minute") + ":" + get("second");
  }

  function formatDuration(seconds) {
    if (!seconds || seconds <= 0) return "—";
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return m > 0 ? m + "m " + s + "s" : s + "s";
  }

  /**
   * Resolve final status:
   * 1. Explicit override from sheet (admin-set)
   * 2. Default from duration (<120 nonbillable, >=120 billable)
   * 3. pending if no duration
   */
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

  function loadSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && data.username) return data;
    } catch (e) {}
    return null;
  }

  function saveSession(username) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: username, ts: Date.now() }));
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  async function attemptLogin(username, password) {
    const payload = {
      submissionType: "ADMIN_LOGIN",
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
      try { json = JSON.parse(text); }
      catch (e) {
        const m = text.match(/\{[\s\S]*\}/);
        if (m) json = JSON.parse(m[0]);
        else throw new Error("Invalid response");
      }
      if (json.status === "success" && json.username) {
        return { ok: true, username: json.username };
      }
      return { ok: false, message: json.message || "Invalid credentials" };
    } catch (err) {
      try {
        const url = APPS_SCRIPT_URL +
          "?action=admin_login&username=" + encodeURIComponent(username.trim()) +
          "&password=" + encodeURIComponent(password);
        const res = await fetch(url, { method: "GET", redirect: "follow" });
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); }
        catch (e) {
          const m = text.match(/\{[\s\S]*\}/);
          if (m) json = JSON.parse(m[0]);
          else throw new Error("Invalid response");
        }
        if (json.status === "success" && json.username) {
          return { ok: true, username: json.username };
        }
        return { ok: false, message: json.message || "Invalid credentials" };
      } catch (err2) {
        return {
          ok: false,
          message: "Unable to reach login server. Check Apps Script deployment."
        };
      }
    }
  }

  async function saveStatus(row, newStatus) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          submissionType: "UPDATE_STATUS",
          sheetName: "Auto",
          timestamp: row.timestamp,
          phone: row.phone,
          status: newStatus,
          adminUser: currentUser ? currentUser.username : "",
          lockAfter: true
        })
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async function savePayout(row, payoutValue) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          submissionType: "UPDATE_PAYOUT",
          sheetName: "Auto",
          timestamp: row.timestamp,
          phone: row.phone,
          payout: payoutValue,
          lockAfter: true
        })
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async function saveDuration(row, durationValue) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          submissionType: "UPDATE_DURATION",
          sheetName: "Auto",
          timestamp: row.timestamp,
          phone: row.phone,
          duration: durationValue,
          lockAfter: true
        })
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function mapRow(r, col, i) {
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
      company: r[col.company] || "",
      payout: parseNumber(r[col.payout]),
      duration: duration,
      statusOverride: override,
      adminLocked: col.adminLocked != null ? (r[col.adminLocked] || "") : "",
      locked: false,
      status: resolveStatus(duration, override)
    };
  }

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
      const col = mapColumns(rows[0]);
      return rows.slice(1).map(function (r, i) {
        return mapRow(r, col, i);
      }).filter(function (r) {
        return r.timestamp || r.phone || r.firstName || r.agent;
      });
    } catch (err) {
      console.warn("CSV failed, trying JSON…", err.message);
      const res = await fetch(JSON_URL, { cache: "no-store" });
      const text = await res.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\)/);
      if (!match) throw new Error("Unable to parse sheet. Share as Anyone with the link → Viewer.");
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
        const override = get("statusOverride");
        return {
          _id: "r" + i,
          timestamp: get("timestamp"),
          agent: get("agent"),
          phone: get("phone"),
          firstName: get("firstName"),
          lastName: get("lastName"),
          age: get("age"),
          state: get("state"),
          company: get("company"),
          payout: parseNumber(get("payout")),
          duration: duration,
          statusOverride: override,
          adminLocked: get("adminLocked"),
          locked: false,
          status: resolveStatus(duration, override)
        };
      }).filter(function (r) {
        return r.timestamp || r.phone || r.firstName || r.agent;
      });
    }
  }

  /** Payout is $0 when non-billable or rejected */
  function isRowLocked(row) {
    if (!row) return false;
    if (row.locked === true) return true;
    const v = String(row.adminLocked || "").trim().toLowerCase();
    return v === "yes" || v === "y" || v === "true" || v === "1" || v === "locked";
  }

  function getDisplayPayout(row) {
    if (row.status === "nonbillable" || row.status === "rejected") return 0;
    return row.payout;
  }

  function updateMetrics(data) {
    const total = data.length;
    const billable = data.filter(function (r) { return r.status === "billable"; });
    const nonBillable = data.filter(function (r) { return r.status === "nonbillable"; });
    const rejected = data.filter(function (r) { return r.status === "rejected"; });
    const pending = data.filter(function (r) { return r.status === "pending"; });

    let sumPayout = 0;
    let sumDuration = 0;
    let durationCount = 0;

    billable.forEach(function (r) { sumPayout += getDisplayPayout(r); });
    data.forEach(function (r) {
      if (r.duration > 0) { sumDuration += r.duration; durationCount++; }
    });

    const avgPayout = billable.length ? sumPayout / billable.length : 0;
    const avgDuration = durationCount ? sumDuration / durationCount : null;

    const el = function (id) { return document.getElementById(id); };
    if (el("mTotalSales")) {
      el("mTotalSales").textContent = total.toLocaleString();
      const sub = el("mTotalSales").parentElement && el("mTotalSales").parentElement.querySelector(".metric-sub");
      if (sub) {
        sub.textContent =
          billable.length + " billable · " +
          nonBillable.length + " non-billable · " +
          rejected.length + " rejected · " +
          pending.length + " pending";
      }
    }
    if (el("mTotalPayout")) el("mTotalPayout").textContent = formatCurrency(sumPayout);
    if (el("mAvgPayout")) el("mAvgPayout").textContent = formatCurrency(avgPayout);
    if (el("mAvgDuration")) el("mAvgDuration").textContent = avgDuration != null ? formatDuration(avgDuration) : "—";
  }

  function applyFilters() {
    const q = ($("#searchInput") && $("#searchInput").value || "").toLowerCase().trim();
    const agent = ($("#filterAgent") && $("#filterAgent").value) || "";
    const company = ($("#filterCompany") && $("#filterCompany").value) || "";
    const status = ($("#filterStatus") && $("#filterStatus").value) || "";
    const from = ($("#filterFrom") && $("#filterFrom").value) || "";
    const to = ($("#filterTo") && $("#filterTo").value) || "";

    filteredData = rawData.filter(function (r) {
      if (agent && r.agent !== agent) return false;
      if (company && r.company !== company) return false;
      if (status && r.status !== status) return false;
      if (from || to) {
        const dayKey = getEasternDateKey(r.timestamp);
        if (!dayKey) return false;
        if (from && dayKey < from) return false;
        if (to && dayKey > to) return false;
      }
      if (q) {
        const hay = [r.agent, r.firstName, r.lastName, r.phone, r.company, r.state].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    renderTable();
    updateMetrics(filteredData);
  }

  function populateFilters(data) {
    const agents = [], companies = [], seenA = {}, seenC = {};
    data.forEach(function (r) {
      if (r.agent && !seenA[r.agent]) { seenA[r.agent] = true; agents.push(r.agent); }
      if (r.company && !seenC[r.company]) { seenC[r.company] = true; companies.push(r.company); }
    });
    agents.sort();
    companies.sort();

    const selA = $("#filterAgent");
    if (selA) {
      const cur = selA.value;
      selA.innerHTML = '<option value="">All Agents</option>';
      agents.forEach(function (a) {
        const o = document.createElement("option");
        o.value = a; o.textContent = a; selA.appendChild(o);
      });
      if (cur) selA.value = cur;
    }

    const selC = $("#filterCompany");
    if (selC) {
      const cur = selC.value;
      selC.innerHTML = '<option value="">All Companies</option>';
      companies.forEach(function (c) {
        const o = document.createElement("option");
        o.value = c; o.textContent = c; selC.appendChild(o);
      });
      if (cur) selC.value = cur;
    }
  }

  function statusSelectHtml(row) {
    const s = row.status;
    if (isRowLocked(row)) {
      const label = s === "billable" ? "Billable" : s === "nonbillable" ? "Non-Billable" : s === "rejected" ? "Rejected" : "Pending";
      const cls = s === "billable" ? "badge-billable" : s === "nonbillable" ? "badge-nonbillable" : s === "rejected" ? "badge-rejected" : "badge-pending";
      return '<span class="badge ' + cls + '" title="Locked — already updated once">' + label + " 🔒</span>";
    }
    return (
      '<select class="status-select ' + s + '" data-id="' + row._id + '">' +
      '<option value="billable"' + (s === "billable" ? " selected" : "") + ">Billable</option>" +
      '<option value="nonbillable"' + (s === "nonbillable" ? " selected" : "") + ">Non-Billable</option>" +
      '<option value="rejected"' + (s === "rejected" ? " selected" : "") + ">Rejected</option>" +
      '<option value="pending"' + (s === "pending" ? " selected" : "") + ">Pending</option>" +
      "</select>"
    );
  }

  function durationInputHtml(row) {
    if (isRowLocked(row)) {
      return '<span title="Locked">' + formatDuration(row.duration) + "</span>";
    }
    return '<input type="number" class="duration-input" step="1" min="0" value="' + (row.duration || 0) +
      '" data-id="' + row._id + '" title="Seconds — one edit only" style="width:88px;padding:0.35rem 0.5rem;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:inherit;font-size:0.85rem;text-align:right;" />';
  }

  function payoutInputHtml(row, payout) {
    if (isRowLocked(row)) {
      return '<span class="payout-cell" title="Locked">' + formatCurrency(payout) + "</span>";
    }
    const forcedZero = row.status === "nonbillable" || row.status === "rejected";
    return '<input type="number" class="payout-input" step="0.01" min="0" value="' + Number(payout).toFixed(2) +
      '" data-id="' + row._id + '" ' + (forcedZero ? 'disabled title="Payout $0 when Non-Billable/Rejected"' : 'title="One edit only — then locked"') + " />";
  }

  function renderTable() {
    const tbody = $("#tableBody");
    const empty = $("#emptyState");
    const countEl = $("#tableCount");
    if (!tbody) return;

    if (countEl) {
      countEl.textContent = filteredData.length + " call" + (filteredData.length !== 1 ? "s" : "");
    }

    if (!filteredData.length) {
      tbody.innerHTML = "";
      if (empty) empty.classList.remove("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");

    tbody.innerHTML = filteredData.map(function (r) {
      const payout = getDisplayPayout(r);
      const name = [r.firstName, r.lastName].filter(Boolean).join(" ") || "—";
      const dim = (r.status === "nonbillable" || r.status === "rejected") ? "opacity:0.8;" : "";
      return (
        '<tr data-id="' + r._id + '" style="' + dim + '">' +
        "<td>" + formatDateEastern(r.timestamp) + "</td>" +
        "<td>" + (escapeHtml(r.agent) || "—") + "</td>" +
        "<td>" + escapeHtml(name) + "</td>" +
        "<td>" + (escapeHtml(r.phone) || "—") + "</td>" +
        "<td>" + (escapeHtml(r.state) || "—") + "</td>" +
        '<td><span class="badge">' + (escapeHtml(r.company) || "—") + "</span></td>" +
        "<td>" + durationInputHtml(r) + "</td>" +
        "<td>" + statusSelectHtml(r) + "</td>" +
        "<td>" + payoutInputHtml(r, payout) + "</td>" +
        "</tr>"
      );
    }).join("");

    $$(".status-select").forEach(function (sel) {
      sel.addEventListener("change", async function (e) {
        const id = e.target.dataset.id;
        const row = filteredData.find(function (r) { return r._id === id; }) ||
          rawData.find(function (r) { return r._id === id; });
        if (!row) return;

        if (isRowLocked(row)) {
          showToast("This call is locked — already updated once", 3500);
          renderTable();
          return;
        }
        const newStatus = e.target.value;
        row.status = newStatus;
        row.statusOverride = newStatus;
        updateMetrics(filteredData);
        showToast("Saving status…");
        const ok = await saveStatus(row, newStatus);
        if (ok) {
          row.locked = true;
          row.adminLocked = "Yes";
          showToast(
            (newStatus === "nonbillable" || newStatus === "rejected"
              ? "Marked " + newStatus + " · payout $0"
              : "Status updated") + " · call locked"
          );
        } else {
          showToast("Failed to save status", 4000);
        }
        renderTable();
      });
    });

    $$(".payout-input").forEach(function (inp) {
      if (inp.disabled) return;
      inp.addEventListener("change", async function (e) {
        const id = e.target.dataset.id;
        const row = filteredData.find(function (r) { return r._id === id; }) ||
          rawData.find(function (r) { return r._id === id; });
        if (!row) return;
        if (isRowLocked(row)) {
          showToast("This call is locked — already updated once", 3500);
          renderTable();
          return;
        }
        if (row.status === "nonbillable" || row.status === "rejected") {
          e.target.value = "0.00";
          showToast("Payout is $0 for Non-Billable / Rejected");
          return;
        }
        const val = parseNumber(e.target.value);
        row.payout = val;
        e.target.value = val.toFixed(2);
        updateMetrics(filteredData);
        showToast("Saving payout…");
        const ok = await savePayout(row, val);
        if (ok) {
          row.locked = true;
          row.adminLocked = "Yes";
          showToast("Payout saved · call locked");
        } else {
          showToast("Failed to save payout", 4000);
        }
        renderTable();
      });
    });

    $$(".duration-input").forEach(function (inp) {
      inp.addEventListener("change", async function (e) {
        const id = e.target.dataset.id;
        const row = filteredData.find(function (r) { return r._id === id; }) ||
          rawData.find(function (r) { return r._id === id; });
        if (!row) return;
        if (isRowLocked(row)) {
          showToast("This call is locked — already updated once", 3500);
          renderTable();
          return;
        }
        const val = Math.max(0, Math.round(parseNumber(e.target.value)));
        row.duration = val;
        e.target.value = String(val);
        if (!row.statusOverride) row.status = resolveStatus(val, "");
        updateMetrics(filteredData);
        showToast("Saving duration…");
        const ok = await saveDuration(row, val);
        if (ok) {
          row.locked = true;
          row.adminLocked = "Yes";
          showToast("Duration saved · call locked");
        } else {
          showToast("Failed to save duration", 4000);
        }
        renderTable();
      });
    });
  }

  function exportCSV() {
    if (!filteredData.length) {
      showToast("No data to export");
      return;
    }
    const headers = [
      "Timestamp", "Agent", "First Name", "Last Name", "Phone", "State",
      "Company", "Duration (sec)", "Status", "Payout"
    ];
    const lines = [headers.join(",")];
    filteredData.forEach(function (r) {
      const statusLabel =
        r.status === "billable" ? "Billable" :
        r.status === "nonbillable" ? "Non-Billable" :
        r.status === "rejected" ? "Rejected" : "Pending";
      const row = [
        r.timestamp, r.agent, r.firstName, r.lastName, r.phone, r.state,
        r.company, r.duration || "", statusLabel, getDisplayPayout(r).toFixed(2)
      ].map(function (v) {
        return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
      });
      lines.push(row.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vtm-admin-export-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported");
  }

  function buildLoginUI() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML =
      '<div class="login-screen">' +
      '<div class="login-card">' +
      '<div class="login-brand">' +
      '<img src="../logo.png" alt="VTM" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'">' +
      '<div class="brand-fallback" style="display:none;">VT</div>' +
      "<h1>Vocal Tech Marketing</h1>" +
      '<p>Admin Portal <span class="admin-tag">QA / Billing</span></p>' +
      "</div>" +
      '<div class="login-error" id="loginError"></div>' +
      '<form id="loginForm">' +
      '<div class="login-field">' +
      '<label for="loginUsername">Username</label>' +
      '<input type="text" id="loginUsername" required placeholder="Admin username" autocomplete="username" autofocus />' +
      "</div>" +
      '<div class="login-field">' +
      '<label for="loginPassword">Password</label>' +
      '<input type="password" id="loginPassword" required placeholder="••••••••" autocomplete="current-password" />' +
      "</div>" +
      '<button type="submit" class="login-btn" id="loginBtn"><i class="ti ti-shield-lock"></i> Sign In</button>' +
      "</form>" +
      '<div class="login-footer">VTM internal use only</div>' +
      "</div></div>";

    $("#loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = $("#loginUsername").value.trim();
      const password = $("#loginPassword").value;
      const errEl = $("#loginError");
      const btn = $("#loginBtn");

      if (!username || !password) {
        errEl.textContent = "Enter username and password.";
        errEl.classList.add("show");
        return;
      }

      errEl.classList.remove("show");
      btn.disabled = true;
      btn.innerHTML = '<i class="ti ti-loader"></i> Signing in…';

      const result = await attemptLogin(username, password);
      if (result.ok) {
        currentUser = { username: result.username };
        saveSession(result.username);
        showDashboard();
      } else {
        errEl.textContent = result.message || "Invalid credentials.";
        errEl.classList.add("show");
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-shield-lock"></i> Sign In';
      }
    });
  }

  function buildDashboardUI() {
    const root = document.getElementById("root");
    if (!root) return;
    const userName = currentUser ? currentUser.username : "Admin";

    root.innerHTML =
      '<div id="loading" class="loading-overlay hidden">' +
      '<div class="spinner"></div>' +
      '<div style="color:var(--text-muted);font-size:0.9rem;">Loading live data…</div></div>' +
      '<header class="header"><div class="header-inner">' +
      '<div class="brand">' +
      '<img src="../logo.png" alt="VTM" onerror="this.style.display=\'none\';document.getElementById(\'logoFallback\').style.display=\'grid\'">' +
      '<div class="brand-fallback" id="logoFallback" style="display:none;">VT</div>' +
      '<div class="brand-text"><h1>Vocal Tech Marketing</h1><span>Admin Portal · QA / Billing</span></div></div>' +
      '<div class="header-actions">' +
      '<span class="user-badge"><i class="ti ti-shield"></i> ' + escapeHtml(userName) + "</span>" +
      '<button class="btn" id="btnRefresh"><i class="ti ti-refresh"></i> Refresh</button>' +
      '<button class="btn btn-primary" id="btnExport"><i class="ti ti-download"></i> Export</button>' +
      '<button class="btn btn-logout" id="btnLogout"><i class="ti ti-logout"></i> Logout</button>' +
      "</div></div></header>" +
      '<main class="container">' +
      '<div class="metrics">' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-chart-bar"></i> Total Calls</div><div class="metric-value" id="mTotalSales">—</div><div class="metric-sub">All statuses</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-currency-dollar"></i> Total Payout</div><div class="metric-value" id="mTotalPayout">—</div><div class="metric-sub">Billable calls only (non-billable = $0)</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-calculator"></i> Avg Payout</div><div class="metric-value" id="mAvgPayout">—</div><div class="metric-sub">Per billable call</div></div>' +
      '<div class="metric-card"><div class="metric-label"><i class="ti ti-clock"></i> Avg Duration</div><div class="metric-value" id="mAvgDuration">—</div><div class="metric-sub">All calls</div></div>' +
      "</div>" +
      '<div class="filters">' +
      '<div class="search-wrap"><i class="ti ti-search"></i><input type="text" class="search-input" id="searchInput" placeholder="Search name, phone, agent, company…" /></div>' +
      '<div><span class="filter-label">Company</span><select class="filter-select" id="filterCompany"><option value="">All Companies</option></select></div>' +
      '<div><span class="filter-label">Agent</span><select class="filter-select" id="filterAgent"><option value="">All Agents</option></select></div>' +
      '<div><span class="filter-label">Status</span><select class="filter-select" id="filterStatus">' +
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
      '<div class="table-header"><h2>All Call Records <span class="admin-tag">Admin</span></h2><span class="table-count" id="tableCount">0 records</span></div>' +
      '<div class="table-wrap"><table><thead><tr>' +
      "<th>Timestamp</th><th>Agent</th><th>Name</th><th>Phone</th><th>State</th>" +
      "<th>Company</th><th>Duration</th><th>Status</th><th>Payout ($)</th>" +
      '</tr></thead><tbody id="tableBody"></tbody></table>' +
      '<div id="emptyState" class="empty-state hidden"><i class="ti ti-database-off"></i><div>No calls match your filters.</div></div>' +
      "</div></div>" +
      '<div class="status-bar"><div><span class="status-dot"></span> Live · Auto sheet · Default &lt;120s = Non-Billable · Override available</div>' +
      '<div id="lastUpdated">Last updated: —</div></div>' +
      "</main>" +
      '<div class="toast" id="toast"></div>';

    $("#btnRefresh").addEventListener("click", loadData);
    $("#btnExport").addEventListener("click", exportCSV);
    $("#btnLogout").addEventListener("click", function () {
      clearSession();
      currentUser = null;
      buildLoginUI();
    });
    $("#searchInput").addEventListener("input", debounce(applyFilters, 220));
    $("#filterAgent").addEventListener("change", applyFilters);
    $("#filterCompany").addEventListener("change", applyFilters);
    $("#filterStatus").addEventListener("change", applyFilters);
    $("#filterFrom").addEventListener("change", applyFilters);
    $("#filterTo").addEventListener("change", applyFilters);
    $("#btnClearFilters").addEventListener("click", function () {
      $("#searchInput").value = "";
      $("#filterAgent").value = "";
      $("#filterCompany").value = "";
      $("#filterStatus").value = "";
      $("#filterFrom").value = "";
      $("#filterTo").value = "";
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
      rawData = await fetchSheetData();
      rawData.forEach(function (r) { r.locked = isRowLocked(r); });
      populateFilters(rawData);
      applyFilters();
      const lu = $("#lastUpdated");
      if (lu) lu.textContent = "Last updated: " + new Date().toLocaleString();
      showToast("Loaded " + rawData.length + " calls");
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
          "<strong>Unable to load call data</strong><br><br>" +
          "Share the sheet as <em>Anyone with the link → Viewer</em><br><br>" +
          '<small style="color:var(--text-dim)">' + escapeHtml(err.message) + "</small></div>";
      }
      updateMetrics([]);
      showToast("Failed to load data", 4000);
    } finally {
      if (loading) loading.classList.add("hidden");
    }
  }

  currentUser = loadSession();
  if (currentUser) showDashboard();
  else buildLoginUI();
})();
