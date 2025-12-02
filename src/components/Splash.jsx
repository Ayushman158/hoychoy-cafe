import React, { useEffect } from "react";

export default function Splash({onContinue}){
  useEffect(()=>{
    const t=setTimeout(()=>onContinue(),1800);
    return ()=>clearTimeout(t);
  },[onContinue]);
  return (
    <section onClick={onContinue} className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#0b0b0b] text-white">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(800px circle at 20% 20%, rgba(245,200,74,0.08), transparent 60%), radial-gradient(600px circle at 80% 30%, rgba(245,200,74,0.06), transparent 55%)"}}/>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#f5c84a]">HoyChoy Café</h1>
      <div className="mt-2 text-[#f5c84a] tracking-wide text-sm md:text-base">Golpo, Ghorua Flavor & Good Vibes</div>
    </section>
  );
}
