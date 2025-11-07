"use client"
import { User, FileText, Boxes, Home, VideoIcon, RefreshCw } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const pathname = usePathname()

  const items = [
    { id: "start", label: "Inicio", icon: Home, href: "/Admin" },
    { id: "blog", label: "Blog", icon: FileText, href: "/Admin/blog" },
    { id: "video", label: "Videos", icon: VideoIcon, href: "/Admin/videos" },
    { id: "socio", label: "Socios", icon: Boxes, href: "/Admin/socios" },
    { id: "releases", label: "Actualizaciones", icon: RefreshCw, href: "/Admin/releases" },
  ]

  return (
    <aside className="w-56 min-h-screen border-r bg-white pt-22">
      <div className="flex flex-col items-center py-8 border-b">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <User className="w-8 h-8 text-purple-600" />
        </div>
        <p className="mt-3 text-sm font-medium text-slate-700">Carlos Sánchez</p>
      </div>

      <div className="p-4">
        <h1 className="text-lg font-bold mb-6 text-fuchsia-400">Panel de Admin</h1>
        <nav className="flex flex-col gap-1">
          {items.map(({ id, label, icon: Icon, href }) => {
            const isActive = pathname.startsWith(href) // detecta página activa
            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
