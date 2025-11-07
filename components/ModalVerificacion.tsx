"use client"

import React, { useEffect, useState } from "react"
import OtpInput from "./OtpInput"
import { Button } from "@/components/ui/button"

interface ModalVerificacionProps {
  open: boolean
  onClose: () => void // not used while locked, but kept for API completeness
  onVerify: (ok: boolean) => void
  emailPreview?: string
  illustrationSrc?: string // path in /public, e.g. "/otp-illustration.png"
}

export default function ModalVerificacion({
  open,
  onClose,
  onVerify,
  emailPreview = "usuario@ejemplo.com",
  illustrationSrc = "/otp-illustration.png",
}: ModalVerificacionProps) {
  const [locked, setLocked] = useState(true) // modal locked until user requests code
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Simulated correct code (for demo). You can change this value.
  const CORRECT_CODE = "12345"

  useEffect(() => {
    if (!open) {
      // reset when closed
      setLocked(true)
      setSent(false)
      setMessage(null)
    }
  }, [open])

  function handleSendCode() {
    setLoading(true)
    setMessage(null)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setLocked(false) // user can now input code
      setMessage(`Código enviado a ${emailPreview}`)
    }, 800)
  }

  function handleOtpComplete(code: string) {
    setLoading(true)
    setMessage(null)
    setTimeout(() => {
      setLoading(false)
      if (code === CORRECT_CODE) {
        setMessage("Código correcto ✅")
        onVerify(true)
        // optionally allow closing
      } else {
        setMessage("Código incorrecto. Intenta de nuevo ❌")
        onVerify(false)
      }
    }, 700)
  }

  // Prevent closing clicking backdrop while locked true
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop blur + dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* modal container */}
      <div className="relative z-10 w-[92%] max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/60 to-purple-50/20 dark:from-neutral-900/60 dark:to-neutral-900/20 border border-white/30 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex">
          {/* Left: text + OTP */}
          <div className="w-full md:w-2/3 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              Te enviamos un código!
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Revisa tu correo: <span className="font-medium">{emailPreview}</span>
            </p>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Introduce el código de 5 dígitos:</p>
              <OtpInput length={5} onComplete={handleOtpComplete} />
            </div>

            {message && (
              <div className="mb-4 text-sm">
                <span
                  className={`inline-block px-3 py-2 rounded-md ${
                    message.includes("correcto")
                      ? "bg-green-50 text-green-700"
                      : message.includes("incorrecto")
                      ? "bg-red-50 text-red-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {message}
                </span>
              </div>
            )}

            <div className="flex gap-3 items-center mt-4">
              <Button
                variant="outline"
                onClick={handleSendCode}
                disabled={loading}
                className="px-4 py-2"
              >
                {sent ? "Reenviar código" : "Enviar código"}
              </Button>

              {/* While locked (no code requested) do not allow closing */}
              {!locked && (
                <Button
                  onClick={() => {
                    // allow closing when unlocked (optional)
                    onClose()
                  }}
                  className="px-4 py-2"
                >
                  Cerrar
                </Button>
              )}

              {loading && <span className="text-sm text-muted-foreground">Procesando...</span>}
            </div>
          </div>

          {/* Right: illustration */}
          <div className="hidden md:flex md:w-1/3 items-center justify-center bg-gradient-to-tr from-purple-600 to-purple-400">
            <div className="p-6">
              <div className="w-56 h-56 bg-white/10 rounded-lg p-4 flex items-center justify-center">
                {/* Image placeholder - coloca tu imagen en public/otp-illustration.png */}
                <img
                  src={illustrationSrc}
                  alt="Ilustración verificación"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* note: modal cannot be closed by clicking backdrop while locked */}
        {/* we intentionally do not render a close X if locked */}
      </div>
    </div>
  ) : null
}
