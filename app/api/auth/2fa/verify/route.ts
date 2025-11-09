import { NextResponse } from "next/server"
import { z } from "zod"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyAndConsumeTwoFactorCode } from "@/lib/2fa"

const BodySchema = z.object({
  code: z.string().regex(/^\d{6}$/),
})

export async function POST(req: Request) {
  const cookieStore = cookies()
  const pre = (await cookieStore).get("pre_auth")?.value
  if (!pre) return NextResponse.json({ error: "NO_PREAUTH" }, { status: 401 })

  try {
    const { code } = BodySchema.parse(await req.json())
    // trae userId por el preAuth token
    const preRec = await prisma.preAuthToken.findUnique({ where: { token: pre } })
    if (!preRec) return NextResponse.json({ error: "PREAUTH_EXPIRED" }, { status: 401 })

    const ok = await verifyAndConsumeTwoFactorCode(preRec.userId, code)
    if (!ok) return NextResponse.json({ error: "OTP_INVALID" }, { status: 400 })

    // OK: devolvemos el otpToken (es el mismo pre_auth)
    return NextResponse.json({ otpToken: pre })
  } catch {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 })
  }
}
