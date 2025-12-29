
import React from 'react';

const MeetingVault: React.FC = () => {
  const meetings = [
    {
      title: "Batch Meeting 1: Foundations",
      link: "https://drive.google.com/file/d/1DY5-jt0UKUpMexUdZMQh6TLyFJMb1b9B/view",
      highlights: [
        "Cashflow Trap: Accessing 24-hour payouts is non-negotiable.",
        "RTO Reality: 15% is the goal. 35% is the danger zone.",
        "Confirmation Calls: How to verify addresses to save on courier costs.",
        "The Mindset: Success = Taking Action (Mufeez's 1.5M journey)."
      ],
      icon: "🎯"
    },
    {
      title: "Batch Meeting 2: Sourcing & Selection",
      link: "https://drive.google.com/file/d/1ZDRp1KAXAeWS7vympGwAWtBwkVTnoB14/view",
      highlights: [
        "Direct Manufacturer Access: Cutting out wholesalers to increase margins.",
        "10-Point Winning Criteria: Wow factor + Problem solver focus.",
        "The Green List: High-demand niches in Pakistan (Home, Car, Beauty).",
        "Zero Ad Spend: Leveraging organic funnels for initial growth."
      ],
      icon: "💎"
    }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto w-full h-full overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2">Knowledge <span className="text-green-500">Vault</span></h2>
        <p className="text-zinc-500">Core takeaways from our recorded batch meetings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting, idx) => (
          <div key={idx} className="bg-[#111] p-6 rounded-3xl border border-white/5 flex flex-col hover:border-green-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {meeting.icon}
              </div>
              <h3 className="font-bold text-lg leading-tight">{meeting.title}</h3>
            </div>
            
            <div className="space-y-3 flex-1">
              {meeting.highlights.map((point, pIdx) => (
                <div key={pIdx} className="flex gap-3 text-sm text-zinc-400">
                  <span className="text-green-500 font-bold">•</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <a 
              href={meeting.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-center text-xs font-bold uppercase tracking-widest border border-white/10 transition-colors"
            >
              Watch Recording
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
        <p className="text-sm text-center text-green-500 font-medium">
          Note: These recordings contain the full execution strategies. Make sure to watch them before your next live session.
        </p>
      </div>
    </div>
  );
};

export default MeetingVault;
