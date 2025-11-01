"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Denied from "../GIO-mascota/GIO_Denied@100x.png"

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-5xl w-full">
        <div className=" p-12 md:p-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/*txto y boton*/}
            <div className="flex-1 space-y-6 text-left ">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
                Acceso denegado
              </h1>

              <p className="text-muted-foreground text-xl md:text-2xl text-pretty leading-relaxed">
                No tienes permisos para editar esta página.
              </p>
              <p className="text-sm text-muted-foreground ">
                Si crees que esto es un error, contacta al administrador
              </p>
              <div className="">
                <Link href="/dashboard">
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-xl px-8 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    size="lg"
                  >
                    Volver al inicio
                  </Button>
                </Link>
              </div>


            </div>

            {/* derecha imagen de Gio */}
            <div className="flex-shrink-0 p-8 ">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <img src={Denied.src} alt="Acceso Denegado" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
