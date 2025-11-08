"use client"

import { useState } from "react"
// Importación de las secciones de configuración
import { SeccionSeguridad } from "./seccion-seguridad"
import { SeccionApariencia } from "./seccion-apariencia"
import { SeccionPerfil } from "./seccion-perfil"
import { NotificacionToast } from "./notificacion-toast"
// Iconos de Lucide para la interfaz
import { Shield, Palette, User } from "lucide-react"

// Tipo para las secciones disponibles en la configuración
type Seccion = "seguridad" | "apariencia" | "perfil"

/**
 * Componente principal del diseño de configuración
 * Maneja la navegación entre secciones y muestra notificaciones toast
 */
export function DisenoConfiguracion() {
  // Estado para controlar qué sección está activa
  const [seccionActiva, setSeccionActiva] = useState<Seccion>("seguridad")
  // Estado para controlar la visibilidad del toast de confirmación
  const [mostrarToast, setMostrarToast] = useState(false)

  /**
   * Función que se ejecuta al guardar cambios
   * Muestra el toast de confirmación por 3 segundos
   */
  const manejarGuardado = () => {
    setMostrarToast(true)
    setTimeout(() => setMostrarToast(false), 3000)
  }

  // Configuración de las secciones disponibles con sus iconos y etiquetas
  const secciones = [
    { id: "seguridad" as Seccion, etiqueta: "Seguridad", icono: Shield },
    { id: "apariencia" as Seccion, etiqueta: "Apariencia", icono: Palette },
    { id: "perfil" as Seccion, etiqueta: "Perfil", icono: User },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-purple-50/20 dark:bg-background">
      {/* Contenedor principal con padding responsivo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Encabezado de la página */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 text-balance">
            Configuración
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-balance">
            Administra tu cuenta y preferencias de Genio
          </p>
        </div>

        {/* Layout principal: sidebar + contenido */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar de navegación */}
          <aside className="lg:w-64 shrink-0">
            {/* Navegación móvil: tabs horizontales con scroll */}
            <nav className="lg:hidden bg-card/50 backdrop-blur-sm border border-border rounded-xl p-2 shadow-sm overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {secciones.map((seccion) => {
                  const Icono = seccion.icono
                  return (
                    <button
                      key={seccion.id}
                      onClick={() => setSeccionActiva(seccion.id)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                        seccionActiva === seccion.id
                          ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Icono className="w-4 h-4" />
                      <span className="font-medium">{seccion.etiqueta}</span>
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* Navegación desktop: sidebar vertical */}
            <nav className="hidden lg:block bg-card/50 backdrop-blur-sm border border-border rounded-xl p-2 shadow-sm">
              {secciones.map((seccion) => {
                const Icono = seccion.icono
                return (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActiva(seccion.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      seccionActiva === seccion.id
                        ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icono className="w-5 h-5" />
                    <span className="font-medium">{seccion.etiqueta}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Área de contenido principal */}
          <main className="flex-1 min-w-0">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-sm overflow-hidden">
              {/* Renderizado condicional de las secciones según la selección */}
              {seccionActiva === "seguridad" && <SeccionSeguridad onGuardar={manejarGuardado} />}
              {seccionActiva === "apariencia" && <SeccionApariencia onGuardar={manejarGuardado} />}
              {seccionActiva === "perfil" && <SeccionPerfil onGuardar={manejarGuardado} />}
            </div>
          </main>
        </div>
      </div>

      {/* Notificación toast de confirmación */}
      <NotificacionToast mostrar={mostrarToast} />
    </div>
  )
}
