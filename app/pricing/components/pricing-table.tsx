import React from "react"
import { Check, X } from "lucide-react"

const features = [
  {
    category: "Básico",
    items: [
      { name: "Sitios web", basic: "1", pro: "3", enterprise: "Ilimitados" },
      { name: "Páginas por sitio", basic: "5", pro: "20", enterprise: "Ilimitadas" },
      { name: "Almacenamiento", basic: "10GB", pro: "50GB", enterprise: "200GB" },
      { name: "Análisis", basic: "Básico", pro: "Avanzado", enterprise: "Premium" },
      { name: "Soporte", basic: "Email", pro: "Prioritario", enterprise: "24/7" },
    ],
  },
  {
    category: "Características Premium",
    items: [
      { name: "Blog integrado", basic: false, pro: true, enterprise: true },
      { name: "eCommerce", basic: false, pro: false, enterprise: true },
      { name: "CDN global", basic: false, pro: false, enterprise: true },
      { name: "Dominio personalizado", basic: true, pro: true, enterprise: true },
      { name: "SSL gratuito", basic: true, pro: true, enterprise: true },
    ],
  },
  {
    category: "Seguridad y Confiabilidad",
    items: [
      { name: "Certificado SSL", basic: true, pro: true, enterprise: true },
      { name: "Copias de seguridad diarias", basic: true, pro: true, enterprise: true },
      { name: "Garantía de satisfacción 30 días", basic: true, pro: true, enterprise: true },
      { name: "Protección contra amenazas", basic: true, pro: true, enterprise: true },
    ],
  },
]

export default function PricingTable() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
          Comparar todos los{" "}
          <span className="bg-gradient-to-r from-fuchsia-700 via-pink-500 to-primary bg-clip-text text-transparent">
            planes
          </span>
        </h2>
        <p className="text-base text-muted-foreground">Ve exactamente qué incluye cada plan</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border/40 bg-card shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/40 bg-muted/50">
              <th className="text-left py-4 px-6 font-black text-foreground text-xs uppercase tracking-wider">
                Características
              </th>
              <th className="text-center py-4 px-6 font-black text-foreground text-xs uppercase tracking-wider">
                Básico
              </th>
              <th className="text-center py-4 px-6 font-black text-foreground text-xs uppercase tracking-wider bg-fuchsia-700/8">
                <div className="flex flex-col items-center gap-1.5">
                  <span>Profesional</span>
                  <span className="inline-block bg-gradient-to-r from-fuchsia-700 to-pink-500 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                    Más popular
                  </span>
                </div>
              </th>
              <th className="text-center py-4 px-6 font-black text-foreground text-xs uppercase tracking-wider">
                Empresa
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((section, sidx) => (
              <React.Fragment key={sidx}>
                {/* Category header row */}
                <tr className="border-b border-border/40 bg-muted/40 hover:bg-muted/50 transition-colors">
                  <td colSpan={4} className="py-3 px-6 font-black text-foreground text-xs uppercase tracking-wider">
                    {section.category}
                  </td>
                </tr>
                {/* Feature rows */}
                {section.items.map((item, iidx) => (
                  <tr key={iidx} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-foreground text-sm font-medium">{item.name}</td>
                    <td className="py-4 px-6 text-center text-sm">
                      {typeof item.basic === "boolean" ? (
                        item.basic ? (
                          <Check className="w-5 h-5 text-primary mx-auto font-bold" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-foreground font-medium">{item.basic}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-sm bg-primary/5">
                      {typeof item.pro === "boolean" ? (
                        item.pro ? (
                          <Check className="w-5 h-5 text-primary mx-auto font-bold" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-foreground font-medium">{item.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-sm">
                      {typeof item.enterprise === "boolean" ? (
                        item.enterprise ? (
                          <Check className="w-5 h-5 text-fuchsia-700 mx-auto font-bold" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-foreground font-medium">{item.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
