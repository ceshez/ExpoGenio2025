"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TwoFAPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error === "OTP_INVALID" ? "Código inválido o vencido" : "No se pudo verificar")
        setLoading(false)
        return
      }
      const result = await signIn("credentials", {
        redirect: false,
        otpToken: data.otpToken,
      })
      if (result?.error) {
        setError("No se pudo iniciar sesión")
        setLoading(false)
        return
      }
      window.location.href = "/dashboard"
    } catch {
      setError("Error de red")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Verificación en 2 pasos</h1>
        <p className="text-sm text-gray-600 text-center">Ingresa el código de 6 dígitos que enviamos a tu correo.</p>
        <Input
          inputMode="numeric"
          pattern="\d*"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verificando..." : "Confirmar"}
        </Button>
      </form>
    </div>
  )
}
