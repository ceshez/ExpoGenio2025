// lib/auth.ts
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;

        // ¡OJO!: devolvemos id numérico/string
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Mete el id del usuario en el JWT
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id; // guardamos id como uid
      return token;
    },
    // Expone el id en la session (session.user.id)
    async session({ session, token }) {
      if (token?.uid && session.user) {
        (session.user as any).id = token.uid;
      }
      return session;
    },
  },
};
