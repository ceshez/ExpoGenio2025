"use client"

import type React from "react"

import { useState, useEffect } from "react"
// Componentes de UI reutilizables
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
// Iconos de Lucide
import { Palette, Moon, Sun, Upload, LinkIcon, ZoomIn, ZoomOut, Move, UserCircle, Trash2 } from "lucide-react"

// Props del componente
interface SeccionAparienciaProps {
  onGuardar: () => void
}

/**
 * Componente de la sección de Apariencia
 * Permite cambiar el tema (claro/oscuro) y gestionar el avatar del usuario
 */
export function SeccionApariencia({ onGuardar }: SeccionAparienciaProps) {
  // Estado para el tema oscuro/claro
  const [esModoOscuro, setEsModoOscuro] = useState(false)
  // URL del avatar (puede ser de archivo o URL externa)
  const [urlAvatar, setUrlAvatar] = useState("")
  // Archivo de avatar seleccionado
  const [archivoAvatar, setArchivoAvatar] = useState<File | null>(null)
  // Tipo de entrada: subir archivo o ingresar URL
  const [tipoEntradaAvatar, setTipoEntradaAvatar] = useState<"subir" | "url">("subir")

  // Estados para el editor de imagen
  const [zoom, setZoom] = useState(1) // Nivel de zoom (0.5 a 3)
  const [posicion, setPosicion] = useState({ x: 0, y: 0 }) // Posición de la imagen
  const [estaArrastrando, setEstaArrastrando] = useState(false) // Si está arrastrando la imagen
  const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 }) // Posición inicial del arrastre

  /**
   * Efecto para detectar el tema actual al cargar el componente
   */
  useEffect(() => {
    const esModoOscuro = document.documentElement.classList.contains("dark")
    setEsModoOscuro(esModoOscuro)
  }, [])

  /**
   * Alterna entre tema claro y oscuro
   */
  const alternarTema = () => {
    const nuevoEsModoOscuro = !esModoOscuro
    setEsModoOscuro(nuevoEsModoOscuro)

    if (nuevoEsModoOscuro) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  /**
   * Maneja el cambio de archivo de avatar
   * Lee el archivo y lo convierte a URL para previsualización
   */
  const manejarCambioArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (archivo) {
      setArchivoAvatar(archivo)
      const lector = new FileReader()
      lector.onloadend = () => {
        setUrlAvatar(lector.result as string)
        // Resetear zoom y posición al cargar nueva imagen
        setZoom(1)
        setPosicion({ x: 0, y: 0 })
      }
      lector.readAsDataURL(archivo)
    }
  }

  /**
   * Aumenta el nivel de zoom (máximo 300%)
   */
  const aumentarZoom = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  /**
   * Disminuye el nivel de zoom (mínimo 50%)
   */
  const disminuirZoom = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  /**
   * Maneja el cambio del slider de zoom
   */
  const manejarCambioZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value))
  }

  /**
   * Inicia el arrastre de la imagen (mouse)
   */
  const manejarMouseAbajo = (e: React.MouseEvent) => {
    setEstaArrastrando(true)
    setInicioArrastre({
      x: e.clientX - posicion.x,
      y: e.clientY - posicion.y,
    })
  }

  /**
   * Mueve la imagen mientras se arrastra (mouse)
   */
  const manejarMovimientoMouse = (e: React.MouseEvent) => {
    if (estaArrastrando) {
      setPosicion({
        x: e.clientX - inicioArrastre.x,
        y: e.clientY - inicioArrastre.y,
      })
    }
  }

  /**
   * Finaliza el arrastre de la imagen (mouse)
   */
  const manejarMouseArriba = () => {
    setEstaArrastrando(false)
  }

  /**
   * Inicia el arrastre de la imagen (táctil)
   */
  const manejarToqueInicio = (e: React.TouchEvent) => {
    const toque = e.touches[0]
    setEstaArrastrando(true)
    setInicioArrastre({
      x: toque.clientX - posicion.x,
      y: toque.clientY - posicion.y,
    })
  }

  /**
   * Mueve la imagen mientras se arrastra (táctil)
   */
  const manejarMovimientoToque = (e: React.TouchEvent) => {
    if (estaArrastrando) {
      const toque = e.touches[0]
      setPosicion({
        x: toque.clientX - inicioArrastre.x,
        y: toque.clientY - inicioArrastre.y,
      })
    }
  }

  /**
   * Finaliza el arrastre de la imagen (táctil)
   */
  const manejarToqueFin = () => {
    setEstaArrastrando(false)
  }

  /**
   * Restablece el zoom y la posición de la imagen a sus valores por defecto
   */
  const restablecerEditorImagen = () => {
    setZoom(1)
    setPosicion({ x: 0, y: 0 })
  }

  /**
   * Elimina el avatar actual y resetea todos los estados relacionados
   */
  const manejarEliminarAvatar = () => {
    setUrlAvatar("")
    setArchivoAvatar(null)
    setZoom(1)
    setPosicion({ x: 0, y: 0 })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Encabezado de la sección */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          Apariencia
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Personaliza la apariencia de tu cuenta
        </p>
      </div>

      {/* Card de toggle de modo oscuro */}
      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-purple-50/5 dark:to-purple-950/5">
        <div className="flex items-center justify-between gap-4">
          {/* Información del modo oscuro */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 bg-purple-100 dark:bg-purple-950/30 rounded-lg shrink-0">
              {esModoOscuro ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate">Modo Oscuro</h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {esModoOscuro ? "Modo oscuro activado" : "Modo claro activado"}
              </p>
            </div>
          </div>

          {/* Toggle switch animado */}
          <button
            onClick={alternarTema}
            className={`relative w-14 h-7 sm:w-16 sm:h-8 rounded-full transition-all duration-300 shrink-0 ${
              esModoOscuro ? "bg-purple-500" : "bg-gray-300"
            }`}
            aria-label="Alternar tema"
          >
            <div
              className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                esModoOscuro ? "translate-x-7 sm:translate-x-8" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Card de cambio de avatar */}
      <Card className="p-4 sm:p-6 border-border/50 bg-gradient-to-br from-card to-blue-50/5 dark:to-blue-950/5">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Cambiar Avatar</h3>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Previsualización del avatar con editor */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div
                className={`relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg shadow-purple-500/30 bg-muted ${
                  urlAvatar ? "cursor-move" : ""
                } touch-none`}
                onMouseDown={urlAvatar ? manejarMouseAbajo : undefined}
                onMouseMove={urlAvatar ? manejarMovimientoMouse : undefined}
                onMouseUp={urlAvatar ? manejarMouseArriba : undefined}
                onMouseLeave={urlAvatar ? manejarMouseArriba : undefined}
                onTouchStart={urlAvatar ? manejarToqueInicio : undefined}
                onTouchMove={urlAvatar ? manejarMovimientoToque : undefined}
                onTouchEnd={urlAvatar ? manejarToqueFin : undefined}
              >
                {urlAvatar ? (
                  <>
                    {/* Imagen del avatar con transformaciones de zoom y posición */}
                    <img
                      src={urlAvatar || "/placeholder.svg"}
                      alt="Vista previa del avatar"
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{
                        transform: `scale(${zoom}) translate(${posicion.x / zoom}px, ${posicion.y / zoom}px)`,
                        transition: estaArrastrando ? "none" : "transform 0.1s ease-out",
                      }}
                      draggable={false}
                    />
                    {/* Icono de mover superpuesto */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Move className="w-8 h-8 text-white/50 drop-shadow-lg" />
                    </div>
                  </>
                ) : (
                  // Icono de perfil por defecto cuando no hay avatar
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
                    <UserCircle className="w-32 h-32 sm:w-40 sm:h-40 text-purple-400 dark:text-purple-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Controles de zoom (solo visible cuando hay imagen) */}
            {urlAvatar && (
              <>
                <div className="space-y-3 bg-muted/50 p-3 sm:p-4 rounded-lg">
                  {/* Etiqueta y porcentaje de zoom */}
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <ZoomOut className="w-4 h-4" />
                      Zoom
                    </Label>
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  {/* Controles de zoom: botones y slider */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={disminuirZoom}
                      className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 p-0 bg-transparent"
                      disabled={zoom <= 0.5}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    {/* Slider de zoom */}
                    <input
                    placeholder="null"
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={manejarCambioZoom}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={aumentarZoom}
                      className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 p-0 bg-transparent"
                      disabled={zoom >= 3}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Botón para restablecer posición y zoom */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={restablecerEditorImagen}
                    className="w-full text-xs sm:text-sm"
                  >
                    Restablecer posición y zoom
                  </Button>
                </div>

                {/* Instrucciones de uso */}
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Arrastra la imagen para reposicionarla y usa el control de zoom para ajustar el tamaño
                </p>
              </>
            )}
          </div>

          {/* Toggle entre subir archivo y URL */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setTipoEntradaAvatar("subir")}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-300 ${
                tipoEntradaAvatar === "subir"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Subir Archivo</span>
            </button>
            <button
              onClick={() => setTipoEntradaAvatar("url")}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-300 ${
                tipoEntradaAvatar === "url"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">URL de Imagen</span>
            </button>
          </div>

          {/* Input para subir archivo */}
          {tipoEntradaAvatar === "subir" && (
            <div className="space-y-2">
              <Label htmlFor="avatar-subir" className="text-sm sm:text-base">
                Selecciona una imagen
              </Label>
              <div className="relative">
                <Input
                  id="avatar-subir"
                  type="file"
                  accept="image/*"
                  onChange={manejarCambioArchivo}
                  className="cursor-pointer text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-950/30 dark:file:text-purple-400"
                />
              </div>
              {archivoAvatar && (
                <p className="text-xs sm:text-sm text-muted-foreground">Archivo seleccionado: {archivoAvatar.name}</p>
              )}
            </div>
          )}

          {/* Input para URL de imagen */}
          {tipoEntradaAvatar === "url" && (
            <div className="space-y-2">
              <Label htmlFor="avatar-url" className="text-sm sm:text-base">
                URL de la imagen
              </Label>
              <Input
                id="avatar-url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={urlAvatar}
                onChange={(e) => {
                  setUrlAvatar(e.target.value)
                  setZoom(1)
                  setPosicion({ x: 0, y: 0 })
                }}
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              <p className="text-xs text-muted-foreground">Ingresa la URL completa de tu imagen de perfil</p>
            </div>
          )}

          {/* Botones de acción: eliminar y guardar */}
          <div className="flex flex-col sm:flex-row gap-2">
            {urlAvatar && (
              <Button
                onClick={manejarEliminarAvatar}
                variant="outline"
                className="w-full sm:flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30 transition-all duration-300 text-sm sm:text-base bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Foto
              </Button>
            )}
            <Button
              onClick={onGuardar}
              className={`${urlAvatar ? "w-full sm:flex-1" : "w-full"} bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 text-sm sm:text-base`}
            >
              Guardar Avatar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
