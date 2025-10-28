import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("DATABASE_URL at runtime =>", process.env.DATABASE_URL);

  try {
    const body = await req.json();
    const { email, password, name, lastName } = body;

    if (!email || !password || !name || !lastName) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastName,
      },
    });

    return NextResponse.json({ message: "Usuario creado con éxito", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
  }
}
