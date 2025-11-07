"use client"

import React, { useRef, useState } from "react"

interface OtpInputProps {
  length?: number
  value?: string
  onComplete?: (code: string) => void
  className?: string
}

export default function OtpInput({ length = 5, value = "", onComplete, className = "" }: OtpInputProps) {
  const [vals, setVals] = useState<string[]>(() => {
    const initial = new Array(length).fill("")
    for (let i = 0; i < Math.min(value.length, length); i++) initial[i] = value[i]
    return initial
  })
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 1)
    const next = [...vals]
    next[idx] = v
    setVals(next)
    if (v && idx < length - 1) inputsRef.current[idx + 1]?.focus()
    const code = next.join("")
    if (code.length === length && !next.includes("")) onComplete?.(code)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === "Backspace" && !vals[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus()
    if (e.key === "ArrowRight" && idx < length - 1) inputsRef.current[idx + 1]?.focus()
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!paste) return
    const next = [...vals]
    for (let i = 0; i < length; i++) {
      next[i] = paste[i] ?? next[i]
    }
    setVals(next)
    const code = next.join("")
    if (code.length === length && !next.includes("")) onComplete?.(code)
    // focus last filled
    const lastIndex = Math.min(length - 1, paste.length - 1)
    inputsRef.current[lastIndex]?.focus()
    e.preventDefault()
  }

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {vals.map((v, i) => (
        <input
          placeholder="null"
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          inputMode="numeric"
          maxLength={1}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-center text-lg sm:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
      ))}
    </div>
  )
}
