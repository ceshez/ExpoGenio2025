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
    <section className="relative z-10 py-20 md:py-32 bg-linear-to-br from-purple-50 via-pink-50 to-purple-100 overflow-hidden">
      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Hero Section */}
        <motion.div initial="hidden" animate="show" variants={fadeInUp} className="text-center mb-20 md:mb-28 relative">
          <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/60">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-3xl" />
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-black bg-linear-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent mb-6 leading-tight">
                Empoderando a las PYMEs de Costa Rica
              </h1>
              <div className="flex justify-center gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-3 h-3 rounded-full bg-linear-to-r ${["from-purple-500 to-purple-600", "from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-pink-600", "from-fuchsia-500 to-pink-600"][i]}`}
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

        {/* Interactive Name Section */}
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
            className="group relative bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-10 border-2 border-purple-400/50 hover:border-purple-500/70 hover:shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-purple-300/20 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto">
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
            className="group relative bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-10 border-2 border-purple-400/50 hover:border-purple-500/70 hover:shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-pink-300/20 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto">
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

        {/* Costa Rica Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 md:mb-28"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple-400 rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-purple-400 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-purple-400 rounded-full" />
          </div>
          <div className="relative z-10 p-6 md:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-purple-700 mb-4 md:mb-6 lg:mb-8 leading-tight">
                De Costa Rica, para Costa Rica
              </h2>
              <p className="text-gray-700 text-sm md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-6 md:mb-10 lg:mb-12 px-2">
                Nacimos en el corazón de Costa Rica con un propósito claro: fortalecer el tejido empresarial local. Cada
                PYME que crece con GENIO es un paso hacia una economía digital más fuerte y competitiva.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-2">
                {[...Array(3)].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/30 backdrop-blur-md rounded-2xl p-5 md:p-6 border-2 border-purple-400/40 hover:border-purple-400/60 hover:bg-white/40 transition-all text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 md:mb-3">{i + 1}</div>
                    <h3 className="text-purple-700 font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                      {["Enfocados en PYMEs", "Crecimiento Local", "Alcance Global"][i]}
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
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

        {/* Timeline Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-6">
              Nuestro Camino
            </h2>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              La evolución de una idea hacia una plataforma que transformará las PYMEs de Costa Rica
            </p>
          </div>

          {/* Desktop & Tablet: Timeline horizontal con círculos conectados */}
          <div className="hidden md:block">
            <div className="relative px-4 md:px-8 py-16">
              {/* SVG con líneas punteadas y nodos (similar a la imagen de referencia) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ top: "0", left: "0" }}
                preserveAspectRatio="none"
              >
                {/* Línea punteada principal que conecta todos los nodos */}
                <motion.path
                  d="M 12% 50% Q 25% 30%, 35% 50% T 65% 50% T 88% 50%"
                  stroke="url(#timeline-gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />

                <defs>
                  <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="33%" stopColor="#f87171" />
                    <stop offset="66%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative grid grid-cols-4 gap-4 md:gap-8">
                {[
                  {
                    title: "Primeras Ideas",
                    date: "Q1 2025",
                    desc: "Identificación de las necesidades de las PYMEs costarricenses.",
                    gradient: "from-orange-400 to-amber-500",
                    iconColor: "text-orange-500",
                  },
                  {
                    title: "Diseños Principales",
                    date: "Q2-Q3 2025",
                    desc: "Desarrollo de la arquitectura de la plataforma.",
                    gradient: "from-red-400 to-rose-500",
                    iconColor: "text-red-500",
                  },
                  {
                    title: "Creación de la Plataforma",
                    date: "Q4 2025",
                    desc: "Desarrollo completo de GENIO con todas sus funcionalidades.",
                    gradient: "from-cyan-400 to-blue-500",
                    iconColor: "text-cyan-500",
                  },
                  {
                    title: "Ayuda a las PYMEs",
                    date: "2026+",
                    desc: "Lanzamiento oficial y expansión en toda Costa Rica.",
                    gradient: "from-purple-400 to-violet-500",
                    iconColor: "text-purple-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    onViewportEnter={() => setActiveTimeline(i)}
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Nodo principal (círculo grande) - todos del mismo tamaño */}
                    <motion.div
                      className={`relative w-32 h-32 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-20 mb-8 cursor-pointer group`}
                    >
                      {/* Fondo con gradiente */}
                      <div
                        className={`absolute inset-2 bg-linear-to-br ${item.gradient} rounded-full opacity-90 group-hover:opacity-100 transition-opacity`}
                      />

                      {/* Ícono - sin animación de pulso para mantener consistencia */}
                      <svg
                        className="w-14 h-14 md:w-16 md:h-16 text-white relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
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
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        )}
                        {i === 3 && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        )}
                      </svg>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-4 md:p-6 border-2 border-purple-400/50 hover:border-purple-500/70 text-center w-full h-240px flex flex-col transition-all"
                    >
                      {/* Badge de fecha */}
                      <div className="mb-3">
                        <span
                          className={`inline-block px-3 py-1 bg-linear-to-r ${item.gradient} text-white text-xs md:text-sm font-bold rounded-full shadow-md`}
                        >
                          {item.date}
                        </span>
                      </div>

                      {/* Título */}
                      <h3
                        className={`text-base md:text-lg font-bold mb-2 bg-linear-to-r ${item.gradient} bg-clip-text text-transparent leading-tight`}
                      >
                        {item.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-gray-700 text-xs md:text-sm leading-relaxed flex-1">{item.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Nodos intermedios pequeños (decorativos, como en la imagen) */}
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-linear-to-br from-orange-300 to-red-300 rounded-full shadow-md z-10 hidden lg:block" />
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-linear-to-br from-red-300 to-cyan-300 rounded-full shadow-md z-10 hidden lg:block" />
              <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-linear-to-br from-cyan-300 to-purple-300 rounded-full shadow-md z-10 hidden lg:block" />
            </div>
          </div>

          <div className="md:hidden space-y-8 px-4">
            {[
              {
                title: "Primeras Ideas",
                date: "Q1 2025",
                desc: "Identificación de las necesidades de las PYMEs costarricenses.",
                gradient: "from-orange-400 to-amber-500",
              },
              {
                title: "Diseños Principales",
                date: "Q2-Q3 2025",
                desc: "Desarrollo de la arquitectura de la plataforma.",
                gradient: "from-red-400 to-rose-500",
              },
              {
                title: "Creación de la Plataforma",
                date: "Q4 2025",
                desc: "Desarrollo completo de GENIO con todas sus funcionalidades.",
                gradient: "from-cyan-400 to-blue-500",
              },
              {
                title: "Ayuda a las PYMEs",
                date: "2026+",
                desc: "Lanzamiento oficial y expansión en toda Costa Rica.",
                gradient: "from-purple-400 to-violet-500",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative flex items-start gap-4">
                {/* Línea vertical conectora */}
                {i < 3 && (
                  <div className="absolute left-6 top-20 w-0.5 h-16 bg-linear-to-b from-purple-300 to-pink-300" />
                )}

                {/* Nodo */}
                <div className="shrink-0">
                  <div
                    className={`w-12 h-12 bg-linear-to-br ${item.gradient} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      {i === 0 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      )}
                      {i === 1 && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      )}
                      {i === 2 && (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      )}
                      {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                    </svg>
                  </div>
                </div>

                {/* Tarjeta */}
                <div className="flex-1 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-5 border-2 border-purple-400/50 min-h-40">
                  <div className="mb-2">
                    <span
                      className={`inline-block px-3 py-1 bg-linear-to-r ${item.gradient} text-white text-xs font-bold rounded-full shadow-md`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <h3
                    className={`text-base md:text-lg font-bold mb-2 bg-linear-to-r ${item.gradient} bg-clip-text text-transparent leading-tight`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Valores Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 md:mb-28"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          </div>

          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple-400 rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-purple-400 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-purple-400 rounded-full" />
          </div>

          <div className="relative z-10 p-10 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-purple-700 mb-4">Nuestros Valores</h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Los principios que guían cada decisión y cada línea de código
              </p>
            </div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-8 transition-all hover:shadow-2xl border-2 border-purple-400/50 hover:border-purple-400/70 hover:bg-white/30 relative overflow-hidden text-center h-[480px] flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-300/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${["from-purple-400 to-purple-500", "from-pink-400 to-pink-500", "from-indigo-400 to-purple-500"][i]} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all mx-auto`}
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
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z"
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
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">
                    {["Innovación", "Accesibilidad", "Compromiso Local"][i]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed flex-1">
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

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
              El Equipo Detrás de GENIO
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Mentes creativas y apasionadas trabajando para democratizar la tecnología
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto"
          >
            {[
              { first: "Carlos", last: "Sánchez", initial: "C" },
              { first: "Yerick", last: "Mondragón", initial: "Y" },
              { first: "Xiao", last: "Méndez", initial: "X" },
              { first: "Darien", last: "Mena", initial: "D" },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-purple-100 text-center"
              >
                <div
                  className={`w-24 h-24 bg-linear-to-br ${["from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-purple-600", "from-fuchsia-500 to-pink-600"][i]} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {member.initial}
                </div>
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
                      className={`w-2 h-2 bg-linear-to-r ${["from-pink-500 to-rose-500", "from-indigo-500 to-purple-600", "from-violet-500 to-purple-600", "from-fuchsia-500 to-pink-600"][i]} rounded-full`}
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
