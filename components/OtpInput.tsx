"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length?: number
  onComplete?: (code: string) => void
  disabled?: boolean
}

export default function OtpInput({ length = 6, onComplete, disabled = false }: OtpInputProps) {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null))

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    const newValue = value.replace(/[^0-9]/g, "")
    const newCodes = [...codes]
    newCodes[index] = newValue.slice(-1)

    setCodes(newCodes)

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newCodes.every((code) => code !== "")) {
      onComplete?.(newCodes.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={codes[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-border rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-foreground"
        />
      ))}
    </div>
  )
}
