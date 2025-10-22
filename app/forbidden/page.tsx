"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Denied from "../GIO-mascota/GIO_Denied@100x.png"

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-50/30 to-pink-50/30 p-8">
      <div className="max-w-5xl w-full">
        <div className="bg-card rounded-3xl shadow-xl border border-border p-12 md:p-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left side - Text and Button */}
            <div className="flex-1 space-y-6 text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                Acceso denegado
              </h1>

              <p className="text-muted-foreground text-xl md:text-2xl text-pretty leading-relaxed">
                No tienes permisos para editar esta página.
              </p>

              <div className="pt-4">
                <Link href="/">
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg px-8 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    size="lg"
                  >
                    Volver al inicio
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground pt-2">
                Si crees que esto es un error, contacta al administrador
              </p>
            </div>

            {/* Right side - Robot Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <img src={Denied.src} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
