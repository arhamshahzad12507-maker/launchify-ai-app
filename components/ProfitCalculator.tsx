
import React, { useState, useEffect } from 'react';
import { ProfitStats } from '../types';

const ProfitCalculator: React.FC = () => {
  const [stats, setStats] = useState<ProfitStats>({
    sellingPrice: 2500,
    productCost: 1000,
    adCost: 400,
    deliveryCost: 200,
  });

  const netProfit = stats.sellingPrice - stats.productCost - stats.adCost - stats.deliveryCost;
  const margin = (netProfit / stats.sellingPrice) * 100;
  const isHealthy = netProfit >= 800;

  return (
    <div className="p-4 max-w-4xl mx-auto w-full h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
        <div className="space-y-6">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-6 text-green-500">Inputs (PKR)</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-2 block">Selling Price</label>
                <input 
                  type="number" 
                  value={stats.sellingPrice}
                  onChange={(e) => setStats({...stats, sellingPrice: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-2 block">Product Sourcing Cost</label>
                <input 
                  type="number" 
                  value={stats.productCost}
                  onChange={(e) => setStats({...stats, productCost: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-2 block">CPA (Ad Cost per Order)</label>
                <input 
                  type="number" 
                  value={stats.adCost}
                  onChange={(e) => setStats({...stats, adCost: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-2 block">Delivery & Packing</label>
                <input 
                  type="number" 
                  value={stats.deliveryCost}
                  onChange={(e) => setStats({...stats, deliveryCost: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2">Net Profit Per Order</p>
            <h2 className={`text-6xl font-black mb-4 ${isHealthy ? 'text-green-500' : 'text-red-500'}`}>
              Rs. {netProfit}
            </h2>
            <div className="flex gap-4">
               <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Margin</p>
                <p className="text-lg font-bold">{margin.toFixed(1)}%</p>
              </div>
              <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Health</p>
                <p className={`text-lg font-bold ${isHealthy ? 'text-green-500' : 'text-yellow-500'}`}>
                  {isHealthy ? 'Excellent' : 'Low Profit'}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border ${isHealthy ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Launchify Advice
            </h4>
            <p className="text-sm leading-relaxed text-zinc-300">
              {isHealthy 
                ? "Bohot khoob! Yeh ek healthy profit model hai. Make sure scaling ke waqt CPA (Ad Cost) control mein rahe. Ab execution par focus karein!"
                : "Profit bohot kam hai. Launchify asool ke mutabiq net profit kam se kam Rs. 800-1000 hona chahiye. Product sourcing price kam karein ya selling price barhayein."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
