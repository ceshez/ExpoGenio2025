"use client"

import { useState } from "react"
import {
  Menu,
  Plus,
  File,
  Layout,
  Home,
  FolderPlus,
  User,
  Settings,
  LogOut,
  X,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import LogoGenio from "../components/LogoGenio"
import { signOut } from "next-auth/react";

export default function Template() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const recentDesigns = [
    { id: 1, name: "Inicio", lastModified: "Página principal", thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { id: 2, name: "Mis sitios web", lastModified: "Tus proyectos", thumbnail: "bg-gradient-to-br from-blue-400 to-cyan-500" },
    { id: 3, name: "Crear sitio", lastModified: "Nuevo proyecto", thumbnail: "bg-gradient-to-br from-green-400 to-emerald-500" },
    { id: 4, name: "Plantillas", lastModified: "Explorar diseños", thumbnail: "bg-gradient-to-br from-orange-400 to-red-500" },
    { id: 5, name: "Mi cuenta", lastModified: "Información personal", thumbnail: "bg-gradient-to-br from-indigo-400 to-purple-500" },
    { id: 6, name: "Configuración", lastModified: "Preferencias", thumbnail: "bg-gradient-to-br from-teal-400 to-blue-500" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR IZQUIERDO (oculto en móvil) */}
      <aside className="hidden md:flex flex-col w-16 bg-white shadow-lg border-r border-gray-200">
        <div className="p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
          >
            <Menu className="text-gray-600 group-hover:text-purple-600 transition-colors" size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-3 flex-1">
          <button className="p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
            <Home className="text-gray-600 group-hover:text-purple-600 transition-colors" size={20} />
          </button>
          <button className="p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
            <Layout className="text-gray-600 group-hover:text-purple-600 transition-colors" size={20} />
          </button>
          <button className="p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group">
            <FolderPlus className="text-gray-600 group-hover:text-purple-600 transition-colors" size={20} />
          </button>
        </div>

        <div className="p-3 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200 group w-full"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <User size={12} className="text-white" />
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute bottom-full left-full ml-2 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-50">
                <a className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <User size={16} /> Perfil
                </a>
                <a className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <Settings size={16} /> Ajustes
                </a>
                <hr className="my-2 border-gray-200" />
                <a
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 py-2 px-4 hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700 cursor-pointer"
                >
                  <LogOut size={16} /> Cerrar sesión
                </a>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* SIDEBAR GRANDE (FULLSCREEN EN CEL) */}
      <aside
        className={`${sidebarOpen ? "w-72 md:w-72" : "w-0"} 
        fixed md:relative z-50 top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200
        transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Diseños recientes</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {recentDesigns.map((design) => (
            <div
              key={design.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer group"
            >
              <div className={`w-12 h-8 rounded-lg ${design.thumbnail}`} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate">{design.name}</h3>
                <p className="text-xs text-gray-500">{design.lastModified}</p>
              </div>
              <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 text-gray-500" />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition text-gray-600">
            <Trash2 size={18} />
            <span className="text-sm font-medium">Eliminar</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow-sm border-b p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="text-gray-700" size={24} />
            </button>

            <div onClick={() => (window.location.href = "/")} className="transition hover:rotate-12 hover:scale-110">
              <LogoGenio variant="simplified"/>
            </div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GENIO
            </h1>
          </div>

          <input
            type="text"
            placeholder="Search designs..."
            className="hidden md:block border border-gray-300 rounded-xl px-4 py-2 w-72 focus:ring-2 focus:ring-purple-500"
          />
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="md:hidden mb-6">
            <input
              type="text"
              placeholder="Search designs..."
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-6">Plantillas</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer">
              <div className="aspect-video flex flex-col items-center justify-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200">
                  <Plus className="text-purple-600" size={24} />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                  Crear nueva plantilla
                </span>
              </div>
            </div>

            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                  <File className="text-indigo-400 group-hover:text-indigo-600" size={32} />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white rounded-full shadow hover:bg-blue-50 flex items-center justify-center">
                        <Layout size={14} className="text-blue-600" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full shadow hover:bg-red-50 flex items-center justify-center">
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-700">Plantillas {i + 1}</h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}