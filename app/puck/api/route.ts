import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // tu config de NextAuth

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();

  // busca al usuario logueado
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // guarda la página en la DB
  const page = await prisma.page.upsert({
  where: { path: payload.path },
  update: {
    title: payload.title,
    content: payload.content,
  },
  create: {
    title: payload.title,
    path: payload.path,
    content: payload.content,
    user: {
      connect: { id: payload.userId }, 
    },
  },
});


  revalidatePath(payload.path);

  return NextResponse.json({ status: "ok", page });
}
