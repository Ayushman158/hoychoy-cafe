import React, { useState } from "react";
import { OWNER_PHONE } from "../config.js";

export default function Reservation({onBack}){
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [guests,setGuests]=useState(2);
  const [event,setEvent]=useState("Birthday");
  const [notes,setNotes]=useState("");
  const UserIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></svg>);
  const PhoneIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.45 2.6a2 2 0 0 1-.57 1.86l-1.27 1.27a16 16 0 0 0 6.88 6.88l1.27-1.27a2 2 0 0 1 1.86-.57l2.6.45A2 2 0 0 1 22 16.92z"/></svg>);
  const CalendarIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
  const ClockIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
  const UsersIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
  const SparkleIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/></svg>);
  const NoteIcon=()=> (<svg viewBox="0 0 24 24" className="w-5 h-5 text-[#cfcfcf]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2h8a2 2 0 0 1 2 2v12l-4 4H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M14 18v4"/></svg>);

  function submit(e){
    e.preventDefault();
    const msg = `Reservation enquiry\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nEvent: ${event}\nNotes: ${notes}`;
    const url = `https://api.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodeURIComponent(msg)}`;
    window.location.href = url;
  }

  return (
    <main className="max-w-[600px] mx-auto px-4 py-6">
      <button className="chip" onClick={onBack}>← Back to Menu</button>
      <h1 className="text-2xl font-bold mt-4">Reservations</h1>
      <p className="text-[#cfcfcf] mt-1">Enquire for birthday parties and events. We will confirm availability and details.</p>
      <div className="mt-2 overflow-hidden border-y border-[#222]">
        <style>{`@keyframes hcMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
        <div className="py-1 text-[#f5c84a]" style={{whiteSpace:"nowrap", animation:"hcMarquee 16s linear infinite"}}>
          <span className="mx-6">Now accepting reservations for birthdays, anniversaries & group celebrations!</span>
          <span className="mx-6">Now accepting reservations for birthdays, anniversaries & group celebrations!</span>
          <span className="mx-6">Now accepting reservations for birthdays, anniversaries & group celebrations!</span>
          <span className="mx-6">Now accepting reservations for birthdays, anniversaries & group celebrations!</span>
        </div>
      </div>
      <form onSubmit={submit} className="mt-4 bg-[#0f0f0f] border border-[#222] rounded-2xl p-4 flex flex-col gap-3">
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Name</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <UserIcon />
            <input className="flex-1 bg-transparent p-2 outline-none" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Phone</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <PhoneIcon />
            <input className="flex-1 bg-transparent p-2 outline-none" value={phone} onChange={e=>setPhone(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Date</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <CalendarIcon />
            <input type="date" className="flex-1 bg-transparent p-2 outline-none" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Time</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <ClockIcon />
            <input type="time" className="flex-1 bg-transparent p-2 outline-none" value={time} onChange={e=>setTime(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Guests</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <UsersIcon />
            <input type="number" min="1" className="flex-1 bg-transparent p-2 outline-none" value={guests} onChange={e=>setGuests(parseInt(e.target.value||"0",10))} required />
          </div>
        </div>
        <div className="row">
          <label className="w-28 text-[#cfcfcf]">Event</label>
          <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <SparkleIcon />
            <select className="flex-1 bg-transparent p-2 outline-none" value={event} onChange={e=>setEvent(e.target.value)}>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Corporate</option>
              <option>Farewell</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="row items-start">
          <label className="w-28 text-[#cfcfcf]">Notes</label>
          <div className="flex-1 flex items-start gap-2 bg-[#111] border border-[#222] rounded-xl px-3">
            <NoteIcon />
            <textarea className="flex-1 bg-transparent p-2 outline-none" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Special requests, budget, theme…" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Send WhatsApp Enquiry</button>
      </form>
    </main>
  );
}
