"use client"
import { Book, Edit, Save, Download, Lightbulb } from "lucide-react"

export default function Documentacion() {
  return (
    <div className="min-h-screen flex mx-auto space-y-20 mt-20 bg-white text-gray-800">

      {/* sidebar aca se agrregan mas cosas */}
      <aside className="w-64 lg:w-72 border-r border-gray-200 bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#9E30D4]">Secciones</h2>
        <ul className="space-y-3 text-gray-700 text-base">
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

      {/* todo el contenido */}
      <main className="flex-1 p-10 max-w-4xl mx-auto space-y-20 mt-20">

        {/* info general */}
        <section id="introduccion" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Introducción</h2>
          <p className="text-lg leading-relaxed">
            Bienvenido a la documentación de <strong>Genio</strong>. Aquí encontrarás una guía clara para usar todas las herramientas del editor web.
          </p>
          <p className="leading-relaxed">
            Genio te permite crear sitios profesionales sin necesidad de saber código. Con su editor visual, podés construir y publicar tu página en minutos.
          </p>
          <div className="bg-purple-50 border-l-4 border-[#9E30D4] p-5 rounded-r-lg flex gap-3">
            <Lightbulb className="w-6 h-6 text-[#9E30D4] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Consejo</p>
              <p>Usá una plantilla para comenzar más rápido y entender el flujo del editor.</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Diseñar páginas web profesionales.</li>
            <li>Personalizar colores, fuentes y elementos.</li>
            <li>Agregar imágenes, videos y botones.</li>
            <li>Publicar con un solo clic.</li>
          </ul>
        </section>

        {/* editor */}
        <section id="editor" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Edit className="w-6 h-6 text-[#9E30D4]" /> Editor
          </h2>
          <p className="text-lg leading-relaxed">
            El editor de Genio es donde diseñás todo visualmente. Arrastrá, soltá y personalizá los componentes como quieras.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Panel izquierdo: herramientas y componentes.</li>
            <li>Lienzo central: donde colocás los elementos.</li>
            <li>Panel derecho: propiedades del elemento seleccionado.</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg flex gap-3">
            <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Consejo</p>
              <p>Usá <strong>Ctrl + Z</strong> y <strong>Ctrl + Y</strong> para deshacer o rehacer rápido.</p>
            </div>
          </div>
        </section>

        {/* Guardar */}
        <section id="guardado" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Save className="w-6 h-6 text-[#9E30D4]" /> Guardado
          </h2>
          <p className="text-lg leading-relaxed">
            Genio guarda automáticamente tus progresos en la nube.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Indicador “Guardado” muestra el estado actual.</li>
            <li>Podés guardar manualmente desde el menú superior.</li>
            <li>Historial de versiones para restaurar proyectos previos.</li>
          </ul>
          <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg flex gap-3">
            <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Consejo</p>
              <p>Se hacen copias de seguridad cada 5 minutos automáticamente.</p>
            </div>
          </div>
        </section>

        {/* exportar */}
        <section id="exportar" className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Download className="w-6 h-6 text-[#9E30D4]" /> Exportar
          </h2>
          <p className="text-lg leading-relaxed">
            Una vez terminado tu sitio, podés exportarlo o publicarlo.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Publicar en línea:</strong> genera un enlace público instantáneo.</li>
            <li><strong>Descargar HTML:</strong> para alojar en tu propio servidor.</li>
            <li><strong>Exportar PDF:</strong> ideal para presentaciones o revisiones.</li>
          </ul>
          <div className="bg-purple-50 border-l-4 border-[#9E30D4] p-5 rounded-r-lg flex gap-3">
            <Lightbulb className="w-6 h-6 text-[#9E30D4] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Consejo</p>
              <p>Podés conectar tu propio dominio desde las configuraciones de publicación.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
