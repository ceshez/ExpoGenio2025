import { Sparkles, MessageCircle, Star } from "lucide-react"

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para crear tu sitio web?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Regístrate hoy y obtén 14 días gratis para explorar todas las funciones. Sin tarjeta de crédito requerida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button onClick={() => (window.location.href = "/edit")} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Comenzar prueba gratuita
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Hablar con ventas
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 flex-wrap text-white/90">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-500" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500" />
            </div>
            <span className="text-sm">
              Únete a <span className="font-semibold">+5,000</span> negocios
            </span>
          </div>

          <div className="h-6 w-px bg-white/30" />

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="text-sm">
              <span className="font-semibold">4.9/5</span> de más de 800 reseñas
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
