"use client"

import type React from "react"
import { ChevronRight, Sparkles, Bug, Zap } from "lucide-react"
import { useState } from "react"

interface Release {
  version: string
  title: string
  description: string
  date: string
  features: Array<{ icon: React.ReactNode; title: string; description: string }>
}

const releases: Release[] = [
  {
    version: "2.5.0",
    title: "Mejoras del Editor Inteligente",
    description:
      "Mejoras revolucionarias en el editor visual con sugerencias impulsadas por IA y controles de diseño avanzado. Experimenta una iteración de diseño más rápida con recomendaciones de componentes inteligentes.",
    date: "Noviembre 2024",
    features: [
      { icon: <Sparkles className="w-5 h-5" />, title: "Sugerencias de Diseño IA", description: "Recomendaciones inteligentes basadas en mejores prácticas." },
      { icon: <Zap className="w-5 h-5" />, title: "Vista Previa Instantánea", description: "Vista previa en tiempo real en todos los dispositivos." },
      { icon: <Bug className="w-5 h-5" />, title: "Correcciones de Errores", description: "Se corrigieron 12 problemas críticos." }
    ],
  },
  {
    version: "2.4.2",
    title: "Aumento de Rendimiento",
    description:
      "Motor de renderización optimizado para tiempos de carga más rápidos e interacciones más suaves.",
    date: "Octubre 2024",
    features: [
      { icon: <Zap className="w-5 h-5" />, title: "Renderización Más Rápida", description: "Tubería de renderizado optimizada." },
      { icon: <Sparkles className="w-5 h-5" />, title: "Librería de Componentes", description: "50 nuevos componentes preconstruidos." },
      { icon: <Bug className="w-5 h-5" />, title: "Estabilidad", description: "Se resolvieron fugas de memoria críticas." }
    ],
  },
  {
    version: "2.4.0",
    title: "Características de Colaboración",
    description: "Colaboración en tiempo real con usuarios simultáneos.",
    date: "Septiembre 2024",
    features: [
      { icon: <Sparkles className="w-5 h-5" />, title: "Colaboración en Tiempo Real", description: "Múltiples usuarios editando simultáneamente." },
      { icon: <Bug className="w-5 h-5" />, title: "Comentarios", description: "Comentarios fijos con notificaciones." },
      { icon: <Zap className="w-5 h-5" />, title: "Historial de Versiones", description: "Restaura versiones anteriores al instante." }
    ],
  },
]

export default function ReleasesPage() {
  const [expandedVersion, setExpandedVersion] = useState("2.5.0")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Lanzamientos</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
            Descubre las novedades en Genio. Lanzamos regularmente nuevas características, mejoras y correcciones.
          </p>
        </div>
      </div>

      {/* MOBILE SIDEBAR BUTTON */}
      <div className="md:hidden border-b border-gray-200 bg-white sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-purple-700"
        >
          Versiones
          <ChevronRight className={`transition-transform ${sidebarOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row md:min-h-screen">
        
        {/* Sidebar */}
        <aside
          className={`
            md:w-72 border-r border-gray-200 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700
            p-6 md:p-8 text-white transition-all duration-300
            ${sidebarOpen ? "block" : "hidden"} md:block
          `}
        >
          <h2 className="mb-6 md:mb-8 text-sm font-semibold uppercase tracking-wider opacity-75">Versiones</h2>
          <ul className="space-y-3 max-h-[60vh] md:max-h-none overflow-y-auto pr-2">
            {releases.map((release) => (
              <li key={release.version}>
                <button
                  onClick={() => {
                    setExpandedVersion(release.version)
                    setSidebarOpen(false)
                  }}
                  className={`block w-full text-left text-xl md:text-2xl font-bold transition-all ${
                    expandedVersion === release.version
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {release.version}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 px-6 md:px-12 py-10 md:py-16">
          {releases.map((release) => (
            <div
              key={release.version}
              className={`${expandedVersion === release.version ? "block" : "hidden"} transition-all`}
            >
              {/* Version Header */}
              <div className="mb-10 md:mb-12">
                <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2">
                  <span className="text-sm font-semibold text-purple-700">{release.date}</span>
                </div>
                <h1 className="mb-4 text-3xl md:text-5xl font-bold text-gray-900">{release.title}</h1>
                <p className="max-w-2xl text-base md:text-xl text-gray-600 leading-relaxed">{release.description}</p>
              </div>

              {/* Features Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {release.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-gray-200 bg-white p-6 md:p-8 transition-all hover:border-purple-300 hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              {expandedVersion !== releases[releases.length - 1].version && (
                <div className="my-14 md:my-16 border-t border-gray-200" />
              )}
            </div>
          ))}

          {/* CTA Section */}
          <div className="mt-16 md:mt-24 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 p-10 md:p-12 text-center text-white">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl font-bold">¿Listo para comenzar?</h2>
            <p className="mb-6 md:mb-8 text-base md:text-lg opacity-90">Crea hermosos sitios web con Genio hoy</p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-6 md:px-8 py-3 font-semibold text-purple-600 transition-all hover:shadow-lg">
              Comenzar a Construir <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
