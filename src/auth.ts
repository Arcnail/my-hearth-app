import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"
import { createClient } from "@supabase/supabase-js"

// 1. Initialize the official Supabase client with the Service Role (Admin) key
// This allows the auth flow to bypass RLS and keep your database secure from the public.
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
        // Define the userId from Blizzard's response
        const userId = String(profile.sub || profile.id);
        
        console.log("Processing login for Hero:", profile.battletag);

        // 2. MANUAL UPSERT: Consolidating everything into the 'users' table
        const { error } = await supabase
          .from('users')
          .upsert({ 
            id: userId, 
            name: profile.battletag, 
            email: profile.email || null,
            icon: profile.image || null, // Matches the 'icon' column you added
            last_login: new Date().toISOString()
          }, { onConflict: 'id' });

        if (error) {
          console.error("❌ Supabase Sync Error:", error.message);
        } else {
          console.log("✅ Hero Synced Successfully to 'users' table.");
        }

        // This return object is what NextAuth uses to create the session cookie
        return {
          id: userId,
          name: profile.battletag,
          email: profile.email,
          image: profile.image,
        }
      },
    },
  ],
  // Use JWT strategy so we don't need a 'sessions' table in the database
  session: { strategy: "jwt" }, 
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})