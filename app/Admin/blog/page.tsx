"use client"
import Dashboard from "../dashboard"
import { useState } from "react"
import { Upload, X } from "lucide-react"

export default function BlogAdmin() {
  const [openModal, setOpenModal] = useState(false)
    return (
      <div className="flex min-h-screen">
        <Dashboard />
          <main className="flex-1 p-8 bg-white">
            <h1 className="text-2xl font-bold text-shadow-purple-800">Gestión del Blog</h1>
            <p className="mt-2 text-purple-700">
              Administra tus entradas, revisa estadísticas y crea nuevas publicaciones.
            </p>

            <div className="mt-8">
              <button onClick={() => setOpenModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Nueva entrada
              </button>

            {/* el modal completo */}
            {openModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative border border-purple-200">
                    {/* Cerrar */}
                  <button onClick={() => setOpenModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X className="w-5 h-5" />
                  </button>
              
                  <h2 className="text-xl font-semibold text-purple-700 mb-6">Nueva entrada</h2>
                    {/* formulario solo UI */}
                    <form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">
                          Tags
                        </label>
                          <select className="w-full border border-purple-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white text-gray-700">
                            <optgroup label="General">
                              <option value="tutorial">Tutorial</option>
                              <option value="update">Correcion</option>x
                            </optgroup>
                            <optgroup label="Contenido">
                              <option value="tips">Tips y trucos</option>
                              <option value="evento">Evento</option>
                            </optgroup> {/* Tags que crearemos nosotros */}
                          </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">Título</label>
                          <input type="text" placeholder="Ej: Cómo usar Genio"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                          />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">Resumen</label>
                          <textarea placeholder="Resumen corto…"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:ring-2 focus:ring-purple-500 resize-none"> 
                          </textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">Contenido</label>
                          <textarea placeholder="Contenido completo…"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:ring-2 focus:ring-purple-500 resize-none">
                          </textarea>
                      </div>

                      {/* botones */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button type="button" onClick={() => setOpenModal(false)}
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
              )
            }

          {/* tabla de ejemplo */}
          <div className="mt-10 border border-l-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-200 text-slate-900">
                <tr>
                  <th className="p-3 font-semibold">Título</th>
                  <th className="p-3 font-semibold">Autor</th>
                  <th className="p-3 font-semibold">Fecha</th>
                  <th className="p-3 font-semibold">Descripción</th>
                  <th className="p-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-purple-200 hover:bg-purple-50">
                  <td className="p-3">Cómo usar Genio</td>
                  <td className="p-3">Carlos Sánchez</td>
                  <td className="p-3">01/11/2025</td>
                  <td className="p-3 text-sm text-gray-700">
                    En Costa Rica, muchas PYMES aún no cuentan con presencia en línea por falta de conocimientos técnicos...
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="text-purple-600 hover:underline">Editar</button>
                    <button className="text-red-500 hover:underline">Eliminar</button>
                  </td>
                </tr>

                <tr className="border-t border-purple-200 hover:bg-purple-50">
                  <td className="p-3">Nuevas funciones del editor</td>
                  <td className="p-3">Yerick Mondragón</td>
                  <td className="p-3">28/10/2025</td>
                  <td className="p-3 text-sm text-gray-700">
                    Tres elefantes se balanceaban sobre la tela de una araña...
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
