'use client'

import { signIn } from "next-auth/react"

export default function AuthButton() {
  const handleLogin = async () => {
    // This now calls Auth.js (NextAuth) instead of Supabase
    await signIn("battlenet")
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-[#009ae4] hover:bg-[#007dbb] text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all active:scale-95"
    >
      Connect Battle.net
    </button>
  )
}