import { Wand2, Smartphone, Rocket, TrendingUp, Shield, Headphones } from "lucide-react"

const BenefitCard = ({ icon: Icon, title, description, progress, delay = 0, iconBg }) => {
  return (
    <div
      className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{description}</p>
      <div className="mt-auto pt-2">
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Wand2,
      title: "Diseño Intuitivo",
      description:
        "Arrastra y suelta elementos para crear diseños profesionales sin escribir una sola línea de código.",
      progress: 90,
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600", // Purple gradient
    },
    {
      icon: Smartphone,
      title: "100% Responsivo",
      description:
        "Tu sitio se verá perfecto en cualquier dispositivo, automáticamente adaptado a móviles, tablets y desktop.",
      progress: 95,
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600", // Blue gradient
    },
    {
      icon: Rocket,
      title: "Lanzamiento Rápido",
      description: "Desde el registro hasta online en menos de 30 minutos con nuestro proceso simplificado.",
      progress: 85,
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600", // Pink gradient
    },
    {
      icon: TrendingUp,
      title: "SEO Integrado",
      description: "Estructuras optimizadas para que los motores de búsqueda amen tu sitio desde el primer día.",
      progress: 80,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600", // Emerald gradient
    },
    {
      icon: Shield,
      title: "Seguridad Automática",
      description:
        "SSL gratuito, copias de seguridad diarias y protección contra amenazas incluidos en todos los planes.",
      progress: 95,
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600", // Orange gradient
    },
    {
      icon: Headphones,
      title: "Soporte Prioritario",
      description:
        "Asistencia rápida cuando la necesites, por chat, email o teléfono con nuestro equipo especializado.",
      progress: 90,
      iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600", // Indigo gradient
    },
  ]

  return (
    <section id="beneficios" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-semibold rounded-full text-sm uppercase tracking-wide mb-4">
            POR QUÉ ELEGIRNOS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Potencia tu presencia online
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Todo lo que necesitas para crear, administrar y hacer crecer tu sitio web con herramientas profesionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection