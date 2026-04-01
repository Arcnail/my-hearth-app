import React from 'react';

const Wireframe = () => {
  // Dummy data for the "Matrix"
  const topics = ['Builds', 'News', 'Embers', 'Guides'];
  const sources = ['YouTube', 'Reddit', 'Wowhead', 'Blizzard'];
  const cards = Array.from({ length: 12 }); // 12 placeholder cards

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* HEADER SECTION */}
      {/* UPDATED HEADER */}
<header className="fixed top-0 w-full h-16 bg-white border-b border-gray-300 z-50">
  <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 relative">
    
    {/* Logo: Positioned to hang off the left of the content area */}
    <div className="bg-gray-800 text-white px-6 py-2 font-bold rounded-md shadow-md">
      MyHearth.gg
    </div>

    {/* Center Breadcrumb */}
    <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
      <span className="text-blue-600 font-bold uppercase tracking-tighter">Builds</span>
      <span className="text-gray-300">--</span>
      <span className="text-orange-600 font-bold uppercase tracking-tighter">YouTube</span>
    </div>

    {/* Login: Positioned to hang off the right */}
    <div className="bg-blue-700 text-white px-6 py-2 font-bold rounded-md shadow-md cursor-pointer hover:bg-blue-800 transition-all">
      Bnet Login
    </div>
  </div>
</header>

      {/* LEFT PILLAR (TOPICS) - Desktop Only */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-r border-gray-300 flex-col items-center py-8 space-y-8 z-40 
  left-[50%] -ml-[640px] lg:-ml-[700px]">
        {topics.map((t) => (
          <div key={t} className="group relative">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:scale-110 transition-all shadow-sm">
              <span className="text-xs font-bold">{t[0]}</span>
            </div>
            {/* Tooltip */}
            <span className="absolute left-16 top-3 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs p-2 rounded whitespace-nowrap">
              {t}
            </span>
          </div>
        ))}
      </aside>

      {/* RIGHT PILLAR (SOURCES) - Desktop Only */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-l border-gray-300 flex-col items-center py-8 space-y-8 z-40 
  right-[50%] -mr-[640px] lg:-mr-[700px]">
        {sources.map((s) => (
          <div key={s} className="group relative">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:border-orange-500 hover:scale-110 transition-all shadow-sm">
              <span className="text-xs font-bold">{s[0]}</span>
            </div>
            {/* Tooltip */}
            <span className="absolute right-16 top-3 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs p-2 rounded whitespace-nowrap">
              {s}
            </span>
          </div>
        ))}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 pb-32 md:pb-8 md:px-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* MASONRY-STYLE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Dummy Card Media */}
                <div className="aspect-video bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 italic">Card Media Placeholder</span>
                </div>
                {/* Card Content */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-blue-600">Build</span>
                    <span className="text-orange-600">YouTube</span>
                  </div>
                  <h3 className="font-bold text-gray-800 leading-tight">Amazing Grizzly Hills Cabin Concept</h3>
                  <p className="text-xs text-gray-500">By ArtieTheBuilder • 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MOBILE DOUBLE-DECKER NAV (Visible < 768px) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-300 z-50 flex flex-col shadow-2xl">
        {/* Top Row: Topics */}
        <div className="flex overflow-x-auto p-3 space-x-4 border-b border-gray-100 no-scrollbar">
          {topics.map(t => (
            <button key={t} className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold whitespace-nowrap border border-blue-200">
              {t}
            </button>
          ))}
        </div>
        {/* Bottom Row: Sources */}
        <div className="flex overflow-x-auto p-3 space-x-4 no-scrollbar">
          {sources.map(s => (
            <button key={s} className="px-4 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-bold whitespace-nowrap border border-orange-200">
              {s}
            </button>
          ))}
        </div>
      </nav>

    </div>
  );
};

export default Wireframe;