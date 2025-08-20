// /app/api/auth/route.ts
"use client"
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, isRegister, name, lastName } = body;

  if (isRegister) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return new Response("Usuario ya existe", { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, lastName },
    });
    return Response.json({ message: "Usuario creado", userId: user.id });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response("Datos Incorrectos", { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return Response.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}

