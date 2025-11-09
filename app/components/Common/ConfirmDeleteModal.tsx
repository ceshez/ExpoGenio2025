"use client";

import { X } from "lucide-react";
import Image from "next/image";

export default function ConfirmDeleteModal({
  open,
  title = "Eliminar página",
  description = "Esta acción es permanente. No podrás recuperar la página.",
  imageSrc = "../../GIO-mascota/GIO2.0.svg",
  onCancel,
  onConfirm,
  confirmText = "Sí, eliminar definitivamente",
  cancelText = "Cancelar",
  loading = false,
}: {
  open: boolean;
  title?: string;
  description?: string;
  imageSrc?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 z-10"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
          {/* Izquierda */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
              <p className="text-sm md:text-base text-gray-600">{description}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition-colors"
                disabled={loading}
              >
                {loading ? "Eliminando..." : confirmText}
              </button>
            </div>
          </div>

          {/* Derecha */}
          <div className="relative bg-gray-50 flex items-center justify-center">
            {/* Usa Image si es archivo estático en /public, o <img> si es ruta externa */}
            <Image src={imageSrc} alt="Mascota del proyecto" width={360} height={360} className="object-contain p-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
