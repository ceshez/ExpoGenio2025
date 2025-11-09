// app/api/auth/2fa/start/route.ts
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateOtp, setTwoFactorCode, createPreAuthToken } from "@/lib/2fa";
import { sendOtpEmail } from "@/lib/mailer";
import { cookies } from "next/headers";

const BodySchema = z.object({
  email: (z as any).email ? (z as any).email() : z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = BodySchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) {
      return NextResponse.json(
        { ok: false, error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const otp = generateOtp();
    await setTwoFactorCode(user.id, otp, 10);

    if (process.env.BYPASS_EMAIL_2FA === "true") {
      console.log("[2FA][BYPASS] OTP para", user.email, "=", otp);
    } else {
      await sendOtpEmail(user.email, otp);
    }

    const preToken = await createPreAuthToken(user.id, 10);
    (await cookies()).set("pre_auth", preToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 10,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("2FA start error:", e);
    if (e instanceof ZodError) {
      return NextResponse.json({ ok: false, error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: e?.message || "ERROR" }, { status: 400 });
  }
}
