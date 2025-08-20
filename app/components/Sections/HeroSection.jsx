"use client"
import React from 'react';
import { useState } from "react"
import { Play, Rocket, ImageIcon, Type, Square } from "lucide-react"

const HeroSection = () => {
  const [hoveredElement, setHoveredElement] = useState(null)

  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-pink-500 uppercase tracking-wide mb-4 animate-pulse">
            CREA TU SITIO WEB HOY
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Diseña como un{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              profesional
            </span>{" "}
            sin saber programar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Con GENIO puedes crear sitios web impresionantes en minutos, sin necesidad de conocimientos técnicos. Elige
            entre cientos de plantillas y personalízalas a tu gusto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-3 justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <Rocket className="w-5 h-5" />
              Comenzar ahora
            </button>
            <button
              onClick={() => (window.location.href = "/edit")}
              className="bg-white text-purple-600 border-2 border-purple-200 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex items-center gap-3 justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <Play className="w-5 h-5" />
              Ver demo
            </button>
          </div>
        </div>

        {/* Editor Preview */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
              </div>
              <div className="text-sm font-medium text-purple-600 bg-white/50 px-3 py-1 rounded-full">
                editor.genio.com
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <Square className="w-4 h-4 text-purple-500" />
                      Elementos
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: Type, name: "Texto", color: "purple" },
                        { icon: ImageIcon, name: "Imagen", color: "pink" },
                        { icon: Square, name: "Botón", color: "purple" },
                      ].map((element, index) => {
                        const IconComponent = element.icon
                        return (
                          <div
                            key={index}
                            className={`p-3 bg-white rounded-lg flex items-center gap-3 cursor-move border-2 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                              hoveredElement === index
                                ? "border-purple-300 shadow-lg"
                                : "border-transparent hover:border-purple-200"
                            }`}
                            onMouseEnter={() => setHoveredElement(index)}
                            onMouseLeave={() => setHoveredElement(null)}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg bg-${element.color}-100 text-${element.color}-500 flex items-center justify-center transition-all duration-300 ${
                                hoveredElement === index ? "scale-110" : ""
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-700">{element.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="md:col-span-3">
                  <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[400px] flex flex-col items-center justify-center hover:border-purple-300 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl text-purple-500">+</div>
                    </div>
                    <p className="text-gray-500 text-center mb-6 text-lg">
                      Arrastra elementos aquí para comenzar tu diseño
                    </p>

                    <div className="mt-8 w-full max-w-md p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-lg hidden md:block hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ¡Bienvenido a GENIO!
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Comienza arrastrando elementos para crear tu sitio web perfecto.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
