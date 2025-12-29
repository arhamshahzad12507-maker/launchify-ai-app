
import React from 'react';

const SupplierDirectory: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto w-full h-full overflow-y-auto">
      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#111] to-black border border-white/5 p-8 md:p-12 overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-8">
          <div className="w-24 h-24 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
              <span className="text-[10px] uppercase font-black tracking-widest text-yellow-500">Coming Soon Phase</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Anti-Scam <br />
              <span className="text-green-500">Supplier Directory</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              Launchify ka sab se bada secret. Verified manufacturers aur unke contacts ka database Mufeez bhai ke Session 4/5 ke baad unlock hoga.
            </p>
          </div>
          
          <div className="w-64 h-64 bg-[#0a0a0a] rounded-3xl border border-white/10 flex flex-col items-center justify-center relative shadow-2xl">
            <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Security Shield Active</span>
          </div>
        </div>
      </div>

      {/* Protocol Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-green-500/20 transition-all">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-xl mb-4 border border-white/5">🤝</div>
          <h3 className="font-bold text-lg mb-2">Verified by Mufeez</h3>
          <p className="text-sm text-zinc-400">Har supplier ka warehouse visit aur payout history verify ki jaye gi.</p>
        </div>
        <div className="bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-green-500/20 transition-all">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-xl mb-4 border border-white/5">💸</div>
          <h3 className="font-bold text-lg mb-2">24-hr Payouts</h3>
          <p className="text-sm text-zinc-400">Sirf wahi suppliers jo hamari logistics guidelines aur fast payouts ko support karein ge.</p>
        </div>
        <div className="bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-green-500/20 transition-all">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-xl mb-4 border border-white/5">🚫</div>
          <h3 className="font-bold text-lg mb-2">Scam Blacklist</h3>
          <p className="text-sm text-zinc-400">Agar kisi supplier ne scam kiya, toh wo community-driven blacklist mein foran add hoga.</p>
        </div>
      </div>

      {/* Notice Card */}
      <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-[2rem] text-center">
        <h4 className="text-green-500 font-black uppercase tracking-widest text-sm mb-2">Wait for the Live Session</h4>
        <p className="text-zinc-300 text-sm italic">
          "Don't rush to random market numbers. Scam se bachna hai toh verification ka wait karein." - Mufeez
        </p>
      </div>
    </div>
  );
};

export default SupplierDirectory;
