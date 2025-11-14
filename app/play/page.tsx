"use client"
import Link from "next/link"
import Image from "next/image"

export default function PlayMenu() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4">

      <div className="mb-6 opacity-90 hover:scale-105 transition-all">
        <Image
          src="/sprites/LOVE-gio.png"
          alt="Gio"
          width={110}
          height={110}
          className="drop-shadow-[0_0_12px_rgba(255,0,255,0.8)]"
        />
      </div>

      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Has desbloqueado los juegos del Genio
      </h1>

      <p className="text-gray-300 mb-10 text-lg">
        Elige un desafío y juega con Gio
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">

        <Link
          href="/play/maze"
          className="group bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-purple-500 transition-all hover:scale-[1.03]"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400">
            Laberinto de Bugs
          </h2>
          <p className="text-gray-400 text-sm">
            Ayuda a Gio a escapar entre errores y paredes rotas.
          </p>
        </Link>

        <Link
          href="/play/invaders"
          className="group bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-pink-500 transition-all hover:scale-[1.03]"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-pink-400">
            Nave del Genio
          </h2>
          <p className="text-gray-400 text-sm">
            Protege el servidor derribando bots invasores.
          </p>
        </Link>

      </div>

      <Link
        href="/"
        className="mt-10 text-gray-400 hover:text-purple-300 transition-colors text-sm"
      >
        ← Volver al inicio
      </Link>
    </main>
  )
}