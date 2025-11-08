"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"

// Interfaz de propiedades del componente OTP Input
interface OtpInputProps {
  length?: number // Cantidad de dígitos del código (por defecto 5)
  value?: string // Valor inicial del código
  onComplete?: (code: string) => void // Callback cuando se completa el código
  className?: string // Clases CSS adicionales
  disabled?: boolean // Deshabilitar todos los inputs
}

export default function OtpInput({
  length = 5,
  value = "",
  onComplete,
  className = "",
  disabled = false,
}: OtpInputProps) {
  // Array de valores para cada dígito del código
  const [vals, setVals] = useState<string[]>(() => {
    const initial = new Array(length).fill("")
    // Pre-llenar con el valor inicial si existe
    for (let i = 0; i < Math.min(value.length, length); i++) {
      initial[i] = value[i]
    }
    return initial
  })

  // Referencias a cada input para poder controlar el foco
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  // Actualizar valores si cambia el prop 'value'
  useEffect(() => {
    if (value) {
      const newVals = new Array(length).fill("")
      for (let i = 0; i < Math.min(value.length, length); i++) {
        newVals[i] = value[i]
      }
      setVals(newVals)
    }
  }, [value, length])

  // Manejar cambio en cada input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    // Extraer solo números y tomar el primer dígito
    const v = e.target.value.replace(/\D/g, "").slice(0, 1)
    const next = [...vals]
    next[idx] = v
    setVals(next)

    // Auto-focus al siguiente input si se ingresó un dígito
    if (v && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }

    // Verificar si el código está completo y llamar al callback
    const code = next.join("")
    if (code.length === length && !next.includes("")) {
      onComplete?.(code)
    }
  }

  // Manejar teclas especiales (Backspace, flechas)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    // Backspace: si el campo está vacío, regresar al anterior
    if (e.key === "Backspace" && !vals[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
    // Flecha izquierda: mover foco al input anterior
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
    // Flecha derecha: mover foco al input siguiente
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  // Manejar pegado de código completo
  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!paste) return

    // Distribuir los dígitos pegados en los inputs
    const next = [...vals]
    for (let i = 0; i < length; i++) {
      next[i] = paste[i] ?? next[i]
    }
    setVals(next)

    // Llamar al callback si el código está completo
    const code = next.join("")
    if (code.length === length && !next.includes("")) {
      onComplete?.(code)
    }

    // Enfocar el último input llenado
    const lastIndex = Math.min(length - 1, paste.length - 1)
    inputsRef.current[lastIndex]?.focus()
  }

  return (
    <div className={`flex gap-2 sm:gap-3 items-center justify-center ${className}`}>
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder="·"
          inputMode="numeric"
          maxLength={1}
          className={`
            w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
            rounded-xl border-2 
            ${
              disabled
                ? "border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 cursor-not-allowed"
                : "border-purple-200 dark:border-purple-800 bg-white dark:bg-neutral-900"
            }
            text-center text-xl sm:text-2xl font-bold
            text-neutral-900 dark:text-neutral-100
            placeholder:text-neutral-300 dark:placeholder:text-neutral-700
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-200
            ${v ? "shadow-md scale-105" : ""}
            disabled:opacity-50
          `}
        />
      ))}
    </div>
  )
}
