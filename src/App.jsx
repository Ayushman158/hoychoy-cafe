import React, { useEffect, useMemo, useState } from "react";
import Menu from "./components/Menu.jsx";
import Checkout from "./components/Checkout.jsx";
import Confirm from "./components/Confirm.jsx";
import Success from "./components/Success.jsx";
import { OWNER_PHONE } from "./config.js";
import { generateOrderId } from "./utils/order.js";
import data from "./data/menu.json";
import { uploadToFileIO } from "./utils/upload.js";

export default function App(){
  const [view,setView]=useState("menu");
  const [cart,setCart]=useState(()=>{try{const r=localStorage.getItem("hc_cart");return r?JSON.parse(r):{};}catch{return {}}});
  const [cust,setCust]=useState(null);
  const items=useMemo(()=>Object.entries(cart).map(([id,q])=>{const it=data.items.find(x=>x.id===id);return it?{item:it,qty:q}:null;}).filter(Boolean),[cart]);
  const total=items.reduce((s,x)=>s+x.item.price*x.qty,0);

  useEffect(()=>{localStorage.setItem("hc_cart",JSON.stringify(cart));},[cart]);

  function proceed(){setView("checkout");}
  function backToMenu(){setView("menu");}
  function toConfirm(payload){setCust(payload);setView("confirm");}
  async function toSuccess(){
    const orderId=generateOrderId();
    const shareSupported = (!!navigator.canShare && navigator.canShare({files: cust.screenshot?[cust.screenshot]:[]}));
    let lines=[];
    lines.push("🟢 *New Order - HoyChoy Café*");
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
    lines.push(shareSupported?"Screenshot attached":"No screenshot attached");
    lines.push("");
    lines.push(`🆔 *Order ID:* #${orderId}`);
    lines.push("---");
    lines.push("_Please verify payment and confirm order_");
    let screenshotShared=false;
    try{
      if(shareSupported){
        await navigator.share({
          title:"Payment Confirmation - HoyChoy Café",
          text: lines.join("\n"),
          files: cust.screenshot?[cust.screenshot]:[]
        });
        screenshotShared=true;
      }else{
        // Try uploading the screenshot to a free host and include the link in the WhatsApp message
        if(cust.screenshot){
          const link = await uploadToFileIO(cust.screenshot);
          const note = link ? `📎 Screenshot: ${link}` : "📎 Screenshot upload failed";
          const withLink = lines.concat([note]).join("\n");
          const url=`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(withLink)}`;
          window.open(url,"_blank");
        } else {
          const withNote = lines.concat(["📎 Screenshot not attached via link", "Please attach the screenshot in WhatsApp chat"]).join("\n");
          const url=`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(withNote)}`;
          window.open(url,"_blank");
        }
      }
    }catch(e){
      const url=`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url,"_blank");
    }
    setView("success");
    setCust(c=>({...c,orderId}));
  }

  function successBack(){setCart({});localStorage.removeItem("hc_cart");setView("menu");}

  if(view==="menu") return <Menu cart={cart} setCart={setCart} onProceed={proceed}/>;
  if(view==="checkout") return <Checkout cart={cart} setCart={setCart} onBack={backToMenu} onSubmit={toConfirm}/>;
  if(view==="confirm") return <Confirm name={cust.name} phone={cust.phone} total={total} onBack={()=>setView("checkout")} onConfirm={toSuccess}/>;
  return <Success orderId={cust.orderId} summary={{name:cust.name,phone:cust.phone,address:cust.address,items,total}} onBack={successBack}/>;
}
