// app/dashboard/components/PageActions.tsx
"use client";

import { useTransition } from "react";

export function FavoriteButton({ path, isFavorite, onDone }: { path: string; isFavorite: boolean; onDone?: ()=>void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(async () => {
        await fetch("/api/pages/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, favorite: !isFavorite })
        });
        onDone?.();
      })}
      className={`px-3 py-1 rounded border ${isFavorite ? "bg-yellow-200" : "bg-white"} hover:bg-yellow-100`}
    >
      {pending ? "..." : isFavorite ? "★ Quitar" : "☆ Favorito"}
    </button>
  );
}

export function TrashButton({ path, onDone }: { path: string; onDone?: ()=>void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(async () => {
        await fetch("/api/pages/trash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path })
        });
        onDone?.();
      })}
      className="px-3 py-1 rounded border bg-white hover:bg-red-50"
    >
      {pending ? "..." : "Enviar a papelera"}
    </button>
  );
}

export function RestoreButton({ path, onDone }: { path: string; onDone?: ()=>void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(async () => {
        await fetch("/api/pages/restore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path })
        });
        onDone?.();
      })}
      className="px-3 py-1 rounded border bg-white hover:bg-emerald-50"
    >
      {pending ? "..." : "Restaurar"}
    </button>
  );
}

export function DeleteForeverButton({ path, onDone }: { path: string; onDone?: ()=>void }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(async () => {
        await fetch("/api/pages/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path })
        });
        onDone?.();
      })}
      className="px-3 py-1 rounded border bg-white hover:bg-red-100 text-red-600"
    >
      {pending ? "..." : "Eliminar definitivo"}
    </button>
  );
}
