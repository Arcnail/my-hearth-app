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
        console.log("Blizzard Profile Received:", profile);
        return {
          // We force this to a string to match the TEXT ID in Supabase
          id: String(profile.sub || profile.id),
          name: profile.battletag,
          email: profile.email || null, // Ensure email isn't 'undefined'
        }
      },
    },
  ],
  // This is the secret sauce for NextAuth v5 + Database
  session: { strategy: "database" }, 
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})