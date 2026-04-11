"use client"

import { useState } from "react"
import LogoGenio from "../LogoGenio"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Send, Sparkles, Link } from "lucide-react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const footerSections = [
    {
      title: "Producto",
      links: ["Características", "Plantillas", "Precios", "Demo", "Actualizaciones"],
      ref:["caracteristicas", "plantillas", "pricing", "demo", "updates"],
    },
    {
      title: "Recursos",
      links: ["Blog", "Tutoriales", "Documentación", "Comunidad"],
      ref:["blog", "tutorial", "documentation", "community"],
    },
    {
      title: "Empresa",
      links: ["Mision", "Socios", "Contacto"],
      ref:["mision", "partners", "contact"],
    },
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 text-2xl font-bold mb-4 group">
             <div className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
              <LogoGenio variant="simplified"/>
            </div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GENIO</span>
            </a>
            <p className="text-gray-400 mb-6">
              La plataforma más fácil para crear sitios web profesionales sin necesidad de programación.
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {isSubscribed && <p className="text-green-400 text-sm mt-2">¡Gracias por suscribirte!</p>}
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/genio_expo25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 hover:-translate-y-1 transition-all group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:-translate-y-1 transition-all group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 hover:-translate-y-1 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              
            </div>
          </div>

          {/* Enlaces */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4 text-purple-300">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                 <li key={linkIndex}>
                    <a
                      href={`/${section.ref[linkIndex]}`}
                    className="text-gray-400 hover:text-purple-300 transition-colors hover:translate-x-1 inline-block"
                    >
                        {link}
                   </a>
                  </li>
  ))}
</ul>

            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 Genio. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <div className="flex justify-end mt-6">
              <a
                href="/play"
                className="w-14 h-14 opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <img
                  src="/sprites/gio_ship.png"
                  alt="Gio"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

              {["Términos", "Privacidad", "Cookies"].map((link, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-purple-300 text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer