"use client"

import { CheckCircle2 } from "lucide-react"

// Props del componente
interface NotificacionToastProps {
  mostrar: boolean
}

/**
 * Componente de notificación toast
 * Muestra un mensaje de confirmación cuando se guardan cambios exitosamente
 * Se anima desde abajo hacia arriba con fade in/out
 */
export function NotificacionToast({ mostrar }: NotificacionToastProps) {
  return (
    <div
      className={`fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 transition-all duration-300 ${
        mostrar ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Card del toast con gradiente verde y efecto glassmorphism */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl shadow-green-500/40 flex items-center gap-3 backdrop-blur-sm border border-green-400/20">
        {/* Icono de check con fondo semi-transparente */}
        <div className="bg-white/20 rounded-full p-1">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {/* Texto del mensaje */}
        <div>
          <p className="font-semibold text-sm sm:text-base">¡Éxito!</p>
          <p className="text-xs sm:text-sm text-green-50">Cambios guardados correctamente</p>
        </div>
      </div>
    </div>
  )
}
