// app/api/auth/me/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Lee token desde Authorization o cookie
    const auth = req.headers.get("authorization");
    const bearer = auth?.startsWith("Bearer ") ? auth.split(" ")[1] : null;

    // intenta cookie si no vino en headers
    const cookieHeader = (req as any).headers.get("cookie") as string | undefined;
    const tokenFromCookie = cookieHeader?.match(/(?:^|;\s*)genio_token=([^;]+)/)?.[1];

    const token = bearer ?? tokenFromCookie;
    if (!token) return NextResponse.json({ error: "No auth" }, { status: 401 });

    // Verifica y regresa usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
      select: { id: true, email: true, name: true, lastName: true },
    });

    if (!user) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
