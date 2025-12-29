
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import ProfitCalculator from './components/ProfitCalculator';
import ProductEvaluator from './components/ProductEvaluator';
import MeetingVault from './components/MeetingVault';
import SupplierDirectory from './components/SupplierDirectory';

const VERIFIED_KEY = 'launchify_user_verified';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(VERIFIED_KEY) === 'true';
    setIsVerified(verified);
  }, []);

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    localStorage.setItem(VERIFIED_KEY, 'true');
  };

  const renderContent = () => {
    // Stage 1 Lockdown: Force ChatWidget for verification
    if (!isVerified) {
      return <ChatWidget onVerified={handleVerificationSuccess} isVerified={false} />;
    }

    switch (activeTab) {
      case 'chat':
        return <ChatWidget onVerified={handleVerificationSuccess} isVerified={true} />;
      case 'vault':
        return <MeetingVault />;
      case 'profit':
        return <ProfitCalculator />;
      case 'evaluate':
        return <ProductEvaluator />;
      case 'supplier':
        return <SupplierDirectory />;
      default:
        return <ChatWidget onVerified={handleVerificationSuccess} isVerified={true} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isVerified={isVerified}>
      <div className="flex-1 flex flex-col h-full bg-[#050505]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">
              {!isVerified ? 'Security Gatekeeper' : (
                <>
                  {activeTab === 'chat' && 'Support Session'}
                  {activeTab === 'vault' && 'Meeting Vault'}
                  {activeTab === 'profit' && 'Profit Analyzer'}
                  {activeTab === 'evaluate' && 'Product Lab'}
                  {activeTab === 'supplier' && 'Supplier Guard'}
                </>
              )}
            </h2>
            <p className="text-zinc-500 text-sm">
              {!isVerified 
                ? 'Identity verification required to access Launchify Hub' 
                : (
                  <>
                    {activeTab === 'chat' && 'Talk to our AI Agent for guidance'}
                    {activeTab === 'vault' && 'Recorded batch meeting takeaways'}
                    {activeTab === 'profit' && 'Check if your product margin is healthy'}
                    {activeTab === 'evaluate' && 'The 10-Point Winning Criteria Checklist'}
                    {activeTab === 'supplier' && 'Anti-Scam Supplier Directory (Coming Soon)'}
                  </>
                )
              }
            </p>
          </div>
          <div className="hidden md:block">
            <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${isVerified ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
                {isVerified ? 'Verified Founder' : 'Locked'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default App;
