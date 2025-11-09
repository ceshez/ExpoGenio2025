"use client"
import Dashboard from "../dashboard"
import { useState } from "react"
import { Earth, X, Upload } from "lucide-react"

export default function SociosAdmin() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Dashboard />

      <main className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold text-shadow-purple-800">Gestión de Socios</h1>
        <p className="mt-2 text-purple-700">
          Administra los aliados que colaboran con GENIO.
        </p>

        <div className="mt-8">
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-70"
          >
            Nuevo socio
          </button>

          {/* MODAL: Nuevo socio */}
          {openModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative border">
                
                {/* Botón cerrar */}
                <button onClick={() => setOpenModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold text-purple-700 mb-6">Nuevo socio</h2>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Nombre del socio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: MEIC"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Logo (URL o directamente el archivo) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Logo (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://url-del-logo.png"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      También podés subir un archivo más adelante.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Descripción 
                    </label>
                    <textarea
                      placeholder="Ej: Aliado estratégico que apoyó el desarrollo del proyecto..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button" onClick={() => setOpenModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                      Cancelar
                    </button>
                    <button type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Ejemplo de tabla */}
          <div className="mt-10 border border-l-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-200 text-slate-900">
                <tr>
                  <th className="p-3 font-semibold">Nombre</th>
                  <th className="p-3 font-semibold">Logo</th>
                  <th className="p-3 font-semibold">Descripción</th>
                  <th className="p-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-purple-200 hover:bg-purple-50">
                  <td className="p-3">MEIC</td>
                  <td className="p-3"><Earth className="w-10 h-10 text-purple-700" /></td>
                  <td className="p-3 text-sm text-gray-700">
                    Proyecto aliado para digitalizar PYMEs y facilitar herramientas visuales...
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
