"use client"

import { useState } from "react"
import { Check, Star, Zap, Building2 } from "lucide-react"

const PriceCard = ({
  plan,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText = "Seleccionar plan",
  buttonVariant = "secondary",
  delay = 0,
  icon: Icon,
}) => {
  return (
    <div
      className={`p-7 flex flex-col relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPopular
          ? "border-2 border-purple-500 transform -translate-y-2 shadow-2xl"
          : "border-gray-200 shadow-lg hover:border-purple-200"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
          <Star className="inline w-4 h-4 mr-1" />
          MÁS POPULAR
        </div>
      )}

      <div className="mb-5">
        <div
          className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold mb-4 ${
            isPopular ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {isPopular ? "RECOMENDADO" : "PARA EMPEZAR"}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mb-5">
        <p className="text-4xl font-extrabold text-gray-900 mb-1">
          {price}
          <span className="text-base text-gray-500 font-normal">/{period}</span>
        </p>
      </div>

      <ul className="text-gray-600 space-y-3 mb-7 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className={`mr-3 mt-0.5 w-4 h-4 flex-shrink-0 ${isPopular ? "text-purple-500" : "text-pink-500"}`} />
            <span className="text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          className={`w-full py-4 px-5 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
            buttonVariant === "primary"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-500 shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-200"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

const PlansSection = () => {
  const [currency, setCurrency] = useState("usd")
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      plan: "Básico",
      description: "Ideal para pequeños negocios que necesitan presencia online básica",
      icon: Zap,
      prices: {
        monthly: { usd: "$4.99", crc: "₡2,499" },
        annual: { usd: "$47.90", crc: "₡23,990" },
      },
      features: ["1 sitio web", "5 páginas por sitio", "10GB almacenamiento", "Análisis básico", "Soporte por email"],
      buttonVariant: "secondary",
    },
    {
      plan: "Profesional",
      description: "Perfecto para negocios en crecimiento con múltiples necesidades",
      icon: Star,
      prices: {
        monthly: { usd: "$9.99", crc: "₡4,999" },
        annual: { usd: "$95.90", crc: "₡47,990" },
      },
      features: [
        "3 sitios web",
        "20 páginas por sitio",
        "50GB almacenamiento",
        "Análisis avanzado",
        "Soporte prioritario",
        "Blog integrado",
      ],
      isPopular: true,
      buttonVariant: "primary",
    },
    {
      plan: "Empresa",
      description: "Solución completa para negocios establecidos con alto tráfico",
      icon: Building2,
      prices: {
        monthly: { usd: "$14.99", crc: "₡7,499" },
        annual: { usd: "$143.90", crc: "₡71,990" },
      },
      features: [
        "Sitios ilimitados",
        "Páginas ilimitadas",
        "200GB almacenamiento",
        "Analítica premium",
        "Soporte 24/7",
        "Blog y eCommerce",
        "CDN global",
      ],
      buttonVariant: "secondary",
    },
  ]

  const getCurrentPrice = (plan) => {
    const period = isAnnual ? "annual" : "monthly"
    return plan.prices[period][currency]
  }

  const getCurrentPeriod = () => {
    return isAnnual ? "año" : "mes"
  }

  return (
    <section id="planes" className="py-18 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">PRECIOS SIMPLES</span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-4 mb-6">
            Planes para cada etapa de tu negocio
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Elige el plan que mejor se adapte a tus necesidades. Sin contratos largos, cancela cuando quieras.
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 flex shadow-lg border border-gray-200">
              <button
                onClick={() => setCurrency("usd")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  currency === "usd"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("crc")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  currency === "crc"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                CRC (₡)
              </button>
            </div>
          </div>

          {/* Period Toggle */}
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-1 flex shadow-lg border border-gray-200">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isAnnual
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 relative ${
                  isAnnual
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  20% dto.
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PriceCard
              key={index}
              {...plan}
              price={getCurrentPrice(plan)}
              period={getCurrentPeriod()}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              <strong>Todos los planes incluyen:</strong> Certificado SSL gratuito, dominio personalizado y garantía de
              satisfacción de 30 días.
            </p>
            <p className="text-xs text-gray-500">
              Los precios pueden cambiar sin previo aviso. Todos los precios son en la moneda seleccionada.
            </p>
        </div>
      </div>
    </section>
  )
}

export default PlansSection
