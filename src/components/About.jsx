import React from "react";

export default function About({onBack}){
  return (
    <main className="max-w-[600px] mx-auto px-4 py-6">
      <button className="chip" onClick={onBack}>← Back to Menu</button>
      <h1 className="text-3xl font-extrabold mt-4">
        <span>Hoy</span>
        <span className="text-[#f5c84a]" style={{textShadow:"0 0 22px rgba(245,200,74,0.6), 0 0 8px rgba(245,200,74,0.5)"}}>Choy</span>
        <span> Café</span>
      </h1>
      <div className="mt-2 text-[#cfcfcf] leading-relaxed">
        <p>Welcome to HOYCHOY CAFÉ, the heart of Sarupathar.</p>
        <p className="mt-2">Located Near Railway Gate, Sarupathar (Pin: 785601), our café was born from a simple dream: to create a cozy space where people can enjoy great food, warm conversations, and unforgettable moments.</p>
        <p className="mt-2">Every dish we serve carries passion, creativity, and a touch of Axomiya hospitality. From comforting classics to our signature experiments, HoyChoy Café is built to make you feel at home the moment you walk in.</p>
        <p className="mt-2">What started small is now a place loved by many, all because of your endless support. HoyChoy Café: A dream turned into a destination.</p>
        <div className="mt-4">
          <div>📍 Address: Near Railway Gate, Sarupathar – 785601</div>
          <div>📞 For Queries: +91 86388 64806</div>
          <div>📧 Email: hoychoycafe@gmail.com</div>
        </div>
      </div>
    </main>
  );
}
