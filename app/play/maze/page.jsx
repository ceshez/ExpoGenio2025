"use client"
import { useEffect, useState } from "react"

export default function Labyrinth() {
  const start = { x: 1, y: 1 }
  const [player, setPlayer] = useState(start)
  const goal = { x: 16, y: 17 }
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)

  const obstacles = [
    { x: 3, y: 3 }, { x: 3, y: 7 }, { x: 1, y: 17 }, { x: 1, y: 9 },
    { x: 2, y: 15 }, { x: 8, y: 16 }, { x: 6, y: 17 }, { x: 13, y: 1 },
    { x: 18, y: 1 }, { x: 13, y: 4 }, { x: 11, y: 5 }, { x: 10, y: 5 },
    { x: 17, y: 8 }, { x: 10, y: 12 }, { x: 12, y: 16 }, { x: 15, y: 16 },
  ]

  const maze = [
    "####################",
    "#...........#......#",
    "#.###.#.#######.####",
    "#.#...#.......#.#..#",
    "#.###.#.#.###.#.#..#",
    "#.......#.#.###.##.#",
    "#.####..#...#......#",
    "#.#.#..####.#...##.#",
    "###...##....#...#..#",
    "#.###..###..#.####.#",
    "#...#.#.......#....#",
    "#.#....#.###..#.#..#",
    "#.#.##.#.#.#....#..#",
    "#.#..#.#...###.....#",
    "#.##.#.#.###...#.#.#",
    "#..#.#...#...#####.#",
    "####.###.#.#.#..##.#",
    "#.#..#.###.###.#.#.#",
    "#..............#...#",
    "####################",
  ]

  const sizeY = maze.length
  const sizeX = maze[0].length

  const move = (dx, dy) => {
    if (won || lost) return
    const nx = player.x + dx
    const ny = player.y + dy
    if (ny < 0 || ny >= sizeY || nx < 0 || nx >= sizeX) return

    if (maze[ny][nx] === ".") {
      const hitObstacle = obstacles.some(o => o.x === nx && o.y === ny)
      if (hitObstacle) {
        setLost(true)
        setTimeout(() => {
          setLost(false)
          setPlayer(start)
        }, 2000)
      } else {
        const newPos = { x: nx, y: ny }
        setPlayer(newPos)
        if (newPos.x === goal.x && newPos.y === goal.y) {
          setWon(true)
        }
      }
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      e.preventDefault()
      if (e.key === "ArrowUp") move(0, -1)
      if (e.key === "ArrowDown") move(0, 1)
      if (e.key === "ArrowLeft") move(-1, 0)
      if (e.key === "ArrowRight") move(1, 0)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [player, won, lost])

  const restart = () => {
    setWon(false)
    setLost(false)
    setPlayer(start)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black relative overflow-hidden">
      <h2 className="text-2xl font-bold text-white">Laberinto de bugs</h2>

      <div
        className="grid gap-px bg-gray-800 p-2 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${sizeX}, 1fr)`,
          width: "min(90vmin, 90vw)",
          height: "min(90vmin, 90vw)",
        }}
      >
        {maze.map((row, y) =>
          [...row].map((cell, x) => {
            const isPlayer = player.x === x && player.y === y
            const isGoal = goal.x === x && goal.y === y
            const isObstacle = obstacles.some(o => o.x === x && o.y === y)

            let sprite = "/sprites/tile_floor.png"
            if (cell === "#") sprite = "/sprites/tile_wall.png"
            else if (isGoal) sprite = "/sprites/tile_exit.png"
            else if (isObstacle) sprite = "/sprites/tile_exit.png"
            else if (isPlayer) sprite = "/sprites/gio.png"

            return (
              <img
                key={`${x}-${y}`}
                src={sprite}
                alt=""
                className="w-full h-full object-cover transition-transform duration-150"
              />
            )
          })
        )}
      </div>

      {/* Controles táctiles */}
      {!won && !lost && (
        <div className="mt-6 flex flex-col items-center gap-2 select-none">
          <button
            onClick={() => move(0, -1)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            ↑
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => move(-1, 0)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => move(1, 0)}
              className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
            >
              →
            </button>
          </div>
          <button
            onClick={() => move(0, 1)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            ↓
          </button>
        </div>
      )}

      {/* Pantalla de victoria o derrota */}
      {(won || lost) && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-8">
          <h2
            className={`text-3xl font-bold ${
              won ? "text-green-400" : "text-red-400"
            } mb-4`}
          >
            {won
              ? "¡GANASTE! Gio encontró la salida real."
              : "¡Era un bug disfrazado de salida!"}
          </h2>
          <button
            onClick={restart}
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition active:scale-95"
          >
            Reiniciar
          </button>
        </div>
      )}

      {!won && !lost && (
        <p className="text-sm text-gray-400">Usa las flechas para moverte</p>
      )}
    </main>
  )
}
