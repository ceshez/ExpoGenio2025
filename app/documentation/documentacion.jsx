"use client"

import { Book, Edit, Save, Download, Lightbulb, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Documentacion() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Documentación</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
            Aprende a usar Genio con esta guía completa y clara.
          </p>
        </div>
      </div>

      {/* MOBILE SIDEBAR TOGGLE */}
      <div className="md:hidden border-b border-gray-200 bg-white sticky top-[76px] z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-purple-700"
        >
          Secciones
          <ChevronRight className={`transition-all ${sidebarOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <aside
          className={`
            md:w-64 lg:w-72 border-r border-gray-200 bg-white p-6 md:p-8
            transition-all duration-300
            ${sidebarOpen ? "block" : "hidden"} md:block
          `}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#9E30D4]">Secciones</h2>

          <ul className="space-y-3 text-gray-700 text-base max-h-[60vh] md:max-h-none overflow-y-auto pr-2">

            <li className="hover:text-[#9E30D4] cursor-pointer flex items-center gap-2">
              <Book className="w-5 h-5 text-[#9E30D4]" /> Introducción
            </li>

            <li className="hover:text-[#9E30D4] cursor-pointer flex items-center gap-2">
              <Edit className="w-5 h-5 text-[#9E30D4]" /> Editor
            </li>

            <li className="hover:text-[#9E30D4] cursor-pointer flex items-center gap-2">
              <Save className="w-5 h-5 text-[#9E30D4]" /> Guardado
            </li>

            <li className="hover:text-[#9E30D4] cursor-pointer flex items-center gap-2">
              <Download className="w-5 h-5 text-[#9E30D4]" /> Exportar
            </li>

          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-16 md:space-y-20">

          {/* Introducción */}
          <section id="introduccion" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Introducción</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Bienvenido a la documentación de <strong>Genio</strong>. Aquí encontrarás una guía clara para usar todas las herramientas del editor web.
            </p>
            <p className="leading-relaxed">
              Genio te permite crear sitios profesionales sin saber código. Usá el editor visual para construir tu página en minutos.
            </p>

            <div className="bg-purple-50 border-l-4 border-[#9E30D4] p-5 rounded-r-lg flex gap-3">
              <Lightbulb className="w-6 h-6 text-[#9E30D4] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Consejo</p>
                <p>Comenzá con una plantilla para avanzar más rápido.</p>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Diseñar páginas web profesionales.</li>
              <li>Personalizar colores, fuentes y elementos.</li>
              <li>Agregar imágenes, videos y botones.</li>
              <li>Publicar con un solo clic.</li>
            </ul>
          </section>

          {/* Editor */}
          <section id="editor" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Edit className="w-6 h-6 text-[#9E30D4]" /> Editor
            </h2>

            <p className="text-base md:text-lg leading-relaxed">
              El editor de Genio es donde diseñás todo visualmente. Arrastrá, soltá y personalizá componentes.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Panel izquierdo: componentes.</li>
              <li>Lienzo central: zona de diseño.</li>
              <li>Panel derecho: propiedades.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg flex gap-3">
              <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Consejo</p>
                <p>Usá <strong>Ctrl + Z</strong> y <strong>Ctrl + Y</strong> para deshacer y rehacer.</p>
              </div>
            </div>
          </section>

          {/* Guardado */}
          <section id="guardado" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Save className="w-6 h-6 text-[#9E30D4]" /> Guardado
            </h2>

            <p className="text-base md:text-lg leading-relaxed">
              Genio guarda automáticamente tu progreso en la nube.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Indicador de guardado visible.</li>
              <li>Botón para guardar manualmente.</li>
              <li>Historial de versiones integrado.</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg flex gap-3">
              <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Consejo</p>
                <p>Se hace un backup automático cada 5 minutos.</p>
              </div>
            </div>
          </section>

          {/* Exportar */}
          <section id="exportar" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Download className="w-6 h-6 text-[#9E30D4]" /> Exportar
            </h2>

            <p className="text-base md:text-lg leading-relaxed">
              Al terminar tu sitio, podés exportarlo o publicarlo.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li><strong>Publicar:</strong> enlace público instantáneo.</li>
              <li><strong>HTML descargable:</strong> para tu servidor.</li>
              <li><strong>Exportar PDF:</strong> ideal para presentar.</li>
            </ul>

            <div className="bg-purple-50 border-l-4 border-[#9E30D4] p-5 rounded-r-lg flex gap-3">
              <Lightbulb className="w-6 h-6 text-[#9E30D4] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Consejo</p>
                <p>Podés conectar tu propio dominio fácilmente.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
