import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Aquí podrías generar JWT o usar NextAuth
    return NextResponse.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
  }
}
