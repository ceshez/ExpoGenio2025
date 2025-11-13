"use client"

import { useEffect, useState } from "react"
import OtpInput from "@/components/OtpInput"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { NotificationOverlay } from "@/components/notification-overlay"

interface ModalVerificacionProps {
  open: boolean
  onClose: () => void
  onVerify: (ok: boolean) => void
  emailPreview?: string
  illustrationSrc?: string
  type?: "password" | "email"
}

export default function ModalVerificacion({
  open,
  onClose,
  onVerify,
  emailPreview = "usuario@ejemplo.com",
  illustrationSrc = "/otp-illustration.png",
  type = "email",
}: ModalVerificacionProps) {
  const [locked, setLocked] = useState(true)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)
  const [robotAnimationKey, setRobotAnimationKey] = useState(0)

  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState<"success" | "error" | "loading">("loading")

  const CORRECT_CODE = "123456"

  const getRobotImage = () => {
    if (message?.includes("incorrecto")) {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GIO2.0-error-I6WTCTFc3vDuLb8oCaj7qrtQemVwJq.png"
    }
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GIO2.02x-sfGmQmVymhvO4EpYaH18MMvjTsZMgM.png"
  }

  useEffect(() => {
    if (!open) {
      setLocked(true)
      setSent(false)
      setMessage(null)
      setVerified(false)
      setRobotAnimationKey(0)
    }
  }, [open])

  useEffect(() => {
    if (message) {
      setRobotAnimationKey((prev) => prev + 1)
    }
  }, [message])

  function handleSendCode() {
    setLoading(true)
    setMessage(null)

    setNotificationType("loading")
    setShowNotification(true)

    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setLocked(false)
      setMessage(`Código enviado a ${emailPreview}`)
      setShowNotification(false)
    }, 1000)
  }

  function handleOtpComplete(code: string) {
    setLoading(true)
    setMessage(null)

    setTimeout(() => {
      setLoading(false)
      if (code === CORRECT_CODE) {
        setMessage("¡Código verificado correctamente!")
        setVerified(true)

        setNotificationType("success")
        setShowNotification(true)

        setTimeout(() => {
          console.log("[v0] Verification complete, calling onVerify")
          setShowNotification(false)
          onVerify(true)
        }, 1000)
      } else {
        setMessage("Código incorrecto. Por favor intenta de nuevo.")

        setNotificationType("error")
        setShowNotification(true)

        setTimeout(() => {
          setShowNotification(false)
          onVerify(false)
        }, 2000)
      }
    }, 700)
  }

  if (!open) return null

  return (
    <>
      <NotificationOverlay
        type={notificationType}
        show={showNotification}
        onComplete={() => {
          console.log("[v0] Notification completed, hiding overlay")
          setShowNotification(false)
        }}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="bg-white border-2 border-purple-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-left duration-500">
                  <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Verificación de Seguridad
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Protegiendo tu cuenta
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed animate-in slide-in-from-left duration-500 delay-100">
                  Hemos enviado un código de verificación de 6 dígitos a tu correo electrónico{" "}
                  <span className="font-semibold text-purple-600">{emailPreview}</span>
                </p>

                <div className="mb-6 animate-in slide-in-from-left duration-500 delay-200">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3">
                    Introduce el código de verificación:
                  </p>
                  <OtpInput length={6} onComplete={handleOtpComplete} disabled={!sent || verified} />
                </div>

                {message && (
                  <div className="mb-6 animate-in fade-in zoom-in duration-300">
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        message.includes("correctamente")
                          ? "bg-green-50 text-green-700 border-green-300 shadow-lg shadow-green-500/20"
                          : message.includes("incorrecto")
                            ? "bg-red-50 text-red-700 border-red-300 shadow-lg shadow-red-500/20"
                            : "bg-blue-50 text-blue-700 border-blue-300 shadow-lg shadow-blue-500/20"
                      }`}
                    >
                      {message.includes("correctamente") ? (
                        <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
                      ) : message.includes("incorrecto") ? (
                        <XCircle className="w-5 h-5 shrink-0 animate-pulse" />
                      ) : (
                        <Mail className="w-5 h-5 shrink-0" />
                      )}
                      <span className="text-sm font-medium">{message}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 animate-in slide-in-from-bottom duration-500 delay-300">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 bg-white hover:scale-105 text-gray-700"
                  >
                    Cancelar
                  </Button>

                  {!verified && (
                    <Button
                      onClick={handleSendCode}
                      disabled={loading}
                      className="flex-1 h-11 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
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
                      className="flex-1 h-11 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in pulse"
                    >
                      Continuar
                    </Button>
                  )}
                </div>

                {loading && (
                  <p className="text-center text-sm text-gray-600 mt-4 flex items-center justify-center gap-2 animate-in fade-in duration-300">
                    <span className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
                    Procesando tu solicitud...
                  </p>
                )}
              </div>

              <div className="hidden md:flex md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-white" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100 rounded-full blur-2xl opacity-30" />

                <div className="relative z-10 flex items-center justify-center p-8 w-full h-full">
                  <img
                    key={robotAnimationKey}
                    src={getRobotImage() || "/placeholder.svg"}
                    alt="Robot GIO - Verificación"
                    className={`w-72 h-72 object-contain drop-shadow-2xl transition-all duration-500 ${
                      message?.includes("correctamente")
                        ? "animate-in zoom-in scale-110 duration-500"
                        : message?.includes("incorrecto")
                          ? "animate-in shake duration-500"
                          : "animate-in fade-in duration-300"
                    }`}
                    onError={(e) => {
                      console.log("[v0] Robot image failed to load")
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-8px);
            }
            75% {
              transform: translateX(8px);
            }
          }

          .animate-in.shake {
            animation: shake 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        `}</style>
      </div>
    </>
  )
}
