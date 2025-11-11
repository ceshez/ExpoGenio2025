import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"


export const metadata: Metadata = {
  title: "Settings",
  description: "Página de configuración de usuario",
}

export default function ConfigUsuarioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</> 
}
