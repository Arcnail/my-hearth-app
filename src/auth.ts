import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
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
      profile(profile) {
        // Log exactly what we are about to try and send to the DB
        const userId = String(profile.sub || profile.id);
        console.log("Attempting to sync User ID:", userId);
        
        return {
          id: userId,
          name: profile.battletag,
          email: null, // Hardcode to null to bypass any 'unique' or 'undefined' errors
          image: null,
        }
      },
    },
  ],
  // Switch back to JWT temporarily just to get the user created
  session: { strategy: "jwt" }, 
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})