import React, { useEffect } from "react";

export default function Splash({onContinue}){
  useEffect(()=>{
    const t=setTimeout(()=>onContinue(),1800);
    return ()=>clearTimeout(t);
  },[onContinue]);
  return (
    <section onClick={onContinue} className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#0b0b0b] text-white">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(800px circle at 20% 20%, rgba(255,200,60,0.08), transparent 60%), radial-gradient(600px circle at 80% 30%, rgba(255,200,60,0.06), transparent 55%)"}}/>
      <div className="text-center">
        <div className="font-extrabold leading-tight">
          <div className="text-[44px] md:text-[64px]">Hoy<span className="text-primary" style={{filter:"drop-shadow(0 0 8px rgba(255,200,60,0.8)) drop-shadow(0 0 18px rgba(255,200,60,0.6))"}}>Choy</span></div>
          <div className="text-[44px] md:text-[64px]">Café</div>
        </div>
        <div className="text-muted italic mt-2">Savor the fusion of flavors</div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-primary/80 animate-pulse"/>
          <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse"/>
          <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"/>
        </div>
      </div>
    </section>
  );
}
