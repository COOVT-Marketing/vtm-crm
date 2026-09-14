(function(){
const _0x2a1b=["https://script.google.com/macros/s/AKfycbw7CBJksXRQFzwTvwCWUKfp-S_1BUUNfo4c4y-22emeX81jRa0PRHkiiJ8lFwRQpMAqVA/exec","vtm_logged_in","true","root","hidden","getCalls","getMonthly","login","password","refresh","action","success","data","message","Network error","Sign in...","Sign In","Incorrect password","Overview","Analytics","Total Calls","Total Payout","Avg Duration","Avg Payout","Lowest Bid","Highest Bid","See more","See less","Search","From","To","Status","All","Billable","Non-billable","Clear","Export CSV","Generate Invoice","Call Details","No calls match the current filters","State Summary","Calls, total payout and average bid per state","Monthly Summary","Unknown","No data yet","No data to export","dts","ani","state","call_duration_sec","payout","status","vtm-calls-",".csv","text/csv;charset=utf-8;","Error: ","Failed: ","Refreshing...","Refresh","open","rotated","record","s","Billable","Non-billable","createElement","div","className","id","textContent","innerHTML","appendChild","addEventListener","click","getElementById","querySelector","classList","add","remove","toggle","style","display","none","block","flex","min-h-screen","items-center","justify-center","p-5","login-card","fade-in","text-center","mb-8","mx-auto","h-12","w-auto","mb-5","opacity-95","text-xl","font-bold","tracking-tight","text-sm","mt-1.5","w-full","px-4","py-3.5","mb-4","btn","btn-primary","py-3.5","input-dark","type","password","placeholder","Enter password","onkeypress","value","disabled","localStorage","getItem","setItem","removeItem","setInterval","clearInterval","URL","searchParams","set","forEach","fetch","ok","json","Promise","all","filter","map","sort","length","toFixed","padStart","toLowerCase","trim","includes","match","getFullYear","getMonth","getDate","getHours","getMinutes","getSeconds","getTime","isNaN","Number","String","Math","round","floor","random","abs","toISOString","slice","replace","join","concat","createObjectURL","revokeObjectURL","download","href","Blob","FEFF","body","overflow","openInvoiceModal","closeInvoiceModal","printInvoice","invoiceModal","invoiceTableBody","invNumber","invDate","invDueDate","invPeriod","invSubtotal","invAdjustments","invTotal","billToName","billToAddress","No calls selected for invoicing.","INV-","$0.00","+","-","$","s","mono","toUpperCase","call_duration_sec","payout","dts","ani","state"];

const _0x1c=function(i){return _0x2a1b[i];};

let _0x5c3d=[],_0x9e2f=[],_0x7b1a=null,_0xextraOpen=false;
const _0x4e8c=_0x1c(0);

function _0x6d3f(){
  if(localStorage[_0x1c(0x5e)](_0x1c(1))===_0x1c(2)){
    document[_0x1c(0x4a)]("a0")[_0x1c(0x4c)][_0x1c(0x4d)](_0x1c(4));
    document[_0x1c(0x4a)]("a4")[_0x1c(0x4c)][_0x1c(0x4e)](_0x1c(4));
    _0x0c4e();
    _0x7b1a=setInterval(_0x0c4e,6e4);
  }
}

function _0x1a7c(v){
  if(v==null||v==="")return"—";
  const s=String(v)[_0x1c(0x6a)]();
  if(!s)return"—";
  if(/^\d{4}-\d{2}-\d{2}/.test(s))return s;
  const d=new Date(s);
  if(isNaN(d[_0x1c(0x74)]()))return s;
  const p=n=>String(n)[_0x1c(0x68)](2,"0");
  return `${d[_0x1c(0x6e)]()}-${p(d[_0x1c(0x6f)]()+1)}-${p(d[_0x1c(0x70)]())} ${p(d[_0x1c(0x71)]())}:${p(d[_0x1c(0x72)]())}:${p(d[_0x1c(0x73)]())}`;
}

async function _0x3b9a(a,p={}){
  const u=new URL(_0x4e8c);
  u[_0x1c(0x62)][_0x1c(0x63)](_0x1c(10),a);
  Object.keys(p)[_0x1c(0x64)](k=>u[_0x1c(0x62)][_0x1c(0x63)](k,p[k]));
  const r=await fetch(u.toString());
  if(!r[_0x1c(0x66)])throw new Error(_0x1c(14));
  return await r[_0x1c(0x67)]();
}

async function _0x4f2a(){
  const pwd=document[_0x1c(0x4a)]("a1")[_0x1c(0x5c)];
  const btn=document[_0x1c(0x4a)]("a2");
  btn[_0x1c(0x5d)]=true;
  btn[_0x1c(0x45)]=_0x1c(15);
  try{
    const res=await _0x3b9a(_0x1c(7),{[_0x1c(8)]:pwd});
    if(res[_0x1c(11)]){
      localStorage[_0x1c(0x5f)](_0x1c(1),_0x1c(2));
      document[_0x1c(0x4a)]("a0")[_0x1c(0x4c)][_0x1c(0x4d)](_0x1c(4));
      document[_0x1c(0x4a)]("a4")[_0x1c(0x4c)][_0x1c(0x4e)](_0x1c(4));
      _0x0c4e();
      _0x7b1a=setInterval(_0x0c4e,6e4);
    }else{
      document[_0x1c(0x4a)]("a3")[_0x1c(0x4c)][_0x1c(0x4e)](_0x1c(4));
    }
  }catch(e){
    alert(_0x1c(17)+e.message);
  }finally{
    btn[_0x1c(0x5d)]=false;
    btn[_0x1c(0x45)]=_0x1c(16);
  }
}

function _0x9a2f(){
  if(_0x7b1a)clearInterval(_0x7b1a);
  localStorage[_0x1c(0x60)](_0x1c(1));
  document[_0x1c(0x4a)]("a4")[_0x1c(0x4c)][_0x1c(0x4d)](_0x1c(4));
  document[_0x1c(0x4a)]("a0")[_0x1c(0x4c)][_0x1c(0x4e)](_0x1c(4));
  document[_0x1c(0x4a)]("a1")[_0x1c(0x5c)]="";
  document[_0x1c(0x4a)]("a3")[_0x1c(0x4c)][_0x1c(0x4d)](_0x1c(4));
}

async function _0x0c4e(){
  try{
    const[c,m]=await Promise[_0x1c(0x69)]([_0x3b9a(_0x1c(5)),_0x3b9a(_0x1c(6))]);
    _0x5c3d=c[_0x1c(12)]||[];
    _0x9e2f=m[_0x1c(12)]||[];
    _0x1b9e();
    _0x5f2d(_0x9e2f);
    if(!document[_0x1c(0x4a)]("am")[_0x1c(0x4c)][_0x1c(0x4f)](_0x1c(4))){
      _0x8e1a();
      _0x4c7b();
    }
  }catch(e){console.error(e);}
}

function _0x0e5f(){
  const q=(document[_0x1c(0x4a)]("af")[_0x1c(0x5c)]||"")[_0x1c(0x6b)]()[_0x1c(0x6a)]();
  const fr=document[_0x1c(0x4a)]("ag")[_0x1c(0x5c)];
  const to=document[_0x1c(0x4a)]("ah")[_0x1c(0x5c)];
  const st=document[_0x1c(0x4a)]("ai")[_0x1c(0x5c)];
  return _0x5c3d[_0x1c(0x6a)](r=>{
    if(q){
      const h=`${r.ani||""} ${r.state||""} ${r.dts||""}`[_0x1c(0x6b)]();
      if(!h[_0x1c(0x6c)](q))return false;
    }
    if(fr||to){
      let rd="";
      if(r.dts){
        const m=String(r.dts)[_0x1c(0x6d)](/(\d{4})-(\d{2})-(\d{2})/);
        if(m)rd=m[0];
        else{
          const d=new Date(r.dts);
          if(!isNaN(d[_0x1c(0x74)]())){
            const p=n=>String(n)[_0x1c(0x68)](2,"0");
            rd=`${d[_0x1c(0x6e)]()}-${p(d[_0x1c(0x6f)]()+1)}-${p(d[_0x1c(0x70)]())}`;
          }
        }
      }
      if(fr&&rd<fr)return false;
      if(to&&rd>to)return false;
    }
    const po=Number(r.payout)||0;
    if(st==="billable"&&po<=0)return false;
    if(st==="nonbillable"&&po>0)return false;
    return true;
  });
}

function _0x1b9e(){
  const f=_0x0e5f();
  _0x6a2c(f);
  _0x9d4e(f);
}

function _0x7d4c(){
  document[_0x1c(0x4a)]("af")[_0x1c(0x5c)]="";
  document[_0x1c(0x4a)]("ag")[_0x1c(0x5c)]="";
  document[_0x1c(0x4a)]("ah")[_0x1c(0x5c)]="";
  document[_0x1c(0x4a)]("ai")[_0x1c(0x5c)]="all";
  _0x1b9e();
}

function _0x9d4e(rows){
  if(!rows||!rows[_0x1c(0x6e)]){
    document[_0x1c(0x4a)]("a9")[_0x1c(0x45)]="0";
    document[_0x1c(0x4a)]("aa")[_0x1c(0x45)]="$0.00";
    document[_0x1c(0x4a)]("ab")[_0x1c(0x46)]="0 <span class=\"unit\">sec</span>";
    document[_0x1c(0x4a)]("ac")[_0x1c(0x45)]="$0.00";
    document[_0x1c(0x4a)]("ad")[_0x1c(0x45)]="$0.00";
    document[_0x1c(0x4a)]("ae")[_0x1c(0x45)]="$0.00";
    return;
  }
  let tp=0,td=0,lo=Infinity,hi=-Infinity;
  rows[_0x1c(0x64)](c=>{
    const p=Number(c.payout)||0;
    tp+=p;
    td+=Number(c.call_duration_sec)||0;
    if(p>0){if(p<lo)lo=p;if(p>hi)hi=p;}
  });
  document[_0x1c(0x4a)]("a9")[_0x1c(0x45)]=rows[_0x1c(0x6e)];
  document[_0x1c(0x4a)]("aa")[_0x1c(0x45)]="$"+tp[_0x1c(0x67)](2);
  document[_0x1c(0x4a)]("ab")[_0x1c(0x46)]=Math[_0x1c(0x77)](td/rows[_0x1c(0x6e)])+" <span class=\"unit\">sec</span>";
  document[_0x1c(0x4a)]("ac")[_0x1c(0x45)]="$"+(tp/rows[_0x1c(0x6e)])[_0x1c(0x67)](2);
  document[_0x1c(0x4a)]("ad")[_0x1c(0x45)]=lo===Infinity?"$0.00":"$"+lo[_0x1c(0x67)](2);
  document[_0x1c(0x4a)]("ae")[_0x1c(0x45)]=hi===-Infinity?"$0.00":"$"+hi[_0x1c(0x67)](2);
}

function _0x4c7b(){
  let b=0,n=0;
  _0x5c3d[_0x1c(0x64)](c=>{if(Number(c.payout)>0)b++;else n++;});
  document[_0x1c(0x4a)]("an")[_0x1c(0x45)]=_0x5c3d[_0x1c(0x6e)];
  document[_0x1c(0x4a)]("ao")[_0x1c(0x45)]=b;
  document[_0x1c(0x4a)]("ap")[_0x1c(0x45)]=n;
}

function _0x6a2c(rows){
  const tb=document[_0x1c(0x4a)]("ak");
  const nd=document[_0x1c(0x4a)]("al");
  const rc=document[_0x1c(0x4a)]("aj");
  tb[_0x1c(0x46)]="";
  rc[_0x1c(0x45)]=rows[_0x1c(0x6e)]?`${rows[_0x1c(0x6e)]} record${rows[_0x1c(0x6e)]!==1?"s":""}`:"";
  if(!rows||!rows[_0x1c(0x6e)]){nd[_0x1c(0x4c)][_0x1c(0x4e)](_0x1c(4));return;}
  nd[_0x1c(0x4c)][_0x1c(0x4d)](_0x1c(4));
  rows[_0x1c(0x64)](r=>{
    const p=Number(r.payout)||0;
    const st=p>0?`<span class="status-billable">Billable</span>`:`<span class="status-non">Non-billable</span>`;
    const tr=document[_0x1c(0x41)]("tr");
    tr[_0x1c(0x46)]=`<td style="color:var(--muted)">${_0x1a7c(r.dts)}</td><td class="font-mono">${r.ani||"—"}</td><td style="color:var(--muted)">${r.state||"—"}</td><td style="color:var(--muted)">${r.call_duration_sec||"—"}s</td><td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${p[_0x1c(0x67)](2)}</span></td><td>${st}</td>`;
    tb[_0x1c(0x47)](tr);
  });
}

function _0x5f2d(rows){
  const tb=document[_0x1c(0x4a)]("ar");
  tb[_0x1c(0x46)]="";
  (rows||[])[_0x1c(0x64)](r=>{
    let m=(r.month||"")[_0x1c(0x75)]()[_0x1c(0x6a)]();
    if(m[_0x1c(0x6e)]>7){
      const mt=m[_0x1c(0x6d)](/(\d{4})-(\d{2})/);
      if(mt)m=mt[0];
      else{
        const d=new Date(m);
        if(!isNaN(d[_0x1c(0x74)]())){
          const p=n=>String(n)[_0x1c(0x68)](2,"0");
          m=`${d[_0x1c(0x6e)]()}-${p(d[_0x1c(0x6f)]()+1)}`;
        }
      }
    }
    const tr=document[_0x1c(0x41)]("tr");
    tr[_0x1c(0x46)]=`<td>${m||"—"}</td><td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${Number(r.total_payout||0)[_0x1c(0x67)](2)}</span></td><td style="color:var(--muted)">${r.total_calls||"—"}</td>`;
    tb[_0x1c(0x47)](tr);
  });
}

function _0x2d8e(){
  const s={};
  _0x5c3d[_0x1c(0x64)](c=>{
    const st=((c.state||"Unknown")[_0x1c(0x75)]()[_0x1c(0x6a)]()[_0x1c(0x7e)]())||"Unknown";
    if(!s[st])s[st]={c:0,t:0};
    s[st].c++;
    s[st].t+=Number(c.payout)||0;
  });
  return Object.keys(s)[_0x1c(0x6b)](k=>({state:k,calls:s[k].c,totalPayout:s[k].t,avgBid:s[k].c?s[k].t/s[k].c:0}))[_0x1c(0x6c)]((a,b)=>b.avgBid-a.avgBid);
}

function _0x8e1a(){
  const st=_0x2d8e();
  const tb=document[_0x1c(0x4a)]("aq");
  tb[_0x1c(0x46)]="";
  if(!st[_0x1c(0x6e)]){
    tb[_0x1c(0x46)]=`<tr><td colspan="4" class="text-center py-8" style="color:var(--muted)">No data yet</td></tr>`;
    return;
  }
  st[_0x1c(0x64)](s=>{
    const tr=document[_0x1c(0x41)]("tr");
    tr[_0x1c(0x46)]=`<td class="font-medium">${s.state}</td><td style="color:var(--muted)">${s.calls}</td><td><span class="payout-hidden" style="color:var(--gold)">$${s.totalPayout[_0x1c(0x67)](2)}</span></td><td class="font-medium"><span class="payout-hidden" style="color:var(--gold)">$${s.avgBid[_0x1c(0x67)](2)}</span></td>`;
    tb[_0x1c(0x47)](tr);
  });
}

function _0x8c1d(p){
  document[_0x1c(0x4a)]("a8")[_0x1c(0x4c)][_0x1c(0x4f)](_0x1c(4),p!=="o");
  document[_0x1c(0x4a)]("am")[_0x1c(0x4c)][_0x1c(0x4f)](_0x1c(4),p!=="a");
  document[_0x1c(0x4a)]("a5")[_0x1c(0x4c)][_0x1c(0x4f)]("active",p==="o");
  document[_0x1c(0x4a)]("a6")[_0x1c(0x4c)][_0x1c(0x4f)]("active",p==="a");
  if(p==="a"){_0x8e1a();_0x4c7b();}
}

function _0xToggleExtra(){
  _0xextraOpen=!_0xextraOpen;
  const el=document[_0x1c(0x4a)]("aExtra");
  const txt=document[_0x1c(0x4a)]("aToggleText");
  const ch=document[_0x1c(0x4a)]("aChevron");
  if(_0xextraOpen){
    el[_0x1c(0x4c)][_0x1c(0x4d)]("open");
    txt[_0x1c(0x45)]="See less";
    ch[_0x1c(0x4c)][_0x1c(0x4d)]("rotated");
  }else{
    el[_0x1c(0x4c)][_0x1c(0x4e)]("open");
    txt[_0x1c(0x45)]="See more";
    ch[_0x1c(0x4c)][_0x1c(0x4e)]("rotated");
  }
}

async function _0x3e7b(){
  const btn=document[_0x1c(0x4a)]("a7");
  btn[_0x1c(0x5d)]=true;
  btn[_0x1c(0x46)]=`<svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> Refreshing...`;
  try{
    const res=await _0x3b9a("refresh");
    if(res[_0x1c(11)])await _0x0c4e();
    else alert("Failed: "+res[_0x1c(13)]);
  }catch(e){alert("Error: "+e.message);}
  finally{
    btn[_0x1c(0x5d)]=false;
    btn[_0x1c(0x46)]=`<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Refresh`;
  }
}

function _0x2f8a(){
  const rows=_0x0e5f();
  if(!rows[_0x1c(0x6e)]){alert("No data to export");return;}
  const headers=["dts","ani","state","call_duration_sec","payout","status"];
  const csvRows=rows[_0x1c(0x6b)](r=>{
    const p=Number(r.payout)||0;
    const st=p>0?"Billable":"Non-billable";
    const exact=_0x1a7c(r.dts);
    const dts=exact==="—"?"":"\t"+exact;
    return[dts,r.ani||"",r.state||"",r.call_duration_sec||"",p[_0x1c(0x67)](2),st][_0x1c(0x6b)](v=>{
      const s=String(v);
      return s[_0x1c(0x6c)](",")||s[_0x1c(0x6c)]('"')||s[_0x1c(0x6c)]("\n")?`"${s[_0x1c(0x7c)](/"/g,'""')}"`:s;
    })[_0x1c(0x7d)](",");
  });
  const csv=[headers[_0x1c(0x7d)](",")][_0x1c(0x7e)](csvRows)[_0x1c(0x7d)]("\n");
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
  const url=URL[_0x1c(0x7f)](blob);
  const a=document[_0x1c(0x41)]("a");
  a[_0x1c(0x81)]=url;
  a[_0x1c(0x80)]="vtm-calls-"+new Date()[_0x1c(0x7a)]()[_0x1c(0x7b)](0,10)+".csv";
  a[_0x1c(0x48)]("click");
  URL[_0x1c(0x7f)](url);
}

/* ========== INVOICE MODULE ========== */
function _0x2b8e(d){
  if(!(d instanceof Date)||isNaN(d))return"—";
  const p=n=>String(n)[_0x1c(0x68)](2,"0");
  return `${d[_0x1c(0x6e)]()}-${p(d[_0x1c(0x6f)]()+1)}-${p(d[_0x1c(0x70)]())}`;
}
function _0x3c1f(dts){
  if(!dts)return null;
  const d=new Date(dts);
  return isNaN(d[_0x1c(0x74)]())?null:d;
}
function _0x4d2a(dts){
  if(!dts)return"—";
  const d=new Date(dts);
  if(isNaN(d[_0x1c(0x74)]()))return String(dts);
  const p=n=>String(n)[_0x1c(0x68)](2,"0");
  return `${d[_0x1c(0x6e)]()}-${p(d[_0x1c(0x6f)]()+1)}-${p(d[_0x1c(0x70)]())} ${p(d[_0x1c(0x71)]())}:${p(d[_0x1c(0x72)]())}`;
}
function _0x5e3b(ani){
  if(!ani)return"—";
  const s=String(ani)[_0x1c(0x7c)](/\D/g,"");
  if(s[_0x1c(0x6e)]===10)return`(${s[_0x1c(0x7b)](0,3)}) ${s[_0x1c(0x7b)](3,6)}-${s[_0x1c(0x7b)](6)}`;
  if(s[_0x1c(0x6e)]===11&&s[0]==="1")return`+1 (${s[_0x1c(0x7b)](1,4)}) ${s[_0x1c(0x7b)](4,7)}-${s[_0x1c(0x7b)](7)}`;
  return ani;
}
function _0x6f4c(sec){
  const s=Number(sec)||0;
  if(s<60)return s+"s";
  const m=Math[_0x1c(0x78)](s/60);
  const r=s%60;
  return m+":"+String(r)[_0x1c(0x68)](2,"0");
}

window[_0x1c(0x84)]=function(calls,options={}){
  if(!Array.isArray(calls)||calls[_0x1c(0x6e)]===0){
    alert("No calls selected for invoicing.");
    return;
  }
  const tbody=document[_0x1c(0x4a)]("invoiceTableBody");
  tbody[_0x1c(0x46)]="";
  const now=new Date();
  const invDate=_0x2b8e(now);
  const dueDate=_0x2b8e(new Date(now.getTime()+15*24*60*60*1000));
  const invNum=options.invoiceNumber||("INV-"+now[_0x1c(0x6e)]()+"-"+String(now[_0x1c(0x6f)]()+1)[_0x1c(0x68)](2,"0")+String(now[_0x1c(0x70)]())[_0x1c(0x68)](2,"0")+"-"+String(Math[_0x1c(0x78)](Math[_0x1c(0x79)]()*9000)+1000));
  const dates=calls[_0x1c(0x6b)](c=>_0x3c1f(c.dts))[_0x1c(0x6a)](Boolean)[_0x1c(0x6c)]((a,b)=>a-b);
  let period="—";
  if(dates[_0x1c(0x6e)]){
    const first=_0x2b8e(dates[0]);
    const last=_0x2b8e(dates[dates[_0x1c(0x6e)]-1]);
    period=first===last?first:first+" – "+last;
  }
  document[_0x1c(0x4a)]("invNumber")[_0x1c(0x45)]=invNum;
  document[_0x1c(0x4a)]("invDate")[_0x1c(0x45)]=invDate;
  document[_0x1c(0x4a)]("invDueDate")[_0x1c(0x45)]=dueDate;
  document[_0x1c(0x4a)]("invPeriod")[_0x1c(0x45)]=period;
  if(options.billToName)document[_0x1c(0x4a)]("billToName")[_0x1c(0x45)]=options.billToName;
  if(options.billToAddress)document[_0x1c(0x4a)]("billToAddress")[_0x1c(0x46)]=options.billToAddress;
  let subtotal=0;
  calls[_0x1c(0x64)](call=>{
    const payout=Number(call.payout)||0;
    subtotal+=payout;
    const tr=document[_0x1c(0x41)]("tr");
    tr[_0x1c(0x46)]=`<td>${_0x4d2a(call.dts)}</td><td class="mono">${_0x5e3b(call.ani)}</td><td>${(call.state||"—")[_0x1c(0x75)]()[_0x1c(0x7e)]()}</td><td>${_0x6f4c(call.call_duration_sec)}</td><td>$${payout[_0x1c(0x67)](2)}</td>`;
    tbody[_0x1c(0x47)](tr);
  });
  const adjustments=Number(options.adjustments)||0;
  const total=subtotal+adjustments;
  document[_0x1c(0x4a)]("invSubtotal")[_0x1c(0x45)]="$"+subtotal[_0x1c(0x67)](2);
  document[_0x1c(0x4a)]("invAdjustments")[_0x1c(0x45)]=adjustments===0?"$0.00":(adjustments>0?"+$"+adjustments[_0x1c(0x67)](2):"-$"+Math[_0x1c(0x7a)](adjustments)[_0x1c(0x67)](2));
  document[_0x1c(0x4a)]("invTotal")[_0x1c(0x45)]="$"+total[_0x1c(0x67)](2);
  document[_0x1c(0x4a)]("invoiceModal")[_0x1c(0x4c)][_0x1c(0x4d)]("open");
  document[_0x1c(0x83)][_0x1c(0x50)][_0x1c(0x83)]="hidden";
};

window[_0x1c(0x85)]=function(){
  document[_0x1c(0x4a)]("invoiceModal")[_0x1c(0x4c)][_0x1c(0x4e)]("open");
  document[_0x1c(0x83)][_0x1c(0x50)][_0x1c(0x83)]="";
};
window[_0x1c(0x86)]=function(){window.print();};

function openInvoiceFromCurrentFilter(){
  const rows=_0x0e5f()[_0x1c(0x6a)](r=>Number(r.payout)>0);
  window[_0x1c(0x84)](rows);
}

/* ========== BUILD UI ========== */
const root=document[_0x1c(0x4a)]("root");

root[_0x1c(0x46)]=`
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
