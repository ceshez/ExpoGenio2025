"use client"

import { useEffect, useState } from "react"
import OtpInput from "@/components/OtpInput"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, XCircle, Sparkles } from "lucide-react"

interface ModalVerificacionProps {
  open: boolean
  onClose: () => void
  onVerify: (ok: boolean) => void
  emailPreview?: string
  illustrationSrc?: string
}

export default function ModalVerificacion({
  open,
  onClose,
  onVerify,
  emailPreview = "usuario@ejemplo.com",
  illustrationSrc = "/otp-illustration.png",
}: ModalVerificacionProps) {
  const [locked, setLocked] = useState(true)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  const CORRECT_CODE = "12345"

  useEffect(() => {
    if (!open) {
      setLocked(true)
      setSent(false)
      setMessage(null)
      setVerified(false)
    }
  }, [open])

  function handleSendCode() {
    setLoading(true)
    setMessage(null)

    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setLocked(false)
      setMessage(`Código enviado a ${emailPreview}`)
    }, 800)
  }

  function handleOtpComplete(code: string) {
    setLoading(true)
    setMessage(null)

    setTimeout(() => {
      setLoading(false)
      if (code === CORRECT_CODE) {
        setMessage("¡Código verificado correctamente!")
        setVerified(true)
        onVerify(true)
      } else {
        setMessage("Código incorrecto. Por favor intenta de nuevo.")
        onVerify(false)
      }
    }, 700)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="bg-card border border-purple-200/50 dark:border-purple-800/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Verificación de Seguridad
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Protegiendo tu cuenta
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-foreground mb-6 leading-relaxed">
                Hemos enviado un código de verificación de 5 dígitos a tu correo electrónico{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">{emailPreview}</span>
              </p>

              <div className="mb-6">
                <p className="text-xs sm:text-sm font-medium text-foreground mb-3">
                  Introduce el código de verificación:
                </p>
                <OtpInput length={5} onComplete={handleOtpComplete} disabled={!sent || verified} />
              </div>

              {message && (
                <div className="mb-6">
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                      message.includes("correctamente")
                        ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        : message.includes("incorrecto")
                          ? "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                          : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    {message.includes("correctamente") ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : message.includes("incorrecto") ? (
                      <XCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <Mail className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11 border-2 border-border hover:bg-accent transition-all duration-300 bg-transparent"
                >
                  Cancelar
                </Button>

                {!verified && (
                  <Button
                    onClick={handleSendCode}
                    disabled={loading}
                    className="flex-1 h-11 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : sent ? (
                      "Reenviar código"
                    ) : (
                      "Enviar código"
                    )}
                  </Button>
                )}

                {verified && (
                  <Button
                    onClick={onClose}
                    className="flex-1 h-11 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Continuar
                  </Button>
                )}
              </div>

              {loading && (
                <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
                  Procesando tu solicitud...
                </p>
              )}
            </div>

            <div className="hidden md:flex md:w-2/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-purple-500 to-pink-500" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

              <div className="relative z-10 flex items-center justify-center p-8">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center border border-white/20 shadow-2xl">
                  <img
                    src={illustrationSrc || "/placeholder.svg"}
                    alt="Ilustración de verificación"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}