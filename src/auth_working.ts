import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"
import { SupabaseAdapter } from "@auth/supabase-adapter" // NEW

export const { handlers, signIn, signOut, auth } = NextAuth({
  // NEW: This tells NextAuth where to store user data
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
          id: profile.sub || profile.id.toString(),
          name: profile.battletag, 
          email: profile.email,
        }
      },
    },
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})