"use client"

import { useState, useEffect } from "react"
import LogoGenio from "../LogoGenio"
import { Menu, X, User, Globe, Settings, CreditCard, HelpCircle, LogOut } from "lucide-react"
import { signOut } from "next-auth/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#beneficios", text: "Beneficios" },
    { href: "#plantillas", text: "Plantillas" },
    { href: "#testimonios", text: "Testimonios" },
    { href: "#planes", text: "Precios" },
    { href: "#contacto", text: "Contacto" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-lg z-50 transition-all duration-500 border-b ${isScrolled ? "shadow-2xl border-gray-200/50" : "shadow-lg border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 text-2xl font-bold text-slate-800 hover:scale-105 transition-all duration-300 group"
          >
          <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
          <LogoGenio variant="simplified"/>
          </div>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">GENIO</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-medium text-slate-700 hover:text-pink-500 transition-all duration-300 py-2 px-1 group"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}

            <button
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold hover:scale-110 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => setIsUserModalOpen(true)}
              aria-label="Abrir menú de usuario"
            >
              G
            </button>

            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Probar Gratis
            </button>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <button
              className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => setIsUserModalOpen(true)}
              aria-label="Abrir menú de usuario"
            >
              G
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="pt-24 px-6">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 hover:text-pink-500 py-4 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.text}
                </a>
              ))}
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium mt-6 hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Probar Gratis
              </button>
            </nav>
          </div>
        </div>
      </header>

      {isUserModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsUserModalOpen(false)}
          />
          <div className="fixed top-0 right-0 w-96 max-w-[90vw] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto transform transition-all duration-500 ease-out">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-800">Mi Cuenta</h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-500 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                G
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-800">Usuario Genio</h4>
                <p className="text-slate-500 text-sm">Plan Profesional</p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                </div>
              </div>
            </div>

            <nav className="space-y-1 mb-8">
              {[
                { icon: User, text: "Mi Perfil", href: "#perfil" },
                { icon: Globe, text: "Mis Sitios Web", href: "#sitios" },
                { icon: Settings, text: "Configuración", href: "#config" },
                { icon: CreditCard, text: "Facturación", href: "#facturacion" },
                { icon: HelpCircle, text: "Ayuda", href: "#ayuda" },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:translate-x-1 text-slate-700 hover:text-pink-500 group"
                  >
                    <IconComponent className="w-5 h-5 text-slate-500 group-hover:text-purple-500 transition-colors" />
                    <span className="font-medium">{item.text}</span>
                  </a>
                )
              })}
            </nav>

            <div className="pt-6 border-t border-gray-200">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })} // Cierra sesión y redirige al login
        className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Cerrar sesión</span>
      </button>
    </div>
          </div>
        </>
      )}
    </>
  )
}

export default Header
