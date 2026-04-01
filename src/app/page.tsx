"use client";

import React, { useState } from 'react';

const WireframeV2 = () => {
  const [topic, setTopic] = useState('Builds');
  const [source, setSource] = useState('YouTube');
  const [showMobileMenu, setShowMobileMenu] = useState(null); // 'topic' or 'source'

  const topics = ['Builds', 'News', 'Embers', 'Guides'];
  const sources = ['YouTube', 'Reddit', 'Wowhead', 'Blizzard'];
  const cards = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-20 md:pb-0">
      
      {/* HEADER: Full Width with Centered Elements */}
      <header className="fixed top-0 w-full h-16 bg-white border-b border-gray-300 z-50">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4">
          <div className="w-40 bg-gray-800 text-white px-4 py-2 font-bold rounded-md shadow-sm">MyHearth.gg</div>
          
          <div className="hidden md:flex items-center space-x-3 text-sm tracking-widest font-black uppercase">
            <span className="text-blue-600">{topic}</span>
            <span className="text-gray-300">—</span>
            <span className="text-orange-600">{source}</span>
          </div>

          <div className="w-40 bg-blue-700 text-white px-4 py-2 font-bold rounded-md shadow-sm text-center">Bnet Login</div>
        </div>
      </header>

      {/* DESKTOP PILLARS (Unchanged Math) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-r border-gray-300 flex-col items-center py-8 space-y-8 z-40 left-[50%] -ml-[700px]">
        {topics.map(t => (
          <button key={t} onClick={() => setTopic(t)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${topic === t ? 'border-blue-600 bg-blue-50 scale-110' : 'border-gray-400 bg-white'}`}>
            {t[0]}
          </button>
        ))}
      </aside>

      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-l border-gray-300 flex-col items-center py-8 space-y-8 z-40 right-[50%] -mr-[700px]">
        {sources.map(s => (
          <button key={s} onClick={() => setSource(s)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${source === s ? 'border-orange-600 bg-orange-50 scale-110' : 'border-gray-400 bg-white'}`}>
            {s[0]}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT + CONTAINED FOOTER */}
      <main className="pt-24 px-4 md:px-0 max-w-[1200px] mx-auto min-h-screen flex flex-col">
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((_, i) => (
            <div key={i} className="bg-white aspect-video rounded-xl border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 italic">
              Card Content {i + 1}
            </div>
          ))}
        </div>

        {/* FOOTER: Anchored to the bottom of the content flow */}
        <footer className="mt-12 py-12 border-t border-gray-300 text-center text-gray-500 text-sm space-y-2">
          <p>© 2026 MyHearth.gg - For the Builders.</p>
          <p>World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc.</p>
          <div className="flex justify-center space-x-6 pt-4">
            <span>About</span> <span>Discord</span> <span>Privacy</span>
          </div>
        </footer>
      </main>

      {/* MOBILE UI: Dual Floating Action Buttons */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 flex justify-between pointer-events-none z-50">
        <button 
          onClick={() => setShowMobileMenu('topic')}
          className="pointer-events-auto w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center text-[10px] font-bold uppercase"
        >
          <span>Topic</span>
        </button>
        
        <button 
          onClick={() => setShowMobileMenu('source')}
          className="pointer-events-auto w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center text-[10px] font-bold uppercase"
        >
          <span>Source</span>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY (Bottom Sheet style) */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={() => setShowMobileMenu(null)}>
          <div className="w-full bg-white rounded-t-3xl p-6 space-y-4 animate-slide-up" onClick={e => e.stopPropagation()}>
            <h3 className="text-center font-bold uppercase text-gray-400 tracking-widest text-xs">
              Select {showMobileMenu === 'topic' ? 'Category' : 'Platform'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {(showMobileMenu === 'topic' ? topics : sources).map(item => (
                <button 
                  key={item}
                  onClick={() => {
                    showMobileMenu === 'topic' ? setTopic(item) : setSource(item);
                    setShowMobileMenu(null);
                  }}
                  className="py-4 bg-gray-100 rounded-xl font-bold hover:bg-gray-200"
                >
                  {item}
                </button>
              ))}
            </div>
            <button onClick={() => setShowMobileMenu(null)} className="w-full py-3 text-gray-500 font-medium">Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WireframeV2;