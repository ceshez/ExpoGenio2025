"use client"
import Dashboard from "../dashboard"
import { useState } from "react"
import { Upload, X, Video } from "lucide-react"

export default function VideosAdmin() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Dashboard />

      <main className="flex-1 p-8 bg-[#faf7fc]">
        <h1 className="text-2xl font-bold text-[#563761]">Gestión de Videos</h1>
        <p className="mt-2 text-[#7c5c9b]">
          Administra tus videos, actualiza información o elimina contenido.
        </p>

        <div className="mt-8">
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:opacity-90"
          >
            Nuevo video
          </button>

          {/* MODAL */}
          {openModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative border border-[#E2C9ED]">
                {/* BOTÓN CERRAR */}
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-[#563761] mb-6">Agregar nuevo video</h2>

                <form className="space-y-5">
                  {/* TÍTULO */}
                  <div>
                    <label className="block text-sm font-medium text-[#563761] mb-1">Título</label>
                    <input
                      type="text"
                      placeholder="Ej: Tutorial de Genio Drag & Drop"
                      className="w-full border border-[#E2C9ED] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-700 focus:outline-none"
                    />
                  </div>

                  {/* DESCRIPCIÓN */}
                  <div>
                    <label className="block text-sm font-medium text-[#563761] mb-1">
                      Descripción corta
                    </label>
                    <textarea
                      placeholder="Describe brevemente el video..."
                      className="w-full border border-[#E2C9ED] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-fuchsia-600 focus:outline-none"
                    />
                  </div>

                  {/* MINIATURA */}
                  <div>
                    <label className="block text-sm font-medium text-[#563761] mb-1">
                      Miniatura
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer flex items-center gap-2 bg-[#EADAF2] text-[#563761] px-4 py-2 rounded-md hover:bg-[#E2C9ED] transition">
                        <Upload className="w-4 h-4" />
                        <span>Subir imagen</span>
                        <input type="file" className="hidden" />
                      </label>
                      <span className="text-sm text-gray-500">.png, .jpg, .svg</span>
                    </div>
                  </div>

                  {/* VIDEO */}
                  <div>
                    <label className="block text-sm font-medium text-[#563761] mb-1">
                      Archivo de video
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer flex items-center gap-2 bg-[#EADAF2] text-[#563761] px-4 py-2 rounded-md hover:bg-[#E2C9ED] transition">
                        <Video className="w-4 h-4" />
                        <span>Subir video</span>
                        <input type="file" className="hidden" accept="video/*" />
                      </label>
                      <span className="text-sm text-gray-500">.mp4, .mov, .webm</span>
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-[#EADAF2]">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 text-[#563761] bg-gray-200 rounded-md hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:opacity-90"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TABLA */}
          <div className="mt-10 border border-[#EADAF2] rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#EADAF2] text-[#563761]">
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
                <tr className="border-t border-[#EADAF2] hover:bg-[#f9f5fb]">
                  <td className="p-3">
                    <div className="w-14 h-10 bg-[#EADAF2] rounded flex items-center justify-center text-[#563761]">
                      <Video className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="p-3">Tutorial Drag & Drop</td>
                  <td className="p-3">Carlos Sánchez</td>
                  <td className="p-3">01/12/2025</td>
                  <td className="p-3 text-sm text-gray-700">
                    Aprende cómo arrastrar y organizar elementos dentro del editor visual de Genio.
                  </td>
                  <td className="p-3">
                    <button className="text-[#9E30D4] hover:underline">Descargar</button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="text-[#9E30D4] hover:underline">Editar</button>
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
