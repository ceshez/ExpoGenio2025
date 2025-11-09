// lib/auth.ts
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { usePreAuthToken } from "@/lib/2fa" // <- asegúrate de tenerla (consume y borra el PreAuthToken)

const FinalStepSchema = z.object({
  otpToken: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otpToken: { label: "OtpToken", type: "text" },
      },
      async authorize(credentials) {
        // Solo paso final: crear sesión con otpToken válido
        const parsed = FinalStepSchema.safeParse(credentials)
        if (!parsed.success) return null
        const { otpToken } = parsed.data

        // Consume el pre-auth token y obtiene el userId
        const userId = await usePreAuthToken(otpToken)
        if (!userId) return null

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return null

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id 
      return token
    },
    async session({ session, token }) {
      if (token?.uid && session.user) {
        ;(session.user as any).id = token.uid 
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
