// app/dashboard/dashboardClient.tsx (CLIENT)
"use client"

import Link from "next/link"
import { useState } from "react"
import Sidebar from "../components/Layout/Sidebar"
import DashboardHeader from "../components/Layout/Dashboard-header"
export const runtime = "nodejs";

type RecentItem = {
  id: string
  title: string
  path: string
  updatedAtText: string
  previewTitle?: string
}

export default function DashboardClient({ recentDesigns }: { recentDesigns: RecentItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        recentDesigns={recentDesigns.map((r) => ({
          id: r.id,
          title: r.title,
          path: r.path,
          updatedAt: r.updatedAtText,
        }))}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0">
          <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-8xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Recientes</h1>
                <p className="text-sm text-muted-foreground mt-1">Gestiona tus sitios web</p>
              </div>
              <Link
                href="/dashboard/new"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium hover:from-fuchsia-600 hover:to-purple-700 transition-all shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30"
              >
                + Nuevo sitio
              </Link>
            </div>

            {recentDesigns.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-muted/30">
                <p className="text-muted-foreground text-lg">Aún no tienes páginas. Crea la primera.</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {recentDesigns.map((p) => (
                  <div
                    key={p.id}
                    className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <Link href={`${p.path}/edit`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 flex items-center justify-center text-sm text-muted-foreground relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">{p.previewTitle ?? p.title ?? "Vista previa"}</span>
                      </div>
                    </Link>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate text-lg mb-1">{p.title || p.path}</h3>
                      <p className="text-xs text-muted-foreground mb-4" suppressHydrationWarning>
                        Editado {p.updatedAtText}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={p.path}
                          className="flex-1 text-center text-sm px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors font-medium"
                        >
                          Ver
                        </Link>
                        <Link
                          href={`${p.path}/edit`}
                          className="flex-1 text-center text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:from-fuchsia-600 hover:to-purple-700 transition-all font-medium shadow-md shadow-fuchsia-500/20"
                        >
                          Editar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}