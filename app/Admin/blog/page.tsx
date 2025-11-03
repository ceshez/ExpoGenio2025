"use client"
import Dashboard from "../dashboard"

export default function BlogAdmin() {
  return (
    <div className="flex min-h-screen">
      <Dashboard />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-slate-800">Gestión del Blog</h1>
        <p className="mt-2 text-slate-600">
          Administra tus entradas, revisa estadísticas y crea nuevas publicaciones.
        </p>

        <div className="mt-8">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Nueva entrada
          </button>

          {/* ejemplo de tabla como las de yutu muejeje aca seria con la base de datos*/}
          <div className="mt-6 border rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-purple-100">
                <tr>
                  <th className="p-3 text-slate-700">Título</th>
                  <th className="p-3 text-slate-700">Autor</th>
                  <th className="p-3 text-slate-700">Fecha</th>
                  <th className="p-3 text-slate-700">Descripcion</th>
                  <th className="p-3 text-slate-700 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Cómo usar Genio</td>
                  <td className="p-3">Carlos Sánchez</td>
                  <td className="p-3">01/11/2025</td>
                  <td className="p-3">En Costa Rica, muchas PYMES aún no cuentan con presencia en línea por falta de conocimientos técnicos. 
                                Con herramientas visuales como GENIO, puedes diseñar y publicar tu sitio web en minutos, 
                                usando plantillas profesionales que se adaptan a tu marca. Digitalizar tu negocio nunca había sido tan fácil</td>
                  <td className="p-3 text-right space-x-2">
                    <button className="text-purple-600 hover:underline">Editar</button>
                    <button className="text-red-500 hover:underline">Eliminar</button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Nuevas funciones del editor</td>
                  <td className="p-3">Yerick Mondragón</td>
                  <td className="p-3">28/10/2025</td>
                  <td className="p-3">Tres elefantes se balanceaban sobre la tela de una araña como veia que resistia fueron y llamaron a otro elefante</td>
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
