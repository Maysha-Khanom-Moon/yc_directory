import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user: { name, email, image }, profile = {} as any }) {
      const { id, login, bio } = profile;
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id});

      if(!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || ""
        });
        return true;
      }

      if(existingUser) {
        return true;
      }

      // Explicitly return false if sign-in should not proceed
      return false;
    },

    async jwt( { token, profile }) {
      if(profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile.id});

        token.id = user._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    }
  }
})