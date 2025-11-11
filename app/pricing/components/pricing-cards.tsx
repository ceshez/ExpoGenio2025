"use client"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "$4.99",
    period: "mes",
    description: "Ideal para pequeños negocios que necesitan presencia online básica",
    cta: "Seleccionar plan",
    features: ["1 sitio web", "5 páginas por sitio", "10GB almacenamiento", "Análisis básico", "Soporte por email"],
    highlighted: false,
  },
  {
    name: "Profesional",
    price: "$9.99",
    period: "mes",
    description: "Perfecto para negocios en crecimiento con múltiples necesidades",
    cta: "Seleccionar plan",
    features: [
      "3 sitios web",
      "20 páginas por sitio",
      "50GB almacenamiento",
      "Análisis avanzado",
      "Soporte prioritario",
      "Blog integrado",
    ],
    highlighted: true,
  },
  {
    name: "Empresa",
    price: "$14.99",
    period: "mes",
    description: "Solución completa para negocios establecidos con alto tráfico",
    cta: "Seleccionar plan",
    features: [
      "Sitios ilimitados",
      "Páginas ilimitadas",
      "200GB almacenamiento",
      "Analítica premium",
      "Soporte 24/7",
      "Blog y eCommerce",
      "CDN global",
    ],
    highlighted: false,
  },
]

export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className={`relative rounded-xl border transition-all duration-300 overflow-visible ${
            plan.highlighted
              ? "border-2 border-primary shadow-xl shadow-primary/20 md:scale-105 ring-1 ring-primary/10"
              : "border-border/60 hover:border-primary/40 hover:shadow-lg"
          } p-8 bg-card`}
        >
          {plan.highlighted && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gradient-to-r from-fuchsia-700 to-pink-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                Más popular
              </div>
            </div>
          )}

          {/* Plan name and description */}
          <div className="mb-8">
            <h3 className="text-xl font-black text-foreground mb-2">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black bg-gradient-to-r from-fuchsia-700 to-pink-500 bg-clip-text text-transparent">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground font-medium">/ {plan.period}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className={`w-full mb-8 font-semibold py-6 text-base rounded-lg transition-all ${
              plan.highlighted
                ? "bg-gradient-to-r from-fuchsia-700 to-pink-500 hover:shadow-lg hover:shadow-primary/30 text-white"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border/60"
            }`}
          >
            {plan.cta}
          </Button>

          {/* Features list */}
          <div className="space-y-4">
            {plan.features.map((feature, fidx) => (
              <div key={fidx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 font-bold mt-0.5" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
