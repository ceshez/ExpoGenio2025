// app/api/page/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const page = await prisma.page.upsert({
      where: { path: body.path }, //path único por usuario
      update: {
        title: body.title,
        content: body.content,
      },
      create: {
        title: body.title,
        path: body.path,
        content: body.content,
        user: {
          connect: { id: body.userId },
        },
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating/updating page" }, { status: 500 });
  }
}
