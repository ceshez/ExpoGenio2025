// app/dashboard/deleted/DeletedClient.tsx (CLIENT)
"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/Layout/Sidebar";
import DashboardHeader from "@/app/components/Layout/Dashboard-header";
import { RestoreButton, DeleteForeverButton } from "@/app/components/Layout/PageActions";

type RecentItem = {
  id: string;
  title: string;
  path: string;
  updatedAt: string; 
};

type TrashItem = {
  id: string;
  title: string;
  path: string;
  deletedAtText: string;
  left: number; 
  canDeleteForever: boolean;
};

export default function DeletedClient({
  recentDesigns,
  items,
}: {
  recentDesigns: RecentItem[];
  items: TrashItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        recentDesigns={recentDesigns}
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
                <p className="text-muted-foreground text-lg">
                  No hay páginas en la papelera.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate text-lg mb-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2" suppressHydrationWarning>
                        En papelera desde {p.deletedAtText}
                      </p>
                      <p className="text-xs">
                        Se eliminará en <b>{p.left}</b> {p.left === 1 ? "día" : "días"}.
                      </p>
                        <div className="flex gap-2 mt-4 items-center">
                        <RestoreButton path={p.path} />

                        {p.canDeleteForever ? (
                        <DeleteForeverButton path={p.path} />
                        ) : (
                            <button
                             type="button"
                             disabled
                             className="px-3 py-2 text-sm rounded-lg border border-border bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
                             title={`Espera ${p.left} ${p.left === 1 ? "día" : "días"}`}
                           >
                            Borrar
                            </button>
                        )}

                            {!p.canDeleteForever && (
                              <span className="ml-auto text-xs text-gray-400">
                                (espera {p.left} {p.left === 1 ? "día" : "días"})
                              </span>
                            )}

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
