"use client"

import { useEffect, useState } from "react"
import OtpInput from "@/components/OtpInput"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, XCircle, Sparkles } from "lucide-react"

// Interfaz de propiedades del modal de verificación
interface ModalVerificacionProps {
  open: boolean // Controla si el modal está visible
  onClose: () => void // Función para cerrar el modal
  onVerify: (ok: boolean) => void // Callback cuando se verifica el código (ok = true si es correcto)
  emailPreview?: string // Email del usuario para mostrar en el modal
  illustrationSrc?: string // Ruta de la imagen decorativa (opcional)
}

export default function ModalVerificacion({
  open,
  onClose,
  onVerify,
  emailPreview = "usuario@ejemplo.com",
  illustrationSrc = "/otp-illustration.png",
}: ModalVerificacionProps) {
  // Estado para controlar si el modal está bloqueado (el usuario debe enviar código primero)
  const [locked, setLocked] = useState(true)
  // Estado para saber si ya se envió el código
  const [sent, setSent] = useState(false)
  // Estado de carga durante operaciones asíncronas
  const [loading, setLoading] = useState(false)
  // Mensaje de retroalimentación para el usuario
  const [message, setMessage] = useState<string | null>(null)
  // Estado para saber si el código fue verificado exitosamente
  const [verified, setVerified] = useState(false)

  // Código correcto de ejemplo (en producción vendría del backend)
  const CORRECT_CODE = "12345"

  // Reiniciar estados cuando se cierra el modal
  useEffect(() => {
    if (!open) {
      setLocked(true)
      setSent(false)
      setMessage(null)
      setVerified(false)
    }
  }, [open])

  // Función para simular el envío del código por email
  function handleSendCode() {
    setLoading(true)
    setMessage(null)

    // Simulación de llamada al backend (800ms)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setLocked(false) // Desbloquear inputs para que el usuario pueda ingresar el código
      setMessage(`Código enviado a ${emailPreview}`)
    }, 800)
  }

  // Función que se ejecuta cuando el usuario completa los 5 dígitos del código
  function handleOtpComplete(code: string) {
    setLoading(true)
    setMessage(null)

    // Simulación de verificación del código (700ms)
    setTimeout(() => {
      setLoading(false)
      if (code === CORRECT_CODE) {
        setMessage("¡Código verificado correctamente!")
        setVerified(true)
        onVerify(true) // Notificar al componente padre que la verificación fue exitosa
      } else {
        setMessage("Código incorrecto. Por favor intenta de nuevo.")
        onVerify(false)
      }
    }, 700)
  }

  // No renderizar nada si el modal no está abierto
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay oscuro con blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Contenedor principal del modal */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="bg-card border border-purple-200/50 dark:border-purple-800/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sección izquierda: contenido del modal */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 lg:p-10">
              {/* Encabezado con ícono decorativo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Verificación de Seguridad
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Protegiendo tu cuenta
                  </p>
                </div>
              </div>

              {/* Descripción del proceso */}
              <p className="text-sm sm:text-base text-foreground mb-6 leading-relaxed">
                Hemos enviado un código de verificación de 5 dígitos a tu correo electrónico{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">{emailPreview}</span>
              </p>

              {/* Sección del input OTP */}
              <div className="mb-6">
                <p className="text-xs sm:text-sm font-medium text-foreground mb-3">
                  Introduce el código de verificación:
                </p>
                <OtpInput
                  length={5}
                  onComplete={handleOtpComplete}
                  disabled={!sent || verified} // Deshabilitar si no se ha enviado código o ya fue verificado
                />
              </div>

              {/* Mensaje de retroalimentación */}
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
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : message.includes("incorrecto") ? (
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11 border-2 border-border hover:bg-accent transition-all duration-300 bg-transparent"
                >
                  Cancelar
                </Button>

                {/* Botón para enviar/reenviar código - se oculta cuando está verificado */}
                {!verified && (
                  <Button
                    onClick={handleSendCode}
                    disabled={loading}
                    className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                    className="flex-1 h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Continuar
                  </Button>
                )}
              </div>

              {/* Indicador de carga */}
              {loading && (
                <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
                  Procesando tu solicitud...
                </p>
              )}
            </div>

            {/* Sección derecha: ilustración decorativa (solo visible en desktop) */}
            <div className="hidden md:flex md:w-2/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

              <div className="relative z-10 flex items-center justify-center p-8">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center border border-white/20 shadow-2xl">
                  <img
                    src={illustrationSrc || "/placeholder.svg"}
                    alt="Ilustración de verificación"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    onError={(e) => {
                      // Fallback si la imagen no carga
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