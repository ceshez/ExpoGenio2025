"use client"

import type React from "react"

import { useState } from "react"
import { Mail, User, Tag, MessageSquare, Check } from "lucide-react"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "suggestion",
    message: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show success alert
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)

    // Show thank you message after a brief delay
    setTimeout(() => {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 4000)
    }, 3200)

    // Reset form
    setFormData({
      name: "",
      email: "",
      type: "suggestion",
      message: "",
    })
  }

  const typeOptions = [
    { value: "suggestion", label: "Sugerencia" },
    { value: "problem", label: "Problema" },
    { value: "improvement", label: "Mejora" },
    { value: "other", label: "Otro" },
  ]

  return (
    <main className="min-h-screen bg-background py-12 px-4 md:py-20 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Tu opinión nos importa</h1>
          <p className="text-lg font-normal text-muted-foreground text-balance">
            Comparte tus sugerencias, reporta problemas o cuéntanos cómo podemos mejorar
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 animate-slide-in-up">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-semibold">Enviado con éxito</p>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {showMessage && (
          <div className="mb-6 animate-slide-in-up">
            <div className="bg-blue-50 border border-accent rounded-lg p-4 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-accent" />
              <p className="text-blue-900 font-semibold">Gracias, tu mensaje fue recibido</p>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
              className="w-full px-4 py-2 border border-input rounded-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              Correo
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-input rounded-lg font-normal focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
            />
          </div>

          {/* Request Type Field */}
          <div className="mb-6">
            <label htmlFor="type" className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent" />
              Tipo de solicitud
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-lg font-normal focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors bg-background"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Cuéntanos más detalles..."
              rows={5}
              className="w-full px-4 py-2 border border-input rounded-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-shadow text-white font-bold py-3 rounded-lg"
          >
            Enviar mensaje
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm font-normal">
            Nos comprometemos a revisar todos los mensajes dentro de 24 horas
          </p>
        </div>
      </div>
    </main>
  )
}
