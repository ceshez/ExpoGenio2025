// lib/get-page.ts
import { prisma } from "@/lib/prisma";
import type { Data } from "@measured/puck"; // solo para tipado del contenido

// Devuelve {content, title} o null
export async function getPage(path: string, userId?: number) {
  if (userId) {
    // clave compuesta: (userId, path)
    const page = await prisma.page.findUnique({
      where: { userId_path: { userId, path } },
      select: { content: true, title: true },
    });
    return page as { content: Data; title: string | null } | null;
  }

  // Fallback si no tienes userId (no recomendado si hay multiusuario)
  const page = await prisma.page.findFirst({
    where: { path },
    select: { content: true, title: true },
  });
  return page as { content: Data; title: string | null } | null;
}
