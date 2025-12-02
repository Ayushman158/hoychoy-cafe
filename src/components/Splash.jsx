import React, { useEffect } from "react";

export default function Splash({onContinue}){
  useEffect(()=>{
    const t=setTimeout(()=>onContinue(),1800);
    return ()=>clearTimeout(t);
  },[onContinue]);

  const glow = { textShadow: "0 0 22px rgba(245,200,74,0.6), 0 0 8px rgba(245,200,74,0.5)" };

  const ChefIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#f5c84a]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 10a6 6 0 0112 0v2H6v-2Z"/>
      <path d="M8 14h8v4H8z"/>
    </svg>
  );
  const SparkIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#f5c84a]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z"/>
    </svg>
  );

  return (
    <section onClick={onContinue} className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#0b0b0b] text-white">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(800px circle at 20% 20%, rgba(245,200,74,0.08), transparent 60%), radial-gradient(600px circle at 80% 30%, rgba(245,200,74,0.06), transparent 55%)"}}/>
      <div className="absolute top-10 left-10 opacity-90"><ChefIcon /></div>
      <div className="absolute top-14 right-12 opacity-90"><SparkIcon /></div>

      <div className="text-center">
        <div className="text-5xl md:text-6xl font-extrabold tracking-wide">
          <span className="text-white">Hoy</span>
          <span className="text-[#f5c84a]" style={glow}>Choy</span>
          <span className="text-white"> Café</span>
        </div>
        <div className="mt-3 text-sm md:text-base text-[#cfcfcf]">Savor the fusion of flavors</div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#f5c84a]"></span>
        <span className="w-2 h-2 rounded-full bg-[#f5c84a]/70"></span>
        <span className="w-2 h-2 rounded-full bg-[#f5c84a]/50"></span>
      </div>
    </section>
  );
}
