
import React from 'react';
import { NAV_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVerified: boolean;
}

const Logo = () => (
  <div className="flex flex-col items-start">
    <div className="flex items-center gap-1">
      <span className="text-2xl font-bold tracking-tight text-white">Launchify</span>
      <div className="flex flex-col -mb-4 -mr-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#22c55e]">
          <path d="M13 5L18 10M18 10L13 15M18 10H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-500 -mt-1 ml-0.5">Pakistan</span>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isVerified }) => {
  const handleLockdown = () => {
    if (window.confirm("Lock portal access? This will require re-verification.")) {
      localStorage.removeItem('launchify_user_verified');
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0a] border-r border-white/10">
        <div className="p-6">
          <div className="mb-10 cursor-pointer" onClick={() => isVerified && setActiveTab('chat')}>
            <Logo />
          </div>
          
          <nav className="space-y-2">
            {NAV_LINKS.map((link) => {
              const isDisabled = !isVerified && link.id !== 'chat';
              return (
                <button
                  key={link.id}
                  disabled={isDisabled}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isDisabled ? 'opacity-20 cursor-not-allowed grayscale' : ''
                  } ${
                    activeTab === link.id
                      ? 'bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-bold">Identity Status</p>
            <p className="text-xs font-semibold">{isVerified ? 'Verified Founder' : 'Guest Lockdown'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isVerified ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-red-500 animate-pulse'}`}></span>
              <span className={`text-[10px] font-bold uppercase ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
                {isVerified ? 'Access Granted' : 'Verification Needed'}
              </span>
            </div>
          </div>
          
          {isVerified && (
            <button 
              onClick={handleLockdown}
              className="w-full py-3 px-4 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest transition-all"
            >
              Lock Access
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/10 z-20">
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          <div className="flex gap-2">
             {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                disabled={!isVerified && link.id !== 'chat'}
                onClick={() => setActiveTab(link.id)}
                className={`p-2 rounded-lg ${!isVerified && link.id !== 'chat' ? 'opacity-0' : (activeTab === link.id ? 'text-green-500' : 'text-zinc-500')}`}
              >
                {link.icon}
              </button>
            ))}
            {isVerified && (
              <button onClick={handleLockdown} className="p-2 text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </button>
            )}
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
