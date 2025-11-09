"use client"

import { useEffect, useState } from "react"

interface GIONotificationProps {
  status: "success" | "error" | null
  message?: string
}

export function GIONotification({ status, message }: GIONotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  if (!isVisible || !status) return null

  const imageSrc =
    status === "error"
      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GIO2.0-error-R99DY2ci0A9YSTjViUS7hAcfXWcVFU.png"
      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GIO2.0-qdRAVVSsUJOZq2neJoPqO5OkUIaYET.png"

  const bgColor = status === "error" ? "bg-red-50 dark:bg-red-950/30" : "bg-green-50 dark:bg-green-950/30"

  const borderColor =
    status === "error" ? "border-red-200 dark:border-red-800" : "border-green-200 dark:border-green-800"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div
        className={`relative w-full max-w-sm animate-in fade-in zoom-in-95 duration-300 ${bgColor} ${borderColor} border-2 rounded-3xl shadow-2xl backdrop-blur-sm pointer-events-auto p-8 flex flex-col items-center gap-4`}
      >
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt="GIO Robot"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {message && (
          <p
            className={`text-center text-sm sm:text-base font-semibold ${
              status === "error" ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
