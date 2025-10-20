// app/dashboard/new/TitleField.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function TitleField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const [slug, setSlug] = useState("/");

  // debounce de 350ms
  const debouncedTitle = useDebounce(title, 350);

  useEffect(() => {
    if (!debouncedTitle) {
      setStatus("idle");
      setSlug("/");
      inputRef.current?.setCustomValidity("");
      return;
    }
    let cancelled = false;
    setStatus("checking");
    fetch(`/api/pages/check?title=${encodeURIComponent(debouncedTitle)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data?.ok) return;
        setSlug(data.slug);
        if (data.available) {
          setStatus("ok");
          inputRef.current?.setCustomValidity("");
        } else {
          setStatus("taken");
          inputRef.current?.setCustomValidity("Ese nombre ya está en uso");
        }
      })
      .catch(() => {
        // no bloqueamos el submit por errores de red
        setStatus("idle");
        inputRef.current?.setCustomValidity("");
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedTitle]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Nombre del sitio</label>
      <input
        ref={inputRef}
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej. Mi landing"
        className="w-full border p-2 rounded"
        required
      />
      <div className="text-xs">
        {status === "checking" && <span className="text-gray-500">Comprobando si ya existe...</span>}
        {status === "ok" && (
          <span className="text-green-600">Disponible — URL: <code>{slug}</code></span>
        )}
        {status === "taken" && (
          <span className="text-red-600  ">Ya tienes una pagina con ese nombre — intenta con otro</span>
        )}
        {status === "idle" && <span className="text-gray-400">Se generará una URL automáticamente</span>}
      </div>
    </div>
  );
}

function useDebounce<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}
