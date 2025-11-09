"use client"
import Dashboard from "../dashboard"
import { useState } from "react"
import { X, Video, Upload } from "lucide-react"

export default function VideosAdmin() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Dashboard />
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-2xl font-bold text-shadow-purple-800">Gestión de Videos</h1>
          <p className="mt-2 text-purple-700">
            Administra tus videos, actualiza información o elimina contenido.
          </p>

          <div className="mt-8">
            <button onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
            Nuevo video
            </button>

          {/* modal completo */}
          {openModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative border">

              {/* Boton pa cerrar */}
              <button onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold text-purple-700 mb-6">
                Agregar nuevo video
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* dividirlo en 2 columnas */}
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">
                      Título 
                    </label>
                    <input type="text" placeholder="Ej: Tutorial de Genio"
                      className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">
                      Descripción 
                    </label>
                    <textarea placeholder="Describe brevemente el contenido del video…"
                      className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm h-28 resize-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                </form>

                <div className="space-y-4">
                  <div className="w-full h-40 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Video className="w-10 h-10 text-gray-500" />
                    {/* si ya hay archivo del thumnail se agrega:
                <img src="thumbnailUrl" className="w-full h-full object-cover" />
                    */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">
                      Archivo del video 
                    </label>
                    <input type="file" placeholder="https://youtube.com/..."
                      className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">
                      Miniatura 
                    </label>
                    <input type="text" placeholder="https://imagen.com/miniatura.png"
                      className="w-full border border-purple-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                </div>

              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Guardar
                </button>
              </div>

    </div>
  </div>
)}

          {/* TABLA */}
          <div className="mt-10 border border-l-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-200 text-slate-900">
                <tr>
                  <th className="p-3 font-semibold">Miniatura</th>
                  <th className="p-3 font-semibold">Título</th>
                  <th className="p-3 font-semibold">Autor</th>
                  <th className="p-3 font-semibold">Fecha</th>
                  <th className="p-3 font-semibold">Resumen</th>
                  <th className="p-3 font-semibold">Video</th>
                  <th className="p-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-purple-200 hover:bg-purple-50">
                  <td className="p-3">
                    <div className="w-14 h-10 bg-purple-200 rounded flex items-center justify-center text-purple-700">
                      <Video className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="p-3">Tutorial Drag & Drop</td>
                  <td className="p-3">Carlos Sánchez</td>
                  <td className="p-3">01/12/2025</td>
                  <td className="p-3 text-sm text-gray-700">
                    Aprende a arrastrar elementos en Genio.
                  </td>
                  <td className="p-3">
                    <button className="text-purple-600 hover:underline">Ver</button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="text-purple-600 hover:underline">Editar</button>
                    <button className="text-red-500 hover:underline">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}
