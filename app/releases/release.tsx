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
      {
        icon: <Sparkles className="w-5 h-5" />,
        title: "Sugerencias de Diseño IA",
        description:
          "Recomendaciones inteligentes para la colocación de componentes y espaciado basadas en mejores prácticas de diseño.",
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Vista Previa Instantánea",
        description: "Vista previa en tiempo real en todos los dispositivos sin retrasos ni ralentizaciones.",
      },
      {
        icon: <Bug className="w-5 h-5" />,
        title: "Correcciones de Errores",
        description:
          "Se corrigieron 12 problemas críticos incluyendo fallos de diseño responsivo y errores de exportación.",
      },
    ],
  },
  {
    version: "2.4.2",
    title: "Aumento de Rendimiento",
    description:
      "Motor de renderización optimizado para tiempos de carga más rápidos e interacciones más suaves. El editor ahora carga 40% más rápido y maneja proyectos grandes sin degradación del rendimiento.",
    date: "Octubre 2024",
    features: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Renderización Más Rápida",
        description: "Tubería de renderización mejorada con actualizaciones DOM virtual optimizadas.",
      },
      {
        icon: <Sparkles className="w-5 h-5" />,
        title: "Librería de Componentes",
        description: "50 nuevos componentes preconstruidos para patrones de diseño comunes.",
      },
      {
        icon: <Bug className="w-5 h-5" />,
        title: "Estabilidad",
        description: "Se resolvieron problemas de fuga de memoria que causaban bloqueos en proyectos complejos.",
      },
    ],
  },
  {
    version: "2.4.0",
    title: "Características de Colaboración",
    description:
      "Trabaja juntos sin problemas con herramientas de colaboración en tiempo real. Invita a miembros del equipo, ve ediciones en directo y comenta directamente en componentes.",
    date: "Septiembre 2024",
    features: [
      {
        icon: <Sparkles className="w-5 h-5" />,
        title: "Colaboración en Tiempo Real",
        description: "Múltiples usuarios pueden editar el mismo proyecto simultáneamente con cursores en vivo.",
      },
      {
        icon: <Bug className="w-5 h-5" />,
        title: "Comentarios y Retroalimentación",
        description: "Fija comentarios en elementos específicos y recibe notificaciones instantáneas.",
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Historial de Versiones",
        description: "Historial completo de revisiones con la capacidad de restaurar versiones anteriores al instante.",
      },
    ],
  },
]

export default function ReleasesPage() {
  const [expandedVersion, setExpandedVersion] = useState<string>("2.5.0")

  return (
    <div className="min-h-screen bg-gradient-to-br py-6 NMBchLIEUFJKcnbKMmnbC , J8IZSFOU8V8AHFO8903219'RUJLJKHASCN OY VCIHINOfrom-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-5xl font-bold text-gray-900">Lanzamientos</h1>
          <p className="mt-4 text-lg text-gray-600">
            Descubre las novedades en Genio. Lanzamos regularmente nuevas características, mejoras y correcciones de
            errores.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-gray-200 bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 p-8 text-white">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider opacity-75">Versiones</h2>
          <ul className="space-y-3">
            {releases.map((release) => (
              <li key={release.version}>
                <button
                  onClick={() => setExpandedVersion(release.version)}
                  className={`block w-full text-left text-2xl font-bold transition-all ${
                    expandedVersion === release.version ? "text-white" : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {release.version}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 px-12 py-16">
          {releases.map((release) => (
            <div
              key={release.version}
              className={`transition-all duration-300 ${expandedVersion === release.version ? "block" : "hidden"}`}
            >
              {/* Version Header */}
              <div className="mb-12">
                <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2">
                  <span className="text-sm font-semibold text-purple-700">{release.date}</span>
                </div>
                <h1 className="mb-4 text-5xl font-bold text-gray-900">{release.title}</h1>
                <p className="max-w-2xl text-xl leading-relaxed text-gray-600">{release.description}</p>
              </div>

              {/* Features Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {release.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-purple-300 hover:shadow-lg"
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
                <div className="my-16 border-t border-gray-200" />
              )}
            </div>
          ))}

          {/* CTA Section */}
          <div className="mt-24 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">¿Listo para comenzar?</h2>
            <p className="mb-8 text-lg opacity-90">Crea hermosos sitios web con Genio hoy</p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition-all hover:shadow-lg">
              Comenzar a Construir <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
