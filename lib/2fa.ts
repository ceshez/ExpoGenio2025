import crypto from "crypto"
import bcrypt from "bcryptjs"
import { addMinutes, isBefore } from "date-fns"
import { prisma } from "@/lib/prisma"

export function generateOtp(): string {
  const n = crypto.randomInt(0, 1_000_000)
  return n.toString().padStart(6, "0")
}

export async function setTwoFactorCode(userId: number, otp: string, minutes = 10) {
  const tokenHash = await bcrypt.hash(otp, 10)
  const expiresAt = addMinutes(new Date(), minutes)
  await prisma.twoFactorToken.upsert({
    where: { userId },
    update: { tokenHash, expiresAt },
    create: { userId, tokenHash, expiresAt },
  })
}

export async function verifyAndConsumeTwoFactorCode(userId: number, otp: string) {
  const rec = await prisma.twoFactorToken.findUnique({ where: { userId } })
  if (!rec) return false
  if (isBefore(rec.expiresAt, new Date())) {
    await prisma.twoFactorToken.delete({ where: { userId } })
    return false
  }
  const ok = await bcrypt.compare(otp, rec.tokenHash)
  if (ok) {
    await prisma.twoFactorToken.delete({ where: { userId } })
  }
  return ok
}

export async function createPreAuthToken(userId: number, minutes = 10) {
  const token = crypto.randomBytes(24).toString("hex")
  const expiresAt = addMinutes(new Date(), minutes)
  await prisma.preAuthToken.upsert({
    where: { userId },
    update: { token, expiresAt },
    create: { userId, token, expiresAt },
  })
  return token
}

export async function usePreAuthToken(token: string) {
  const rec = await prisma.preAuthToken.findUnique({ where: { token } })
  if (!rec) return null
  if (isBefore(rec.expiresAt, new Date())) {
    await prisma.preAuthToken.delete({ where: { token } })
    return null
  }
  // consumir
  await prisma.preAuthToken.delete({ where: { token } })
  return rec.userId
}
