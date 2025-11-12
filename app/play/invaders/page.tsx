"use client"
import React, { useRef, useEffect, useState } from "react"

const SpaceInvaders: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number>(0)

  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const gameRef = useRef({
    playerX: 0,
    playerY: 0,
    playerW: 40,
    playerH: 30,
    aliens: [] as any[],
    alienDirection: 1,
    alienSpeedX: 1,
    alienSpeedY: 10,
    playerBullets: [] as any[],
    alienBullets: [] as any[],
    leftPressed: false,
    rightPressed: false,
    isGameOver: false,
  })

  // Sprites
const shipImg = useRef<HTMLImageElement | null>(null)
const alienImg = useRef<HTMLImageElement | null>(null)
const bulletImg = useRef<HTMLImageElement | null>(null)

useEffect(() => {
  if (typeof window !== "undefined") {
    shipImg.current = new window.Image()
    alienImg.current = new window.Image()
    bulletImg.current = new window.Image()

    shipImg.current.src = "/sprites/gio_ship.png"
    alienImg.current.src = "/sprites/enemy_bug.png"
    bulletImg.current.src = "/sprites/bullet_player.png"
  }
}, [])


  // Estrellas para fondo animado
  const stars = useRef<{ x: number; y: number; s: number }[]>([])

  const initStars = (width: number, height: number) => {
    stars.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      s: Math.random() * 2 + 1,
    }))
  }

  const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "white"
    stars.current.forEach(star => {
      ctx.fillRect(star.x, star.y, star.s, star.s)
      star.y += star.s * 0.6 // velocidad
      if (star.y > height) {
        star.y = 0
        star.x = Math.random() * width
      }
    })
  }

  // Inicializa enemigos
  const initLevel = () => {
    const g = gameRef.current
    const cols = 6
    const rows = 3
    const alienW = 40,
      alienH = 28
    const spacingX = 20,
      spacingY = 20
    const startX = 40
    const startY = 40
    g.aliens = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        g.aliens.push({
          x: startX + c * (alienW + spacingX),
          y: startY + r * (alienH + spacingY),
          w: alienW,
          h: alienH,
        })
      }
    }
    g.playerBullets = []
    g.alienBullets = []
  }

  const shootBullet = () => {
    const g = gameRef.current
    if (g.playerBullets.length < 2) {
      g.playerBullets.push({
        x: g.playerX + g.playerW / 2 - 2,
        y: g.playerY - 10,
        w: 4,
        h: 10,
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current
      if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault()
      if (e.key === "ArrowLeft" || e.key === "a") g.leftPressed = true
      if (e.key === "ArrowRight" || e.key === "d") g.rightPressed = true
      if (e.code === "Space") shootBullet()
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current
      if (e.key === "ArrowLeft" || e.key === "a") g.leftPressed = false
      if (e.key === "ArrowRight" || e.key === "d") g.rightPressed = false
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const gameLoop = () => {
    const g = gameRef.current
    const ctx = contextRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    const width = canvas.width
    const height = canvas.height

    // Fondo animado
    ctx.fillStyle = "#070716"
    ctx.fillRect(0, 0, width, height)
    drawStars(ctx, width, height)

    // Mover jugador
    if (g.leftPressed) g.playerX -= 4
    if (g.rightPressed) g.playerX += 4
    g.playerX = Math.max(0, Math.min(g.playerX, width - g.playerW))

    // Mover aliens con seguridad nula
    let hitEdge = false
    g.aliens.forEach(a => {
      a.x += g.alienDirection * g.alienSpeedX
      if (a.x < 0 || a.x + a.w > (canvas?.width ?? 0)) hitEdge = true
    })
    if (hitEdge) {
      g.alienDirection *= -1
      g.aliens.forEach(a => (a.y += g.alienSpeedY))
    }

    // Mover balas
    g.playerBullets.forEach(b => (b.y -= 8))
    g.playerBullets = g.playerBullets.filter(b => b.y > 0)

    // Colisiones
    for (let i = 0; i < g.playerBullets.length; i++) {
      const b = g.playerBullets[i]
      for (let j = 0; j < g.aliens.length; j++) {
        const a = g.aliens[j]
        if (b.x < a.x + a.w && b.x + b.w > a.x && b.y < a.y + a.h && b.y + b.h > a.y) {
          g.aliens.splice(j, 1)
          g.playerBullets.splice(i, 1)
          setScore(s => s + 10)
          break
        }
      }
    }

    // Dibujar aliens
    // Dibujar aliens
if (alienImg.current)
  g.aliens.forEach(a => ctx.drawImage(alienImg.current!, a.x, a.y, a.w, a.h))

// Dibujar Gio
if (shipImg.current)
  ctx.drawImage(shipImg.current!, g.playerX, g.playerY, g.playerW, g.playerH)

// Dibujar balas
if (bulletImg.current)
  g.playerBullets.forEach(b => ctx.drawImage(bulletImg.current!, b.x, b.y, b.w, b.h))


    // Fin de juego si llegan al fondo
    g.aliens.forEach(a => {
      if (a.y + a.h >= g.playerY) {
        g.isGameOver = true
        setGameOver(true)
      }
    })

    if (!g.isGameOver) animationRef.current = requestAnimationFrame(gameLoop)
  }

  useEffect(() => {
    if (canvasRef.current) contextRef.current = canvasRef.current.getContext("2d")
    const resizeCanvas = () => {
  if (!containerRef.current || !canvasRef.current) return;
  const width = containerRef.current.clientWidth;
  const height = (width * 2) / 3; // relación 3:2 como antes (sin distorsión)
  canvasRef.current.width = width;
  canvasRef.current.height = height;

  const g = gameRef.current;
  g.playerX = width / 2 - g.playerW / 2;
  g.playerY = height - g.playerH - 10;
  initStars(width, height);
};
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    initLevel()
    animationRef.current = requestAnimationFrame(gameLoop)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      <h2 className="text-2xl font-bold mb-2"> Nave del Genio</h2>
      <p className="text-sm text-gray-400 mb-3">Derrota a los componentes bugueados</p>

      <div
  ref={containerRef}
  className="relative w-full max-w-[600px] flex justify-center items-center"
>
  <canvas
    ref={canvasRef}
    className="block rounded-lg bg-[#0b1021]"
    style={{ width: "95%", height: "auto" }}
  />
</div>


      {/* botones táctiles */}
      {!gameOver && (
        <div className="flex gap-3 mt-4 select-none">
          <button
            onPointerDown={() => (gameRef.current.leftPressed = true)}
            onPointerUp={() => (gameRef.current.leftPressed = false)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            ◀
          </button>
          <button
            onPointerDown={() => shootBullet()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            FUEGO
          </button>
          <button
            onPointerDown={() => (gameRef.current.rightPressed = true)}
            onPointerUp={() => (gameRef.current.rightPressed = false)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            ▶
          </button>
        </div>
      )}

      {/* pantalla de derrota */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
          <h2 className="text-3xl text-red-400 font-bold mb-4">¡Gio fue hackeado!</h2>
          <button
            onClick={() => {
              setGameOver(false)
              setScore(0)
              initLevel()
              animationRef.current = requestAnimationFrame(gameLoop)
            }}
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            Reiniciar
          </button>
        </div>
      )}

      <div className="mt-3 text-sm">
        Vidas: {lives} &nbsp; Puntos: {score} &nbsp; Nivel: {level}
      </div>
    </main>
  )
}

export default SpaceInvaders
