"use client"
import { useEffect, useState } from "react"

export default function Labyrinth() {
  const start = { x: 1, y: 1 }
  const [player, setPlayer] = useState(start)
  const goal = { x: 16, y: 17 }

  const obstacles = [
    { x: 3, y: 3 },
    { x: 3, y: 7 },
    { x: 1, y: 17 },
    { x: 1, y: 9 },
    { x: 2, y: 15 },
    { x: 8, y: 16 },
    { x: 6, y: 17 },
    { x: 13, y: 1 },
    { x: 18, y: 1 },
    { x: 13, y: 4 },
    { x: 11, y: 5 },
    { x: 10, y: 5 },
    { x: 17, y: 8 },
    { x: 10, y: 12 },
    { x: 12, y: 16 },
    { x: 15, y: 16 },

  ]

  const [lost, setLost] = useState(false)

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
    const nx = player.x + dx
    const ny = player.y + dy
    if (ny < 0 || ny >= sizeY || nx < 0 || nx >= sizeX) return

    if (maze[ny][nx] === ".") {
      const hitObstacle = obstacles.some(o => o.x === nx && o.y === ny)
      if (hitObstacle) {
        setLost(true)
        setPlayer(start)
        setTimeout(() => setLost(false), 1500)
      } else {
        setPlayer({ x: nx, y: ny })
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
  }, [player])

  const won = player.x === goal.x && player.y === goal.y

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-950">
      <h2 className="text-2xl font-bold text-white">Laberinto de bugs</h2>

      {won ? (
        <p className="text-green-400 text-xl font-semibold">
        ¡GANASTE! Gio encontró la salida real.
        </p>
      ) : lost ? (
        <p className="text-red-500 text-xl font-semibold">
        ¡Era un bug disfrazado de salida!
        </p>
      ) : (
        <div
          className="grid gap-px bg-gray-800 p-2 rounded-lg"
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

              return (
                <div
                  key={`${x}-${y}`}
                  className={`rounded-sm ${
                    cell === "#"
                      ? "bg-gray-300"
                      : isGoal
                      ? "bg-green-500 animate-pulse"
                      : isObstacle
                      ? "bg-green-400 animate-pulse"
                      : isPlayer
                      ? "bg-purple-500"
                      : "bg-gray-900"
                  }`}
                />
              )
            })
          )}
        </div>
      )}
{/* Controles táctiles */}
      <div className="mt-6 flex flex-col items-center gap-2 select-none">
        <button
          onClick={() => move(0, -1)}
          className="bg-gray-700 text-white px-6 py-2 rounded-md active:scale-95"
        >
          ↑
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => move(-1, 0)}
            className="bg-gray-700 text-white px-6 py-2 rounded-md active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => move(1, 0)}
            className="bg-gray-700 text-white px-6 py-2 rounded-md active:scale-95"
          >
            →
          </button>
        </div>
        <button
          onClick={() => move(0, 1)}
          className="bg-gray-700 text-white px-6 py-2 rounded-md active:scale-95"
        >
          ↓
        </button>
      </div>
      <p className="text-sm text-gray-400">Usa las flechas para moverte</p>
    </main>
  )
}
