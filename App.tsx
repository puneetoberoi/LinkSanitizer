import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CleanerWidget } from './components/CleanerWidget';
import { StatsView } from './components/StatsView';
import { ProView } from './components/ProView';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.STATS:
        return <StatsView />;
      case ViewState.PRO:
        return <ProView />;
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero />
            <div className="pb-20">
              <CleanerWidget />
              <div className="mt-16 text-center text-slate-500 text-sm px-4">
                <p>CleanLink processes all removal logic locally or via secure anonymous API.</p>
                <p className="mt-2">No user data is stored.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-emerald-500/30">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="container mx-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default App;