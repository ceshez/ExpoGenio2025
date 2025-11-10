"use client"
import Dashboard from "../dashboard"

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Dashboard />
      
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-slate-800">Inicio del Panel</h1>
        <p className="mt-2 text-slate-600">Resumen general de Genio Admin.</p>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="font-semibold text-purple-600">Blog</h2>
            <p>5 entradas publicadas</p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="font-semibold text-purple-600">Videos</h2>
            <p>3 videos subidos</p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="font-semibold text-purple-600">Socios</h2>
            <p>2 alianzas activas</p>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="font-semibold text-purple-600">Última actualización</h2>
            <p>31 de octubre de 2025</p>
          </div>
        </div>
      </main>
    </div>
  )
}
