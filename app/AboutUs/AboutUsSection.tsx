import React from "react";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50 text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Título principal */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-purple-700"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sobre Nosotros
        </motion.h2>

        {/* Misión, Visión, Valores */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Misión */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Nuestra Misión
            </h3>
            <p className="text-gray-600 leading-relaxed">
              En <strong>Genio Web Builder</strong>, nuestra misión es empoderar
              a las personas para crear sitios web profesionales de forma
              sencilla, rápida y sin necesidad de conocimientos técnicos. Creemos
              que todos merecen una presencia digital impactante.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Nuestra Visión
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ser la plataforma líder en diseño web inteligente, donde la
              creatividad y la tecnología convergen para transformar ideas en
              experiencias digitales excepcionales.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Nuestros Valores
            </h3>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>Innovación constante</li>
              <li>Accesibilidad y simplicidad</li>
              <li>Compromiso con la calidad</li>
              <li>Transparencia y confianza</li>
              <li>Pasión por ayudar a los creadores</li>
            </ul>
          </motion.div>
        </div>

        {/* Mensaje final */}
        <motion.div
          className="mt-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            En Genio Web Builder creemos que cada persona tiene una historia que
            contar, y nuestro objetivo es ofrecer las herramientas necesarias
            para llevar esa historia al mundo digital con estilo, eficiencia y
            confianza.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;