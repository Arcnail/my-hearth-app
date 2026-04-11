import NextAuth from "next-auth"
import BattleNet from "next-auth/providers/battlenet"
import { createClient } from "@supabase/supabase-js"

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
        // 1. Log the full profile to the terminal so we can find the "chill" ID
        console.log("--- BATTLE.NET PROFILE START ---");
        console.log(JSON.stringify(profile, null, 2));
        
        // 2. Identify the ID. Most providers use 'id' or 'sub'
        // If Battle.net is sending a UUID in 'sub', we might need 'profile.id' instead
        const userId = String(profile.id || profile.sub);
        
        console.log("EXTRACTED USER ID:", userId);
        console.log("--- BATTLE.NET PROFILE END ---");

        // 3. Manual Sync to our custom 'users' table
        await supabase.from('users').upsert({ 
          id: userId, 
          name: profile.battletag, 
          icon: profile.image || null,
          last_login: new Date().toISOString()
        }, { onConflict: 'id' });

        return {
          id: userId,
          name: profile.battletag,
          image: profile.image,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      // 1. On initial login, 'user' and 'profile' are available
      if (user && profile) {
        // Force the token to use the chill ID from the profile
        const chillId = String(profile.id || profile.sub);
        console.log("JWT CALLBACK - FORCING CHILL ID:", chillId);
        token.sub = chillId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" }, 
  trustHost: true,
  secret: process.env.AUTH_SECRET,
})