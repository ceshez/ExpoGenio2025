"use client"

import { motion, Variants } from "framer-motion"
import { useState } from "react"

// Tipado de cada letra
interface LetterData {
  letter: string
  title: string
  desc: string
  gradient: string
}

// Datos de las letras
const letterData: LetterData[] = [
  {
    letter: "GEN",
    title: "Generar",
    desc: "Crea sin límites. Cada herramienta te empodera para materializar ideas.",
    gradient: "from-purple-500 via-purple-600 to-violet-600",
  },
  {
    letter: "I",
    title: "Interactuar",
    desc: "Conecta con tu audiencia y transforma visitantes en relaciones duraderas.",
    gradient: "from-purple-500 via-purple-600 to-violet-600",
  },
  {
    letter: "O",
    title: "Objetos",
    desc: "Componentes inteligentes que se adaptan a tu visión y tu negocio.",
    gradient: "from-indigo-500 via-purple-600 to-violet-600",
  },
]

// Variants tipados para Framer Motion
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // easing tipo easeOut
    },
  },
}

export default function InteractiveName() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeInUp}
      viewport={{ once: true }}
      className="mb-20 md:mb-28"
    >
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
          ¿Qué significa GENIO?
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Nuestro nombre refleja los pilares de nuestra esencia — cada letra cobra vida al interactuar.
        </p>
      </div>

      {/* Letras interactivas */}
      <div className="flex justify-center items-center gap-1 md:gap-2 mt-10">
        {letterData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative cursor-pointer select-none"
          >
            {/* Letra principal */}
            <motion.div
              className={`text-7xl md:text-9xl font-black bg-linear-to-br ${item.gradient} bg-clip-text text-transparent tracking-tight relative z-10`}
              animate={{
                filter:
                  hoveredIndex === i
                    ? "brightness(1.1) blur(0px) drop-shadow(0 0 10px rgba(147,51,234,0.3))"
                    : hoveredIndex !== null
                    ? "brightness(0.8) blur(1px) drop-shadow(0 0 0px rgba(0,0,0,0))"
                    : "brightness(1) blur(0px) drop-shadow(0 0 0px rgba(0,0,0,0))",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {item.letter}
            </motion.div>

            {/* Fondo animado grande */}
            <motion.div
              className={`absolute inset-0 bg-linear-to-br ${item.gradient} rounded-full blur-3xl -z-10`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredIndex === i ? 0.2 : 0,
                scale: hoveredIndex === i ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Fondo animado mediano */}
            <motion.div
              className={`absolute inset-0 bg-linear-to-br ${item.gradient} rounded-full blur-2xl -z-10`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: hoveredIndex === i ? 0.25 : 0,
                scale: hoveredIndex === i ? 0.9 : 0.6,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{
                opacity: hoveredIndex === i ? 1 : 0,
                y: hoveredIndex === i ? 0 : -10,
                scale: hoveredIndex === i ? 1 : 0.95,
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-8 w-72 pointer-events-none z-50"
            >
              <div className="relative">
                {/* Flecha */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-white/95 backdrop-blur-sm rotate-45 border-l border-t border-purple-200/30" />

                {/* Contenido */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-purple-200/30">
                  <div className={`text-lg font-bold bg-linear-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>
                    {item.title}
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}