// app/dashboard/page.tsx (SERVER)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
export const runtime = "nodejs";

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

  // id de Prisma
  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!me) {
    return (
      <div className="p-8 text-center">
        <p>Usuario no encontrado.</p>
      </div>
    );
  }

  const Pages = await PageModel();

  const docs = await Pages.find({ userId: me.id, isDeleted: { $ne: true } })
    .select("title path updatedAt content isFavorite userId -_id")
    .sort({ updatedAt: -1 })
    .limit(48)
    .lean();

  const fmt = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const recentDesigns = docs.map((d: any) => ({
    id: d.path, // usamos el path como id visible
    title: d.title || d.path.replace("/", ""),
    path: d.path,
    updatedAtText: fmt.format(new Date(d.updatedAt)),
    previewTitle: d?.content?.root?.props?.title ?? "Vista previa",
    isFavorite: !!d?.isFavorite,
  }));

  return <DashboardClient recentDesigns={recentDesigns} />;
}

