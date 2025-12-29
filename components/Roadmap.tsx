
import React from 'react';

const Roadmap: React.FC = () => {
  const weeks = [
    { title: "Week 1-2: Fundamentals", desc: "Mindset switch, niche selection, and basic store foundation.", icon: "🧠" },
    { title: "Week 3-4: The Setup", desc: "Sourcing winning products and setting up the Shopify machine.", icon: "⚡" },
    { title: "Week 5-6: First Sales", desc: "Running ads, testing products, and getting those first 'Ka-Ching' moments.", icon: "💸" },
    { title: "Week 7-8: Scaling", desc: "Optimizing CPA, reducing RTO, and building a sustainable brand.", icon: "📈" }
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto w-full h-full overflow-y-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">Zero to <span className="text-green-500 underline decoration-green-500/30 underline-offset-8">Founder</span></h2>
        <p className="text-zinc-400">Launchify Pakistan Official 8-Week Roadmap</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {weeks.map((week, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl shadow-green-500/5">
              <span className="text-lg">{week.icon}</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-all shadow-xl">
              <h4 className="text-green-500 font-bold mb-1 uppercase text-xs tracking-widest">Phase {idx + 1}</h4>
              <h3 className="text-lg font-bold text-white mb-2">{week.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{week.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-green-500 rounded-3xl text-black text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-black/10 rounded-full group-hover:scale-150 transition-all duration-700"></div>
        <h3 className="text-2xl font-black mb-2 relative z-10">ACTION LEN!</h3>
        <p className="font-medium opacity-80 relative z-10">Thinking se sales nahi aati, execution se aati hain.</p>
      </div>
    </div>
  );
};

export default Roadmap;
