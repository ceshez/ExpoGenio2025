"use client"

import { useState } from "react"
import { Mail, Phone, Clock, Facebook, Instagram, Twitter, Linkedin, Send, CheckCircle } from "lucide-react"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  })
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envío
    setTimeout(() => {
      setShowModal(true)
      setFormData({ name: "", email: "", subject: "", message: "", newsletter: false })
    }, 1000)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <>
      <section id="contacto" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-pink-500 uppercase tracking-wide">CONTÁCTANOS</span>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-4 mb-6">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte. Responde en menos de 24 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <h3 className="text-xl font-bold mb-4">Información de contacto</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    title: "Correo electrónico",
                    value: "soporte@genio.com",
                    href: "mailto:soporte@genio.com",
                  },
                  { icon: Phone, title: "Teléfono", value: "+1 (234) 567-89", href: "tel:+123456789" },
                  { icon: Clock, title: "Horario de atención", value: "Lunes a Viernes: 9am - 6pm" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <contact.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium">{contact.title}</h4>
                      {contact.href ? (
                        <a href={contact.href} className="text-gray-600 hover:text-purple-500 transition-colors">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Redes sociales</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, color: "hover:bg-blue-600" },
                    { icon: Instagram, color: "hover:bg-pink-600" },
                    { icon: Twitter, color: "hover:bg-blue-400" },
                    { icon: Linkedin, color: "hover:bg-blue-700" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center ${social.color} hover:-translate-y-1 transition-all duration-200`}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="support">Soporte técnico</option>
                    <option value="sales">Consultas comerciales</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Escribe tu mensaje aquí..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical hover:border-purple-300"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">Deseo recibir novedades y ofertas</label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send size={18} />
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="text-green-500 mb-4 flex justify-center">
              <CheckCircle size={64} />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
            <p className="text-gray-600 mb-6">
              Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactSection
