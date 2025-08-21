// app/api/auth/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    // 1) Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 2) Verificar password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 3) Firmar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,            // Asegúrate que está en tu .env
      { expiresIn: "1d" }
    );

    // 4) (Opcional) setear cookie HttpOnly + devolver JSON
    const res = NextResponse.json({
      message: "Login OK",
      token,
      user: { id: user.id, email: user.email, name: user.name, lastName: user.lastName },
    });

    // Cookie segura en prod; en dev sameSite lax y secure false normalmente
    res.cookies.set("genio_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 día
    });

    return res;
  } catch (err) {
    console.error("Error /api/auth/login", err);
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}

