"use client";

import React, { useState } from 'react';

const MyHearthWireframe = () => {
  // 1. STATE: Standardizing types for Vercel builds
  const [topic, setTopic] = useState<string | null>('Builds');
  const [source, setSource] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<string | null>(null);

  const topics = ['Builds', 'News', 'Embers', 'Guides'];
  const sources = ['YouTube', 'Reddit', 'Wowhead', 'Blizzard'];
  const cards = Array.from({ length: 12 });

  // 2. TOGGLE HANDLERS: This is the "Clear Filter" magic
  const toggleTopic = (t: string) => setTopic(topic === t ? null : t);
  const toggleSource = (s: string) => setSource(source === s ? null : s);

  // 3. HEADER BREADCRUMB LOGIC
  const renderBreadcrumb = () => {
    if (topic && source) return <>{topic} <span className="mx-2 text-gray-300">—</span> {source}</>;
    if (topic) return `All ${topic}`;
    if (source) return `${source} Content`;
    return "Exploring the Hearth";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-20 md:pb-0">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full h-16 bg-white border-b border-gray-300 z-50">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4">
          <div className="w-40 bg-gray-800 text-white px-4 py-2 font-bold rounded-md shadow-sm">MyHearth.gg</div>
          
          <div className="hidden md:flex items-center space-x-3 text-sm tracking-widest font-black uppercase">
            {renderBreadcrumb()}
          </div>

          <div className="w-40 bg-blue-700 text-white px-4 py-2 font-bold rounded-md shadow-sm text-center">Bnet Login</div>
        </div>
      </header>

      {/* DESKTOP PILLAR - LEFT (TOPICS) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-r border-gray-300 flex-col items-center py-8 space-y-8 z-40 left-[50%] -ml-[700px]">
        {topics.map(t => (
          <div key={t} className="group relative">
            <button 
              onClick={() => toggleTopic(t)} 
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 
              ${topic === t ? 'border-blue-600 bg-blue-100 shadow-inner scale-95' : 'border-gray-400 bg-white hover:border-blue-400 hover:scale-110'}`}
            >
              <span className="text-xs font-bold">{t[0]}</span>
            </button>
            <span className="absolute left-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
              {t}
            </span>
          </div>
        ))}
      </aside>

      {/* DESKTOP PILLAR - RIGHT (SOURCES) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-l border-gray-300 flex-col items-center py-8 space-y-8 z-40 right-[50%] -mr-[700px]">
        {sources.map(s => (
          <div key={s} className="group relative">
            <button 
              onClick={() => toggleSource(s)} 
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${source === s ? 'border-orange-600 bg-orange-100 shadow-inner scale-95' : 'border-gray-400 bg-white hover:border-orange-400 hover:scale-110'}`}
            >
              <span className="text-xs font-bold">{s[0]}</span>
            </button>
            <span className="absolute right-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
              {s}
            </span>
          </div>
        ))}
      </aside>

      {/* MAIN CONTENT + FOOTER */}
      <main className="pt-24 px-4 md:px-0 max-w-[1200px] mx-auto min-h-screen flex flex-col">
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((_, i) => (
            <div key={i} className="bg-white aspect-video rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-4">
              <div className="text-gray-300 mb-2">Card {i + 1}</div>
              <div className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                {topic || 'General'} — {source || 'All Sources'}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 py-12 border-t border-gray-300 text-center text-gray-400 text-xs space-y-2">
          <p>© 2026 MyHearth.gg - For the Builders.</p>
          <p>World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc.</p>
        </footer>
      </main>

      {/* MOBILE UI - FLOATING BUTTONS */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 flex justify-between pointer-events-none z-50">
        <button 
          onClick={() => setShowMobileMenu('topic')}
          className="pointer-events-auto w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center text-[10px] font-bold uppercase ring-4 ring-white"
        >
          <span>{topic || 'Topic'}</span>
        </button>
        
        <button 
          onClick={() => setShowMobileMenu('source')}
          className="pointer-events-auto w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center text-[10px] font-bold uppercase ring-4 ring-white"
        >
          <span>{source || 'Source'}</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET MENU */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-end" onClick={() => setShowMobileMenu(null)}>
          <div className="w-full bg-white rounded-t-3xl p-6 space-y-4 shadow-inner" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />
            <h3 className="text-center font-black uppercase text-gray-500 tracking-widest text-sm">
              Filter by {showMobileMenu === 'topic' ? 'Topic' : 'Source'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(showMobileMenu === 'topic' ? topics : sources).map(item => {
                const isActive = showMobileMenu === 'topic' ? topic === item : source === item;
                return (
                  <button 
                    key={item}
                    onClick={() => {
                      showMobileMenu === 'topic' ? toggleTopic(item) : toggleSource(item);
                      setShowMobileMenu(null);
                    }}
                    className={`py-4 rounded-xl font-bold transition-colors ${isActive ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setShowMobileMenu(null)} className="w-full py-4 text-gray-400 font-bold uppercase text-xs tracking-widest">Close Menu</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyHearthWireframe;