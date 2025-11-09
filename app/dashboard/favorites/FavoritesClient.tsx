"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Layout/Sidebar";
import DashboardHeader from "@/app/components/Layout/Dashboard-header";
import { FavoriteButton, TrashButton } from "@/app/components/Layout/PageActions";
import { Star } from "lucide-react";

type RecentItem = {
  id: string;
  title: string;
  path: string;
  updatedAtText: string;
  isFavorite?: boolean;
};

type FavoriteItem = RecentItem & { isFavorite: boolean };

export default function FavoritesClient({
  recentDesigns,
  favorites,
}: {
  recentDesigns: RecentItem[];
  favorites: FavoriteItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<FavoriteItem[]>(() => [...favorites]);

  useEffect(() => setItems(favorites), [favorites]);

  // Eventos globales para mantenerse en sync sin refrescar
  useEffect(() => {
    const onFav = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      const fromRecent = recentDesigns.find((r) => r.path === path);
      if (fromRecent && !items.some((i) => i.path === path)) {
        setItems((prev) => [
          { ...fromRecent, isFavorite: true } as FavoriteItem,
          ...prev,
        ]);
      }
    };
    const onUnfav = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setItems((prev) => prev.filter((i) => i.path !== path));
    };
    const onTrash = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setItems((prev) => prev.filter((i) => i.path !== path));
    };

    window.addEventListener("page:favorited", onFav as EventListener);
    window.addEventListener("page:unfavorited", onUnfav as EventListener);
    window.addEventListener("page:trashed", onTrash as EventListener);
    return () => {
      window.removeEventListener("page:favorited", onFav as EventListener);
      window.removeEventListener("page:unfavorited", onUnfav as EventListener);
      window.removeEventListener("page:trashed", onTrash as EventListener);
    };
  }, [items, recentDesigns]);

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
                <h1 className="text-3xl font-bold text-foreground">Favoritos</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Tus páginas marcadas con estrella
                </p>
              </div>
              <div />
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-muted/30">
                <p className="text-muted-foreground text-lg">
                  No tienes páginas favoritas. Marca alguna desde “Recientes”.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <div
                    key={p.path}
                    className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <Link href={`${p.path}/edit`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 flex items-center justify-center text-sm text-muted-foreground relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">{p.title}</span>
                      </div>
                    </Link>

                    <div className="p-4">
                      {/* ⭐ al inicio del título */}
                      <h3 className="font-semibold text-foreground truncate text-lg mb-1 flex items-center gap-1">
                        {p.isFavorite && (
                          <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />
                        )}
                        <span className="truncate">{p.title}</span>
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4" suppressHydrationWarning>
                        Editado {p.updatedAtText}
                      </p>

                      <div className="flex gap-2">
                        <FavoriteButton
                          path={p.path}
                          isFavorite={!!p.isFavorite}
                          meta={{
                            id: p.id,
                            title: p.title,
                            path: p.path,
                            updatedAtText: p.updatedAtText,
                          }}
                          onDone={() => {
                            // - page:unfavorited -> lo quita
                          }}
                        />
                        <TrashButton
                          path={p.path}
                          onDone={() => {
                            setItems((prev) => prev.filter((i) => i.path !== p.path));
                            window.dispatchEvent(
                              new CustomEvent("page:trashed", { detail: { path: p.path } })
                            );
                          }}
                        />
                        <Link
                          href={p.path}
                          className="ml-auto text-sm px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors font-medium"
                        >
                          Ver
                        </Link>
                        <Link
                          href={`${p.path}/edit`}
                          className="text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:from-fuchsia-600 hover:to-purple-700 transition-all font-medium shadow-md shadow-fuchsia-500/20"
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

