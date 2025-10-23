"use client"
import { motion } from "framer-motion"

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
  return (
    <section className="relative z-10 py-20 md:py-32 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/3 right-20 w-[28rem] h-[28rem] bg-gradient-to-br from-pink-500 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
      />
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-20 w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-10 w-64 h-64 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
      />
      {/* </CHANGE> */}

      {/* Elementos decorativos geométricos */}
      <div className="absolute top-20 right-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-60" />
      <div className="absolute top-40 right-1/3 w-3 h-3 bg-pink-500 rounded-full opacity-50" />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-600 rounded-full opacity-70" />
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-rose-500 rounded-full opacity-50" />

      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={fadeInUp} className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            En <span className="font-bold text-purple-600">GENIO</span>, creemos que la tecnología debe empoderar,
            inspirar y simplificar la creatividad digital para todos.
          </p>
        </motion.div>
        {/* </CHANGE> */}

        {/* Misión y Visión - Layout mejorado lado a lado */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-10 border border-purple-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Ofrecer una plataforma intuitiva y poderosa que permita a cualquier persona —sin importar su experiencia
                técnica— construir sitios web modernos, funcionales y visualmente impactantes que transformen sus ideas
                en realidad.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="group relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-10 border border-pink-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Nuestra Visión</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Convertirnos en el referente global de herramientas web accesibles, impulsando una nueva generación de
                creadores digitales con libertad para diseñar, innovar y emprender sin límites tecnológicos.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-100 via-white to-pink-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/50 mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-3">
              Nuestros Valores
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada línea de código que escribimos
            </p>
          </div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Innovación",
                desc: "Exploramos constantemente nuevas formas de crear y mejorar experiencias digitales que inspiren y sorprendan al usuario.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Simplicidad",
                desc: "Diseñamos herramientas potentes pero intuitivas, eliminando la complejidad innecesaria para que todos puedan crear.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                ),
                color: "from-pink-500 to-pink-600",
              },
              {
                title: "Compromiso",
                desc: "Nos dedicamos a brindar soporte excepcional, calidad superior y crecimiento continuo a nuestra comunidad global.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                color: "from-indigo-500 to-purple-600",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/90 rounded-2xl shadow-lg p-8 transition-all hover:shadow-2xl border border-purple-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-200/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${val.color} rounded-xl flex items-center justify-center mb-5 shadow-md text-white group-hover:scale-110 transition-transform`}
                >
                  {val.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{val.title}</h3>
                <p className="text-gray-600 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" variants={fadeInUp} viewport={{ once: true }} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-3">
              ¿Por qué GENIO?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Características que nos hacen únicos en el mundo de la creación web
            </p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sin Código",
                desc: "Crea sitios profesionales sin escribir una sola línea de código",
                gradient: "from-purple-500 to-purple-600",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                ),
              },
              {
                title: "Diseño Moderno",
                desc: "Plantillas y componentes con las últimas tendencias visuales",
                gradient: "from-pink-500 to-rose-500",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                ),
              },
              {
                title: "Responsive",
                desc: "Todos tus diseños se adaptan perfectamente a cualquier dispositivo",
                gradient: "from-indigo-500 to-purple-600",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Rápido",
                desc: "Optimización automática para tiempos de carga ultrarrápidos",
                gradient: "from-violet-500 to-purple-600",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-purple-100 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* </CHANGE> */}

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full"
          />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Construyendo el futuro de la creación web
            </h3>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              GENIO está en desarrollo activo para convertirse en la plataforma donde cada idea cobra vida con diseño
              excepcional, funcionalidad robusta y una experiencia de usuario sin precedentes.
            </p>
          </div>
        </motion.div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}