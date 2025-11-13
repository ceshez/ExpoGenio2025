"use client"

import { useState } from "react"
import FeedbackForm from "./components/feedback-form"
import SuccessMessage from "./components/success-message"

export default function FeedbackPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFormSubmit = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 4000)
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-white to-purple-50 py-28 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Tu opinión nos importa</h1>
          <p className="text-lg text-gray-600 text-balance">
            Comparte tus sugerencias, reporta problemas o cuéntanos cómo podemos mejorar
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && <SuccessMessage />}

        {/* Feedback Form */}
        <FeedbackForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  )
}