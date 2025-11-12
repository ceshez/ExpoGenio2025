"use client"

import { CheckCircle } from "lucide-react"

export default function SuccessMessage() {
  return (
    <div className="animate-slide-in-up mb-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 shadow-md">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1 animate-pulse-success" />
          <div>
            <h3 className="font-semibold text-green-900 text-lg mb-1">Enviado con éxito</h3>
            <p className="text-green-700">Gracias, tu mensaje fue recibido. Nos pondremos en contacto pronto.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
