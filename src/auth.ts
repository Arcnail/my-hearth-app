import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    BattleNet({
      clientId: process.env.AUTH_BATTLENET_ID,
      clientSecret: process.env.AUTH_BATTLENET_SECRET,
      issuer: "https://us.battle.net/oauth",
      // Blizzard doesn't always handle PKCE well on localhost,
      // so we explicitly tell Auth.js how to behave.
      checks: ["state"], 
    }),
  ],
  // This helps Auth.js work on regular HTTP (localhost)
  trustHost: true,
})