"use client"
import PricingTable from "./components/pricing-table"
import PricingCards from "./components/pricing-cards"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-primary mb-4">
              Compara todos los planes
            </span>
          </div>
          <h1 className="mb-6 text-foreground">
            Elige tu{" "}
            <span className="bg-gradient-to-r from-fuchsia-200 via-pink-500 to-primary bg-clip-text text-transparent">
              plan perfecto
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Escalable desde startups hasta empresas. Ve exactamente qué incluye cada plan.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <PricingCards />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="px-4 py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <PricingTable />
        </div>
      </section>
    </main>
  )
}
