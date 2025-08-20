"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQItem = ({ question, answer, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-4 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${delay}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
          {question}
        </h3>
        <div className="flex-shrink-0">
          <ChevronDown
            className={`w-5 h-5 text-purple-500 transition-all duration-300 group-hover:text-pink-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        id={`faq-answer-${delay}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Necesito saber programación para usar GENIO?",
      answer:
        "No, absolutamente no necesitas conocimientos técnicos. GENIO está diseñado para que cualquier persona pueda crear sitios web profesionales mediante nuestro intuitivo sistema de arrastrar y soltar elementos.",
    },
    {
      question: "¿Puedo usar mi propio dominio con GENIO?",
      answer:
        "Sí, todos nuestros planes permiten conectar dominios personalizados. En los planes Profesional y Empresa incluimos un dominio gratis el primer año.",
    },
    {
      question: "¿Qué pasa si necesito ayuda con mi sitio?",
      answer:
        "Ofrecemos diferentes niveles de soporte según tu plan. El Básico incluye soporte por email, el Profesional añade chat en vivo, y el Empresa tiene soporte 24/7.",
    },
    {
      question: "¿Puedo vender productos en mi sitio web?",
      answer:
        "¡Claro! El plan Empresa incluye funcionalidad completa de eCommerce. Puedes agregar productos, gestionar inventario y aceptar pagos en línea.",
    },
    {
      question: "¿Qué pasa si cancelo mi suscripción?",
      answer:
        "Puedes cancelar en cualquier momento sin penalización. Tu sitio permanecerá activo hasta el final del período pagado.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">AYUDA</span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-4 mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre GENIO
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} delay={index * 50} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
