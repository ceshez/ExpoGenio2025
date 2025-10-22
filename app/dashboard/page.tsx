// app/dashboard/page.tsx (SERVER)
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="p-8 text-center">
        <p>No has iniciado sesión.</p>
        <Link href="/login" className="text-purple-600 underline">Ir al login</Link>
      </div>
    );
  }

  const pages = await prisma.page.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, path: true, updatedAt: true, content: true },
  });

  // Formato estable (mismo TZ/locale)
  const fmt = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const recentDesigns = pages.map(p => ({
    id: String(p.id),
    title: p.title ?? p.path.replace("/", ""),
    path: p.path,
    updatedAtText: `${fmt.format(p.updatedAt)}`, // <-- pasamos el string ya listo
    previewTitle: (p.content as any)?.root?.props?.title ?? "Vista previa",
  }));

  return <DashboardClient recentDesigns={recentDesigns} />;
}
