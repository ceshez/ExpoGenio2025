"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface SeccionAparienciaProps {
  onGuardar: () => void
}

export function SeccionApariencia({ onGuardar }: SeccionAparienciaProps) {
  const [esModoOscuro, setEsModoOscuro] = useState(false)
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0)
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

  const avataresPredeterminados = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-9vZjTgvjCJZH7f5LIGxbYMj0bGqC9T.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-IJkCYJExEzfEMwCjtTfs4y0TpgQvQw.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-i1xickxQjSfCGPAmpaW3SVGpF89WWU.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-h697p6a5z6bSEhGzrfE6mKIAzXEPm0.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-51WsJgHlXMA3BAocDcic9yN28titGH.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-wDxtkBTBKLL8CfGzfwdSP9S2mokyyN.png",
  ]

  useEffect(() => {
    const esModoOscuro = document.documentElement.classList.contains("dark")
    setEsModoOscuro(esModoOscuro)
  }, [])

  const alternarTema = () => {
    const nuevoEsModoOscuro = !esModoOscuro
    setEsModoOscuro(nuevoEsModoOscuro)

    if (nuevoEsModoOscuro) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const irAnterior = () => {
    setIndiceSeleccionado((prev) => (prev === 0 ? avataresPredeterminados.length - 1 : prev - 1))
  }

  const irSiguiente = () => {
    setIndiceSeleccionado((prev) => (prev === avataresPredeterminados.length - 1 ? 0 : prev + 1))
  }

  const manejarMouseAbajo = (e: React.MouseEvent) => {
    setEstaArrastrando(true)
    setPosicionInicio(e.clientX)
    setOffsetArrastre(0)
  }

  const manejarMovimientoMouse = (e: React.MouseEvent) => {
    if (!estaArrastrando) return
    const diferencia = e.clientX - posicionInicio
    setOffsetArrastre(diferencia)
  }

  const manejarMouseArriba = () => {
    if (!estaArrastrando) return
    setEstaArrastrando(false)

    if (offsetArrastre > 50) {
      irAnterior()
    } else if (offsetArrastre < -50) {
      irSiguiente()
    }

    setOffsetArrastre(0)
  }

  const manejarToqueInicio = (e: React.TouchEvent) => {
    setEstaArrastrando(true)
    setPosicionInicio(e.touches[0].clientX)
    setOffsetArrastre(0)
  }

  const manejarMovimientoToque = (e: React.TouchEvent) => {
    if (!estaArrastrando) return
    const diferencia = e.touches[0].clientX - posicionInicio
    setOffsetArrastre(diferencia)
  }

  const manejarToqueFin = () => {
    if (!estaArrastrando) return
    setEstaArrastrando(false)

    if (offsetArrastre > 50) {
      irAnterior()
    } else if (offsetArrastre < -50) {
      irSiguiente()
    }

    setOffsetArrastre(0)
  }

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

  const obtenerVistaAvatar = () => {
    if (metodoAvatar === "archivo" && vistaPrevia) return vistaPrevia
    if (metodoAvatar === "url" && vistaPrevia) return vistaPrevia
    if (metodoAvatar === "predeterminado") return avataresPredeterminados[indiceSeleccionado]
    return null
  }

  const calcularEstiloAvatar = (indice: number) => {
    const distanciaDelCentro = Math.abs(indice - indiceSeleccionado)

    let escala = 0.6
    if (distanciaDelCentro === 0) escala = 1.1
    else if (distanciaDelCentro === 1) escala = 0.8

    const opacidad = distanciaDelCentro === 0 ? 1 : distanciaDelCentro === 1 ? 0.6 : 0.4

    const translateX = (indice - indiceSeleccionado) * 160 + offsetArrastre

    return {
      "--translate-x": `${translateX}px`,
      "--scale": escala.toString(),
      "--opacity": opacidad.toString(),
      "--z-index": (distanciaDelCentro === 0 ? 10 : 5 - distanciaDelCentro).toString(),
    } as React.CSSProperties
  }

  const obtenerEstilosImagen = () => {
    return {
      "--zoom-scale": (zoom / 100).toString(),
      "--position-x": `${posicionX}%`,
      "--position-y": `${posicionY}%`,
    } as React.CSSProperties
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <style jsx>{`
        .avatar-carousel-item {
          transform: translateX(var(--translate-x)) scale(var(--scale));
          opacity: var(--opacity);
          z-index: var(--z-index);
        }
        
        .avatar-preview-image {
          transform: scale(var(--zoom-scale));
          object-position: var(--position-x) var(--position-y);
        }
      `}</style>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          Apariencia
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Personaliza la apariencia de tu cuenta
        </p>
      </div>

      <Card className="p-4 sm:p-6 border-border/50 bg-linear-to-br from-card to-purple-50/5 dark:to-purple-950/5">
        <div className="flex items-center justify-between gap-4">
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

          <button
            onClick={alternarTema}
            className="px-4 py-2 border rounded text-sm sm:text-base font-medium shrink-0 hover:bg-accent transition-colors"
            aria-label="Alternar tema"
          >
            Cambiar a {esModoOscuro ? "modo claro ☀️" : "modo oscuro 🌙"}
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

          {metodoAvatar === "predeterminado" && (
            <div className="space-y-6">
              <div className="relative py-8">
                <button
                  onClick={irAnterior}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-background rounded-full shadow-lg hover:bg-accent transition-all duration-300 border"
                  aria-label="Avatar anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

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
                  {avataresPredeterminados.map((avatar, indice) => {
                    const estilos = calcularEstiloAvatar(indice)
                    return (
                      <div
                        key={indice}
                        className="avatar-carousel-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
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

                <button
                  onClick={irSiguiente}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-background rounded-full shadow-lg hover:bg-accent transition-all duration-300 border"
                  aria-label="Avatar siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

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
                      style={obtenerEstilosImagen()}
                    >
                      <img
                        src={vistaPrevia || "/placeholder.svg"}
                        alt="Vista previa"
                        className="avatar-preview-image w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                      />
                    </div>

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
                      style={obtenerEstilosImagen()}
                    >
                      <img
                        src={vistaPrevia || "/placeholder.svg?height=192&width=192"}
                        alt="Vista previa"
                        className="avatar-preview-image w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=192&width=192"
                        }}
                      />
                    </div>

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
