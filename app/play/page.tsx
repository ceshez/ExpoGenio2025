"use client"
import Link from "next/link"

export default function PlayMenu() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6 text-center">
      <h1 className="text-3xl font-bold">Has encontrado los juegos del Genio</h1>
      <p>Elige un juego para jugar con Gio</p>

      <div className="flex gap-6">
        <Link href="/play/maze" className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
          Laberinto de bugs
        </Link>
        <Link href="/play/invaders" className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
          Nave del Genio
        </Link>
      </div>
    </main>
  )
}
