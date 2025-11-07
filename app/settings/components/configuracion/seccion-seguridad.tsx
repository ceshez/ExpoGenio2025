"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Lock, Mail, ShieldCheck, Eye, EyeOff, Shield } from "lucide-react"
import ModalVerificacion from "@/components/ModalVerificacion"

interface SeccionSeguridadProps {
  // simula que guardas, es UI only
  onGuardar?: () => void
}

export function SeccionSeguridad({ onGuardar }: SeccionSeguridadProps) {
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false)

  // Estados de flujo
  const [mostrarModal, setMostrarModal] = useState(false)
  const [codigoValidado, setCodigoValidado] = useState(false)
  const [ultimoTipo, setUltimoTipo] = useState<"password" | "email" | null>(null)

  // para demo: control de inputs
  const [nuevoCorreo, setNuevoCorreo] = useState("")
  const [nuevaContrasena, setNuevaContrasena] = useState("")

  // Cuando el usuario pulsa "Enviar código" en la UI principal
  function handleAbrirModal(tipo: "password" | "email") {
    setUltimoTipo(tipo)
    setCodigoValidado(false)
    setMostrarModal(true)
  }

  function handleCerrarModal() {
    // opcional: sólo permitir cerrar si se ha enviado el código (el modal ya decide bloqueo)
    setMostrarModal(false)
  }

  function handleVerificacionResultado(ok: boolean) {
    setCodigoValidado(ok)
    // si fue ok, mantenemos el modal abierto pero podríamos cerrarlo o mostrar check
    // aquí solo cerramos si ok para que el usuario vea el estado final
    if (ok) {
      setTimeout(() => setMostrarModal(false), 700)
    }
  }

  function handleActualizarPassword() {
    // simulación: si está validado, mostramos acción
    if (!codigoValidado) return
    // aquí podrías llamar onGuardar o mostrar toast
    alert("Contraseña actualizada (simulado).")
    onGuardar?.()
    setCodigoValidado(false)
  }

  function handleActualizarCorreo() {
    if (!codigoValidado) return
    alert(`Correo actualizado a ${nuevoCorreo} (simulado).`)
    onGuardar?.()
    setCodigoValidado(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          Seguridad
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Gestiona tu contraseña y opciones de seguridad
        </p>
      </div>

      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-purple-50/5 dark:to-purple-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Cambiar Contraseña</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contrasena-actual" className="text-sm sm:text-base">
              Contraseña Actual
            </Label>
            <div className="relative">
              <Input id="contrasena-actual" type={mostrarContrasena ? "text" : "password"} placeholder="••••••••" className="pr-10 text-sm sm:text-base" />
              <button type="button" onClick={() => setMostrarContrasena(!mostrarContrasena)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {mostrarContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nueva-contrasena" className="text-sm sm:text-base">Nueva Contraseña</Label>
            <div className="relative">
              <Input id="nueva-contrasena" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} type={mostrarNuevaContrasena ? "text" : "password"} placeholder="••••••••" className="pr-10 text-sm sm:text-base" />
              <button type="button" onClick={() => setMostrarNuevaContrasena(!mostrarNuevaContrasena)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {mostrarNuevaContrasena ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => handleAbrirModal("password")} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white">Enviar código</Button>

            {/* Mostrar actualizar SOLO si código validado */}
            {codigoValidado && ultimoTipo === "password" && (
              <Button onClick={handleActualizarPassword} className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white">Actualizar Contraseña</Button>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-blue-50/5 dark:to-blue-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Cambiar Correo</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="correo-actual" className="text-sm sm:text-base">Correo Actual</Label>
            <Input id="correo-actual" type="email" placeholder="usuario@ejemplo.com" defaultValue="usuario@ejemplo.com" disabled className="bg-muted/50 text-sm sm:text-base" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nuevo-correo" className="text-sm sm:text-base">Nuevo Correo</Label>
            <Input id="nuevo-correo" value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} type="email" placeholder="nuevo@ejemplo.com" className="text-sm sm:text-base" />
          </div>

          <div className="flex gap-3">
            <Button onClick={() => handleAbrirModal("email")} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Enviar código</Button>

            {codigoValidado && ultimoTipo === "email" && (
              <Button onClick={handleActualizarCorreo} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">Actualizar Correo</Button>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-green-50/5 dark:to-green-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-950/30 rounded-lg">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Correo de Recuperación</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-recuperacion" className="text-sm sm:text-base">Email de Recuperación</Label>
            <Input id="email-recuperacion" type="email" placeholder="recuperacion@ejemplo.com" className="text-sm sm:text-base" />
            <p className="text-xs sm:text-sm text-muted-foreground">Usaremos este correo para recuperar tu cuenta si olvidas tu contraseña</p>
          </div>

          <Button onClick={() => { alert("Email de recuperación guardado (simulado).") }} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">Guardar Email de Recuperación</Button>
        </div>
      </Card>

      {/* Modal */}
      <ModalVerificacion
        open={mostrarModal}
        onClose={handleCerrarModal}
        onVerify={(ok) => {
          handleVerificacionResultado(ok)
        }}
        emailPreview={ultimoTipo === "email" ? nuevoCorreo || "nuevo@ejemplo.com" : "usuario@ejemplo.com"}
        illustrationSrc="/otp-illustration.png" // pon tu imagen en public/
      />
    </div>
  )
}
