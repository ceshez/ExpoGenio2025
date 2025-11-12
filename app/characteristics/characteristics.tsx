"use client"

import { Lightbulb, Settings, TrendingUp, Bot, HeartHandshake, MousePointer2, Palette, Smartphone, Zap, Globe, Server, Search, Shield, LayoutDashboard, Share2, Mail, Package, BarChart3, Sparkles, BookOpen, LifeBuoy, RefreshCw } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO */}
      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Características de{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GENIO
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Todo lo que necesitas para crear y gestionar una página web profesional sin saber programar.
        </p>
      </section>

      {/* SECCION REUSABLE (TITULO + ICONO) */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">

        {/* PRINCIPALES */}
        <Section title="Características principales" icon={<Lightbulb className="h-6 w-6 text-purple-600" />}>
          <Grid>
            <Feature icon={<MousePointer2 />} title="Drag & Drop" desc="Crear sitios sin escribir código." />
            <Feature icon={<Palette />} title="Interfaz intuitiva" desc="Pensada para usuarios sin experiencia." />
            <Feature icon={<LayoutDashboard />} title="Plantillas" desc="Plantillas adaptadas a negocios reales." />
            <Feature icon={<Smartphone />} title="Responsive" desc="Se adapta automáticamente a cualquier dispositivo." />
            <Feature icon={<Zap />} title="Publicación rápida" desc="Tu sitio puede estar en línea en minutos." />
          </Grid>
        </Section>

        {/* TECNICAS */}
        <Section title="Características técnicas" icon={<Settings className="h-6 w-6 text-blue-600" />}>
          <Grid>
            <Feature icon={<RefreshCw />} title="Edición en vivo" desc="Ves los cambios en tiempo real." />
            <Feature icon={<Globe />} title="Dominios personalizados" desc="Podés usar tu propio dominio." />
            <Feature icon={<Server />} title="Hosting incluido" desc="GENIO hospeda tu sitio." />
            <Feature icon={<Search />} title="SEO automático" desc="Mejora tu posición en Google sin esfuerzo." />
            <Feature icon={<Shield />} title="Seguridad integrada" desc="Certificado SSL y backups automáticos." />
          </Grid>
        </Section>

        {/* NEGOCIOS */}
        <Section title="Enfoque empresarial" icon={<TrendingUp className="h-6 w-6 text-purple-600" />}>
          <Grid>
            <Feature icon={<LayoutDashboard />} title="Panel de administración" desc="Gestiona productos y contenido." />
            <Feature icon={<Share2 />} title="Integración con redes" desc="Facebook, Instagram y WhatsApp Business." />
            <Feature icon={<Mail />} title="Formulario de contacto" desc="Recibe mensajes directo desde tu web." />
            <Feature icon={<Package />} title="Productos / Servicios" desc="Ideal para vender o mostrar catálogo." />
            <Feature icon={<BarChart3 />} title="Analítica básica" desc="Metricas de visitas, rendimiento, etc." />
          </Grid>
        </Section>

        {/* IA */}
        <Section title="Inteligencia artificial" icon={<Bot className="h-6 w-6 text-pink-600" />}>
          <Grid>
            <Feature icon={<Sparkles />} title="Asistente de ideas" desc="Sugiere textos y estructura." />
            <Feature icon={<BookOpen />} title="Guías para PYMEs" desc="Datos útiles y consejos." />
            <Feature icon={<TrendingUp />} title="Optimización" desc="Mejoras sugeridas para tu web." />
          </Grid>
        </Section>

        {/* SOPORTE */}
        <Section title="Soporte y acompañamiento" icon={<HeartHandshake className="h-6 w-6 text-purple-600" />}>
          <Grid>
            <Feature icon={<LifeBuoy />} title="Asistente paso a paso" desc="Guía en la creación y publicación." />
            <Feature icon={<Globe />} title="Soporte en español" desc="Hablan tu idioma. Sin enredos." />
            <Feature icon={<RefreshCw />} title="Actualizaciones automáticas" desc="Tu web siempre al día." />
          </Grid>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, icon, children }: any) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="p-3 rounded-lg bg-purple-100">{icon}</div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Grid({ children }: any) {
  return <div className="grid md:grid-cols-2 gap-6">{children}</div>
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 p-6 rounded-xl border shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  )
}
