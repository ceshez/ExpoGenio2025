// app/dashboard/new/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TitleField from "./TitleField";
import { toSlug } from "@/lib/slug";

export default async function NewSitePage() {
  async function create(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) redirect("/login");

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) redirect("/login");

    const title = String(formData.get("title") || "").trim() || "Mi sitio";
    const slug = toSlug(title);

    // Comprobación definitiva en servidor
    const exists = await prisma.page.findFirst({
      where: { userId: user.id, path: slug },
      select: { id: true },
    });
    if (exists) {
      // vuelve a la pantalla con un mensaje
      redirect("/dashboard/new?error=duplicate");
    }

    await prisma.page.create({
      data: {
        title,
        path: slug,
        userId: user.id,
        content: { root: { type: "container", props: { title }, children: [] } },
      },
    });

    // El middleware reescribe /slug/edit → /puck/slug
    redirect(`${slug}/edit`);
  }

  // puedes leer el error opcional
  // const search = await import("next/navigation").then(m => m.searchParams()) ... (si te interesa mostrar algo)
  return (
    <form action={create} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Nuevo sitio</h1>
      <TitleField />
      <button className="px-4 py-2 rounded bg-purple-600 text-white">
        Crear y editar
      </button>
    </form>
  );
}
