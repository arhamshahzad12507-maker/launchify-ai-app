
import React, { useState } from 'react';

const ProductEvaluator: React.FC = () => {
  const criteria = [
    "Wow Factor (Catchy hai?)",
    "Problem-Solution (Masla hal karti hai?)",
    "Impulse Buy (Rs. 500-2000 range?)",
    "High Perceived Value",
    "Light/Small (<500g)",
    "Not Available Locally",
    "Visual Appeal",
    "Trending/Viral Potential",
    "High Margin (Cost x 3)",
    "Social Proof Ready"
  ];

  const [scores, setScores] = useState<boolean[]>(new Array(10).fill(false));

  const total = scores.filter(s => s).length;
  const isWinning = total >= 7;

  return (
    <div className="p-4 max-w-4xl mx-auto w-full h-full overflow-y-auto">
      <div className="bg-[#111] p-8 rounded-3xl border border-white/5 mb-8 text-center">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Winning Product Score</h2>
        <div className="flex items-baseline justify-center gap-2">
          <span className={`text-8xl font-black ${isWinning ? 'text-green-500' : 'text-zinc-500'}`}>{total}</span>
          <span className="text-3xl text-zinc-700 font-bold">/ 10</span>
        </div>
        <p className={`mt-6 font-bold py-2 px-6 rounded-full inline-block ${isWinning ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
          {isWinning ? 'YEH WINNING PRODUCT HAI! 🔥' : 'THORA AUR SEARCH KAREIN 🔍'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              const newScores = [...scores];
              newScores[idx] = !newScores[idx];
              setScores(newScores);
            }}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
              scores[idx] 
                ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/20'
            }`}
          >
            <span className="font-semibold text-sm">{idx + 1}. {item}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              scores[idx] ? 'bg-green-500 border-green-500' : 'border-zinc-700 group-hover:border-zinc-500'
            }`}>
              {scores[idx] && (
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductEvaluator;
