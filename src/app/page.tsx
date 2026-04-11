"use client";

import React, { useState } from 'react';
import { useSession, signOut, signIn } from "next-auth/react"; // Added signIn here
import AuthButton from '@/components/AuthButton';
import Link from 'next/link';

const MyHearthWireframe = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [topic, setTopic] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<string | null>(null);

  const topics = ['Builds', 'News', 'Embers', 'Guides'];
  const sources = ['YouTube', 'Reddit', 'Wowhead', 'Blizzard'];
  const cards = Array.from({ length: 12 });

  const toggleTopic = (t: string) => setTopic(topic === t ? null : t);
  const toggleSource = (s: string) => setSource(source === s ? null : s);

  const renderBreadcrumb = () => {
    if (topic && source) return <>{topic} <span className="mx-2 text-gray-300">—</span> {source}</>;
    if (topic) return `All ${topic}`;
    if (source) return `${source} Content`;
    return "Exploring the Hearth in DEV v2";
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-20 md:pb-0">
      
      {/* REFINED HEADER */}
      <header className="fixed top-0 w-full h-16 bg-white border-b border-gray-300 z-50">
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4">
          
          {/* LEFT ANCHOR: HOME / LOGO */}
          <Link href="/" className="group flex items-center">
            <div className="flex items-center bg-gray-800 text-white pr-6 pl-2 py-1.5 rounded-md shadow-md hover:bg-black transition-all">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex-shrink-0 border-2 border-gray-800 overflow-hidden flex items-center justify-center">
                <span className="text-lg">🌀</span> 
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black uppercase tracking-tighter text-blue-400">Portal</span>
                <span className="text-sm font-bold tracking-tight">MYHEARTH</span>
              </div>
            </div>
          </Link>

          {/* CENTER PIECE: DYNAMIC BREADCRUMB */}
          <div className="hidden md:flex items-center space-x-3 text-[11px] tracking-[0.2em] font-black uppercase text-gray-400 flex-1 justify-center">
            {renderBreadcrumb()}
          </div>

          {/* RIGHT ANCHOR: AUTH / PROFILE */}
          <div className="flex items-center">
            {user ? (
              /* LOGGED IN UI */
              <div className="flex items-center bg-gray-100 border border-gray-300 pl-6 pr-2 py-1.5 rounded-md shadow-sm">
                <div className="flex flex-col items-end leading-none mr-3">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Logged In</span>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-[11px] font-bold text-red-500 hover:underline uppercase"
                  >
                    Logout
                  </button>
                </div>
                <Link href="/profile" className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 border-2 border-white overflow-hidden shadow-inner hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold">
                  {user.image ? <img src={user.image} alt="Avatar" /> : user.name?.[0]}
                </Link>
              </div>
            ) : (
              /* LOGGED OUT UI - Functional Button */
              <button 
                onClick={() => signIn("battlenet")}
                className="flex items-center bg-orange-500 text-white pl-6 pr-2 py-1.5 rounded-md shadow-md hover:bg-orange-600 transition-all cursor-pointer border-none"
              >
                 <span className="text-sm font-bold mr-3 tracking-tight">LOGIN</span>
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-orange-400">
                   <span className="text-xs">⚔️</span>
                 </div>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* LEFT PILLAR (TOPICS) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-r border-gray-300 flex-col items-center py-6 z-40 left-[50%] -ml-[700px]">
          <div className="group relative mb-2">
            <button 
              onClick={() => setTopic(null)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${topic === null ? 'border-blue-600 bg-blue-100 shadow-inner' : 'border-gray-400 bg-white hover:border-blue-400'}`}
            >
              <span className="text-[10px] font-black italic">ALL</span>
            </button>
            <span className="absolute left-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
              All Topics
            </span>
          </div>
        <div className="w-8 h-[1px] bg-gray-300 mb-6" />

        <div className="space-y-6 flex flex-col items-center">
          {topics.map(t => (
            <div key={t} className="group relative">
              <button 
                onClick={() => toggleTopic(t)} 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${topic === t ? 'border-blue-600 bg-blue-100 shadow-inner scale-95' : 'border-gray-400 bg-white hover:border-blue-400 hover:scale-110'}`}
              >
                <span className="text-xs font-bold">{t[0]}</span>
              </button>
              <span className="absolute left-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                {t}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT PILLAR (SOURCES) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-l border-gray-300 flex-col items-center py-6 z-40 right-[50%] -mr-[700px]">
        <div className="group relative mb-2">
          <button 
            onClick={() => setSource(null)}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${source === null ? 'border-orange-600 bg-orange-100 shadow-inner' : 'border-gray-400 bg-white hover:border-orange-400'}`}
          >
            <span className="text-[10px] font-black italic">ALL</span>
          </button>
          <span className="absolute right-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
            All Sources
          </span>
        </div>
        <div className="w-8 h-[1px] bg-gray-300 mb-6" />

        <div className="space-y-6 flex flex-col items-center">
          {sources.map(s => (
            <div key={s} className="group relative">
              <button 
                onClick={() => toggleSource(s)} 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${source === s ? 'border-orange-600 bg-orange-100 shadow-inner scale-95' : 'border-gray-400 bg-white hover:border-orange-400 hover:scale-110'}`}
              >
                <span className="text-xs font-bold">{s[0]}</span>
              </button>
              <span className="absolute right-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                {s}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pt-24 px-4 md:px-0 max-w-[1200px] mx-auto min-h-screen flex flex-col">
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((_, i) => (
            <div key={i} className="bg-white aspect-video rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-4">
              <div className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                {topic || 'General'} — {source || 'All Sources'}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 py-12 border-t border-gray-300 text-center text-gray-400 text-xs space-y-2">
          <p>© 2026 MyHearth • The Portal to WoW Housing</p>
          <p>MyHearth is an independent World of Warcraft fan project.</p>
          <p>World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc.</p>
          <p>This site is not affiliated with Blizzard.</p>
        </footer>
      </main>

      {/* MOBILE UI */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 flex justify-between pointer-events-none z-50">
        <button onClick={() => setShowMobileMenu('topic')} className="pointer-events-auto w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center text-[10px] font-bold uppercase ring-4 ring-white">
          <span>{topic || 'All Topics'}</span>
        </button>
        <button onClick={() => setShowMobileMenu('source')} className="pointer-events-auto w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center text-[10px] font-bold uppercase ring-4 ring-white">
          <span>{source || 'All Sources'}</span>
        </button>
      </div>

    {/* MOBILE MENU MODAL */}
    <div 
      className={`fixed inset-0 z-[100] flex flex-col justify-end transition-all duration-300 ease-out ${
        showMobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setShowMobileMenu(null)} 
      />

      <div 
        className={`relative bg-[#1a1a1a] rounded-t-3xl p-6 transform transition-transform duration-300 ease-out border-t border-white/10 max-h-[80vh] overflow-y-auto ${
          showMobileMenu ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
        
        <h3 className="text-xl font-bold text-white mb-6 px-2">
          Filter by {showMobileMenu === 'topic' ? 'Topic' : 'Source'}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => {
              showMobileMenu === 'topic' ? setTopic('') : setSource('');
              setShowMobileMenu(null);
            }}
            className="w-full py-4 px-6 bg-white/5 text-white rounded-xl font-bold text-left hover:bg-white/10 transition-colors border border-white/5"
          >
            Show All {showMobileMenu === 'topic' ? 'Topics' : 'Sources'}
          </button>

          {(showMobileMenu === 'topic' ? topics : sources).map((item) => (
            <button
              key={item}
              onClick={() => {
                showMobileMenu === 'topic' ? setTopic(item) : setSource(item);
                setShowMobileMenu(null);
              }}
              className={`w-full py-4 px-6 rounded-xl font-bold text-left transition-colors border ${
                (topic === item || source === item) 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-white/5 border-white/5 text-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowMobileMenu(null)}
          className="mt-8 w-full py-4 text-gray-400 font-bold tracking-widest text-sm"
        >
          CANCEL
        </button>
      </div>
    </div>
    </div> 
  );
};

export default MyHearthWireframe;