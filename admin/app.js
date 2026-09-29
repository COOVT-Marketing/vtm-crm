(function () {
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#0d1110;--surface:#161b19;--surface2:#1c221f;--surface3:#222925;--border:#2a322e;--border-soft:#343c38;--text:#eef1ef;--muted:#7d8782;--accent:#3d9a9a;--accent-soft:rgba(61,154,154,.15);--accent-h:#348585;--gold:#e8b84a;--danger:#e05c5c;--radius:16px;--radius-sm:10px;--shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.25);--inv-primary:#548888;--inv-bg:#f8fafa;--inv-text:#1e293b;--inv-muted:#64748b;--inv-border:#e2e8f0;--chart-line:#e8b84a;--chart-fill:rgba(232,184,74,.12)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
#root{min-height:100vh}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow)}
.metric{background:linear-gradient(165deg,var(--surface2) 0%,var(--surface) 100%);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem 1.35rem;transition:border-color .2s}
.metric:hover{border-color:var(--border-soft)}
.metric-label{font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.metric-value{font-size:1.75rem;font-weight:700;letter-spacing:-0.03em;line-height:1.15}
.metric-value .unit{font-size:12px;font-weight:500;color:var(--muted);margin-left:3px}
.metric-sub{font-size:12px;color:var(--muted);margin-top:8px;font-variant-numeric:tabular-nums}
.input-dark{background:var(--surface3);border:1px solid var(--border);color:var(--text);border-radius:var(--radius-sm);font-size:13px;transition:border-color .2s,box-shadow .2s}
.input-dark:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.input-dark::placeholder{color:var(--muted)}
.nav-link{color:var(--muted);font-size:13.5px;font-weight:500;padding-bottom:6px;border-bottom:2px solid transparent;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;transition:color .2s,border-color .2s}
.nav-link:hover{color:var(--text)}
.nav-link.active{color:var(--text);border-bottom-color:var(--accent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13px;font-weight:500;border-radius:var(--radius-sm);cursor:pointer;transition:background .2s,opacity .15s,transform .1s;border:none}
.btn:active{transform:scale(.98)}
.btn-primary{background:var(--accent);color:#fff;padding:8px 16px}
.btn-primary:hover{background:var(--accent-h)}
.btn-ghost{background:var(--surface3);color:var(--muted);border:1px solid var(--border);padding:8px 14px}
.btn-ghost:hover{background:var(--border);color:var(--text)}
.btn-export{background:var(--text);color:var(--bg);font-weight:600;padding:8px 16px}
.btn-export:hover{opacity:.92}
.btn-invoice{background:#548888;color:#fff;font-weight:600;padding:8px 16px}
.btn-invoice:hover{background:#467373}
.btn-toggle{background:transparent;color:var(--accent);border:1px solid var(--border);padding:7px 14px;font-size:12.5px;font-weight:500;border-radius:var(--radius-sm);cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.btn-toggle:hover{background:var(--accent-soft);border-color:var(--accent)}
.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse}
thead tr{background:var(--surface2)}
th{font-size:11px;font-weight:500;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);text-align:left;padding:12px 20px}
td{padding:13px 20px;font-size:13.5px;border-top:1px solid var(--border)}
tbody tr{transition:background .12s}
tbody tr:hover{background:rgba(61,154,154,.04)}
.status-billable{display:inline-block;background:var(--accent-soft);color:#6bc4c4;font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px}
.status-non{display:inline-block;background:rgba(125,135,130,.12);color:var(--muted);font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px}
.site-header{background:rgba(13,17,16,.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:30}
.extra-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;max-height:0;overflow:hidden;opacity:0;transition:max-height .35s ease,opacity .3s ease,margin .3s ease;margin-top:0}
.extra-metrics.open{max-height:160px;opacity:1;margin-top:14px}
.login-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:0 0 80px rgba(61,154,154,.08),var(--shadow);padding:2.5rem;width:100%;max-width:400px}
.fade-in{animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
.chevron{transition:transform .25s ease}
.chevron.rotated{transform:rotate(180deg)}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:var(--border-soft)}
.chart-card{padding:1.25rem 1.35rem}
.chart-title{font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:16px}
.chart-wrap{position:relative;height:280px;width:100%}
.stat-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
@media(max-width:640px){.stat-cards{grid-template-columns:1fr}.chart-wrap{height:220px}}
.inv-modal{position:fixed;inset:0;z-index:1000;display:none;overflow-y:auto;background:rgba(15,23,42,.55);backdrop-filter:blur(6px)}
.inv-modal.open{display:block}
.inv-panel{max-width:720px;margin:2rem auto;background:#fff;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,.35);overflow:hidden}
.inv-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid var(--inv-border);background:#fafbfc}
.inv-toolbar h2{font-size:16px;font-weight:600;color:var(--inv-text)}
.inv-actions{display:flex;gap:10px}
.btn-print{display:inline-flex;align-items:center;gap:7px;background:var(--inv-primary);color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border:none;border-radius:8px;cursor:pointer}
.btn-print:hover{background:#467373}
.btn-pdf{display:inline-flex;align-items:center;gap:7px;background:#1e293b;color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border:none;border-radius:8px;cursor:pointer}
.btn-pdf:hover{background:#0f172a}
.btn-close-inv{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--inv-border);border-radius:8px;color:var(--inv-muted);cursor:pointer;font-size:18px}
.btn-close-inv:hover{background:#f1f5f9;color:var(--inv-text)}
.inv-body{padding:32px 36px 28px;color:var(--inv-text);font-family:'Inter',system-ui,sans-serif;background:#ffffff}
.inv-header{display:flex;justify-content:space-between;align-items:flex-start;gap:28px;margin-bottom:20px}
.inv-brand{display:flex;gap:14px;align-items:center}
.inv-logo{width:52px;height:52px;border-radius:12px;background:linear-gradient(145deg,#f0f7f7 0%,#e8f2f2 100%);border:1px solid #d4e4e4;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
.inv-logo img{height:34px;width:auto;object-fit:contain}
.inv-company h1{font-size:18px;font-weight:700;color:var(--inv-primary);letter-spacing:-0.02em}
.inv-company .tagline{font-size:12px;color:var(--inv-muted);margin-top:3px}
.inv-meta{text-align:right}
.inv-badge{display:inline-block;background:linear-gradient(135deg,#548888 0%,#3d6e6e 100%);color:#fff;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:5px 14px;border-radius:6px;margin-bottom:14px}
.inv-meta-row{display:flex;justify-content:flex-end;gap:12px;font-size:13px;margin-bottom:5px}
.inv-meta-row span:first-child{color:var(--inv-muted);font-weight:500}
.inv-meta-row span:last-child{font-weight:600;color:var(--inv-text);font-variant-numeric:tabular-nums}
.inv-divider{height:1px;background:linear-gradient(90deg,transparent,var(--inv-border),transparent);margin:0 0 20px}
.inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
@media(max-width:640px){.inv-grid{grid-template-columns:1fr}.inv-header{flex-direction:column}.inv-meta{text-align:left}.inv-meta-row{justify-content:flex-start}}
.inv-section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--inv-muted);margin-bottom:10px}
.bill-to{background:var(--inv-bg);border:1px solid var(--inv-border);border-radius:12px;padding:16px 18px}
.bill-to strong{font-size:15px;font-weight:600;color:var(--inv-text);display:block}
.bank-box{background:var(--inv-bg);border:1px solid var(--inv-border);border-radius:12px;padding:16px 18px}
.bank-box .inv-section-title{color:var(--inv-primary)}
.bank-row{display:flex;justify-content:space-between;gap:12px;font-size:13px;margin-bottom:6px}
.bank-row:last-child{margin-bottom:0}
.bank-row span:first-child{color:var(--inv-muted)}
.bank-row span:last-child{font-weight:500;color:var(--inv-text);text-align:right;font-variant-numeric:tabular-nums}
.inv-summary{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
@media(max-width:480px){.inv-summary{grid-template-columns:1fr}}
.inv-stat{background:linear-gradient(165deg,#f8fafa 0%,#f0f5f5 100%);border:1px solid var(--inv-border);border-radius:14px;padding:16px 18px;text-align:center}
.inv-stat-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--inv-muted);margin-bottom:8px}
.inv-stat-value{font-size:1.75rem;font-weight:700;letter-spacing:-0.03em;line-height:1.1;color:var(--inv-text)}
.inv-stat-value.gold{color:#b8860b}
.inv-stat-value.teal{color:var(--inv-primary)}
.inv-stat-sub{font-size:12px;color:var(--inv-muted);margin-top:6px}
.inv-line-item{border:1px solid var(--inv-border);border-radius:12px;overflow:hidden;margin-bottom:18px}
.inv-line-head{display:grid;grid-template-columns:1fr 100px 120px;background:var(--inv-primary);padding:11px 20px;gap:12px}
.inv-line-head span{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff}
.inv-line-head span:nth-child(2),.inv-line-head span:nth-child(3){text-align:right}
.inv-line-body{display:grid;grid-template-columns:1fr 100px 120px;padding:16px 20px;gap:12px;align-items:center;background:#fff}
.inv-line-body span:nth-child(2),.inv-line-body span:nth-child(3){text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.inv-line-desc{font-size:14px;font-weight:500;color:var(--inv-text)}
.inv-line-desc small{display:block;font-size:12px;font-weight:400;color:var(--inv-muted);margin-top:3px}
.inv-totals{display:flex;justify-content:flex-end;margin-bottom:8px}
.totals-box{width:280px;background:var(--inv-bg);border:1px solid var(--inv-border);border-radius:12px;padding:16px 20px}
.total-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px}
.total-row span:first-child{color:var(--inv-muted)}
.total-row span:last-child{font-weight:500;font-variant-numeric:tabular-nums}
.total-final{border-top:1px solid var(--inv-border);padding-top:14px;margin-top:4px;display:flex;justify-content:space-between;align-items:center}
.total-final span:first-child{font-size:14px;font-weight:700;color:var(--inv-text)}
.total-badge{background:linear-gradient(135deg,#548888 0%,#3d6e6e 100%);color:#fff;font-size:16px;font-weight:700;padding:8px 16px;border-radius:8px;letter-spacing:-0.01em}
.inv-form{padding:20px 24px;background:#f8fafc;border-bottom:1px solid var(--inv-border)}
.inv-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:640px){.inv-form-grid{grid-template-columns:1fr}}
.inv-form label{display:block;font-size:12px;font-weight:500;color:#64748b;margin-bottom:6px}
.inv-form input,.inv-form select{width:100%;padding:9px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;color:#1e293b;background:#fff}
.inv-form input:focus,.inv-form select:focus{outline:none;border-color:#548888;box-shadow:0 0 0 3px rgba(84,136,136,.15)}
@media print{
  body *{visibility:hidden!important}
  .inv-modal,.inv-modal *{visibility:visible!important}
  .inv-modal{position:absolute!important;left:0!important;top:0!important;width:100%!important;background:white!important;overflow:visible!important}
  .inv-toolbar,.inv-form{display:none!important}
  .inv-panel{box-shadow:none!important;border-radius:0!important;margin:0!important;max-width:none!important}
  .inv-body{padding:0!important}
  .inv-header{margin-bottom:18px!important}
  .inv-divider{margin-bottom:18px!important}
  .inv-grid{gap:14px!important;margin-bottom:18px!important}
  .inv-summary{gap:12px!important;margin-bottom:18px!important}
  .inv-stat{padding:14px 16px!important}
  .inv-stat-value{font-size:1.5rem!important}
  .inv-line-item{margin-bottom:16px!important}
  .inv-line-head{padding:9px 16px!important}
  .inv-line-body{padding:12px 16px!important}
  .totals-box{padding:12px 16px!important}
  .bill-to,.bank-box{padding:12px 14px!important}
  @page{size:A4;margin:12mm 14mm}
}
`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Chart.js
  const chartScript = document.createElement("script");
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
  document.head.appendChild(chartScript);

  const html2pdfScript = document.createElement("script");
  html2pdfScript.src = "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js";
  document.head.appendChild(html2pdfScript);

  // Standalone jsPDF as reliable PDF backend (no html2canvas)
  const jspdfScript = document.createElement("script");
  jspdfScript.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
  document.head.appendChild(jspdfScript);

  const VTM_LOGO_DATA = "data:image/png;base64,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";
  const API = "https://script.google.com/macros/s/AKfycbw7CBJksXRQFzwTvwCWUKfp-S_1BUUNfo4c4y-22emeX81jRa0PRHkiiJ8lFwRQpMAqVA/exec";
  let calls = [], monthly = [], timer = null, extraOpen = false;
  let payoutChart = null;

  function checkLogin() {
    if (localStorage.getItem("vtm_logged_in") === "true") {
      document.getElementById("a0").classList.add("hidden");
      document.getElementById("a4").classList.remove("hidden");
      loadData();
      timer = setInterval(loadData, 60000);
    }
  }
  function formatTs(v) {
    if (v == null || v === "") return "—";
    const s = String(v).trim();
    if (!s) return "—";
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s;
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }
  async function api(action, params = {}) {
    const u = new URL(API);
    u.searchParams.set("action", action);
    Object.keys(params).forEach(k => u.searchParams.set(k, params[k]));
    const r = await fetch(u.toString());
    if (!r.ok) throw new Error("Network error");
    return await r.json();
  }
  async function doLogin() {
    const pwd = document.getElementById("a1").value;
    const btn = document.getElementById("a2");
    btn.disabled = true;
    btn.textContent = "Sign in...";
    try {
      const res = await api("login", { password: pwd });
      if (res.success) {
        localStorage.setItem("vtm_logged_in", "true");
        document.getElementById("a0").classList.add("hidden");
        document.getElementById("a4").classList.remove("hidden");
        loadData();
        timer = setInterval(loadData, 60000);
      } else {
        document.getElementById("a3").classList.remove("hidden");
      }
    } catch (e) {
      alert("Login failed: " + e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Sign In";
    }
  }
  function doLogout() {
    if (timer) clearInterval(timer);
    localStorage.removeItem("vtm_logged_in");
    document.getElementById("a4").classList.add("hidden");
    document.getElementById("a0").classList.remove("hidden");
    document.getElementById("a1").value = "";
    document.getElementById("a3").classList.add("hidden");
    if (payoutChart) {
      payoutChart.destroy();
      payoutChart = null;
    }
  }
  async function loadData() {
    try {
      const [c, m] = await Promise.all([api("getCalls"), api("getMonthly")]);
      calls = c.data || [];
      monthly = m.data || [];
      applyFilters();
      renderMonthly(monthly);
      if (!document.getElementById("am").classList.contains("hidden")) {
        renderAnalytics();
      }
      if (document.getElementById("invoiceModal").classList.contains("open")) {
        generateInvoice();
      }
    } catch (e) {
      console.error(e);
    }
  }
  function getFiltered() {
    const q = (document.getElementById("af").value || "").toLowerCase().trim();
    const fr = document.getElementById("ag").value;
    const to = document.getElementById("ah").value;
    const st = document.getElementById("ai").value;
    return calls.filter(r => {
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
      if (st === "billable" && po <= 0) return false;
      if (st === "nonbillable" && po > 0) return false;
      return true;
    });
  }
  function applyFilters() {
    const f = getFiltered();
    renderTable(f);
    renderMetrics(f);
  }
  function clearFilters() {
    document.getElementById("af").value = "";
    document.getElementById("ag").value = "";
    document.getElementById("ah").value = "";
    document.getElementById("ai").value = "all";
    applyFilters();
  }
  function renderMetrics(rows) {
    if (!rows || !rows.length) {
      document.getElementById("a9").textContent = "0";
      document.getElementById("aa").textContent = "$0.00";
      document.getElementById("ab").innerHTML = '0 <span class="unit">sec</span>';
      document.getElementById("ac").textContent = "$0.00";
      document.getElementById("ad").textContent = "$0.00";
      document.getElementById("ae").textContent = "$0.00";
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
    document.getElementById("ab").innerHTML = Math.round(td / rows.length) + ' <span class="unit">sec</span>';
    document.getElementById("ac").textContent = "$" + (tp / rows.length).toFixed(2);
    document.getElementById("ad").textContent = lo === Infinity ? "$0.00" : "$" + lo.toFixed(2);
    document.getElementById("ae").textContent = hi === -Infinity ? "$0.00" : "$" + hi.toFixed(2);
  }
  /* ---------- Analytics (with Date / Month / State filters) ---------- */
  function getRowDate(dts) {
    if (!dts) return "";
    const m = String(dts).match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[0];
    const d = new Date(dts);
    if (isNaN(d.getTime())) return "";
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function normState(c) {
    return ((c.state || "Unknown").toString().trim().toUpperCase()) || "UNKNOWN";
  }
  // If From is after To, they are swapped.
  function getAnalyticsRange() {
    let from = document.getElementById("anFrom").value;
    let to = document.getElementById("anTo").value;
    if (from && to && from > to) {
      const t = from; from = to; to = t;
    }
    return { from, to };
  }
  function getAnalyticsFiltered() {
    const { from, to } = getAnalyticsRange();
    const st = document.getElementById("anState").value;
    return calls.filter(c => {
      const d = getRowDate(c.dts);
      if ((from || to) && !d) return false;
      if (from && d < from) return false;
      if (to && d > to) return false;
      if (st !== "all" && normState(c) !== st) return false;
      return true;
    });
  }
  function populateStateFilter() {
    const sel = document.getElementById("anState");
    const current = sel.value || "all";
    const states = [...new Set(calls.map(normState))].sort();
    sel.innerHTML = `<option value="all">All States</option>` +
      states.map(s => `<option value="${s}">${s}</option>`).join("");
    sel.value = states.includes(current) ? current : "all";
  }
  function onAnRange() {
    renderAnalytics();
  }
  function clearAnalyticsFilters() {
    document.getElementById("anFrom").value = "";
    document.getElementById("anTo").value = "";
    document.getElementById("anState").value = "all";
    renderAnalytics();
  }
  function findExtremes(rows) {
    let longest = null, shortest = null;
    rows.forEach(c => {
      const d = Number(c.call_duration_sec);
      if (!isFinite(d) || d <= 0) return;
      if (!longest || d > Number(longest.call_duration_sec)) longest = c;
      if (!shortest || d < Number(shortest.call_duration_sec)) shortest = c;
    });
    return { longest, shortest };
  }
  function renderCallExtremes(rows) {
    const { longest, shortest } = findExtremes(rows);
    const longEl = document.getElementById("anLongest");
    const shortEl = document.getElementById("anShortest");
    const longSub = document.getElementById("anLongestSub");
    const shortSub = document.getElementById("anShortestSub");
    if (longest) {
      longEl.innerHTML = Math.round(Number(longest.call_duration_sec)) + ' <span class="unit">sec</span>';
      longSub.textContent = (longest.state || "—").toString().toUpperCase();
    } else {
      longEl.innerHTML = '— <span class="unit">sec</span>';
      longSub.textContent = "No data";
    }
    if (shortest) {
      shortEl.innerHTML = Math.round(Number(shortest.call_duration_sec)) + ' <span class="unit">sec</span>';
      shortSub.textContent = (shortest.state || "—").toString().toUpperCase();
    } else {
      shortEl.innerHTML = '— <span class="unit">sec</span>';
      shortSub.textContent = "No data";
    }
  }
  function buildDailyPayouts(rows) {
    const map = {};
    rows.forEach(c => {
      const d = getRowDate(c.dts);
      if (!d) return;
      if (!map[d]) map[d] = 0;
      map[d] += Number(c.payout) || 0;
    });
    const keys = Object.keys(map).sort();
    return {
      labels: keys.map(k => {
        // MM-DD for compact axis like the reference image
        const parts = k.split("-");
        return parts.length === 3 ? `${parts[1]}-${parts[2]}` : k;
      }),
      fullDates: keys,
      values: keys.map(k => map[k])
    };
  }
  function renderPayoutChart(rows) {
    const canvas = document.getElementById("payoutChart");
    if (!canvas || typeof Chart === "undefined") return;
    const data = buildDailyPayouts(rows);
    if (payoutChart) {
      payoutChart.destroy();
      payoutChart = null;
    }
    if (!data.labels.length) {
      return;
    }
    const ctx = canvas.getContext("2d");
    payoutChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [{
          label: "Payout",
          data: data.values,
          borderColor: "#e8b84a",
          backgroundColor: "rgba(232,184,74,0.12)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#e8b84a",
          pointBorderColor: "#161b19",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: "#f0c96a",
          pointHoverBorderColor: "#161b19"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(22,27,25,0.95)",
            titleColor: "#eef1ef",
            bodyColor: "#eef1ef",
            borderColor: "#2a322e",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              title: (items) => {
                const i = items[0]?.dataIndex;
                return data.fullDates[i] || items[0]?.label || "";
              },
              label: (ctx) => `Payout: $${Number(ctx.raw).toFixed(2)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(42,50,46,0.6)", drawBorder: false },
            ticks: {
              color: "#7d8782",
              font: { size: 11, family: "Inter, system-ui, sans-serif" },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 12
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(42,50,46,0.6)", drawBorder: false },
            ticks: {
              color: "#7d8782",
              font: { size: 11, family: "Inter, system-ui, sans-serif" },
              callback: (v) => "$" + v
            }
          }
        }
      }
    });
  }
  function renderAnalytics() {
    populateStateFilter();
    const rows = getAnalyticsFiltered();
    let b = 0, n = 0, tp = 0;
    rows.forEach(c => {
      const p = Number(c.payout) || 0;
      tp += p;
      if (p > 0) b++; else n++;
    });
    document.getElementById("an").textContent = rows.length;
    document.getElementById("ao").textContent = b;
    document.getElementById("ap").textContent = n;
    document.getElementById("anTotal").textContent = "$" + tp.toFixed(2);
    document.getElementById("anAvg").textContent = "$" + (rows.length ? tp / rows.length : 0).toFixed(2);
    const { from, to } = getAnalyticsRange();
    const st = document.getElementById("anState").value;
    let when = "All time";
    if (from && to) when = `${from} → ${to}`;
    else if (from) when = `From ${from}`;
    else if (to) when = `Until ${to}`;
    const parts = [when, st === "all" ? "All states" : st];
    document.getElementById("anRange").textContent = parts.join(" · ");
    renderCallExtremes(rows);
    renderStates(rows);
    // Wait for Chart.js if still loading
    if (typeof Chart !== "undefined") {
      renderPayoutChart(rows);
    } else {
      const wait = setInterval(() => {
        if (typeof Chart !== "undefined") {
          clearInterval(wait);
          renderPayoutChart(rows);
        }
      }, 50);
      setTimeout(() => clearInterval(wait), 5000);
    }
  }
  function getStates(rows) {
    const s = {};
    rows.forEach(c => {
      const st = normState(c);
      if (!s[st]) s[st] = { c: 0, t: 0 };
      s[st].c++;
      s[st].t += Number(c.payout) || 0;
    });
    return Object.keys(s)
      .map(k => ({ state: k, calls: s[k].c, totalPayout: s[k].t, avgBid: s[k].c ? s[k].t / s[k].c : 0 }))
      .sort((a, b) => b.avgBid - a.avgBid);
  }
  function renderStates(rows) {
    const st = getStates(rows || getAnalyticsFiltered());
    const tb = document.getElementById("aq");
    tb.innerHTML = "";
    if (!st.length) {
      tb.innerHTML = `<tr><td colspan="4" class="text-center py-8" style="color:var(--muted)">No data for this filter</td></tr>`;
      return;
    }
    st.forEach(s => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td class="font-medium">${s.state}</td>
        <td style="color:var(--muted)">${s.calls}</td>
        <td style="color:var(--gold)">$${s.totalPayout.toFixed(2)}</td>
        <td class="font-medium" style="color:var(--gold)">$${s.avgBid.toFixed(2)}</td>`;
      tb.appendChild(tr);
    });
  }
  /* ---------- Tables ---------- */
  function renderTable(rows) {
    const tb = document.getElementById("ak");
    const nd = document.getElementById("al");
    const rc = document.getElementById("aj");
    tb.innerHTML = "";
    rc.textContent = rows.length ? `${rows.length} record${rows.length !== 1 ? "s" : ""}` : "";
    if (!rows || !rows.length) {
      nd.classList.remove("hidden");
      return;
    }
    nd.classList.add("hidden");
    rows.forEach(r => {
      const p = Number(r.payout) || 0;
      const st = p > 0 ? `<span class="status-billable">Billable</span>` : `<span class="status-non">Non-billable</span>`;
      const tr = document.createElement("tr");
      tr.innerHTML = `<td style="color:var(--muted)">${formatTs(r.dts)}</td>
        <td class="font-mono">${r.ani || "—"}</td>
        <td style="color:var(--muted)">${r.state || "—"}</td>
        <td style="color:var(--muted)">${r.call_duration_sec || "—"}s</td>
        <td class="font-medium" style="color:var(--gold)">$${p.toFixed(2)}</td>
        <td>${st}</td>`;
      tb.appendChild(tr);
    });
  }
  function renderMonthly(rows) {
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
        <td class="font-medium" style="color:var(--gold)">$${Number(r.total_payout || 0).toFixed(2)}</td>
        <td style="color:var(--muted)">${r.total_calls || "—"}</td>`;
      tb.appendChild(tr);
    });
  }
  function switchTab(p) {
    document.getElementById("a8").classList.toggle("hidden", p !== "o");
    document.getElementById("am").classList.toggle("hidden", p !== "a");
    document.getElementById("a5").classList.toggle("active", p === "o");
    document.getElementById("a6").classList.toggle("active", p === "a");
    if (p === "a") {
      renderAnalytics();
    }
  }
  function toggleExtra() {
    extraOpen = !extraOpen;
    const el = document.getElementById("aExtra");
    const txt = document.getElementById("aToggleText");
    const ch = document.getElementById("aChevron");
    if (extraOpen) {
      el.classList.add("open");
      txt.textContent = "See less";
      ch.classList.add("rotated");
    } else {
      el.classList.remove("open");
      txt.textContent = "See more";
      ch.classList.remove("rotated");
    }
  }
  async function doRefresh() {
    const btn = document.getElementById("a7");
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> Refreshing...`;
    try {
      const res = await api("refresh");
      if (res.success) await loadData();
      else alert("Failed: " + res.message);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Refresh`;
    }
  }
  function exportCSV() {
    const rows = getFiltered();
    if (!rows.length) {
      alert("No data to export");
      return;
    }
    const headers = ["dts", "ani", "state", "call_duration_sec", "payout", "status"];
    const csvRows = rows.map(r => {
      const p = Number(r.payout) || 0;
      const st = p > 0 ? "Billable" : "Non-billable";
      const exact = formatTs(r.dts);
      const dts = exact === "—" ? "" : "\t" + exact;
      return [dts, r.ani || "", r.state || "", r.call_duration_sec || "", p.toFixed(2), st]
        .map(v => {
          const s = String(v);
          return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
        }).join(",");
    });
    const csv = [headers.join(",")].concat(csvRows).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vtm-calls-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  /* ---------- Invoice ---------- */
  function formatDate(d) {
    if (!(d instanceof Date) || isNaN(d)) return "—";
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  // Same source string as the Overview table, trimmed to minutes (no timezone conversion)
  function formatTimestamp(dts) {
    const s = formatTs(dts);
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.replace("T", " ").slice(0, 16);
    return s;
  }
  function formatPhone(ani) {
    if (!ani) return "—";
    return String(ani).replace(/\D/g, "");
  }
  function formatDuration(sec) {
    return (Number(sec) || 0) + "s";
  }
  let invRand = 0; // fixed per modal open so the invoice number doesn't change while typing
  function openInvoiceModal() {
    const monthSelect = document.getElementById("invMonthSelect");
    monthSelect.innerHTML = "";
    // months (YYYY-MM) that actually have billable calls
    const billableMonths = new Set();
    calls.forEach(r => {
      if (Number(r.payout) > 0) {
        const k = getRowDate(r.dts).slice(0, 7);
        if (k) billableMonths.add(k);
      }
    });
    const now = new Date();
    const keys = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("en-US", { month: "long", year: "numeric" });
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = label;
      monthSelect.appendChild(opt);
      keys.push(val);
    }
    // Default: previous month if it has billable calls, otherwise the newest month that does
    let def = keys[1];
    if (!billableMonths.has(def)) {
      const found = keys.find(k => billableMonths.has(k));
      if (found) def = found;
    }
    monthSelect.value = def;
    invRand = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById("invoiceModal").classList.add("open");
    document.body.style.overflow = "hidden";
    generateInvoice();
  }
  function generateInvoice() {
    const month = document.getElementById("invMonthSelect").value;
    const buyer = document.getElementById("invBuyerName").value.trim() || "Client / Partner";
    const bankName = document.getElementById("invBankName").value.trim() || "—";
    const accountTitle = document.getElementById("invAccountTitle").value.trim() || "—";
    const accountNumber = document.getElementById("invAccountNumber").value.trim() || "—";
    const routing = document.getElementById("invRouting").value.trim() || "—";
    const [y, m] = month.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    // Month match uses the same YYYY-MM-DD string as the tables, so no timezone drift at month edges
    const filtered = calls.filter(r => Number(r.payout) > 0 && getRowDate(r.dts).slice(0, 7) === month);
    const now = new Date();
    const invDate = formatDate(now);
    const invNum = `INV-${y}${String(m).padStart(2, "0")}-${invRand || 1000}`;
    const periodLabel = start.toLocaleString("en-US", { month: "long", year: "numeric" });
    let subtotal = 0;
    filtered.forEach(call => { subtotal += Number(call.payout) || 0; });
    document.getElementById("invNumber").textContent = invNum;
    document.getElementById("invDate").textContent = invDate;
    document.getElementById("invPeriod").textContent = periodLabel;
    document.getElementById("billToName").textContent = buyer;
    document.getElementById("bankNameDisplay").textContent = bankName;
    document.getElementById("accountTitleDisplay").textContent = accountTitle;
    document.getElementById("accountNumberDisplay").textContent = accountNumber;
    document.getElementById("routingDisplay").textContent = routing;
    document.getElementById("invStatCalls").textContent = filtered.length;
    document.getElementById("invStatAmount").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("invLineDesc").textContent = "Auto";
    document.getElementById("invLinePeriod").textContent = periodLabel;
    document.getElementById("invLineCalls").textContent = filtered.length;
    document.getElementById("invLineAmount").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("invSubtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("invTotal").textContent = "$" + subtotal.toFixed(2);
  }
    function closeInvoiceModal() {
    document.getElementById("invoiceModal").classList.remove("open");
    document.body.style.overflow = "";
  }
  function printInvoice() {
    window.print();
  }
  function downloadPDF() {
    // Prefer pure jsPDF (no html2canvas) — avoids 0x0 canvas / CORS crashes
    const JsPDFCtor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if (!JsPDFCtor) {
      // Fallback: library still loading
      if (typeof html2pdf === "undefined") {
        alert("PDF library is still loading. Please wait a second and try again, or use Print.");
        return;
      }
      // Last resort: open print dialog (user can Save as PDF)
      window.print();
      return;
    }

    const invNum = document.getElementById("invNumber").textContent || "invoice";
    const invDate = document.getElementById("invDate").textContent || "—";
    const period = document.getElementById("invPeriod").textContent || "—";
    const buyer = document.getElementById("billToName").textContent || "—";
    const bankName = document.getElementById("bankNameDisplay").textContent || "—";
    const accountTitle = document.getElementById("accountTitleDisplay").textContent || "—";
    const accountNumber = document.getElementById("accountNumberDisplay").textContent || "—";
    const routing = document.getElementById("routingDisplay").textContent || "—";
    const qty = document.getElementById("invStatCalls").textContent || "0";
    const amount = document.getElementById("invStatAmount").textContent || "$0.00";
    const lineDesc = document.getElementById("invLineDesc").textContent || "Auto";
    const linePeriod = document.getElementById("invLinePeriod").textContent || period;
    const lineQty = document.getElementById("invLineCalls").textContent || qty;
    const lineAmount = document.getElementById("invLineAmount").textContent || amount;
    const subtotal = document.getElementById("invSubtotal").textContent || amount;
    const total = document.getElementById("invTotal").textContent || amount;

    const doc = new JsPDFCtor({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 18;
    const contentW = pageW - margin * 2;
    let y = margin;

    const teal = [84, 136, 136];
    const dark = [30, 41, 59];
    const muted = [100, 116, 139];
    const gold = [184, 134, 11];
    const light = [248, 250, 250];
    const border = [226, 232, 240];

    // Header brand + logo
    try {
      doc.addImage(VTM_LOGO_DATA, "PNG", margin, y, 12, 12);
    } catch (e) {
      doc.setFillColor(...teal);
      doc.roundedRect(margin, y, 12, 12, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text("VTM", margin + 6, y + 7.5, { align: "center" });
    }

    doc.setTextColor(...teal);
    doc.setFontSize(14);
    doc.text("Vocal Tech Marketing", margin + 16, y + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text("Where brands find their voices!", margin + 16, y + 10);

    // Invoice badge + meta (right)
    const rightX = pageW - margin;
    doc.setFillColor(...teal);
    doc.roundedRect(rightX - 28, y, 28, 7, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("INVOICE", rightX - 14, y + 4.8, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text("Invoice #", rightX - 55, y + 14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text(String(invNum), rightX, y + 14, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("Invoice Date", rightX - 55, y + 20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text(String(invDate), rightX, y + 20, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...muted);
    doc.text("Billing Period", rightX - 55, y + 26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text(String(period), rightX, y + 26, { align: "right" });

    y += 36;
    // Divider
    doc.setDrawColor(...border);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // Bill To + Banking boxes
    const colW = (contentW - 6) / 2;
    const boxH = 36;
    doc.setFillColor(...light);
    doc.setDrawColor(...border);
    doc.roundedRect(margin, y, colW, boxH, 2, 2, "FD");
    doc.roundedRect(margin + colW + 6, y, colW, boxH, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text("BILL TO", margin + 4, y + 6);
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    doc.text(String(buyer), margin + 4, y + 14);

    doc.setFontSize(7);
    doc.setTextColor(...teal);
    doc.text("BANKING DETAILS", margin + colW + 10, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    const bankLeft = margin + colW + 10;
    const bankRight = pageW - margin - 4;
    const bankRows = [
      ["Bank Name", bankName],
      ["Account Title", accountTitle],
      ["Account Number", accountNumber],
      ["IBAN / Routing", routing]
    ];
    let by = y + 12;
    bankRows.forEach(([lab, val]) => {
      doc.setTextColor(...muted);
      doc.text(lab, bankLeft, by);
      doc.setTextColor(...dark);
      doc.setFont("helvetica", "bold");
      doc.text(String(val), bankRight, by, { align: "right" });
      doc.setFont("helvetica", "normal");
      by += 5.5;
    });

    y += boxH + 8;

    // Quantity + Amount cards
    const cardW = (contentW - 6) / 2;
    const cardH = 28;
    doc.setFillColor(...light);
    doc.setDrawColor(...border);
    doc.roundedRect(margin, y, cardW, cardH, 2, 2, "FD");
    doc.roundedRect(margin + cardW + 6, y, cardW, cardH, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text("QUANTITY", margin + cardW / 2, y + 7, { align: "center" });
    doc.setFontSize(18);
    doc.setTextColor(...teal);
    doc.text(String(qty), margin + cardW / 2, y + 17, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text("For this billing period", margin + cardW / 2, y + 23, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("TOTAL AMOUNT", margin + cardW + 6 + cardW / 2, y + 7, { align: "center" });
    doc.setFontSize(18);
    doc.setTextColor(...gold);
    doc.text(String(amount), margin + cardW + 6 + cardW / 2, y + 17, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text("Amount due", margin + cardW + 6 + cardW / 2, y + 23, { align: "center" });

    y += cardH + 8;

    // Line item table header
    const rowH = 10;
    doc.setFillColor(...teal);
    doc.roundedRect(margin, y, contentW, rowH, 1.5, 1.5, "F");
    // square bottom of header
    doc.rect(margin, y + 5, contentW, 5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("DESCRIPTION", margin + 4, y + 6.5);
    doc.text("QTY", margin + contentW * 0.62, y + 6.5);
    doc.text("AMOUNT", pageW - margin - 4, y + 6.5, { align: "right" });
    y += rowH;

    // Line body
    doc.setDrawColor(...border);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, y, contentW, 16, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text(String(lineDesc), margin + 4, y + 6.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(String(linePeriod), margin + 4, y + 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text(String(lineQty), margin + contentW * 0.62, y + 9);
    doc.text(String(lineAmount), pageW - margin - 4, y + 9, { align: "right" });
    y += 22;

    // Totals box (right aligned)
    const totW = 70;
    const totX = pageW - margin - totW;
    doc.setFillColor(...light);
    doc.setDrawColor(...border);
    doc.roundedRect(totX, y, totW, 28, 2, 2, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text("Subtotal", totX + 4, y + 8);
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.text(String(subtotal), totX + totW - 4, y + 8, { align: "right" });

    doc.setDrawColor(...border);
    doc.line(totX + 4, y + 12, totX + totW - 4, y + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text("Total Due", totX + 4, y + 21);
    doc.setFillColor(...teal);
    doc.roundedRect(totX + totW - 36, y + 15, 32, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(String(total), totX + totW - 20, y + 21, { align: "center" });

    // Exactly one page — save
    doc.save(invNum + ".pdf");
  }
  /* ---------- Markup ---------- */
  document.getElementById("root").innerHTML = `
  <div id="a0" class="min-h-screen flex items-center justify-center p-5">
    <div class="login-card fade-in">
      <div class="text-center mb-8">
        <img src="https://vocaltechmarketing.com/images/logo.png" alt="VTM" class="mx-auto h-12 w-auto mb-5 opacity-95">
        <h1 class="text-xl font-bold tracking-tight">VTM CRM</h1>
        <p class="text-sm mt-1.5" style="color:var(--muted)">Call Analytics Portal</p>
      </div>
      <input id="a1" type="password" placeholder="Enter password" class="input-dark w-full px-4 py-3.5 mb-4" onkeypress="if(event.key==='Enter')doLogin()">
      <button onclick="doLogin()" id="a2" class="btn btn-primary w-full py-3.5 text-sm">Sign In</button>
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
            <button onclick="switchTab('o')" id="a5" class="nav-link active">Overview</button>
            <button onclick="switchTab('a')" id="a6" class="nav-link">Analytics</button>
          </nav>
        </div>
        <div class="flex items-center gap-2.5">
          <button onclick="doRefresh()" id="a7" class="btn btn-primary">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh
          </button>
          <button onclick="doLogout()" class="btn btn-ghost">Logout</button>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-5 sm:px-6 py-7">
      <div id="a8" class="space-y-5 fade-in">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div class="metric"><div class="metric-label">Total Calls</div><div id="a9" class="metric-value">—</div></div>
          <div class="metric"><div class="metric-label">Total Payout</div><div id="aa" class="metric-value" style="color:var(--gold)">—</div></div>
          <div class="metric"><div class="metric-label">Avg Duration</div><div id="ab" class="metric-value">— <span class="unit">sec</span></div></div>
          <div class="metric"><div class="metric-label">Avg Payout</div><div id="ac" class="metric-value" style="color:var(--gold)">—</div></div>
        </div>
        <div>
          <button id="aToggle" onclick="toggleExtra()" class="btn-toggle">
            <span id="aToggleText">See more</span>
            <svg id="aChevron" class="w-3.5 h-3.5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="aExtra" class="extra-metrics">
            <div class="metric"><div class="metric-label">Lowest Bid</div><div id="ad" class="metric-value" style="color:var(--gold)">—</div></div>
            <div class="metric"><div class="metric-label">Highest Bid</div><div id="ae" class="metric-value" style="color:var(--gold)">—</div></div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex flex-wrap items-end gap-3">
            <div class="flex-1 min-w-[160px]">
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">Search</label>
              <input id="af" type="text" placeholder="ANI, state or date..." class="input-dark w-full px-3.5 py-2.5" oninput="applyFilters()">
            </div>
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">From</label>
              <input id="ag" type="date" class="input-dark px-3.5 py-2.5" onchange="applyFilters()">
            </div>
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">To</label>
              <input id="ah" type="date" class="input-dark px-3.5 py-2.5" onchange="applyFilters()">
            </div>
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">Status</label>
              <select id="ai" class="input-dark px-3.5 py-2.5" onchange="applyFilters()">
                <option value="all">All</option>
                <option value="billable">Billable</option>
                <option value="nonbillable">Non-billable</option>
              </select>
            </div>
            <button onclick="clearFilters()" class="btn btn-ghost">Clear</button>
            <button onclick="exportCSV()" class="btn btn-export ml-auto">Export CSV</button>
            <button onclick="openInvoiceModal()" class="btn btn-invoice">Generate Invoice</button>
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
        <div class="card p-4">
          <div class="flex flex-wrap items-end gap-3">
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">From</label>
              <input id="anFrom" type="date" class="input-dark px-3.5 py-2.5" style="color-scheme:dark" onchange="onAnRange()">
            </div>
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">To</label>
              <input id="anTo" type="date" class="input-dark px-3.5 py-2.5" style="color-scheme:dark" onchange="onAnRange()">
            </div>
            <div>
              <label class="block text-[11px] font-medium mb-1.5" style="color:var(--muted)">State</label>
              <select id="anState" class="input-dark px-3.5 py-2.5 min-w-[140px]" onchange="renderAnalytics()">
                <option value="all">All States</option>
              </select>
            </div>
            <button onclick="clearAnalyticsFilters()" class="btn btn-ghost">Clear</button>
            <span id="anRange" class="ml-auto text-[11.5px]" style="color:var(--muted)"></span>
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div class="metric"><div class="metric-label">Total Calls</div><div id="an" class="metric-value">—</div></div>
          <div class="metric"><div class="metric-label">Billable Calls</div><div id="ao" class="metric-value" style="color:var(--accent)">—</div></div>
          <div class="metric"><div class="metric-label">Non-Billable Calls</div><div id="ap" class="metric-value" style="color:var(--muted)">—</div></div>
          <div class="metric"><div class="metric-label">Total Payout</div><div id="anTotal" class="metric-value" style="color:var(--gold)">—</div></div>
          <div class="metric"><div class="metric-label">Avg Payout</div><div id="anAvg" class="metric-value" style="color:var(--gold)">—</div></div>
        </div>
        <div class="stat-cards">
          <div class="metric">
            <div class="metric-label">Longest Call</div>
            <div id="anLongest" class="metric-value">— <span class="unit">sec</span></div>
            <div id="anLongestSub" class="metric-sub">—</div>
          </div>
          <div class="metric">
            <div class="metric-label">Shortest Call</div>
            <div id="anShortest" class="metric-value">— <span class="unit">sec</span></div>
            <div id="anShortestSub" class="metric-sub">—</div>
          </div>
        </div>
        <div class="card chart-card">
          <div class="chart-title">Daily Payout Chart</div>
          <div class="chart-wrap">
            <canvas id="payoutChart"></canvas>
          </div>
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
  <div id="invoiceModal" class="inv-modal">
    <div class="inv-panel">
      <div class="inv-toolbar">
        <h2>Generate Invoice</h2>
        <div class="inv-actions">
          <button class="btn-print" onclick="printInvoice()">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Print
          </button>
          <button class="btn-pdf" onclick="downloadPDF()">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Download PDF
          </button>
          <button class="btn-close-inv" onclick="closeInvoiceModal()">×</button>
        </div>
      </div>
      <div class="inv-form">
        <div class="inv-form-grid">
          <div>
            <label>Billing Month</label>
            <select id="invMonthSelect" onchange="generateInvoice()"></select>
          </div>
          <div>
            <label>Buyer Name</label>
            <input id="invBuyerName" type="text" placeholder="Enter buyer / client name" oninput="generateInvoice()">
          </div>
          <div>
            <label>Bank Name</label>
            <input id="invBankName" type="text" placeholder="Bank Name" oninput="generateInvoice()">
          </div>
          <div>
            <label>Account Title</label>
            <input id="invAccountTitle" type="text" placeholder="Account Title" oninput="generateInvoice()">
          </div>
          <div>
            <label>Account Number</label>
            <input id="invAccountNumber" type="text" placeholder="Account Number" oninput="generateInvoice()">
          </div>
          <div>
            <label>IBAN / Routing</label>
            <input id="invRouting" type="text" placeholder="IBAN or Routing Number" oninput="generateInvoice()">
          </div>
        </div>
      </div>
      <div class="inv-body" id="invoicePrintArea">
        <div class="inv-header">
          <div class="inv-brand">
            <div class="inv-logo"><img src="https://vocaltechmarketing.com/images/logo.png" alt="VTM"></div>
            <div class="inv-company">
              <h1>Vocal Tech Marketing</h1>
              <div class="tagline">Where brands find their voices!</div>
            </div>
          </div>
          <div class="inv-meta">
            <div class="inv-badge">INVOICE</div>
            <div class="inv-meta-row"><span>Invoice #</span><span id="invNumber">—</span></div>
            <div class="inv-meta-row"><span>Invoice Date</span><span id="invDate">—</span></div>
            <div class="inv-meta-row"><span>Billing Period</span><span id="invPeriod">—</span></div>
          </div>
        </div>
        <div class="inv-divider"></div>
        <div class="inv-grid">
          <div class="bill-to">
            <div class="inv-section-title">Bill To</div>
            <strong id="billToName">—</strong>
          </div>
          <div class="bank-box">
            <div class="inv-section-title">Banking Details</div>
            <div class="bank-row"><span>Bank Name</span><span id="bankNameDisplay">—</span></div>
            <div class="bank-row"><span>Account Title</span><span id="accountTitleDisplay">—</span></div>
            <div class="bank-row"><span>Account Number</span><span id="accountNumberDisplay">—</span></div>
            <div class="bank-row"><span>IBAN / Routing</span><span id="routingDisplay">—</span></div>
          </div>
        </div>
        <div class="inv-summary">
          <div class="inv-stat">
            <div class="inv-stat-label">Quantity</div>
            <div class="inv-stat-value teal" id="invStatCalls">0</div>
            <div class="inv-stat-sub">For this billing period</div>
          </div>
          <div class="inv-stat">
            <div class="inv-stat-label">Total Amount</div>
            <div class="inv-stat-value gold" id="invStatAmount">$0.00</div>
            <div class="inv-stat-sub">Amount due</div>
          </div>
        </div>
        <div class="inv-line-item">
          <div class="inv-line-head">
            <span>Description</span>
            <span>Qty</span>
            <span>Amount</span>
          </div>
          <div class="inv-line-body">
            <span class="inv-line-desc"><span id="invLineDesc">Auto</span><small id="invLinePeriod">—</small></span>
            <span id="invLineCalls">0</span>
            <span id="invLineAmount">$0.00</span>
          </div>
        </div>
        <div class="inv-totals">
          <div class="totals-box">
            <div class="total-row"><span>Subtotal</span><span id="invSubtotal">$0.00</span></div>
            <div class="total-final">
              <span>Total Due</span>
              <div class="total-badge" id="invTotal">$0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  /* ---------- Expose handlers used by inline onclick/onchange ---------- */
  window.doLogin = doLogin;
  window.doLogout = doLogout;
  window.doRefresh = doRefresh;
  window.switchTab = switchTab;
  window.toggleExtra = toggleExtra;
  window.clearFilters = clearFilters;
  window.applyFilters = applyFilters;
  window.exportCSV = exportCSV;
  window.openInvoiceModal = openInvoiceModal;
  window.closeInvoiceModal = closeInvoiceModal;
  window.printInvoice = printInvoice;
  window.downloadPDF = downloadPDF;
  window.generateInvoice = generateInvoice;
  window.onAnRange = onAnRange;
  window.clearAnalyticsFilters = clearAnalyticsFilters;
  window.renderAnalytics = renderAnalytics;
  checkLogin();
})();
