"use client";

import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';

const ProfileWireframe = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Pillars for the Profile page
  const profileActions = ['Overview', 'My Embers', 'Settings', 'Notifications'];
  const helpActions = ['Guide', 'Status', 'Feedback', 'Support'];
  
  const [activeTab, setActiveTab] = useState('Overview');

  const renderBreadcrumb = () => {
  return (
    <>
      <span className="text-blue-500">Account</span> 
      <span className="mx-2 text-gray-300">—</span> 
      {activeTab}
    </>
  );
};

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile.</h1>
          <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* HEADER (Same as Home) */}
      {/* REFINED HEADER */}
<header className="fixed top-0 w-full h-16 bg-white border-b border-gray-300 z-50">
  <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4">
    
    {/* LEFT ANCHOR: HOME / LOGO */}
    <Link href="/" className="group flex items-center">
      <div className="flex items-center bg-gray-800 text-white pr-6 pl-2 py-1.5 rounded-md shadow-md hover:bg-black transition-all">
        {/* The "Clipped" Icon look */}
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex-shrink-0 border-2 border-gray-800 overflow-hidden flex items-center justify-center">
          <span className="text-lg">🌀</span> {/* Placeholder for Hearthstone Icon */}
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-black uppercase tracking-tighter text-blue-400">Portal</span>
          <span className="text-sm font-bold tracking-tight">MYHEARTH</span>
        </div>
      </div>
    </Link>

    {/* CENTER PIECE: DYNAMIC BREADCRUMB */}
    <div className="hidden md:flex items-center space-x-3 text-[11px] tracking-[0.2em] font-black uppercase text-gray-400 flex-1 justify-center">
      {renderBreadcrumb ? renderBreadcrumb() : "User Profile — Overview"}
    </div>

    {/* RIGHT ANCHOR: AUTH / PROFILE */}
    <div className="flex items-center">
      {user ? (
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
          {/* Mirrored Clipped Icon */}
          <Link href="/profile" className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 border-2 border-white overflow-hidden shadow-inner hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold">
            {user.image ? <img src={user.image} alt="Avatar" /> : user.name?.[0]}
          </Link>
        </div>
      ) : (
        <div className="flex items-center bg-orange-500 text-white pl-6 pr-2 py-1.5 rounded-md shadow-md hover:bg-orange-600 transition-all cursor-pointer">
           <span className="text-sm font-bold mr-3">LOGIN</span>
           <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-orange-400">
             <span className="text-xs">⚔️</span>
           </div>
        </div>
      )}
    </div>

  </div>
</header>

      {/* LEFT PILLAR (ACCOUNT ACTIONS) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-r border-gray-300 flex-col items-center py-6 z-40 left-[50%] -ml-[700px]">
        <div className="space-y-6 flex flex-col items-center">
          {profileActions.map(action => (
            <div key={action} className="group relative">
              <button 
                onClick={() => setActiveTab(action)} 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${activeTab === action ? 'border-blue-600 bg-blue-100 shadow-inner' : 'border-gray-400 bg-white hover:border-blue-400'}`}
              >
                <span className="text-xs font-bold">{action[0]}</span>
              </button>
              <span className="absolute left-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                {action}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT PILLAR (HELP/STATUS) */}
      <aside className="hidden md:flex fixed top-16 bottom-0 w-20 bg-gray-200 border-l border-gray-300 flex-col items-center py-6 z-40 right-[50%] -mr-[700px]">
        <div className="space-y-6 flex flex-col items-center">
          {helpActions.map(help => (
            <div key={help} className="group relative">
              <button className="w-12 h-12 rounded-full border-2 border-gray-400 bg-white hover:border-orange-400 flex items-center justify-center transition-all">
                <span className="text-xs font-bold">{help[0]}</span>
              </button>
              <span className="absolute right-16 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
                {help}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="pt-24 px-4 md:px-0 max-w-[1200px] mx-auto min-h-screen flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h1 className="text-3xl font-black text-gray-800 mb-2">Success!</h1>
            <p className="text-gray-500 mb-6">Your MyHearth profile is active.</p>

            <div className="space-y-4 border-t pt-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                        {user?.image ? <img src={user.image} alt="Avatar" /> : user?.name?.[0]}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{user?.name || "Hero"}</h2>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Account Active</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">Request Status</span>
                        <span className="font-bold">None</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-400">Current Main</span>
                        <span className="font-bold text-blue-600">Select a character →</span>
                    </div>
                </div>

                <Link href="/submit">
  <button className="w-full mt-6 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
      Create New Ember Submission
  </button>
</Link>
            </div>
        </div>

         <footer className="mt-12 py-12 border-t border-gray-300 text-center text-gray-400 text-xs space-y-2">
          <p>© 2026 MyHearth • The Portal to WoW Housing</p>
          <p>MyHearth is an independent World of Warcraft fan project.</p>
          <p>World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc.</p>
          <p>This site is not affiliated with Blizzard.</p>
        </footer>
      </main>
    </div>
  );
};

export default ProfileWireframe;