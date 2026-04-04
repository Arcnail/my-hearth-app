import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"
import { createClient } from "@supabase/supabase-js"

// 1. Initialize the official Supabase client manually
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "battlenet",
      name: "Battle.net",
      type: "oauth",
      clientId: process.env.AUTH_BATTLENET_ID,
      clientSecret: process.env.AUTH_BATTLENET_SECRET,
      authorization: "https://us.battle.net/oauth/authorize?scope=profile",
      token: "https://us.battle.net/oauth/token",
      userinfo: "https://us.battle.net/oauth/userinfo",
      checks: ["state"],
      async profile(profile) {
        const userId = String(profile.sub || profile.id);
        console.log("Checking for Hero in DB:", userId);

        // 2. MANUAL UPSERT: We tell Supabase exactly what to do
        const { error } = await supabase
          .from('users')
          .upsert({ 
            id: userId, 
            name: profile.battletag, 
            email: profile.email || null 
          }, { onConflict: 'id' });

        if (error) {
          console.error("❌ Supabase Sync Error:", error.message);
        } else {
          console.log("✅ Hero Synced Successfully:", profile.battletag);
        }

        return {
          id: userId,
          name: profile.battletag,
          email: profile.email,
        }
      },
    },
  ],
  // 3. Keep sessions as JWT for now to avoid 'sessions' table errors
  session: { strategy: "jwt" }, 
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})