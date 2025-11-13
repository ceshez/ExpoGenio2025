"use client"
import { useState } from "react"
import type React from "react"

import { signIn } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Imágenes
import SendImg from "../../GIO-mascota/GIO-Mail.svg"
import ErrorImg from "../../GIO-mascota/GIO2.0-error.svg"
import SuccessImg from "../../GIO-mascota/emote-like.svg"

export default function TwoFAPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setVerified(false)

    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data?.error === "OTP_INVALID" ? "Código inválido o vencido" : "No se pudo verificar")
        setLoading(false)
        return
      }

      setVerified(true)
      await new Promise((r) => setTimeout(r, 400))

      const result = await signIn("credentials", {
        redirect: false,
        otpToken: data.otpToken,
      })
      if (result?.error) {
        setError("No se pudo iniciar sesión")
        setVerified(false)
        setLoading(false)
        return
      }
      window.location.href = "/dashboard"
    } catch {
      setError("Error de red")
      setLoading(false)
    }
  }

  const getRobotImage = () => {
    if (error) return ErrorImg
    if (verified) return SuccessImg
    return SendImg
  }

  const getImageAnimation = () => {
    if (verified) return "scale-in-success"
    if (error) return "scale-in-error"
    return "scale-in-send"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      {/* Contenedor principal con layout side-by-side */}
      <div className="w-full max-w-5xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Sección izquierda: Formulario */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Verificación de seguridad</h1>
                <p className="text-gray-600 text-lg">
                  Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Código de verificación</label>
                  <div className="relative group">
                    <Input
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      required
                      disabled={loading}
                      className={`h-14 text-center text-2xl tracking-[0.5em] font-bold transition-all ${
                        error ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                      } ${verified ? "border-green-300 focus:border-green-500 focus:ring-green-500/20" : ""}`}
                      aria-invalid={!!error}
                      aria-describedby="otp-help otp-error"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      {error && <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
                      {verified && <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
                    </div>
                  </div>

                  {/* Mensajes de ayuda y error */}
                  <p id="otp-help" className="mt-2 text-xs text-gray-500">
                    El código expira en 10 minutos.
                  </p>
                  {error && (
                    <p id="otp-error" className="mt-2 text-sm font-semibold text-red-600 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full" />
                      {error}
                    </p>
                  )}
                </div>

                {/* Botón */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  disabled={loading || verified}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verificando...
                    </span>
                  ) : verified ? (
                    "¡Verificado!"
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <p className="mt-8 text-center text-sm text-gray-600">
                ¿No recibiste el código?{" "}
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Reenviar</button>
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 relative overflow-hidden">
              {/* Elemento decorativo de fondo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
              </div>

              {/* Robot animado */}
              <div className={`relative z-10 transition-all duration-500 ${getImageAnimation()}`}>
                <div className="w-72 h-72 lg:w-80 lg:h-80 relative drop-shadow-2xl">
                  <Image
                    src={getRobotImage() || "/placeholder.svg"}
                    alt={error ? "Código incorrecto" : verified ? "Código verificado correctamente" : "Enviando código"}
                    fill
                    className={`object-contain transition-all duration-700 ${
                      error ? "animate-shake" : verified ? "animate-bounce-in" : ""
                    }`}
                    sizes="320px"
                    priority
                  />
                </div>
              </div>

              {/* Texto descriptivo debajo del robot */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-sm font-medium text-gray-600">
                  {error ? "Intenta de nuevo" : verified ? "¡Todo listo!" : "Esperando código..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes scaleInSend {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes scaleInError {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scaleInSuccess {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateY(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .scale-in-send {
          animation: scaleInSend 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .scale-in-error {
          animation: scaleInError 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .scale-in-success {
          animation: scaleInSuccess 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0, 0.66, 1);
        }

        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  )
}
