"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import InteractiveName from "./interactive-name"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function AboutUsSection() {
  const [activeTimeline, setActiveTimeline] = useState(0)

  return (
    <section className="relative z-10 py-20 md:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/3 right-20 w-[28rem] h-[28rem] bg-gradient-to-br from-pink-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-20 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={fadeInUp} className="text-center mb-20 md:mb-28 relative">
          {/* Decorative glass spheres */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full backdrop-blur-xl border border-white/40 shadow-2xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full backdrop-blur-xl border border-white/40 shadow-2xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full backdrop-blur-xl border border-white/40 shadow-2xl"
          />

          <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/60">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-3xl" />
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent mb-6 leading-tight">
                Empoderando a las PYMEs de Costa Rica
              </h1>
              <div className="flex justify-center gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600", "from-fuchsia-500 to-pink-600"][i]}`}
                  />
                ))}
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Creemos que cada pequeña y mediana empresa merece tener presencia digital profesional. La tecnología
                debe ser accesible, poderosa y diseñada para impulsar tu negocio.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="mb-20 md:mb-28 flex justify-center"
        >
          <InteractiveName />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20 md:mb-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-purple-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-5">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Democratizar la creación web para las PYMEs costarricenses, ofreciendo herramientas profesionales,
                intuitivas y accesibles que permitan a cualquier emprendedor construir su presencia digital sin barreras
                técnicas ni económicas.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-pink-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-300/20 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-5">Nuestra Visión</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Ser la plataforma líder en Costa Rica para la transformación digital de PYMEs, impulsando el crecimiento
                económico local y posicionando a nuestras empresas en el mercado global con tecnología de clase mundial.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 md:mb-28"
        >
          <div className="absolute inset-0">
            <Image src="/volcanarenal.svg" alt="Costa Rica" fill className="object-cover" priority />

            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-gray-900/85" />
          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full" />
          </div>

          <div className="relative z-10 p-12 md:p-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">De Costa Rica, para Costa Rica</h2>
              <p className="text-white/95 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
                Nacimos en el corazón de Costa Rica con un propósito claro: fortalecer el tejido empresarial local. Cada
                PYME que crece con GENIO es un paso hacia una economía digital más fuerte y competitiva.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                {[...Array(3)].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all text-center"
                  >
                    <div className="text-5xl mb-3">{["💼", "🌱", "🚀"][i]}</div>
                    <h3 className="text-white font-bold text-xl mb-2">
                      {["Enfocados en PYMEs", "Crecimiento Local", "Alcance Global"][i]}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {
                        [
                          "Soluciones diseñadas para pequeñas y medianas empresas",
                          "Impulsando la economía costarricense",
                          "Tecnología local con estándares internacionales",
                        ][i]
                      }
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
              Nuestro Camino
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              La evolución de una idea hacia una plataforma que transformará las PYMEs de Costa Rica
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 hidden md:block">
              <svg className="w-1 h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(216, 180, 254)" />
                    <stop offset="50%" stopColor="rgb(251, 207, 232)" />
                    <stop offset="100%" stopColor="rgb(216, 180, 254)" />
                  </linearGradient>
                </defs>
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="url(#lineGradient)"
                  strokeWidth="4"
                  strokeDasharray="80 40"
                />
              </svg>
            </div>

            <motion.div variants={staggerContainer} className="space-y-16">
              {[...Array(4)].map((_, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    onViewportEnter={() => setActiveTimeline(i)}
                    viewport={{ once: false, amount: 0.5 }}
                    className="relative flex items-start md:gap-12 flex-col md:flex-row"
                  >
                    {/* Left side */}
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-4" : "md:order-2 md:pl-4"}`}>
                      {isLeft ? (
                        // Date on left
                        <div className="flex items-center gap-3 justify-center md:justify-end mb-6 md:mb-0">
                          <div className="text-right">
                            <div
                              className={`text-xs font-bold bg-gradient-to-r ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600"][i]} bg-clip-text text-transparent mb-1`}
                            >
                              {["Q1", "Q2-Q3", "Q4", "Futuro"][i]}
                            </div>
                            <div className="text-2xl font-black text-gray-800">
                              {["2025", "2025", "2025", "2026+"][i]}
                            </div>
                          </div>
                          <div
                            className={`w-14 h-14 bg-gradient-to-br ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600"][i]} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                          >
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {i === 0 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              )}
                              {i === 1 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                              )}
                              {i === 2 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                              )}
                              {i === 3 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              )}
                            </svg>
                          </div>
                        </div>
                      ) : (
                        // Content on left
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          className={`bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 ${activeTimeline === i ? "border-purple-400" : "border-purple-200/50"}`}
                        >
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {
                              [
                                "Primeras Ideas",
                                "Diseños Principales",
                                "Creación de la Plataforma",
                                "Ayuda a las PYMEs del País",
                              ][i]
                            }
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {
                              [
                                "Identificación de las necesidades de las PYMEs costarricenses. Investigación de mercado y validación del concepto con emprendedores locales.",
                                "Desarrollo de la arquitectura de la plataforma. Creación de prototipos y pruebas de usabilidad con usuarios reales del sector PYME.",
                                "Desarrollo completo de GENIO. Implementación de funcionalidades core: generación de sitios, componentes interactivos y sistema de objetos modulares.",
                                "Lanzamiento oficial y expansión. Programas de capacitación, alianzas estratégicas y crecimiento sostenido apoyando a cientos de empresas costarricenses.",
                              ][i]
                            }
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      animate={{
                        scale: activeTimeline === i ? [1, 1.2, 1] : 1,
                        boxShadow:
                          activeTimeline === i
                            ? [
                                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                                "0 0 0 15px rgba(168, 85, 247, 0)",
                                "0 0 0 0 rgba(168, 85, 247, 0)",
                              ]
                            : "0 0 0 0 rgba(168, 85, 247, 0)",
                      }}
                      transition={{ duration: 2, repeat: activeTimeline === i ? Number.POSITIVE_INFINITY : 0 }}
                      className={`hidden md:flex w-8 h-8 bg-gradient-to-br ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600"][i]} rounded-full border-4 border-white shadow-xl z-10 md:order-1 flex-shrink-0 items-center justify-center`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>

                    {/* Right side */}
                    <div className={`w-full md:w-5/12 ${!isLeft ? "md:text-left md:pl-4" : "md:order-2 md:pr-4"}`}>
                      {!isLeft ? (
                        // Date on right
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-6 md:mb-0">
                          <div
                            className={`w-14 h-14 bg-gradient-to-br ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600"][i]} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                          >
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {i === 0 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              )}
                              {i === 1 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                              )}
                              {i === 2 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                              )}
                              {i === 3 && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              )}
                            </svg>
                          </div>
                          <div className="text-left">
                            <div
                              className={`text-xs font-bold bg-gradient-to-r ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600"][i]} bg-clip-text text-transparent mb-1`}
                            >
                              {["Q1", "Q2-Q3", "Q4", "Futuro"][i]}
                            </div>
                            <div className="text-2xl font-black text-gray-800">
                              {["2025", "2025", "2025", "2026+"][i]}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Content on right
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5 }}
                          className={`bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 ${activeTimeline === i ? "border-purple-400" : "border-purple-200/50"}`}
                        >
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {
                              [
                                "Primeras Ideas",
                                "Diseños Principales",
                                "Creación de la Plataforma",
                                "Ayuda a las PYMEs del País",
                              ][i]
                            }
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {
                              [
                                "Identificación de las necesidades de las PYMEs costarricenses. Investigación de mercado y validación del concepto con emprendedores locales.",
                                "Desarrollo de la arquitectura de la plataforma. Creación de prototipos y pruebas de usabilidad con usuarios reales del sector PYME.",
                                "Desarrollo completo de GENIO. Implementación de funcionalidades core: generación de sitios, componentes interactivos y sistema de objetos modulares.",
                                "Lanzamiento oficial y expansión. Programas de capacitación, alianzas estratégicas y crecimiento sostenido apoyando a cientos de empresas costarricenses.",
                              ][i]
                            }
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 md:mb-28"
        >
          <div className="absolute inset-0">
            <Image src="/volcanarenal.svg" alt="Nuestros Valores" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-pink-800/80 to-purple-900/85" />
          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full" />
          </div>

          <div className="relative z-10 p-10 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nuestros Valores</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Los principios que guían cada decisión y cada línea de código
              </p>
            </div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-8 transition-all hover:shadow-2xl border border-white/20 hover:bg-white/20 relative overflow-hidden text-center"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${["from-purple-400 to-purple-500", "from-pink-400 to-pink-500", "from-indigo-400 to-purple-500"][i]} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto`}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {i === 0 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      )}
                      {i === 1 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {i === 2 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {["Innovación", "Accesibilidad", "Compromiso Local"][i]}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {
                      [
                        "Exploramos constantemente nuevas formas de simplificar la creación web, manteniéndonos a la vanguardia tecnológica para ofrecer las mejores herramientas.",
                        "Diseñamos para todos. Herramientas potentes pero intuitivas que eliminan barreras técnicas y económicas para las PYMEs costarricenses.",
                        "Dedicados al crecimiento de Costa Rica. Cada funcionalidad está pensada para impulsar el éxito de nuestras empresas locales.",
                      ][i]
                    }
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
              El Equipo Detrás de GENIO
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Mentes creativas y apasionadas trabajando para democratizar la tecnología
            </p>
          </div>

          <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {[
              { first: "Britanny", last: "Segura", initial: "B" },
              { first: "Carlos", last: "Sánchez", initial: "C" },
              { first: "Yerick", last: "Mondragón", initial: "Y" },
              { first: "Xiao", last: "Méndez", initial: "X" },
              { first: "Darien", last: "Mena", initial: "D" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-purple-100 text-center w-44"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-24 h-24 bg-gradient-to-br ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-purple-600", "from-fuchsia-500 to-pink-600"][i]} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
                >
                  {member.initial}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-800">{member.first}</h3>
                <h4 className="text-base font-semibold text-gray-600">{member.last}</h4>
                <div className="mt-3 flex justify-center gap-1">
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.1 }}
                      viewport={{ once: true }}
                      className={`w-2 h-2 bg-gradient-to-r ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-purple-600", "from-fuchsia-500 to-pink-600"][i]} rounded-full`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
