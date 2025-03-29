import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser } from "./data-service";

export const {
  handlers: { GET, POST }, // GET e POST sono route handler functions
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ profile }) {
      try {
        const existingEmail = await getUser(profile.email);
        if (profile?.email === existingEmail.email) return true;
      } catch {
        return false;
      }
    },
  },
  pages: { signIn: "/login" },
});
