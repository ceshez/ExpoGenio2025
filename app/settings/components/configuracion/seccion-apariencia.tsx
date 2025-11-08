"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
// Componentes de UI reutilizables
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Iconos de Lucide
import {
  Palette,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Upload,
  LinkIcon,
  User,
  Trash2,
  ZoomIn,
  ZoomOut,
  Move,
} from "lucide-react"

// Props del componente
interface SeccionAparienciaProps {
  onGuardar: () => void
}

/**
 * Componente de la sección de Apariencia
 * Permite cambiar el tema (claro/oscuro), seleccionar avatar de 6 fotos predeterminadas
 * y subir avatar personalizado con controles de zoom y posición
 */
export function SeccionApariencia({ onGuardar }: SeccionAparienciaProps) {
  // Estado para el tema oscuro/claro
  const [esModoOscuro, setEsModoOscuro] = useState(false)

  // Índice del avatar seleccionado (0-5)
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0)

  // Estado para el arrastre del carrusel
  const [estaArrastrando, setEstaArrastrando] = useState(false)
  const [posicionInicio, setPosicionInicio] = useState(0)
  const [offsetArrastre, setOffsetArrastre] = useState(0)

  const [metodoAvatar, setMetodoAvatar] = useState<"predeterminado" | "archivo" | "url">("predeterminado")
  const [archivoAvatar, setArchivoAvatar] = useState<File | null>(null)
  const [urlAvatar, setUrlAvatar] = useState("")
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null)

  const [zoom, setZoom] = useState(100)
  const [posicionX, setPosicionX] = useState(50)
  const [posicionY, setPosicionY] = useState(50)
  const [arrastandoImagen, setArrastandoImagen] = useState(false)
  const [inicioArrastreImagen, setInicioArrastreImagen] = useState({ x: 0, y: 0 })

  const contenedorRef = useRef<HTMLDivElement>(null)

  // 6 URLs de avatares predeterminados (placeholders - el usuario agregará las imágenes reales)
  const avataresPredeterminados = [
    "/avatars/avatar-1.png",
    "/avatars/avatar-2.png",
    "/avatars/avatar-3.png",
    "/avatars/avatar-4.png",
    "/avatars/avatar-5.png",
    "/avatars/avatar-6.png",
  ]

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
   * Navegar al avatar anterior
   */
  const irAnterior = () => {
    setIndiceSeleccionado((prev) => (prev === 0 ? avataresPredeterminados.length - 1 : prev - 1))
  }

  /**
   * Navegar al avatar siguiente
   */
  const irSiguiente = () => {
    setIndiceSeleccionado((prev) => (prev === avataresPredeterminados.length - 1 ? 0 : prev + 1))
  }

  /**
   * Inicia el arrastre (mouse)
   */
  const manejarMouseAbajo = (e: React.MouseEvent) => {
    setEstaArrastrando(true)
    setPosicionInicio(e.clientX)
    setOffsetArrastre(0)
  }

  /**
   * Mueve durante el arrastre (mouse)
   */
  const manejarMovimientoMouse = (e: React.MouseEvent) => {
    if (!estaArrastrando) return
    const diferencia = e.clientX - posicionInicio
    setOffsetArrastre(diferencia)
  }

  /**
   * Finaliza el arrastre y determina dirección (mouse)
   */
  const manejarMouseArriba = () => {
    if (!estaArrastrando) return
    setEstaArrastrando(false)

    // Si arrastró más de 50px, cambiar de avatar
    if (offsetArrastre > 50) {
      irAnterior()
    } else if (offsetArrastre < -50) {
      irSiguiente()
    }

    setOffsetArrastre(0)
  }

  /**
   * Inicia el arrastre (táctil)
   */
  const manejarToqueInicio = (e: React.TouchEvent) => {
    setEstaArrastrando(true)
    setPosicionInicio(e.touches[0].clientX)
    setOffsetArrastre(0)
  }

  /**
   * Mueve durante el arrastre (táctil)
   */
  const manejarMovimientoToque = (e: React.TouchEvent) => {
    if (!estaArrastrando) return
    const diferencia = e.touches[0].clientX - posicionInicio
    setOffsetArrastre(diferencia)
  }

  /**
   * Finaliza el arrastre y determina dirección (táctil)
   */
  const manejarToqueFin = () => {
    if (!estaArrastrando) return
    setEstaArrastrando(false)

    // Si arrastró más de 50px, cambiar de avatar
    if (offsetArrastre > 50) {
      irAnterior()
    } else if (offsetArrastre < -50) {
      irSiguiente()
    }

    setOffsetArrastre(0)
  }

  /**
   * Manejador para seleccionar archivo
   */
  const manejarCambioArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (archivo && archivo.type.startsWith("image/")) {
      setArchivoAvatar(archivo)
      setMetodoAvatar("archivo")
      const lector = new FileReader()
      lector.onloadend = () => {
        setVistaPrevia(lector.result as string)
        setZoom(100)
        setPosicionX(50)
        setPosicionY(50)
      }
      lector.readAsDataURL(archivo)
    }
  }

  /**
   * Manejador para URL de avatar
   */
  const manejarCambioUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setUrlAvatar(url)
    if (url) {
      setVistaPrevia(url)
      setMetodoAvatar("url")
      setZoom(100)
      setPosicionX(50)
      setPosicionY(50)
    }
  }

  const eliminarFoto = () => {
    setArchivoAvatar(null)
    setUrlAvatar("")
    setVistaPrevia(null)
    setMetodoAvatar("predeterminado")
    setZoom(100)
    setPosicionX(50)
    setPosicionY(50)
  }

  const iniciarArrastreImagen = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setArrastandoImagen(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    setInicioArrastreImagen({ x: clientX, y: clientY })
  }

  const moverImagen = (e: React.MouseEvent | React.TouchEvent) => {
    if (!arrastandoImagen) return
    e.preventDefault()

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const deltaX = (clientX - inicioArrastreImagen.x) * 0.5
    const deltaY = (clientY - inicioArrastreImagen.y) * 0.5

    setPosicionX((prev) => Math.max(0, Math.min(100, prev + deltaX)))
    setPosicionY((prev) => Math.max(0, Math.min(100, prev + deltaY)))

    setInicioArrastreImagen({ x: clientX, y: clientY })
  }

  const finalizarArrastreImagen = () => {
    setArrastandoImagen(false)
  }

  useEffect(() => {
    if (arrastandoImagen) {
      const handleGlobalMouseMove = (e: MouseEvent) => moverImagen(e as any)
      const handleGlobalMouseUp = () => finalizarArrastreImagen()
      const handleGlobalTouchMove = (e: TouchEvent) => moverImagen(e as any)
      const handleGlobalTouchEnd = () => finalizarArrastreImagen()

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.addEventListener("touchmove", handleGlobalTouchMove)
      document.addEventListener("touchend", handleGlobalTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
        document.removeEventListener("touchmove", handleGlobalTouchMove)
        document.removeEventListener("touchend", handleGlobalTouchEnd)
      }
    }
  }, [arrastandoImagen])

  /**
   * Obtener la vista previa del avatar según el método seleccionado
   */
  const obtenerVistaAvatar = () => {
    if (metodoAvatar === "archivo" && vistaPrevia) return vistaPrevia
    if (metodoAvatar === "url" && vistaPrevia) return vistaPrevia
    if (metodoAvatar === "predeterminado") return avataresPredeterminados[indiceSeleccionado]
    return null
  }

  /**
   * Calcula el tamaño y opacidad basado en la distancia del centro
   * @param indice - Índice del avatar en el array
   * @returns Objeto con estilos de transformación y opacidad
   */
  const calcularEstiloAvatar = (indice: number) => {
    const distanciaDelCentro = Math.abs(indice - indiceSeleccionado)

    let escala = 0.6
    if (distanciaDelCentro === 0) escala = 1.1
    else if (distanciaDelCentro === 1) escala = 0.8

    const opacidad = distanciaDelCentro === 0 ? 1 : distanciaDelCentro === 1 ? 0.6 : 0.4

    const translateX = (indice - indiceSeleccionado) * 160 + offsetArrastre

    return {
      transform: `translateX(${translateX}px) scale(${escala})`,
      opacity: opacidad,
      zIndex: distanciaDelCentro === 0 ? 10 : 5 - distanciaDelCentro,
    }
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
      <Card className="p-4 sm:p-6 border-border/50 bg-linear-to-br from-card to-purple-50/5 dark:to-purple-950/5">
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

      <Card className="p-4 sm:p-6 border-border/50 bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Foto de Perfil</h3>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setMetodoAvatar("predeterminado")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                metodoAvatar === "predeterminado"
                  ? "bg-background text-purple-600 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Avatares
            </button>
            <button
              onClick={() => setMetodoAvatar("archivo")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                metodoAvatar === "archivo"
                  ? "bg-background text-purple-600 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Subir
            </button>
            <button
              onClick={() => setMetodoAvatar("url")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                metodoAvatar === "url"
                  ? "bg-background text-purple-600 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              URL
            </button>
          </div>

          {/* Contenedor del carrusel de avatares predeterminados */}
          {metodoAvatar === "predeterminado" && (
            <div className="space-y-6">
              <div className="relative py-8">
                {/* Botón anterior */}
                <button
                  onClick={irAnterior}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-background rounded-full shadow-lg hover:bg-accent transition-all duration-300 border"
                  aria-label="Avatar anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Contenedor de avatares con overflow oculto */}
                <div
                  ref={contenedorRef}
                  className="relative h-52 overflow-hidden cursor-grab active:cursor-grabbing"
                  onMouseDown={manejarMouseAbajo}
                  onMouseMove={manejarMovimientoMouse}
                  onMouseUp={manejarMouseArriba}
                  onMouseLeave={manejarMouseArriba}
                  onTouchStart={manejarToqueInicio}
                  onTouchMove={manejarMovimientoToque}
                  onTouchEnd={manejarToqueFin}
                >
                  {/* Renderizar todos los avatares con posicionamiento absoluto */}
                  {avataresPredeterminados.map((avatar, indice) => {
                    const estilos = calcularEstiloAvatar(indice)
                    return (
                      <div
                        key={indice}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
                        style={estilos}
                      >
                        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/20 bg-linear-to-br from-purple-100 to-blue-100">
                          <img
                            src={avatar || "/placeholder.svg?height=176&width=176"}
                            alt={`Avatar ${indice + 1}`}
                            className="w-full h-full object-cover select-none"
                            draggable={false}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=176&width=176"
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Botón siguiente */}
                <button
                  onClick={irSiguiente}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-background rounded-full shadow-lg hover:bg-accent transition-all duration-300 border"
                  aria-label="Avatar siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicadores de posición */}
              <div className="flex justify-center gap-2">
                {avataresPredeterminados.map((_, indice) => (
                  <button
                    key={indice}
                    onClick={() => setIndiceSeleccionado(indice)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      indice === indiceSeleccionado ? "w-8 bg-purple-500" : "w-2 bg-muted hover:bg-muted-foreground/30"
                    }`}
                    aria-label={`Seleccionar avatar ${indice + 1}`}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Avatar seleccionado:{" "}
                  <span className="font-semibold text-foreground">
                    {indiceSeleccionado + 1} de {avataresPredeterminados.length}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Arrastra para cambiar de avatar o usa las flechas</p>
              </div>
            </div>
          )}

          {metodoAvatar === "archivo" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {vistaPrevia && (
                  <div className="space-y-4 w-full">
                    <div
                      className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-lg relative cursor-move select-none"
                      onMouseDown={iniciarArrastreImagen}
                      onTouchStart={iniciarArrastreImagen}
                    >
                      <img
                        src={vistaPrevia || "/placeholder.svg"}
                        alt="Vista previa"
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                        style={{
                          transform: `scale(${zoom / 100})`,
                          objectPosition: `${posicionX}% ${posicionY}%`,
                        }}
                      />
                    </div>

                    {/* Controles de zoom y posición */}
                    <div className="space-y-3 bg-muted p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <ZoomOut className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="zoom-control-archivo" className="sr-only">
                          Control de zoom
                        </Label>
                        <input
                          id="zoom-control-archivo"
                          type="range"
                          min="50"
                          max="200"
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="flex-1"
                          aria-label="Ajustar nivel de zoom de la imagen"
                        />
                        <ZoomIn className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium w-12 text-right">{zoom}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Move className="w-3 h-3" />
                        Arrastra la imagen para ajustar la posición
                      </p>
                    </div>

                    {/* Botón para eliminar foto */}
                    <Button
                      onClick={eliminarFoto}
                      variant="outline"
                      className="w-full border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar Foto
                    </Button>
                  </div>
                )}
                <Label
                  htmlFor="archivo-avatar"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Seleccionar Archivo
                </Label>
                <Input
                  id="archivo-avatar"
                  type="file"
                  accept="image/*"
                  onChange={manejarCambioArchivo}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Formatos soportados: JPG, PNG, GIF (máx. 5MB)
                </p>
              </div>
            </div>
          )}

          {metodoAvatar === "url" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {vistaPrevia && (
                  <div className="space-y-4 w-full">
                    <div
                      className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-lg relative cursor-move select-none"
                      onMouseDown={iniciarArrastreImagen}
                      onTouchStart={iniciarArrastreImagen}
                    >
                      <img
                        src={vistaPrevia || "/placeholder.svg?height=192&width=192"}
                        alt="Vista previa"
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                        style={{
                          transform: `scale(${zoom / 100})`,
                          objectPosition: `${posicionX}% ${posicionY}%`,
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=192&width=192"
                        }}
                      />
                    </div>

                    {/* Controles de zoom y posición */}
                    <div className="space-y-3 bg-muted p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <ZoomOut className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="zoom-control-url" className="sr-only">
                          Control de zoom
                        </Label>
                        <input
                          id="zoom-control-url"
                          type="range"
                          min="50"
                          max="200"
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="flex-1"
                          aria-label="Ajustar nivel de zoom de la imagen"
                        />
                        <ZoomIn className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium w-12 text-right">{zoom}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Move className="w-3 h-3" />
                        Arrastra la imagen para ajustar la posición
                      </p>
                    </div>

                    {/* Botón para eliminar foto */}
                    <Button
                      onClick={eliminarFoto}
                      variant="outline"
                      className="w-full border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar Foto
                    </Button>
                  </div>
                )}
                <div className="w-full space-y-2">
                  <Label htmlFor="url-avatar" className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    URL de la Imagen
                  </Label>
                  <Input
                    id="url-avatar"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={urlAvatar}
                    onChange={manejarCambioUrl}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botón de guardar */}
          <Button
            onClick={onGuardar}
            className="w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300 text-sm sm:text-base h-11"
          >
            Guardar Cambios
          </Button>
        </div>
      </Card>
    </div>
  )
}
