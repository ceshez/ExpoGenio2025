"use client"

import type React from "react"

import { useState } from "react"
// Componentes de UI reutilizables
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Iconos de Lucide
import { User, Mail, MapPin, Calendar, Briefcase, GripVertical } from "lucide-react"

// Props del componente
interface SeccionPerfilProps {
  onGuardar: () => void
}

/**
 * Componente de la sección de Perfil
 * Permite editar información personal y adicional del usuario
 */
export function SeccionPerfil({ onGuardar }: SeccionPerfilProps) {
  // Estado del formulario con todos los campos
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "Usuario Genio",
    nombreUsuario: "@usuario_genio",
    email: "usuario@genio.com",
    biografia: "",
    ubicacion: "San José",
    ocupacion: "",
    otraOcupacion: "",
    fechaNacimiento: "",
  })

  // Estado para mostrar/ocultar el campo de "Otra ocupación"
  const [mostrarOtraOcupacion, setMostrarOtraOcupacion] = useState(false)

  /**
   * Maneja cambios en los campos de texto del formulario
   */
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Maneja el cambio de ocupación
   * Si selecciona "Otro", muestra el campo de texto personalizado
   */
  const manejarCambioOcupacion = (valor: string) => {
    if (valor === "otro") {
      setMostrarOtraOcupacion(true)
      setDatosFormulario({ ...datosFormulario, ocupacion: "", otraOcupacion: "" })
    } else {
      setMostrarOtraOcupacion(false)
      setDatosFormulario({ ...datosFormulario, ocupacion: valor, otraOcupacion: "" })
    }
  }

  /**
   * Maneja el cambio de ubicación (provincia de Costa Rica)
   */
  const manejarCambioUbicacion = (valor: string) => {
    setDatosFormulario({ ...datosFormulario, ubicacion: valor })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Encabezado de la sección */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          Perfil
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Administra tu información personal y pública
        </p>
      </div>

      {/* Card de información personal */}
      <Card className="p-4 sm:p-6 border-border/50 bg-linear-to-br from-card to-purple-50/5 dark:to-purple-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Información Personal</h3>
        </div>

        <div className="space-y-4">
          {/* Grid de nombre completo y nombre de usuario */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Campo de nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm sm:text-base">
                Nombre Completo
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
                placeholder="Tu nombre completo"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            {/* Campo de nombre de usuario */}
            <div className="space-y-2">
              <Label htmlFor="nombreUsuario" className="text-sm sm:text-base">
                Nombre de Usuario
              </Label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                value={datosFormulario.nombreUsuario}
                onChange={manejarCambio}
                placeholder="@usuario"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Campo de correo electrónico con icono */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              Correo Electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                value={datosFormulario.email}
                onChange={manejarCambio}
                placeholder="tu@email.com"
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Campo de biografía con contador de caracteres */}
          <div className="space-y-2">
            <Label htmlFor="biografia" className="text-sm sm:text-base">
              Biografía
            </Label>
            <Textarea
              id="biografia"
              name="biografia"
              value={datosFormulario.biografia}
              onChange={manejarCambio}
              placeholder="Cuéntanos sobre ti"
              rows={4}
              className="resize-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <p className="text-xs text-muted-foreground">{datosFormulario.biografia.length}/200 caracteres</p>
          </div>
        </div>
      </Card>

      {/* Card de información adicional */}
      <Card className="p-4 sm:p-6 border-border/50 bg-linear-to-br from-card to-blue-50/5 dark:to-blue-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Información Adicional</h3>
        </div>

        <div className="space-y-4">
          {/* Selector de ocupación con icono de arrastre */}
          <div className="space-y-2">
            <Label htmlFor="ocupacion" className="text-sm sm:text-base">
              Ocupación
            </Label>
            <div className="relative">
              {/* Icono de arrastre */}
              <GripVertical className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 cursor-grab active:cursor-grabbing" />
              {/* Icono de ocupación */}
              <Briefcase className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              {/* Select de ocupaciones enfocadas en PYMEs de Costa Rica */}
              <Select onValueChange={manejarCambioOcupacion} value={datosFormulario.ocupacion || undefined}>
                <SelectTrigger className="pl-14 transition-all duration-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                  <SelectValue placeholder="Selecciona tu ocupación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="otro">Otro</SelectItem>
                  <SelectItem value="Comercio">Comercio</SelectItem>
                  <SelectItem value="Restaurante/Cafetería">Restaurante/Cafetería</SelectItem>
                  <SelectItem value="Servicios Profesionales">Servicios Profesionales</SelectItem>
                  <SelectItem value="Construcción">Construcción</SelectItem>
                  <SelectItem value="Agricultura">Agricultura</SelectItem>
                  <SelectItem value="Turismo">Turismo</SelectItem>
                  <SelectItem value="Educación">Educación</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Manufactura">Manufactura</SelectItem>
                  <SelectItem value="Belleza y Estética">Belleza y Estética</SelectItem>
                  <SelectItem value="Consultoría">Consultoría</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campo de texto para "Otra ocupación" (aparece condicionalmente) */}
          {mostrarOtraOcupacion && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="otraOcupacion" className="text-sm sm:text-base">
                Especifica tu ocupación
              </Label>
              <Input
                id="otraOcupacion"
                name="otraOcupacion"
                value={datosFormulario.otraOcupacion}
                onChange={manejarCambio}
                placeholder="Escribe tu ocupación"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          )}

          {/* Selector de ubicación (provincias de Costa Rica) */}
          <div className="space-y-2">
            <Label htmlFor="ubicacion" className="text-sm sm:text-base">
              Ubicación (Costa Rica)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Select onValueChange={manejarCambioUbicacion} defaultValue={datosFormulario.ubicacion}>
                <SelectTrigger className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                  <SelectValue placeholder="Selecciona tu provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="San José">San José</SelectItem>
                  <SelectItem value="Alajuela">Alajuela</SelectItem>
                  <SelectItem value="Cartago">Cartago</SelectItem>
                  <SelectItem value="Heredia">Heredia</SelectItem>
                  <SelectItem value="Guanacaste">Guanacaste</SelectItem>
                  <SelectItem value="Puntarenas">Puntarenas</SelectItem>
                  <SelectItem value="Limón">Limón</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campo de fecha de nacimiento */}
          <div className="space-y-2">
            <Label htmlFor="fechaNacimiento" className="text-sm sm:text-base">
              Fecha de Nacimiento
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={datosFormulario.fechaNacimiento}
                onChange={manejarCambio}
                placeholder="DD/MM/AAAA"
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base [&::-webkit-calendar-picker-indicator]:opacity-100"
              />
            </div>
            {!datosFormulario.fechaNacimiento && (
              <p className="text-xs text-muted-foreground">Selecciona tu fecha de nacimiento</p>
            )}
          </div>
        </div>
      </Card>

      {/* Botón de guardar cambios */}
      <div className="flex justify-end">
        <Button
          onClick={onGuardar}
          className="w-full sm:w-auto bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300 px-6 sm:px-8 text-sm sm:text-base"
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
