'use client';
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function AboutUsSection() {
  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En <span className="font-semibold text-purple-600">GENIO</span>, creemos que la tecnología debe empoderar, inspirar y simplificar la creatividad digital.
          </p>
        </motion.div>

        {/* Misión */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-12 border border-purple-100"
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-3">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestra misión es ofrecer una plataforma intuitiva y poderosa que
            permita a cualquier persona —sin importar su experiencia técnica— 
            construir sitios web modernos, funcionales y visualmente impactantes.
          </p>
        </motion.div>

        {/* Visión */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-12 border border-pink-100"
        >
          <h2 className="text-3xl font-bold text-pink-600 mb-3">Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed">
            Convertirnos en el referente global de herramientas web accesibles,
            impulsando una nueva generación de creadores digitales con libertad
            para diseñar, innovar y emprender sin límites.
          </p>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-10 shadow-xl border border-purple-200"
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovación",
                desc: "Exploramos nuevas formas de crear y mejorar experiencias digitales que inspiren al usuario.",
              },
              {
                title: "Simplicidad",
                desc: "Diseñamos herramientas potentes pero fáciles de usar, accesibles para todos.",
              },
              {
                title: "Compromiso",
                desc: "Nos dedicamos a brindar soporte, calidad y crecimiento continuo a nuestra comunidad.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md p-6 transition-all hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-600">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cierre */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-4">
            Creemos en el poder de la creatividad.
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GENIO no es solo una herramienta: es un espacio para que
            cada idea cobre vida, con diseño, funcionalidad y propósito.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
