(function () {
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
:root{--bg:#0d1110;--surface:#161b19;--surface2:#1c221f;--surface3:#222925;--border:#2a322e;--border-soft:#343c38;--text:#eef1ef;--muted:#7d8782;--accent:#3d9a9a;--accent-soft:rgba(61,154,154,.15);--accent-h:#348585;--gold:#e8b84a;--danger:#e05c5c;--radius:16px;--radius-sm:10px;--shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.25);--inv-primary:#548888;--inv-bg:#f8fafa;--inv-text:#1e293b;--inv-muted:#64748b;--inv-border:#e2e8f0;--chart-line:#8b7cf6;--chart-fill:rgba(139,124,246,.12)}
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
.inv-modal{position:fixed;inset:0;z-index:1000;display:none;overflow-y:auto;background:rgba(15,23,42,.6);backdrop-filter:blur(4px)}
.inv-modal.open{display:block}
.inv-panel{max-width:900px;margin:2rem auto;background:#fff;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,.35);overflow:hidden}
.inv-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid var(--inv-border);background:#fafbfc}
.inv-toolbar h2{font-size:16px;font-weight:600;color:var(--inv-text)}
.inv-actions{display:flex;gap:10px}
.btn-print{display:inline-flex;align-items:center;gap:7px;background:var(--inv-primary);color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border:none;border-radius:8px;cursor:pointer}
.btn-print:hover{background:#467373}
.btn-pdf{display:inline-flex;align-items:center;gap:7px;background:#1e293b;color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border:none;border-radius:8px;cursor:pointer}
.btn-pdf:hover{background:#0f172a}
.btn-close-inv{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--inv-border);border-radius:8px;color:var(--inv-muted);cursor:pointer;font-size:18px}
.btn-close-inv:hover{background:#f1f5f9;color:var(--inv-text)}
.inv-body{padding:40px 44px;color:var(--inv-text);font-family:'Inter',system-ui,sans-serif;background:#ffffff}
.inv-header{display:flex;justify-content:space-between;gap:32px;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--inv-border)}
.inv-brand{display:flex;gap:16px;align-items:center}
.inv-logo{width:56px;height:56px;border-radius:10px;background:var(--inv-bg);border:1px solid var(--inv-border);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
.inv-logo img{height:36px;width:auto;object-fit:contain}
.inv-company h1{font-size:20px;font-weight:700;color:var(--inv-primary)}
.inv-company .tagline{font-size:13px;color:var(--inv-muted);margin-top:2px}
.inv-meta{text-align:right}
.inv-badge{display:inline-block;background:var(--inv-primary);color:#fff;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:6px;margin-bottom:12px}
.inv-meta-row{display:flex;justify-content:flex-end;gap:16px;font-size:13px;margin-bottom:4px}
.inv-meta-row span:first-child{color:var(--inv-muted)}
.inv-meta-row span:last-child{font-weight:600;color:var(--inv-text)}
.inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px}
@media(max-width:640px){.inv-grid{grid-template-columns:1fr}.inv-header{flex-direction:column}.inv-meta{text-align:left}.inv-meta-row{justify-content:flex-start}}
.inv-section-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--inv-muted);margin-bottom:10px}
.bill-to strong{font-size:14px;font-weight:600;color:var(--inv-text)}
.bank-box{background:var(--inv-bg);border:1px solid var(--inv-border);border-radius:12px;padding:16px 18px}
.bank-box .inv-section-title{color:var(--inv-primary)}
.bank-row{display:flex;justify-content:space-between;gap:12px;font-size:13px;margin-bottom:6px}
.bank-row:last-child{margin-bottom:0}
.bank-row span:first-child{color:var(--inv-muted)}
.bank-row span:last-child{font-weight:500;color:var(--inv-text);text-align:right;font-variant-numeric:tabular-nums}
.inv-table-wrap{margin-bottom:28px;border:1px solid var(--inv-border);border-radius:10px;overflow:hidden}
.inv-table{width:100%;border-collapse:collapse;font-size:13px}
.inv-table thead tr{background:var(--inv-primary)}
.inv-table th{padding:11px 16px;text-align:left;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#fff}
.inv-table th:nth-child(4),.inv-table th:nth-child(5){text-align:right}
.inv-table tbody tr:nth-child(even){background:var(--inv-bg)}
.inv-table td{padding:12px 16px;color:var(--inv-text);border-top:1px solid var(--inv-border)}
.inv-table td:nth-child(4),.inv-table td:nth-child(5){text-align:right;font-variant-numeric:tabular-nums}
.inv-table td.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
.inv-totals{display:flex;justify-content:flex-end;margin-bottom:20px}
.totals-box{width:260px}
.total-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px}
.total-row span:first-child{color:var(--inv-muted)}
.total-row span:last-child{font-weight:500}
.total-final{border-top:1px solid var(--inv-border);padding-top:12px;margin-top:8px;display:flex;justify-content:space-between;align-items:center}
.total-final span:first-child{font-size:13px;font-weight:600;color:var(--inv-text)}
.total-badge{background:var(--inv-primary);color:#fff;font-size:15px;font-weight:700;padding:6px 14px;border-radius:8px}
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
  @page{size:A4;margin:12mm 14mm}
  tr{page-break-inside:avoid}
}
`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Chart.js
  const chartScript = document.createElement("script");
  chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
  document.head.appendChild(chartScript);

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
      longSub.textContent = `${longest.ani || "—"} · ${(longest.state || "—").toString().toUpperCase()}`;
    } else {
      longEl.innerHTML = '— <span class="unit">sec</span>';
      longSub.textContent = "No data";
    }
    if (shortest) {
      shortEl.innerHTML = Math.round(Number(shortest.call_duration_sec)) + ' <span class="unit">sec</span>';
      shortSub.textContent = `${shortest.ani || "—"} · ${(shortest.state || "—").toString().toUpperCase()}`;
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
          borderColor: "#8b7cf6",
          backgroundColor: "rgba(139,124,246,0.12)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#8b7cf6",
          pointBorderColor: "#161b19",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: "#a78bfa",
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
    const tbody = document.getElementById("invoiceTableBody");
    tbody.innerHTML = "";
    const now = new Date();
    const invDate = formatDate(now);
    const invNum = `INV-${y}${String(m).padStart(2, "0")}-${invRand || 1000}`;
    document.getElementById("invNumber").textContent = invNum;
    document.getElementById("invDate").textContent = invDate;
    document.getElementById("invTotalCalls").textContent = filtered.length;
    document.getElementById("invPeriod").textContent = start.toLocaleString("en-US", { month: "long", year: "numeric" });
    document.getElementById("billToName").textContent = buyer;
    document.getElementById("bankNameDisplay").textContent = bankName;
    document.getElementById("accountTitleDisplay").textContent = accountTitle;
    document.getElementById("accountNumberDisplay").textContent = accountNumber;
    document.getElementById("routingDisplay").textContent = routing;
    let subtotal = 0;
    filtered.forEach(call => {
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
    const element = document.getElementById("invoicePrintArea");
    if (!element) {
      alert("Invoice content not found");
      return;
    }
    const modal = document.getElementById("invoiceModal");
    const wasHidden = !modal.classList.contains("open");
    if (wasHidden) {
      modal.classList.add("open");
    }
    const opt = {
      margin: [8, 8, 8, 8],
      filename: (document.getElementById("invNumber").textContent || "invoice") + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        if (wasHidden) {
          modal.classList.remove("open");
        }
      })
      .catch(err => {
        console.error("PDF Error:", err);
        alert("Failed to generate PDF. Please try Print instead.");
      });
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
          <div class="chart-title">Daily Payout Trend</div>
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
            <div class="inv-meta-row"><span>Total Calls</span><span id="invTotalCalls">0</span></div>
            <div class="inv-meta-row"><span>Billing Period</span><span id="invPeriod">—</span></div>
          </div>
        </div>
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
