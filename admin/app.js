(function(){
const _0x2a1b = [
  "https://script.google.com/macros/s/AKfycbw7CBJksXRQFzwTvwCWUKfp-S_1BUUNfo4c4y-22emeX81jRa0PRHkiiJ8lFwRQpMAqVA/exec",
  "vtm_logged_in",
  "true",
  "hidden",
  "getCalls",
  "getMonthly",
  "login",
  "password",
  "refresh",
  "action",
  "success",
  "data",
  "message",
  "Network error",
  "Sign in...",
  "Sign In",
  "Incorrect password",
  "0",
  "$0.00",
  " sec",
  "all",
  "billable",
  "nonbillable",
  "record",
  "s",
  "Billable",
  "Non-billable",
  "Unknown",
  "No data yet",
  "No data to export",
  "dts",
  "ani",
  "state",
  "call_duration_sec",
  "payout",
  "status",
  "vtm-calls-",
  ".csv",
  "text/csv;charset=utf-8;",
  "Error: ",
  "Failed: ",
  "Refreshing...",
  "Refresh",
  "See more",
  "See less",
  "open",
  "rotated"
];

const _0x = i => _0x2a1b[i];

let _0x5c3d = [], _0x9e2f = [], _0x7b1a = null, _0xextraOpen = false;
const _0x4e8c = _0x(0);

function _0x6d3f() {
  if (localStorage.getItem(_0x(1)) === _0x(2)) {
    document.getElementById("a0").classList.add(_0x(3));
    document.getElementById("a4").classList.remove(_0x(3));
    _0x0c4e();
    _0x7b1a = setInterval(_0x0c4e, 60000);
  }
}

function _0x1a7c(v) {
  if (v == null || v === "") return "—";
  const s = String(v).trim();
  if (!s) return "—";
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s;
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

async function _0x3b9a(a, p = {}) {
  const u = new URL(_0x4e8c);
  u.searchParams.set(_0x(9), a);
  Object.keys(p).forEach(k => u.searchParams.set(k, p[k]));
  const r = await fetch(u.toString());
  if (!r.ok) throw new Error(_0x(13));
  return await r.json();
}

async function _0x4f2a() {
  const pwd = document.getElementById("a1").value;
  const btn = document.getElementById("a2");
  btn.disabled = true;
  btn.textContent = _0x(14);
  try {
    const res = await _0x3b9a(_0x(6), { [_0x(7)]: pwd });
    if (res[_0x(10)]) {
      localStorage.setItem(_0x(1), _0x(2));
      document.getElementById("a0").classList.add(_0x(3));
      document.getElementById("a4").classList.remove(_0x(3));
      _0x0c4e();
      _0x7b1a = setInterval(_0x0c4e, 60000);
    } else {
      document.getElementById("a3").classList.remove(_0x(3));
    }
  } catch (e) {
    alert(_0x(16) + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = _0x(15);
  }
}

function _0x9a2f() {
  if (_0x7b1a) clearInterval(_0x7b1a);
  localStorage.removeItem(_0x(1));
  document.getElementById("a4").classList.add(_0x(3));
  document.getElementById("a0").classList.remove(_0x(3));
  document.getElementById("a1").value = "";
  document.getElementById("a3").classList.add(_0x(3));
}

async function _0x0c4e() {
  try {
    const [c, m] = await Promise.all([_0x3b9a(_0x(4)), _0x3b9a(_0x(5))]);
    _0x5c3d = c[_0x(11)] || [];
    _0x9e2f = m[_0x(11)] || [];
    _0x1b9e();
    _0x5f2d(_0x9e2f);
    if (!document.getElementById("am").classList.contains(_0x(3))) {
      _0x8e1a();
      _0x4c7b();
    }
  } catch (e) {
    console.error(e);
  }
}

function _0x0e5f() {
  const q = (document.getElementById("af").value || "").toLowerCase().trim();
  const fr = document.getElementById("ag").value;
  const to = document.getElementById("ah").value;
  const st = document.getElementById("ai").value;
  return _0x5c3d.filter(r => {
    if (q) {
      const h = `${r.ani || ""} ${r.state || ""} ${r.dts || ""}`.toLowerCase();
      if (!h.includes(q)) return false;
    }
    if (fr || to) {
      let rd = "";
      if (r.dts) {
        const m = String(r.dts).match(/(\d{4})-(\d{2})-(\d{2})/);
        if (m) rd = m[0];
        else {
          const d = new Date(r.dts);
          if (!isNaN(d.getTime())) {
            const p = n => String(n).padStart(2, "0");
            rd = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
          }
        }
      }
      if (fr && rd < fr) return false;
      if (to && rd > to) return false;
    }
    const po = Number(r.payout) || 0;
    if (st === _0x(21) && po <= 0) return false;
    if (st === _0x(22) && po > 0) return false;
    return true;
  });
}

function _0x1b9e() {
  const f = _0x0e5f();
  _0x6a2c(f);
  _0x9d4e(f);
}

function _0x7d4c() {
  document.getElementById("af").value = "";
  document.getElementById("ag").value = "";
  document.getElementById("ah").value = "";
  document.getElementById("ai").value = _0x(20);
  _0x1b9e();
}

function _0x9d4e(rows) {
  if (!rows || !rows.length) {
    document.getElementById("a9").textContent = _0x(17);
    document.getElementById("aa").textContent = _0x(18);
    document.getElementById("ab").innerHTML = _0x(17) + '<span class="unit">sec</span>';
    document.getElementById("ac").textContent = _0x(18);
    document.getElementById("ad").textContent = _0x(18);
    document.getElementById("ae").textContent = _0x(18);
    return;
  }
  let tp = 0, td = 0, lo = Infinity, hi = -Infinity;
  rows.forEach(c => {
    const p = Number(c.payout) || 0;
    tp += p;
    td += Number(c.call_duration_sec) || 0;
    if (p > 0) {
      if (p < lo) lo = p;
      if (p > hi) hi = p;
    }
  });
  document.getElementById("a9").textContent = rows.length;
  document.getElementById("aa").textContent = "$" + tp.toFixed(2);
  document.getElementById("ab").innerHTML = Math.round(td / rows.length) + '<span class="unit">sec</span>';
  document.getElementById("ac").textContent = "$" + (tp / rows.length).toFixed(2);
  document.getElementById("ad").textContent = lo === Infinity ? _0x(18) : "$" + lo.toFixed(2);
  document.getElementById("ae").textContent = hi === -Infinity ? _0x(18) : "$" + hi.toFixed(2);
}

function _0x4c7b() {
  let b = 0, n = 0;
  _0x5c3d.forEach(c => {
    if (Number(c.payout) > 0) b++;
    else n++;
  });
  document.getElementById("an").textContent = _0x5c3d.length;
  document.getElementById("ao").textContent = b;
  document.getElementById("ap").textContent = n;
}

function _0x6a2c(rows) {
  const tb = document.getElementById("ak");
  const nd = document.getElementById("al");
  const rc = document.getElementById("aj");
  tb.innerHTML = "";
  rc.textContent = rows.length ? `${rows.length} ${_0x(23)}${rows.length !== 1 ? _0x(24) : ""}` : "";
  if (!rows || !rows.length) {
    nd.classList.remove(_0x(3));
    return;
  }
  nd.classList.add(_0x(3));
  rows.forEach(r => {
    const p = Number(r.payout) || 0;
    const st = p > 0
      ? `<span class="status-billable">${_0x(25)}</span>`
      : `<span class="status-non">${_0x(26)}</span>`;
    const tr = document.createElement("tr");
    tr.innerHTML = `<td style="color:var(--muted)">${_0x1a7c(r.dts)}</td>
      <td class="font-mono">${r.ani || "—"}</td>
      <td style="color:var(--muted)">${r.state || "—"}</td>
      <td style="color:var(--muted)">${r.call_duration_sec || "—"}s</td>
      <td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${p.toFixed(2)}</span></td>
      <td>${st}</td>`;
    tb.appendChild(tr);
  });
}

function _0x5f2d(rows) {
  const tb = document.getElementById("ar");
  tb.innerHTML = "";
  (rows || []).forEach(r => {
    let m = (r.month || "").toString().trim();
    if (m.length > 7) {
      const mt = m.match(/(\d{4})-(\d{2})/);
      if (mt) m = mt[0];
      else {
        const d = new Date(m);
        if (!isNaN(d.getTime())) {
          const p = n => String(n).padStart(2, "0");
          m = `${d.getFullYear()}-${p(d.getMonth() + 1)}`;
        }
      }
    }
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${m || "—"}</td>
      <td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${Number(r.total_payout || 0).toFixed(2)}</span></td>
      <td style="color:var(--muted)">${r.total_calls || "—"}</td>`;
    tb.appendChild(tr);
  });
}

function _0x2d8e() {
  const s = {};
  _0x5c3d.forEach(c => {
    const st = ((c.state || _0x(27)).toString().trim().toUpperCase()) || _0x(27);
    if (!s[st]) s[st] = { c: 0, t: 0 };
    s[st].c++;
    s[st].t += Number(c.payout) || 0;
  });
  return Object.keys(s)
    .map(k => ({ state: k, calls: s[k].c, totalPayout: s[k].t, avgBid: s[k].c ? s[k].t / s[k].c : 0 }))
    .sort((a, b) => b.avgBid - a.avgBid);
}

function _0x8e1a() {
  const st = _0x2d8e();
  const tb = document.getElementById("aq");
  tb.innerHTML = "";
  if (!st.length) {
    tb.innerHTML = `<tr><td colspan="4" class="text-center py-8" style="color:var(--muted)">${_0x(28)}</td></tr>`;
    return;
  }
  st.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="font-medium">${s.state}</td>
      <td style="color:var(--muted)">${s.calls}</td>
      <td><span class="payout-hidden" style="color:var(--gold)">$${s.totalPayout.toFixed(2)}</span></td>
      <td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${s.avgBid.toFixed(2)}</span></td>`;
    tb.appendChild(tr);
  });
}

function _0x8c1d(p) {
  document.getElementById("a8").classList.toggle(_0x(3), p !== "o");
  document.getElementById("am").classList.toggle(_0x(3), p !== "a");
  document.getElementById("a5").classList.toggle("active", p === "o");
  document.getElementById("a6").classList.toggle("active", p === "a");
  if (p === "a") {
    _0x8e1a();
    _0x4c7b();
  }
}

function _0xToggleExtra() {
  _0xextraOpen = !_0xextraOpen;
  const el = document.getElementById("aExtra");
  const txt = document.getElementById("aToggleText");
  const ch = document.getElementById("aChevron");
  if (_0xextraOpen) {
    el.classList.add(_0x(45));
    txt.textContent = _0x(44);
    ch.classList.add(_0x(46));
  } else {
    el.classList.remove(_0x(45));
    txt.textContent = _0x(43);
    ch.classList.remove(_0x(46));
  }
}

async function _0x3e7b() {
  const btn = document.getElementById("a7");
  btn.disabled = true;
  btn.innerHTML = `<svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> ${_0x(41)}`;
  try {
    const res = await _0x3b9a(_0x(8));
    if (res[_0x(10)]) await _0x0c4e();
    else alert(_0x(40) + res[_0x(12)]);
  } catch (e) {
    alert(_0x(39) + e.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> ${_0x(42)}`;
  }
}

function _0x2f8a() {
  const rows = _0x0e5f();
  if (!rows.length) {
    alert(_0x(29));
    return;
  }
  const headers = [_0x(30), _0x(31), _0x(32), _0x(33), _0x(34), _0x(35)];
  const csvRows = rows.map(r => {
    const p = Number(r.payout) || 0;
    const st = p > 0 ? _0x(25) : _0x(26);
    const exact = _0x1a7c(r.dts);
    const dts = exact === "—" ? "" : "\t" + exact;
    return [dts, r.ani || "", r.state || "", r.call_duration_sec || "", p.toFixed(2), st]
      .map(v => {
        const s = String(v);
        return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",");
  });
  const csv = [headers.join(",")].concat(csvRows).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: _0x(38) });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = _0x(36) + new Date().toISOString().slice(0, 10) + _0x(37);
  a.click();
  URL.revokeObjectURL(url);
}

/* ========== INVOICE ========== */
function formatDate(d) {
  if (!(d instanceof Date) || isNaN(d)) return "—";
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatTimestamp(dts) {
  if (!dts) return "—";
  const d = new Date(dts);
  if (isNaN(d.getTime())) return String(dts);
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function formatPhone(ani) {
  if (!ani) return "—";
  const s = String(ani).replace(/\D/g, "");
  if (s.length === 10) return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;
  if (s.length === 11 && s[0] === "1") return `+1 (${s.slice(1, 4)}) ${s.slice(4, 7)}-${s.slice(7)}`;
  return ani;
}

function formatDuration(sec) {
  const s = Number(sec) || 0;
  if (s < 60) return s + "s";
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ":" + String(r).padStart(2, "0");
}

window.openInvoiceModal = function (calls, options = {}) {
  if (!Array.isArray(calls) || calls.length === 0) {
    alert("No calls selected for invoicing.");
    return;
  }

  const tbody = document.getElementById("invoiceTableBody");
  tbody.innerHTML = "";

  const now = new Date();
  const invDate = formatDate(now);
  const dueDate = formatDate(new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000));
  const invNum = options.invoiceNumber ||
    `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  const dates = calls
    .map(c => {
      const d = new Date(c.dts);
      return isNaN(d.getTime()) ? null : d;
    })
    .filter(Boolean)
    .sort((a, b) => a - b);

  let period = "—";
  if (dates.length) {
    const first = formatDate(dates[0]);
    const last = formatDate(dates[dates.length - 1]);
    period = first === last ? first : `${first} – ${last}`;
  }

  document.getElementById("invNumber").textContent = invNum;
  document.getElementById("invDate").textContent = invDate;
  document.getElementById("invDueDate").textContent = dueDate;
  document.getElementById("invPeriod").textContent = period;

  if (options.billToName) document.getElementById("billToName").textContent = options.billToName;
  if (options.billToAddress) document.getElementById("billToAddress").innerHTML = options.billToAddress;

  let subtotal = 0;
  calls.forEach(call => {
    const payout = Number(call.payout) || 0;
    subtotal += payout;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatTimestamp(call.dts)}</td>
      <td class="mono">${formatPhone(call.ani)}</td>
      <td>${(call.state || "—").toString().toUpperCase()}</td>
      <td>${formatDuration(call.call_duration_sec)}</td>
      <td>$${payout.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });

  const adjustments = Number(options.adjustments) || 0;
  const total = subtotal + adjustments;

  document.getElementById("invSubtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("invAdjustments").textContent =
    adjustments === 0 ? "$0.00" : (adjustments > 0 ? "+$" + adjustments.toFixed(2) : "-$" + Math.abs(adjustments).toFixed(2));
  document.getElementById("invTotal").textContent = "$" + total.toFixed(2);

  document.getElementById("invoiceModal").classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeInvoiceModal = function () {
  document.getElementById("invoiceModal").classList.remove("open");
  document.body.style.overflow = "";
};

window.printInvoice = function () {
  window.print();
};

window.openInvoiceFromCurrentFilter = function () {
  const rows = _0x0e5f().filter(r => Number(r.payout) > 0);
  openInvoiceModal(rows);
};

/* ========== BUILD UI ========== */
document.getElementById("root").innerHTML = `
<div id="a0" class="min-h-screen flex items-center justify-center p-5">
  <div class="login-card fade-in">
    <div class="text-center mb-8">
      <img src="https://vocaltechmarketing.com/images/logo.png" alt="VTM" class="mx-auto h-12 w-auto mb-5 opacity-95">
      <h1 class="text-xl font-bold tracking-tight">VTM CRM</h1>
      <p class="text-sm mt-1.5" style="color:var(--muted)">Call Analytics Portal</p>
    </div>
    <input id="a1" type="password" placeholder="Enter password" class="input-dark w-full px-4 py-3.5 mb-4" onkeypress="if(event.key==='Enter')_0x4f2a()">
    <button onclick="_0x4f2a()" id="a2" class="btn btn-primary w-full py-3.5 text-sm">Sign In</button>
    <p id="a3" class="text-sm mt-4 text-center hidden" style="color:var(--danger)">Incorrect password</p>
  </div>
</div>

<div id="a4" class="hidden">
  <header class="site-header">
    <div class="max-w-7xl mx-auto px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3">
          <img src="https://vocaltechmarketing.com/images/logo.png" alt="VTM" class="h-8 w-auto opacity-95">
          <div>
            <h1 class="font-semibold text-[13.5px] leading-tight tracking-wide">VTM CRM</h1>
            <p class="text-[11px]" style="color:var(--muted)">Call Analytics</p>
          </div>
        </div>
        <nav class="flex gap-7">
          <button onclick="_0x8c1d('o')" id="a5" class="nav-link active">Overview</button>
          <button onclick="_0x8c1d('a')" id="a6" class="nav-link">Analytics</button>
        </nav>
      </div>
      <div class="flex items-center gap-2.5">
        <button onclick="_0x3e7b()" id="a7" class="btn btn-primary">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Refresh
        </button>
        <button onclick="_0x9a2f()" class="btn btn-ghost">Logout</button>
      </div>
    </div>
  </header>
  <main class="max-w-7xl mx-auto px-5 sm:px-6 py-7">
    <div id="a8" class="space-y-5 fade-in">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div class="metric"><div class="metric-label">Total Calls</div><div id="a9" class="metric-value">—</div></div>
        <div class="metric"><div class="metric-label">Total Payout</div><div id="aa" class="metric-value payout-hidden" style="color:var(--gold)">—</div></div>
        <div class="metric"><div class="metric-label">Avg Duration</div><div id="ab" class="metric-value">— <span class="unit">sec</span></div></div>
        <div class="metric"><div class="metric-label">Avg Payout</div><div id="ac" class="metric-value payout-hidden" style="color:var(--gold)">—</div></div>
      </div>
      <div>
        <button id="aToggle" onclick="_0xToggleExtra()" class="btn-toggle">
          <span id="aToggleText">See more</span>
          <svg id="aChevron" class="w-3.5 h-3.5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="aExtra" class="extra-metrics">
          <div class="metric"><div class="metric-label">Lowest Bid</div><div id="ad" class="metric-value payout-hidden" style="color:var(--gold)">—</div></div>
          <div class="metric"><div class="metric-label">Highest Bid</div><div id="ae" class="metric-value payout-hidden" style="color:var(--gold)">—</div></div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="flex-1 min-w-[160px]">
            <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">Search</label>
            <input id="af" type="text" placeholder="ANI, state or date..." class="input-dark w-full px-3.5 py-2.5" oninput="_0x1b9e()">
          </div>
          <div>
            <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">From</label>
            <input id="ag" type="date" class="input-dark px-3.5 py-2.5" onchange="_0x1b9e()">
          </div>
          <div>
            <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">To</label>
            <input id="ah" type="date" class="input-dark px-3.5 py-2.5" onchange="_0x1b9e()">
          </div>
          <div>
            <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">Status</label>
            <select id="ai" class="input-dark px-3.5 py-2.5" onchange="_0x1b9e()">
              <option value="all">All</option>
              <option value="billable">Billable</option>
              <option value="nonbillable">Non-billable</option>
            </select>
          </div>
          <button onclick="_0x7d4c()" class="btn btn-ghost">Clear</button>
          <button onclick="_0x2f8a()" class="btn btn-export ml-auto">Export CSV</button>
          <button onclick="openInvoiceFromCurrentFilter()" class="btn btn-invoice">Generate Invoice</button>
        </div>
      </div>
      <div class="card overflow-hidden">
        <div class="px-5 py-4 border-b flex items-center justify-between" style="border-color:var(--border)">
          <h2 class="font-semibold text-[13.5px] tracking-wide">Call Details</h2>
          <span id="aj" class="text-[11.5px]" style="color:var(--muted)"></span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>ANI</th>
                <th>State</th>
                <th>Duration</th>
                <th>Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="ak"></tbody>
          </table>
        </div>
        <div id="al" class="hidden py-16 text-center">
          <p class="text-sm" style="color:var(--muted)">No calls match the current filters</p>
        </div>
      </div>
    </div>

    <div id="am" class="hidden space-y-5 fade-in">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div class="metric"><div class="metric-label">Total Calls</div><div id="an" class="metric-value">—</div></div>
        <div class="metric"><div class="metric-label">Billable Calls</div><div id="ao" class="metric-value" style="color:var(--accent)">—</div></div>
        <div class="metric"><div class="metric-label">Non-Billable Calls</div><div id="ap" class="metric-value" style="color:var(--muted)">—</div></div>
      </div>
      <div class="card overflow-hidden">
        <div class="px-5 py-4 border-b" style="border-color:var(--border)">
          <h2 class="font-semibold text-[13.5px] tracking-wide">State Summary</h2>
          <p class="text-[11.5px] mt-1" style="color:var(--muted)">Calls, total payout and average bid per state</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Calls</th>
                <th>Total Payout</th>
                <th>Average Bid</th>
              </tr>
            </thead>
            <tbody id="aq"></tbody>
          </table>
        </div>
      </div>
      <div class="card overflow-hidden">
        <div class="px-5 py-4 border-b" style="border-color:var(--border)">
          <h2 class="font-semibold text-[13.5px] tracking-wide">Monthly Summary</h2>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Payout</th>
                <th>Total Calls</th>
              </tr>
            </thead>
            <tbody id="ar"></tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- Invoice Modal -->
<div id="invoiceModal" class="inv-modal">
  <div class="inv-panel">
    <div class="inv-toolbar">
      <h2>Generate Invoice</h2>
      <div class="inv-actions">
        <button class="btn-print" onclick="printInvoice()">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print / Save as PDF
        </button>
        <button class="btn-close-inv" onclick="closeInvoiceModal()">×</button>
      </div>
    </div>
    <div class="inv-body" id="invoicePrintArea">
      <div class="inv-header">
        <div class="inv-brand">
          <div class="inv-logo"><img src="https://vocaltechmarketing.com/images/logo.png" alt="VTM"></div>
          <div class="inv-company">
            <h1>Vocal Tech Marketing</h1>
            <div class="tagline">Call Analytics & Lead Generation</div>
            <div class="address">123 Business Avenue, Suite 400<br>New York, NY 10001<br>support@vocaltechmarketing.com<br>+1 (555) 123-4567</div>
          </div>
        </div>
        <div class="inv-meta">
          <div class="inv-badge">INVOICE</div>
          <div class="inv-meta-row"><span>Invoice #</span><span id="invNumber">—</span></div>
          <div class="inv-meta-row"><span>Invoice Date</span><span id="invDate">—</span></div>
          <div class="inv-meta-row"><span>Due Date</span><span id="invDueDate">—</span></div>
          <div class="inv-meta-row"><span>Billing Period</span><span id="invPeriod">—</span></div>
        </div>
      </div>
      <div class="inv-grid">
        <div class="bill-to">
          <div class="inv-section-title">Bill To</div>
          <strong id="billToName">Client / Partner Name</strong>
          <p id="billToAddress">Client Address Line 1<br>City, State ZIP<br>client@email.com</p>
        </div>
        <div class="bank-box">
          <div class="inv-section-title">Banking Details</div>
          <div class="bank-row"><span>Bank Name</span><span>Chase Bank</span></div>
          <div class="bank-row"><span>Account Title</span><span>Vocal Tech Marketing LLC</span></div>
          <div class="bank-row"><span>Account Number</span><span>**** **** 4582</span></div>
          <div class="bank-row"><span>IBAN / Routing</span><span>021000021</span></div>
          <div class="bank-row"><span>Swift Code</span><span>CHASUS33</span></div>
        </div>
      </div>
      <div class="inv-table-wrap">
        <table class="inv-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Phone Number</th>
              <th>State</th>
              <th>Duration</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody id="invoiceTableBody"></tbody>
        </table>
      </div>
      <div class="inv-totals">
        <div class="totals-box">
          <div class="total-row"><span>Subtotal</span><span id="invSubtotal">$0.00</span></div>
          <div class="total-row"><span>Adjustments / Deductions</span><span id="invAdjustments">$0.00</span></div>
          <div class="total-final">
            <span>Total Due</span>
            <div class="total-badge" id="invTotal">$0.00</div>
          </div>
        </div>
      </div>
      <div class="inv-sign">
        <div class="sign-block">
          <p class="label">Authorized Signatory</p>
          <div class="sign-line"></div>
          <div class="name">Vocal Tech Marketing</div>
          <div class="role">Finance Department</div>
        </div>
        <div class="sign-block">
          <p class="label">Client Acknowledgement</p>
          <div class="sign-line"></div>
          <div class="name">________________________</div>
          <div class="role">Signature & Date</div>
        </div>
      </div>
      <div class="inv-footer">
        Thank you for your business. Payment is due within 15 days of invoice date.<br>
        Questions? Contact accounts@vocaltechmarketing.com
      </div>
    </div>
  </div>
</div>
`;

_0x6d3f();
})();
