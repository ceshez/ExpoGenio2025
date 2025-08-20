"use client"

import { useState } from "react"
import { Building2, ShoppingBag, UtensilsCrossed, Leaf, Heart, ArrowRight } from "lucide-react"

const TemplateCard = ({ icon: IconComponent, title, description, badge, bgColor, cardBgColor, delay = 100 }) => {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      className={`${cardBgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative aspect-video ${bgColor} flex items-center justify-center`}>
        <IconComponent className="w-12 h-12 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLiked
                ? "text-pink-500 bg-pink-50 hover:bg-pink-100"
                : "text-gray-400 hover:text-pink-500 hover:bg-pink-50"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <a
            href="/edit"
            className="text-sm font-medium text-purple-500 hover:text-pink-500 transition-colors duration-200 flex items-center gap-1 group/link"
          >
            Ver demo
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

const TemplatesSection = () => {
  const templates = [
    {
      icon: Building2,
      title: "Negocios",
      description: "Perfecta para empresas y servicios profesionales",
      badge: "Popular",
      bgColor: "bg-gradient-to-br from-purple-300 to-purple-400",
      cardBgColor: "bg-gradient-to-br from-purple-50 to-purple-100/60",
    },
    {
      icon: ShoppingBag,
      title: "Tienda Online",
      description: "Optimizada para eCommerce y ventas digitales",
      badge: "Nuevo",
      bgColor: "bg-gradient-to-br from-blue-300 to-blue-400",
      cardBgColor: "bg-gradient-to-br from-blue-50 to-blue-100/60",
    },
    {
      icon: UtensilsCrossed,
      title: "Restaurante",
      description: "Ideal para negocios gastronómicos y delivery",
      badge: "Destacada",
      bgColor: "bg-gradient-to-br from-pink-300 to-pink-400",
      cardBgColor: "bg-gradient-to-br from-pink-50 to-pink-100/60",
    },
    {
      icon: Leaf,
      title: "Eco & Naturaleza",
      description: "Diseño orgánico y sostenible para tu marca",
      badge: "Premium",
      bgColor: "bg-gradient-to-br from-emerald-300 to-emerald-400",
      cardBgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100/60",
    },
  ]

  return (
    <section id="plantillas" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">INSPÍRATE</span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-4 mb-6">
            Plantillas diseñadas para destacar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Elige entre cientos de plantillas profesionales y personalízalas a tu gusto
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} delay={index * 100} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-purple-500 font-semibold hover:text-pink-500 transition-colors duration-200 group bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg"
          >
            Ver todas las plantillas
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default TemplatesSection
