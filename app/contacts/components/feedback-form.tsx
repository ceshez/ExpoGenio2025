"use client"

import type React from "react"

import { useState } from "react"
import { Mail, User, MessageSquare, Tag, Send } from "lucide-react"

interface FeedbackFormProps {
  onSubmit: () => void
}

const requestTypes = [
  { value: "suggestion", label: "Sugerencia" },
  { value: "problem", label: "Problema" },
  { value: "improvement", label: "Mejora" },
  { value: "other", label: "Otro" },
]

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "suggestion",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Feedback submitted:", formData)
    setFormData({
      name: "",
      email: "",
      requestType: "suggestion",
      message: "",
    })
    setIsSubmitting(false)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
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
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-pink-600" />
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
        />
      </div>

      {/* Request Type Field */}
      <div className="space-y-2">
        <label htmlFor="requestType" className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-600" />
          Tipo de solicitud
        </label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
        >
          {requestTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Cuéntanos en detalle lo que deseas compartir..."
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 group"
      >
        <Send className="w-5 h-5 group-hover:translate-x-1 transition" />
        {isSubmitting ? "Enviando..." : "Enviar feedback"}
      </button>
    </form>
  )
}
