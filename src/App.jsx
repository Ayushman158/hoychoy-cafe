import React, { useEffect, useMemo, useState } from "react";
import Menu from "./components/Menu.jsx";
import Checkout from "./components/Checkout.jsx";
import Confirm from "./components/Confirm.jsx";
import Success from "./components/Success.jsx";
import Splash from "./components/Splash.jsx";
import { OWNER_PHONE, MERCHANT_NAME } from "./config.js";
import { generateOrderId } from "./utils/order.js";
import { getMenu } from "./utils/menu.js";
import { uploadToFileIO } from "./utils/upload.js";

export default function App(){
  const [view,setView]=useState("splash");
  const [cart,setCart]=useState(()=>{try{const r=localStorage.getItem("hc_cart");return r?JSON.parse(r):{};}catch{return {}}});
  const [cust,setCust]=useState(null);
  const items=useMemo(()=>{const menu=getMenu();return Object.entries(cart).map(([id,q])=>{const it=menu.items.find(x=>x.id===id);return it?{item:it,qty:q}:null;}).filter(Boolean);},[cart]);
  const total=items.reduce((s,x)=>s+x.item.price*x.qty,0);

  useEffect(()=>{localStorage.setItem("hc_cart",JSON.stringify(cart));},[cart]);

  function proceed(){setView("checkout");}
  function backToMenu(){setView("menu");}
  function toConfirm(payload){setCust(payload);setView("confirm");}
  function skipSplash(){setView("menu");}
  async function toSuccess(){
    const orderId=generateOrderId();
    let lines=[];
    lines.push(`🟢 *New Order - ${MERCHANT_NAME}*`);
    lines.push("");
    lines.push("📋 *Order Details:*");
    items.forEach(({item,qty})=>lines.push(`• ${item.name} ×${qty} - ₹${item.price}`));
    lines.push("");
    lines.push(`💰 *Total Amount:* ₹${total}`);
    lines.push("");
    lines.push("👤 *Customer Details:*");
    lines.push(`Name: ${cust.name}`);
    lines.push(`Phone: ${cust.phone}`);
    lines.push("");
    lines.push("📍 *Delivery Address:*");
    lines.push(cust.address);
    lines.push("");
    lines.push("📌 *Exact Location:*");
    const glink=cust.geo?`https://maps.google.com/?q=${cust.geo.lat},${cust.geo.lng}`:(cust.manualLink||"Not shared");
    lines.push(glink);
    lines.push("(Tap to open in Maps)");
    lines.push("");
    lines.push("💳 *UPI Payment:*");
    lines.push("");
    lines.push(`🆔 *Order ID:* #${orderId}`);
    lines.push("---");
    lines.push("_Please verify payment and confirm order_");
    let noteLine = null;
    if(cust.screenshot){
      try{
        const timeout = new Promise(resolve=>setTimeout(()=>resolve(null), 4000));
        const link = await Promise.race([uploadToFileIO(cust.screenshot), timeout]);
        noteLine = link ? `📎 Screenshot: ${link}` : "📎 Screenshot will be shared in chat";
      }catch{
        noteLine = "📎 Screenshot will be shared in chat";
      }
    }else{
      noteLine = "📎 Screenshot not provided";
    }
    const msg = lines.concat([noteLine]).join("\n");
    const url = `https://api.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodeURIComponent(msg)}`;
    window.location.href = url;
    setView("success");
    setCust(c=>({...c,orderId}));
  }

  function successBack(){setCart({});localStorage.removeItem("hc_cart");setView("menu");}

  if(view==="splash") return <Splash onContinue={skipSplash} />;
  if(view==="menu") return <Menu cart={cart} setCart={setCart} onProceed={proceed}/>;
  if(view==="checkout") return <Checkout cart={cart} setCart={setCart} onBack={backToMenu} onSubmit={toConfirm}/>;
  if(view==="confirm") return <Confirm name={cust.name} phone={cust.phone} total={total} onBack={()=>setView("checkout")} onConfirm={toSuccess}/>;
  return <Success orderId={cust.orderId} summary={{name:cust.name,phone:cust.phone,address:cust.address,items,total}} onBack={successBack}/>;
}
