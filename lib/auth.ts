// lib/auth.ts
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

// Config NextAuth usando JWT (no BD para sesiones)
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

        // Busca el usuario en la tabla User
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;

        // Devuelve el objeto que NextAuth usará para firmar el JWT
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
};

//Helper para obtener el usuario a partir de un token JWT emitido por tu API (/api/auth)
export async function getUserSession(token: string) {
  if (!token) return null;

  try {
    // Debe coincidir con cómo firmas tu token en /api/auth
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number | string;
      email?: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
      select: { id: true, email: true, name: true, lastName: true },
    });

    return user ? { ...user, id: user.id.toString() } : null;
  } catch (error) {
    console.error("Error verifying JWT or fetching user:", error);
    return null;
  }
}
