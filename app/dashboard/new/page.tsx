// app/dashboard/new/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

export default async function NewSitePage() {
  async function create(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) redirect("/login");

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (!user) redirect("/login");

    const title = (formData.get("title") as string)?.trim() || "Mi sitio";

    // Generar path aleatorio y comprobar colisión
    let path = `/${nanoid()}`;
    while (await prisma.page.findUnique({ where: { path } })) {
      path = `/${nanoid()}`;
    }

    await prisma.page.create({
      data: {
        title,
        path,         // <- aleatorio, NO del título
        userId: user.id,
        content: { root: { type: "container", props: { title }, children: [] } },
      },
    });

    redirect(`${path}/edit`); // middleware reescribe a /puck/<path>
  }

  return (
    <form action={create} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Nuevo sitio</h1>
      <input name="title" placeholder="Nombre del sitio" className="w-full border p-2 rounded" />
      <button className="px-4 py-2 rounded bg-purple-600 text-white">Crear y editar</button>
    </form>
  );
}
