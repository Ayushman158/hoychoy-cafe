import React, { useEffect } from "react";

export default function Splash({onContinue}){
  useEffect(()=>{
    const t=setTimeout(()=>onContinue(),1800);
    return ()=>clearTimeout(t);
  },[onContinue]);
  return (
    <section onClick={onContinue} className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#0b0b0b] text-white">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(800px circle at 20% 20%, rgba(255,200,60,0.08), transparent 60%), radial-gradient(600px circle at 80% 30%, rgba(255,200,60,0.06), transparent 55%)"}}/>
      <img src="https://iili.io/fBpQXYx.md.png" alt="HoyChoy™" className="w-56 h-56 md:w-64 md:h-64"/>
      <div className="mt-4 text-[#f5c84a] tracking-wide text-sm md:text-base">Golpo , Ghorua Flavor & Good Vibes</div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2">
        <span className="hc-dot"/>
        <span className="hc-dot"/>
        <span className="hc-dot"/>
      </div>
      <style>{`
        @keyframes hcPulse { 0%, 80%, 100% { opacity: 0.25; transform: scale(0.9); } 40% { opacity: 1; transform: scale(1); } }
        .hc-dot { width: 8px; height: 8px; border-radius: 9999px; background: #f5c84a; animation: hcPulse 1.2s infinite ease-in-out; }
        .hc-dot:nth-child(2) { animation-delay: 0.2s; }
        .hc-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
}
