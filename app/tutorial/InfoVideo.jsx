"use client"

import { PlayCircle, Video } from "lucide-react"

const VideoSection = () => {
  const videos = [
    {
      title: "Introducción al Drag & Drop",
      description: "Aprende los conceptos básicos de arrastrar y soltar elementos en tu sitio web",
      duration: "5:30",
      thumbnail: "/drag-and-drop-tutorial-interface.jpg",
    },
    {
      title: "Personalización Avanzada",
      description: "Descubre cómo personalizar cada elemento con opciones avanzadas",
      duration: "8:15",
      thumbnail: "/website-customization-interface.png",
    },
    {
      title: "Publicar tu Sitio Web",
      description: "Guía paso a paso para publicar tu sitio web en minutos",
      duration: "4:45",
      thumbnail: "/website-publishing-dashboard.png",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 mt-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Video className="w-4 h-4" />
            <span>Tutoriales en Video</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 text-balance">
            Aprende a Usar{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Drag & Drop
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Descubre cómo crear sitios web increíbles con nuestra interfaz intuitiva de arrastrar y soltar. Sin código,
            sin complicaciones.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Thumbnail with Play Button */}
              <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500">
                    <PlayCircle className="w-10 h-10 text-purple-500 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              ¿Listo para Crear tu Sitio Web?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto text-pretty">
              Comienza gratis hoy y descubre lo fácil que es crear sitios web profesionales
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
              <span>Empezar Ahora</span>
              <PlayCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
