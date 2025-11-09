// app/dashboard/DashboardClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import DashboardHeader from "../components/Layout/Dashboard-header";
import { Star, MoreHorizontal, Trash2 } from "lucide-react";

export const runtime = "nodejs";

type RecentItem = {
  id: string;
  title: string;
  path: string;
  updatedAtText: string;
  previewTitle?: string;
  isFavorite?: boolean;
};

export default function DashboardClient({ recentDesigns }: { recentDesigns: RecentItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<RecentItem[]>(() => [...recentDesigns]);

  // Menú contextual por-card
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Re-sync si cambia el SSR
  useEffect(() => setItems(recentDesigns), [recentDesigns]);

  // Listeners globales para sincronía con Sidebar/Favorites
  useEffect(() => {
    const onFav = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setItems((prev) => prev.map((it) => (it.path === path ? { ...it, isFavorite: true } : it)));
    };
    const onUnfav = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setItems((prev) => prev.map((it) => (it.path === path ? { ...it, isFavorite: false } : it)));
    };
    const onTrash = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setItems((prev) => prev.filter((it) => it.path !== path));
    };

    window.addEventListener("page:favorited", onFav as EventListener);
    window.addEventListener("page:unfavorited", onUnfav as EventListener);
    window.addEventListener("page:trashed", onTrash as EventListener);
    return () => {
      window.removeEventListener("page:favorited", onFav as EventListener);
      window.removeEventListener("page:unfavorited", onUnfav as EventListener);
      window.removeEventListener("page:trashed", onTrash as EventListener);
    };
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-card-menu]")) setActiveMenu(null);
    }
    if (activeMenu) {
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }
  }, [activeMenu]);

  // Helpers
  async function toggleFavorite(p: RecentItem) {
    const res = await fetch("/api/pages/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: p.path }),
    });
    const data: { ok?: boolean; isFavorite?: boolean } = await res.json();
    if (data?.ok) {
      setItems((prev) =>
        prev.map((it) => (it.path === p.path ? { ...it, isFavorite: !!data.isFavorite } : it))
      );
      window.dispatchEvent(
        new CustomEvent(data.isFavorite ? "page:favorited" : "page:unfavorited", {
          detail: { path: p.path },
        })
      );
    }
  }

  async function sendToTrash(p: RecentItem) {
    await fetch("/api/pages/trash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: p.path }),
    });
    // Optimista: sacarlo de inmediato
    setItems((prev) => prev.filter((it) => it.path !== p.path));
    window.dispatchEvent(new CustomEvent("page:trashed", { detail: { path: p.path } }));
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        recentDesigns={items.map((r) => ({
          id: r.id,
          title: r.title,
          path: r.path,
          updatedAt: r.updatedAtText,
          isFavorite: !!r.isFavorite,
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

            {items.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-muted/30">
                <p className="text-muted-foreground text-lg">Aún no tienes páginas. Crea la primera.</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <div
                    key={p.path}
                    className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    {/* Header de tarjeta con menú */}
                    <div className="relative" data-card-menu>
                      <Link href={`${p.path}/edit`}>
                        <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 flex items-center justify-center text-sm text-muted-foreground relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative z-10">{p.previewTitle ?? p.title ?? "Vista previa"}</span>
                        </div>
                      </Link>

                      {/* Botón tres puntitos (arriba derecha) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveMenu(activeMenu === p.id ? null : p.id);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-md bg-white/80 hover:bg-white shadow-sm border border-border transition
                                   opacity-0 group-hover:opacity-100"
                        aria-label="Abrir menú"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {/* Menú contextual */}
                      {activeMenu === p.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                          <div className="absolute top-10 right-2 z-50 w-44 bg-popover rounded-lg shadow-lg border border-border py-1">
                            {/* Toggle Favorito */}
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                  await toggleFavorite(p);
                                } finally {
                                  setActiveMenu(null);
                                }
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors text-left"
                            >
                              <Star
                                size={14}
                                className={p.isFavorite ? "text-yellow-400 fill-yellow-400" : ""}
                              />
                              {p.isFavorite ? "Quitar favorito" : "Añadir a favoritos"}
                            </button>

                            {/* Enviar a papelera */}
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                  await sendToTrash(p);
                                } finally {
                                  setActiveMenu(null);
                                }
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                            >
                              <Trash2 size={14} />
                              Enviar a papelera
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-4">
                      {/* ⭐ al inicio del título */}
                      <h3 className="font-semibold text-foreground truncate text-lg mb-1 flex items-center gap-1">
                        {p.isFavorite && (
                          <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
                        )}
                        <span className="truncate">{p.title || p.path}</span>
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4" suppressHydrationWarning>
                        Editado {p.updatedAtText}
                      </p>

                      <div className="flex gap-2">
                        {/* Ver */}
                        <Link
                          href={p.path}
                          className="flex-1 text-center text-sm px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors font-medium"
                        >
                          Ver
                        </Link>

                        {/* Editar */}
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
  );
}
