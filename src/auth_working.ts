import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "battlenet",
      name: "Battle.net",
      type: "oauth",
      clientId: process.env.AUTH_BATTLENET_ID,
      clientSecret: process.env.AUTH_BATTLENET_SECRET,
      // REMOVED 'openid' from the scope below. 
      // This is the kill-switch for the nonce error.
      authorization: "https://us.battle.net/oauth/authorize?scope=profile",
      token: "https://us.battle.net/oauth/token",
      userinfo: "https://us.battle.net/oauth/userinfo",
      checks: ["state"],
      profile(profile) {
  console.log("Blizzard Profile Received:", profile); // This will confirm it in your terminal
  return {
    id: profile.sub || profile.id.toString(),
    name: profile.battletag, // Blizzard uses 'battletag' (lowercase t)
    email: profile.email,
  }
},
    },
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: true,
})