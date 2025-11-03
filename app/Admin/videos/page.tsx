"use client"
import Dashboard from "../dashboard"
import {Youtube, Download} from "lucide-react"
export default function VideosAdmin() {
  return (
    <div className="flex min-h-screen">
      <Dashboard />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de videos</h1>
        <p className="mt-2 text-slate-600">
          Administra tus videos, actualiza informacion o elimina videos.
        </p>

        <div className="mt-8">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Nuevo video
          </button>

          {/* ejemplo de tabla como las de yutu muejeje aca seria con la base de datos*/}
          <div className="mt-6 border rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-100">
                <tr>
                  <th className="p-3 text-slate-700">miniatura</th>
                  <th className="p-3 text-slate-700">Título</th>
                  <th className="p-3 text-slate-700">nombre</th>
                  <th className="p-3 text-slate-700">Fecha</th>
                  <th className="p-3 text-slate-700">Resumen</th>
                  <th className="p-3 text-slate-700">Video</th>
                  <th className="p-3 text-slate-700 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="w-22 h-22"><Youtube/></td> {/* Aca seria la imagen de miniatura*/}
                  <td className="p-3">Tutorial drag and drop</td>
                  <td className="p-3">Carlos Sanchez</td>
                  <td className="p-3">01/12/67</td>
                  <td className="p-3">En Costa Rica, muchas PYMES aún no cuentan con presencia en línea por falta de conocimientos técnicos</td>
                  <td className="w-22 h-22"><Download/></td>{/* Aca seria el archivo*/}
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
