"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Layout/Sidebar";
import DashboardHeader from "@/app/components/Layout/Dashboard-header";
import { RestoreButton, DeleteForeverButton } from "@/app/components/Layout/PageActions";
import ConfirmDeleteModal from "@/app/components/Common/ConfirmDeleteModal";
import { Star } from "lucide-react";
import Sure from "../../GIO-mascota/emote-thinking.svg";

type RecentItem = {
  id: string;
  title: string;
  path: string;
  updatedAt: string;
  isFavorite?: boolean;
};

type TrashItem = {
  id: string;
  title: string;
  path: string;
  deletedAtText: string;
  left: number;
  canDeleteForever: boolean; // ya no bloquea, solo informativo
  isFavorite?: boolean;
};

export default function DeletedClient({
  recentDesigns,
  items: serverItems,
}: {
  recentDesigns: RecentItem[];
  items: TrashItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<TrashItem[]>(serverItems);

  // Estado del modal centralizado
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setItems(serverItems), [serverItems]);

  // Escucha el evento del botón para abrir el modal
  useEffect(() => {
    function onAskConfirm(e: Event) {
      const { path } = (e as CustomEvent<{ path: string }>).detail || {};
      if (!path) return;
      setTargetPath(path);
      setConfirmOpen(true);
    }
    window.addEventListener("page:confirm-delete", onAskConfirm as EventListener);
    return () => window.removeEventListener("page:confirm-delete", onAskConfirm as EventListener);
  }, []);

  async function handleConfirmDelete() {
    if (!targetPath) return;
    try {
      setLoading(true);
      await fetch("/api/pages/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: targetPath, force: true }), // elimina sin esperar 7 días
      });

      // Quita del grid y notifica globalmente
      setItems((prev) => prev.filter((i) => i.path !== targetPath));
      window.dispatchEvent(new CustomEvent("page:deleted", { detail: { path: targetPath } }));
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setTargetPath(null);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        recentDesigns={recentDesigns.map((r) => ({
          id: r.id,
          title: r.title,
          path: r.path,
          updatedAt: r.updatedAt,
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
                <h1 className="text-3xl font-bold text-foreground">Papelera</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Los elementos se eliminan automáticamente después de 7 días.
                </p>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-muted/30">
                <p className="text-muted-foreground text-lg">No hay páginas en la papelera.</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate text-lg mb-1 flex items-center gap-1">
                        {p.isFavorite && <Star size={14} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                        <span className="truncate">{p.title}</span>
                      </h3>

                      <p className="text-xs text-muted-foreground mb-2" suppressHydrationWarning>
                        En papelera desde {p.deletedAtText}
                      </p>
                      <p className="text-xs">
                        Se eliminará en <b>{p.left}</b> {p.left === 1 ? "día" : "días"}.
                      </p>

                      <div className="flex gap-2 mt-4 items-center">
                        <RestoreButton
                          path={p.path}
                          onDone={() => {
                            setItems((prev) => prev.filter((i) => i.path !== p.path));
                            window.dispatchEvent(new CustomEvent("page:restored", { detail: { path: p.path } }));
                            if (p.isFavorite) {
                              window.dispatchEvent(
                                new CustomEvent("page:favorited", {
                                  detail: {
                                    id: p.id,
                                    title: p.title,
                                    path: p.path,
                                    updatedAtText: new Date().toLocaleString("es-CR"),
                                  },
                                }),
                              );
                            }
                          }}
                        />

                        {/* Abre modal mediante evento */}
                        <DeleteForeverButton path={p.path} />

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal centralizado */}
      <ConfirmDeleteModal
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          setTargetPath(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Estas seguro de eliminar esta página definitivamente?"
        description="Esta acción es permanente. No podrás recuperar la página."
        imageSrc={Sure.src}
      />
    </div>
  );
}
