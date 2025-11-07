"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  Home,
  Layout,
  User,
  Settings,
  LogOut,
  X,
  MoreHorizontal,
  Trash2,
  CircleFadingPlus,
  Star,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface RecentPage {
  id: string
  title: string
  path: string
  updatedAt: string
}

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  recentDesigns: RecentPage[]
}

export function Sidebar({ sidebarOpen, setSidebarOpen, recentDesigns }: SidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [activeContextMenu, setActiveContextMenu] = useState<string | null>(null)
  const [showAllPages, setShowAllPages] = useState(false)
  const PAGES_LIMIT = 7

  useEffect(() => {
    console.log("Sidebar sidebarOpen state:", sidebarOpen)
  }, [sidebarOpen])

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-user-menu]")) {
      setUserMenuOpen(false)
    }
    if (!target.closest("[data-context-menu]")) {
      setActiveContextMenu(null)
    }
  }

  useEffect(() => {
    if (userMenuOpen || activeContextMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [userMenuOpen, activeContextMenu])

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const visiblePages = showAllPages ? recentDesigns : recentDesigns.slice(0, PAGES_LIMIT)
  const hasMorePages = recentDesigns.length > PAGES_LIMIT

  const fmtShortCR = new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "short",
    timeZone: "America/Costa_Rica",
  })
  const renderSidebarDate = (value: string) => {
    const dt = new Date(value)
    return isNaN(dt.getTime()) ? value : fmtShortCR.format(dt)
  }

  return (
    <>
      {/* Icon Sidebar */}
      <aside className="flex flex-col w-16 bg-sidebar shadow-sm border-r border-sidebar-border z-30 max-h-screen">
        <div className="p-3">
          <button
            onClick={handleBurgerClick}
            className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="text-sidebar-foreground" size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-3 flex-1">
          <Link href="/dashboard">
            <button className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer">
              <Home className="text-sidebar-foreground" size={20} />
            </button>
          </Link>
          <Link href="/dashboard/projects">
            <button className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer">
              <Layout className="text-sidebar-foreground" size={20} />
            </button>
          </Link>
          <Link href="/dashboard/new">
            <button className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer">
              <CircleFadingPlus className="text-sidebar-foreground" size={20} />
            </button>
          </Link>
          <Link href="/dashboard/favorites">
            <button className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer">
              <Star className="text-sidebar-foreground" size={20} />
            </button>
          </Link>
          <Link href="/dashboard/deleted">
            <button className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer">
              <Trash2 className="text-sidebar-foreground" size={20} />
            </button>
          </Link>
        </div>

        <div className="p-3 border-t border-sidebar-border">
          <div className="relative" data-user-menu>
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log("User menu clicked, current state:", userMenuOpen)
                setUserMenuOpen(!userMenuOpen)
              }}
              className="p-3 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 w-full"
              aria-label="User menu"
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mx-auto hover:scale-105 transition-transform duration-200 cursor-pointer">
                <User size={12} className="text-primary-foreground" />
              </div>
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute bottom-full left-full ml-2 mb-2 bg-popover rounded-lg shadow-lg border border-border py-2 w-48 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 py-2 px-4 hover:bg-accent transition-colors text-popover-foreground"
                  >
                    <User size={16} />
                    Perfil
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 py-2 px-4 hover:bg-accent transition-colors text-popover-foreground"
                  >
                    <Settings size={16} />
                    Ajustes
                  </Link>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 py-2 px-4 hover:bg-destructive/10 hover:text-destructive transition-colors text-popover-foreground cursor-pointer w-full text-left"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Collapsible Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-72 opacity-100 border-r shadow-sm" : "w-0 opacity-0 border-r-0 shadow-none"} 
          transition-all duration-300 ease-in-out overflow-hidden bg-sidebar border-sidebar-border z-20
          ${!sidebarOpen && "pointer-events-none"}
        `}
      >
        <div className="w-72 flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-sidebar-foreground">Sitios recientes</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-sidebar-accent transition-colors hover:text-sidebar-foreground cursor-pointer"
              >
                <X size={16} className="text-sidebar-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 space-y-2">
              {visiblePages.map((page) => (
                <div key={page.id} className="relative">
                  <Link
                    href={`${page.path}/edit`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors group"
                  >
                    <div className="w-12 h-8 rounded-md bg-muted flex-shrink-0 shadow-sm flex items-center justify-center">
                      <Layout size={14} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-sidebar-foreground truncate">{page.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {renderSidebarDate(page.updatedAt)}
                      </p>
                    </div>
                    <div data-context-menu className="relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveContextMenu(activeContextMenu === page.id ? null : page.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-sidebar-accent transition-all duration-200 cursor-pointer"
                      >
                        <MoreHorizontal size={14} className="text-muted-foreground" />
                      </button>

                      {activeContextMenu === page.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveContextMenu(null)} />
                          <div className="absolute right-0 top-full mt-1 bg-popover rounded-lg shadow-lg border border-border py-1 w-40 z-50">
                            {/* Toggle favoritos → SOLO mandamos path; el server hace el toggle */}
                            <button
                              onClick={async (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                try {
                                  await fetch("/api/pages/favorite", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ path: page.path }), // 👈
                                  })
                                } finally {
                                  setActiveContextMenu(null)
                                  window.location.reload()
                                }
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors cursor-pointer text-left"
                            >
                              <Star
                                size={14}
                                className={(page as any).isFavorite ? "text-yellow-400 fill-yellow-400" : ""}
                              />
                              {(page as any).isFavorite ? "Quitar favorito" : "Añadir a favoritos"}
                            </button>

                            {/* Enviar a papelera */}
                            <button
                              onClick={async (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                try {
                                  await fetch("/api/pages/trash", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ path: page.path }),
                                  })
                                } finally {
                                  setActiveContextMenu(null)
                                  window.location.reload()
                                }
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer text-left"
                            >
                              <Trash2 size={14} />
                              Enviar a papelera
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              ))}

              {recentDesigns.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No hay sitios recientes</p>
              )}

              {hasMorePages && (
                <button
                  onClick={() => setShowAllPages(!showAllPages)}
                  className="w-full mt-2 p-3 text-sm text-primary hover:bg-sidebar-accent rounded-lg transition-colors font-medium"
                >
                  {showAllPages ? "Ver menos" : `Ver más (${recentDesigns.length - PAGES_LIMIT})`}
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
