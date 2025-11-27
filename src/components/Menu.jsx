import React, { useEffect, useMemo, useState } from "react";
import data from "../data/menu.json";

export default function Menu({cart, setCart, onProceed}){
  const [filter,setFilter]=useState("all");
  const [cat,setCat]=useState("all");
  const [justAdded,setJustAdded]=useState(null);
  const [query,setQuery]=useState("");
  const VegIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" strokeWidth="2">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      className="text-success"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="currentColor"
      className="text-success"
    />
  </svg>
);
const NonVegIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" strokeWidth="2">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      className="text-error"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="currentColor"
      className="text-error"
    />
  </svg>
);
  const categories=["all",...data.categories];
  const items=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return data.items.filter(i=>{
      const okF=filter==="all"||(filter==="veg"&&i.veg)||(filter==="nonveg"&&!i.veg);
      const okC=cat==="all"||i.category===cat;
      const okQ=!q||i.name.toLowerCase().includes(q);
      return okF&&okC&&okQ;
    });
  },[filter,cat,query]);

  const count=Object.values(cart).reduce((s,x)=>s+x,0);
  const total=items.reduce((s,i)=>s+(cart[i.id]?cart[i.id]*i.price:0),0);

  useEffect(()=>{localStorage.setItem("hc_cart",JSON.stringify(cart));},[cart]);

  function add(id){setCart(c=>({...c,[id]:(c[id]||0)+1}));setJustAdded(id);setTimeout(()=>setJustAdded(null),1000);} 

  return (
    <main className="max-w-[600px] mx-auto px-4 pb-40">
      <header className="py-4">
        <div className="font-bold text-[22px] flex items-center gap-2"><img src="/logo.png" alt="HoyChoy™" className="w-6 h-6 rounded-full"/>HoyChoy™ Café</div>
        <div className="text-muted text-xs mt-1">Savor the fusion of flavors</div>
        <div className="mt-3">
          <input
            className="w-full bg-[#111] border border-[#222] rounded-xl p-2"
            placeholder="Search items"
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-3">
          {['all','veg','nonveg'].map(f=> (
            <button key={f} onClick={()=>setFilter(f)} className={`chip ${filter===f?'chip-active':''} ${f==='veg'?'text-success':f==='nonveg'?'text-error':''}`} data-filter={f}>
              <span className="inline-flex items-center gap-2">
                {f==='veg'?<VegIcon />:f==='nonveg'?<NonVegIcon />:null}
                {f==='all'?'All':f==='veg'?'Veg':'Non-Veg'}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-auto mt-3">
          {categories.map(c=> (
            <button key={c} onClick={()=>setCat(c)} className={`chip ${cat===c?'chip-active':''}`}>{c}</button>
          ))}
        </div>
      </header>

      <ul className="flex flex-col gap-2">
        {items.map(item=> (
          <li key={item.id} className="card flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="font-semibold flex items-center gap-2">{item.name}{item.veg?<VegIcon />:<NonVegIcon />}</div>
              <div className="text-muted">₹{item.price}</div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block w-2 h-2 rounded-full ${item.available?'bg-success':'bg-error'}`}></span>
                <span>{item.available?"Available":"Out of Stock"}</span>
              </div>
            </div>
            <button disabled={!item.available} className={`btn ${item.available?'btn-primary':''} ${item.available?'':'btn-disabled'}`} onClick={()=>add(item.id)}>
              {item.available?(justAdded===item.id?"✓ Added":"Add"):"Out"}
            </button>
          </li>
        ))}
      </ul>

      <div className="fixed right-3 bottom-24 bg-primary text-black rounded-full px-3 py-2 font-bold flex items-center gap-2 shadow-xl">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
          <path d="M3 3h2l3 12h10l3-8H6"/>
        </svg>
        <span>{count}</span>
      </div>
      <div className="fixed left-0 right-0 bottom-0 bg-gradient-to-b from-black/20 to-bg p-3 border-t border-[#222]">
        <div className="row font-bold">
          <span>Total</span><span className="price">₹{Object.entries(cart).reduce((s,[id,q])=>{const it=data.items.find(x=>x.id===id);return s+(it?it.price*q:0);},0)}</span>
        </div>
        <button className={`btn btn-primary w-full mt-2 ${count===0?'btn-disabled':''}`} disabled={count===0} onClick={onProceed}>Proceed to Checkout</button>
      </div>
    </main>
  );
}
