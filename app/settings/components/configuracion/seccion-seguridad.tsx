"use client"

import { useState } from "react"
// Componentes de UI reutilizables
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
// Iconos de Lucide
import { Lock, Mail, ShieldCheck, Eye, EyeOff, Shield } from "lucide-react"
import ModalVerificacion from "@/components/ModalVerificacion"

// Props del componente
interface SeccionSeguridadProps {
  onGuardar?: () => void // Callback opcional cuando se guarda algo
}

/**
 * Componente de la sección de Seguridad
 * Permite cambiar contraseña, email principal y email de recuperación
 * Incluye verificación por código OTP para cambios sensibles
 */
export function SeccionSeguridad({ onGuardar }: SeccionSeguridadProps) {
  // Estados para mostrar/ocultar contraseñas
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false)

  const [mostrarModal, setMostrarModal] = useState(false) // Controla visibilidad del modal
  const [codigoValidado, setCodigoValidado] = useState(false) // Indica si el código fue verificado exitosamente
  const [ultimoTipo, setUltimoTipo] = useState<"password" | "email" | null>(null) // Tipo de acción que requiere verificación

  const [nuevoCorreo, setNuevoCorreo] = useState("")
  const [nuevaContrasena, setNuevaContrasena] = useState("")

  /**
   * Abre el modal de verificación para el tipo de acción especificado
   * @param tipo - "password" para cambio de contraseña, "email" para cambio de correo
   */
  function handleAbrirModal(tipo: "password" | "email") {
    setUltimoTipo(tipo)
    setCodigoValidado(false) // Resetear estado de validación
    setMostrarModal(true)
  }

  /**
   * Cierra el modal de verificación
   */
  function handleCerrarModal() {
    setMostrarModal(false)
  }

  /**
   * Maneja el resultado de la verificación del código OTP
   * @param ok - true si el código fue correcto, false si fue incorrecto
   */
  function handleVerificacionResultado(ok: boolean) {
    setCodigoValidado(ok)
    // Si fue exitoso, cerrar el modal después de un breve delay para mostrar el mensaje
    if (ok) {
      setTimeout(() => setMostrarModal(false), 700)
    }
  }

  /**
   * Actualiza la contraseña después de verificación exitosa
   */
  function handleActualizarPassword() {
    if (!codigoValidado) return // Solo permitir si el código fue validado
    onGuardar?.() // Llamar callback opcional (muestra toast verde)
    setCodigoValidado(false) // Resetear estado
    setNuevaContrasena("") // Limpiar campo
  }

  /**
   * Actualiza el correo electrónico después de verificación exitosa
   */
  function handleActualizarCorreo() {
    if (!codigoValidado) return // Solo permitir si el código fue validado
    onGuardar?.() // Llamar callback opcional (muestra toast verde)
    setCodigoValidado(false) // Resetear estado
    setNuevoCorreo("") // Limpiar campo
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Encabezado de la sección */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          Seguridad
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Gestiona tu contraseña y opciones de seguridad
        </p>
      </div>

      {/* Card de cambio de contraseña */}
      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-purple-50/5 dark:to-purple-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Cambiar Contraseña</h3>
        </div>

        <div className="space-y-4">
          {/* Campo de contraseña actual */}
          <div className="space-y-2">
            <Label htmlFor="contrasena-actual" className="text-sm sm:text-base">
              Contraseña Actual
            </Label>
            <div className="relative">
              <Input
                id="contrasena-actual"
                type={mostrarContrasena ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10 text-sm sm:text-base"
              />
              {/* Botón para mostrar/ocultar contraseña */}
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Campo de nueva contraseña */}
          <div className="space-y-2">
            <Label htmlFor="nueva-contrasena" className="text-sm sm:text-base">
              Nueva Contraseña
            </Label>
            <div className="relative">
              <Input
                id="nueva-contrasena"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                type={mostrarNuevaContrasena ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10 text-sm sm:text-base"
              />
              {/* Botón para mostrar/ocultar nueva contraseña */}
              <button
                type="button"
                onClick={() => setMostrarNuevaContrasena(!mostrarNuevaContrasena)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={mostrarNuevaContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarNuevaContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Botón de enviar código - se oculta si ya fue verificado */}
            {!codigoValidado || ultimoTipo !== "password" ? (
              <Button
                onClick={() => handleAbrirModal("password")}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300 text-sm sm:text-base h-10 sm:h-11"
              >
                Enviar código
              </Button>
            ) : null}

            {/* Botón de actualizar - solo aparece si el código fue validado para password */}
            {codigoValidado && ultimoTipo === "password" && (
              <Button
                onClick={handleActualizarPassword}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-300 text-sm sm:text-base h-10 sm:h-11"
              >
                Actualizar Contraseña
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Card de cambio de correo */}
      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-blue-50/5 dark:to-blue-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Cambiar Correo</h3>
        </div>

        <div className="space-y-4">
          {/* Campo de correo actual (deshabilitado) */}
          <div className="space-y-2">
            <Label htmlFor="correo-actual" className="text-sm sm:text-base">
              Correo Actual
            </Label>
            <Input
              id="correo-actual"
              type="email"
              placeholder="usuario@ejemplo.com"
              defaultValue="usuario@ejemplo.com"
              disabled
              className="bg-muted/50 text-sm sm:text-base cursor-not-allowed"
            />
          </div>

          {/* Campo de nuevo correo */}
          <div className="space-y-2">
            <Label htmlFor="nuevo-correo" className="text-sm sm:text-base">
              Nuevo Correo
            </Label>
            <Input
              id="nuevo-correo"
              value={nuevoCorreo}
              onChange={(e) => setNuevoCorreo(e.target.value)}
              type="email"
              placeholder="nuevo@ejemplo.com"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Botón de enviar código - se oculta si ya fue verificado */}
            {!codigoValidado || ultimoTipo !== "email" ? (
              <Button
                onClick={() => handleAbrirModal("email")}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 text-sm sm:text-base h-10 sm:h-11"
              >
                Enviar código
              </Button>
            ) : null}

            {/* Botón de actualizar - solo aparece si el código fue validado para email */}
            {codigoValidado && ultimoTipo === "email" && (
              <Button
                onClick={handleActualizarCorreo}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white shadow-lg transition-all duration-300 text-sm sm:text-base h-10 sm:h-11"
              >
                Actualizar Correo
              </Button>
            )}
          </div>
        </div>
      </Card>

      <ModalVerificacion
        open={mostrarModal}
        onClose={handleCerrarModal}
        onVerify={handleVerificacionResultado}
        emailPreview={ultimoTipo === "email" ? nuevoCorreo || "nuevo@ejemplo.com" : "usuario@ejemplo.com"}
        illustrationSrc="/otp-illustration.png"
      />
    </div>
  )
}