(function () {
  // ========== INJECT ALL CSS ==========
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
:root{
  --bg:#0d1110;--surface:#161b19;--surface2:#1c221f;--surface3:#222925;
  --border:#2a322e;--border-soft:#343c38;--text:#eef1ef;--muted:#7d8782;
  --accent:#3d9a9a;--accent-soft:rgba(61,154,154,.15);--accent-h:#348585;
  --gold:#e8b84a;--danger:#e05c5c;--radius:16px;--radius-sm:10px;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.25);
  --inv-primary:#548888;--inv-bg:#f8fafa;--inv-text:#1e293b;--inv-muted:#64748b;--inv-border:#e2e8f0;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
#root{min-height:100vh}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow)}
.metric{background:linear-gradient(165deg,var(--surface2) 0%,var(--surface) 100%);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem 1.35rem;transition:border-color .2s}
.metric:hover{border-color:var(--border-soft)}
.metric-label{font-size:11px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.metric-value{font-size:1.75rem;font-weight:700;letter-spacing:-0.03em;line-height:1.15}
.metric-value .unit{font-size:12px;font-weight:500;color:var(--muted);margin-left:3px}
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
.payout-hidden{filter:blur(7px);transition:filter .25s ease;cursor:pointer;user-select:none}
.payout-hidden:hover{filter:blur(0)}
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

/* Invoice Modal */
.inv-modal{position:fixed;inset:0;z-index:1000;display:none;overflow-y:auto;background:rgba(15,23,42,.6);backdrop-filter:blur(4px)}
.inv-modal.open{display:block}
.inv-panel{max-width:900px;margin:2rem auto;background:#fff;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,.35);overflow:hidden}
.inv-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid var(--inv-border);background:#fafbfc}
.inv-toolbar h2{font-size:16px;font-weight:600;color:var(--inv-text)}
.inv-actions{display:flex;gap:10px}
.btn-print{display:inline-flex;align-items:center;gap:7px;background:var(--inv-primary);color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border:none;border-radius:8px;cursor:pointer}
.btn-print:hover{background:#467373}
.btn-close-inv{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--inv-border);border-radius:8px;color:var(--inv-muted);cursor:pointer;font-size:18px}
.btn-close-inv:hover{background:#f1f5f9;color:var(--inv-text)}
.inv-body{padding:40px 44px;color:var(--inv-text);font-family:'Inter',system-ui,sans-serif}
.inv-header{display:flex;justify-content:space-between;gap:32px;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--inv-border)}
.inv-brand{display:flex;gap:16px}
.inv-logo{width:56px;height:56px;border-radius:10px;background:var(--inv-bg);border:1px solid var(--inv-border);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
.inv-logo img{height:36px;width:auto;object-fit:contain}
.inv-company h1{font-size:20px;font-weight:700;color:var(--inv-primary)}
.inv-company .tagline{font-size:13px;color:var(--inv-muted);margin-top:2px}
.inv-company .address{font-size:12px;color:var(--inv-muted);line-height:1.55;margin-top:10px}
.inv-meta{text-align:right}
.inv-badge{display:inline-block;background:var(--inv-primary);color:#fff;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:6px;margin-bottom:12px}
.inv-meta-row{display:flex;justify-content:flex-end;gap:16px;font-size:13px;margin-bottom:4px}
.inv-meta-row span:first-child{color:var(--inv-muted)}
.inv-meta-row span:last-child{font-weight:600;color:var(--inv-text)}
.inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px}
@media(max-width:640px){.inv-grid{grid-template-columns:1fr}.inv-header{flex-direction:column}.inv-meta{text-align:left}.inv-meta-row{justify-content:flex-start}}
.inv-section-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--inv-muted);margin-bottom:10px}
.bill-to strong{font-size:14px;font-weight:600;color:var(--inv-text)}
.bill-to p{font-size:13px;color:var(--inv-muted);line-height:1.55;margin-top:4px}
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
.inv-totals{display:flex;justify-content:flex-end;margin-bottom:36px}
.totals-box{width:260px}
.total-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px}
.total-row span:first-child{color:var(--inv-muted)}
.total-row span:last-child{font-weight:500}
.total-final{border-top:1px solid var(--inv-border);padding-top:12px;margin-top:8px;display:flex;justify-content:space-between;align-items:center}
.total-final span:first-child{font-size:13px;font-weight:600;color:var(--inv-text)}
.total-badge{background:var(--inv-primary);color:#fff;font-size:15px;font-weight:700;padding:6px 14px;border-radius:8px}
.inv-sign{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding-top:24px;border-top:1px solid var(--inv-border)}
@media(max-width:640px){.inv-sign{grid-template-columns:1fr}}
.sign-block p.label{font-size:11px;color:var(--inv-muted);margin-bottom:36px}
.sign-line{width:180px;border-bottom:1px solid #cbd5e1;margin-bottom:8px}
.sign-block .name{font-size:13px;font-weight:600;color:var(--inv-text)}
.sign-block .role{font-size:12px;color:var(--inv-muted)}
.inv-footer{margin-top:36px;text-align:center;font-size:11px;color:#94a3b8;line-height:1.5}
@media print{
  body *{visibility:hidden!important}
  .inv-modal,.inv-modal *{visibility:visible!important}
  .inv-modal{position:absolute!important;left:0!important;top:0!important;width:100%!important;background:white!important;overflow:visible!important}
  .inv-toolbar{display:none!important}
  .inv-panel{box-shadow:none!important;border-radius:0!important;margin:0!important;max-width:none!important}
  .inv-body{padding:0!important}
  @page{size:A4;margin:12mm 14mm}
  tr{page-break-inside:avoid}
}
`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ========== ORIGINAL CRM LOGIC + INVOICE ==========
  const _0x2a1b = [
    "https://script.google.com/macros/s/AKfycbw7CBJksXRQFzwTvwCWUKfp-S_1BUUNfo4c4y-22emeX81jRa0PRHkiiJ8lFwRQpMAqVA/exec",
    "vtm_logged_in","true","hidden","getCalls","getMonthly","login","password","refresh","action",
    "success","data","message","Network error","Sign in...","Sign In","Incorrect password",
    "0","$0.00","all","billable","nonbillable","record","s","Billable","Non-billable",
    "Unknown","No data yet","No data to export","dts","ani","state","call_duration_sec","payout","status",
    "vtm-calls-",".csv","text/csv;charset=utf-8;","Error: ","Failed: ","Refreshing...","Refresh",
    "See more","See less","open","rotated"
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
    return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
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
              rd = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
            }
          }
        }
        if (fr && rd < fr) return false;
        if (to && rd > to) return false;
      }
      const po = Number(r.payout) || 0;
      if (st === _0x(20) && po <= 0) return false;
      if (st === _0x(21) && po > 0) return false;
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
    document.getElementById("ai").value = _0x(19);
    _0x1b9e();
  }

  function _0x9d4e(rows) {
    if (!rows || !rows.length) {
      document.getElementById("a9").textContent = _0x(17);
      document.getElementById("aa").textContent = _0x(18);
      document.getElementById("ab").innerHTML = _0x(17) + ' <span class="unit">sec</span>';
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
    document.getElementById("ab").innerHTML = Math.round(td / rows.length) + ' <span class="unit">sec</span>';
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
    rc.textContent = rows.length ? `${rows.length} ${_0x(22)}${rows.length !== 1 ? _0x(23) : ""}` : "";
    if (!rows || !rows.length) {
      nd.classList.remove(_0x(3));
      return;
    }
    nd.classList.add(_0x(3));
    rows.forEach(r => {
      const p = Number(r.payout) || 0;
      const st = p > 0
        ? `<span class="status-billable">${_0x(24)}</span>`
        : `<span class="status-non">${_0x(25)}</span>`;
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
      const st = ((c.state || _0x(26)).toString().trim().toUpperCase()) || _0x(26);
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
      tb.innerHTML = `<tr><td colspan="4" class="text-center py-8" style="color:var(--muted)">${_0x(27)}</td></tr>`;
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
      el.classList.add(_0x(44));
      txt.textContent = _0x(43);
      ch.classList.add(_0x(45));
    } else {
      el.classList.remove(_0x(44));
      txt.textContent = _0x(42);
      ch.classList.remove(_0x(45));
    }
  }

  async function _0x3e7b() {
    const btn = document.getElementById("a7");
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> ${_0x(40)}`;
    try {
      const res = await _0x3b9a(_0x(8));
      if (res[_0x(10)]) await _0x0c4e();
      else alert(_0x(39) + res[_0x(12)]);
    } catch (e) {
      alert(_0x(38) + e.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> ${_0x(41)}`;
    }
  }

  function _0x2f8a() {
    const rows = _0x0e5f();
    if (!rows.length) {
      alert(_0x(28));
      return;
    }
    const headers = [_0x(29), _0x(30), _0x(31), _0x(32), _0x(33), _0x(34)];
    const csvRows = rows.map(r => {
      const p = Number(r.payout) || 0;
      const st = p > 0 ? _0x(24) : _0x(25);
      const exact = _0x1a7c(r.dts);
      const dts = exact === "—" ? "" : "\t" + exact;
      return [dts, r.ani || "", r.state || "", r.call_duration_sec || "", p.toFixed(2), st]
        .map(v => {
          const s = String(v);
          return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
        }).join(",");
    });
    const csv = [headers.join(",")].concat(csvRows).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: _0x(37) });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = _0x(35) + new Date().toISOString().slice(0, 10) + _0x(36);
    a.click();
    URL.revokeObjectURL(url);
  }

  // ========== INVOICE ==========
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

    const dates = calls.map(c => {
      const d = new Date(c.dts);
      return isNaN(d.getTime()) ? null : d;
    }).filter(Boolean).sort((a, b) => a - b);

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
  window.printInvoice = function () { window.print(); };

  window.openInvoiceFromCurrentFilter = function () {
    const rows = _0x0e5f().filter(r => Number(r.payout) > 0);
    openInvoiceModal(rows);
  };

  // ========== BUILD UI ==========
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
            <thead><tr>
              <th>Timestamp</th><th>ANI</th><th>State</th><th>Duration</th><th>Payout</th><th>Status</th>
            </tr></thead>
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
            <thead><tr><th>State</th><th>Calls</th><th>Total Payout</th><th>Average Bid</th></tr></thead>
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
            <thead><tr><th>Month</th><th>Total Payout</th><th>Total Calls</th></tr></thead>
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
              <th>Timestamp</th><th>Phone Number</th><th>State</th><th>Duration</th><th>Payout</th>
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

  // Make functions global so onclick works
  window._0x4f2a = _0x4f2a;
  window._0x9a2f = _0x9a2f;
  window._0x3e7b = _0x3e7b;
  window._0x8c1d = _0x8c1d;
  window._0xToggleExtra = _0xToggleExtra;
  window._0x7d4c = _0x7d4c;
  window._0x1b9e = _0x1b9e;
  window._0x2f8a = _0x2f8a;

  _0x6d3f();
})();
