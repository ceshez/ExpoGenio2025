import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { customAlphabet } from "nanoid"
import  { ImageIcon } from "lucide-react"
import LogoGenio from "../../components/LogoGenio"

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12)

export default async function NewSitePage() {
  async function create(formData: FormData) {
    "use server"

    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    if (!email) redirect("/login")

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })
    if (!user) redirect("/login")

    const title = (formData.get("title") as string)?.trim() || "Mi sitio"

    // Generar path aleatorio y comprobar colisión
    let path = `/${nanoid()}`
    while (await prisma.page.findUnique({ where: { path } })) {
      path = `/${nanoid()}`
    }

    await prisma.page.create({
      data: {
        title,
        path, // <- aleatorio, NO del título
        userId: user.id,
        content: { root: { type: "container", props: { title }, children: [] } },
      },
    })

    redirect(`${path}/edit`) // middleware reescribe a /puck/<path>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <form
          action={create}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 backdrop-blur-sm rounded-2xl mb-4">
              <LogoGenio variant="simplified"/>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Crear Nuevo Sitio</h1>
            <p className="text-white/90 text-sm">Dale vida a tu próxima idea en segundos</p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Cover Image Upload (Non-functional example) */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Imagen de portada
                <span className="ml-2 text-xs font-normal text-gray-600">(Ejemplo visual)</span>
              </label>
              <div className="relative group">
                <div className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-xl bg-gray-50 hover:bg-purple-50/50 transition-all duration-200 cursor-pointer overflow-hidden">
                  <div className="aspect-[21/9] flex flex-col items-center justify-center gap-3 p-8">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-gray-600">PNG, JPG o WEBP hasta 5MB</p>
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled
                />
              </div>
            </div>

            {/* Site Title Input */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                Nombre del sitio
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ej: Mi Portfolio Creativo"
                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-gray-600">Puedes cambiarlo más tarde desde la configuración</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-700 text-white font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <LogoGenio variant="simplified"/>
                Crear y Editar
              </button>
            </div>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Tu sitio se creará con una URL única y podrás personalizarlo completamente
        </p>
      </div>
    </div>
  )
}