"use client";

import { useTransition } from "react";

type CommonProps = { path: string; onDone?: () => void };

type FavMeta = {
  id: string;
  title: string;
  path: string;
  updatedAtText: string;
};

export function FavoriteButton({
  path, isFavorite, meta, onDone,
}: { path: string; isFavorite: boolean; meta?: FavMeta; onDone?: () => void }) {
  const [pending, start] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          if (typeof window !== "undefined" && meta) {
            window.dispatchEvent(
              new CustomEvent(isFavorite ? "page:unfavorited" : "page:favorited", {
                detail: isFavorite ? { id: meta.id, path: meta.path } : meta,
              }),
            );
          }
          await fetch("/api/pages/favorite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path }),
          });
          onDone?.();
        })
      }
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 hover: cursor-pointer${
        isFavorite
          ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-amber-300"
      } disabled:opacity-60 disabled:cursor-not-allowed ${pending ? "animate-pulse" : ""}`}
      title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {pending ? (
        <>
          <span className="animate-spin">◌</span>
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <span className="text-lg">{isFavorite ? "★" : "☆"}</span>
          <span>{isFavorite ? "Quitar" : "Favorito"}</span>
        </>
      )}
    </button>
  );
}

export function TrashButton({ path, onDone }: { path: string; onDone?: () => void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("page:trashed", { detail: { path } }));
          }
          await fetch("/api/pages/trash", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path }),
          });
          onDone?.();
        })
      }
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 bg-white border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 disabled:opacity-60 disabled:cursor-not-allowed${
        pending ? "animate-pulse" : ""
      }`}
    >
      {pending ? (
        <>
          <span className="animate-spin">◌</span>
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <span className="text-lg">🗑</span>
          <span>Papelera</span>
        </>
      )}
    </button>
  );
}

export function RestoreButton({ path, onDone }: { path: string; onDone?: () => void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("page:restored", { detail: { path } }));
          }
          await fetch("/api/pages/restore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path }),
          });
          onDone?.();
        })
      }
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed ${
        pending ? "animate-pulse" : ""
      }`}
    >
      {pending ? (
        <>
          <span className="animate-spin">◌</span>
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <span className="text-lg">↶</span>
          <span>Restaurar</span>
        </>
      )}
    </button>
  );
}

export function DeleteForeverButton({ path }: CommonProps) {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("page:confirm-delete", { detail: { path } }));
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 bg-white border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
    >
      <span className="text-lg">✕</span>
      <span>Eliminar definitivo</span>
    </button>
  );
}

