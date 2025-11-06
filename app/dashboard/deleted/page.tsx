import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
import DeletedClient from "./DeletedClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAYS = 7;

function daysLeft(deletedAt?: Date | null) {
  if (!deletedAt) return DAYS;
  const diffDays = (Date.now() - new Date(deletedAt).getTime()) / 86400000;
  return Math.max(0, DAYS - Math.floor(diffDays));
}

const fmtCR = new Intl.DateTimeFormat("es-CR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Costa_Rica",
});
function formatCR(d: unknown) {
  if (!d) return "—";
  const dt = new Date(d as any);
  return isNaN(dt.getTime()) ? "—" : fmtCR.format(dt);
}

export default async function DeletedPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="p-8 text-center">
        <p>No has iniciado sesión.</p>
        <Link href="/login" className="text-purple-600 underline">Ir al login</Link>
      </div>
    );
  }

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!me) {
    return <div className="p-8 text-center">Usuario no encontrado.</div>;
  }

  const Pages = await PageModel();

  const recentDocs = await Pages.find(
    { userId: me.id, isDeleted: { $ne: true } },
    { _id: 0, title: 1, path: 1, updatedAt: 1 }
  )
    .sort({ updatedAt: -1 })
    .lean();

  // Papelera
  const trashDocs = await Pages.find(
    { userId: me.id, isDeleted: true },
    { _id: 0, title: 1, path: 1, deletedAt: 1, updatedAt: 1 }
  )
    .sort({ deletedAt: -1 })
    .lean();

  const recentDesigns = recentDocs.map((d: any) => ({
    id: d.path,
    title: d.title || d.path.replace("/", ""),
    path: d.path,
    updatedAt: formatCR(d.updatedAt),   // ← DeletedClient espera `updatedAt` (string)
  }));

  const items = trashDocs.map((d: any) => {
    const left = daysLeft(d.deletedAt);
    return {
      id: d.path,
      title: d.title || d.path.replace("/", ""),
      path: d.path,
      deletedAtText: formatCR(d.deletedAt), // ← seguro
      left,
      canDeleteForever: left === 0,
    };
  });

  return <DeletedClient recentDesigns={recentDesigns} items={items} />;
}
