"use client"

import { useEffect, useState } from "react"
import { AlertCircle, Mail, Check } from "lucide-react"

interface NotificationOverlayProps {
  type: "success" | "error" | "loading"
  show: boolean
  onComplete?: () => void
}

export function NotificationOverlay({ type, show, onComplete }: NotificationOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (!show) {
      setIsVisible(false)
      setIsFadingOut(false)
      return
    }

    setIsVisible(true)
    setIsFadingOut(false)
    let timeout: NodeJS.Timeout

    if (type === "loading") {
      timeout = setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsVisible(false)
          setIsFadingOut(false)
          onComplete?.()
        }, 500)
      }, 1000)
    } else if (type === "error") {
      timeout = setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsVisible(false)
          setIsFadingOut(false)
          onComplete?.()
        }, 500)
      }, 1500)
    } else if (type === "success") {
      timeout = setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsVisible(false)
          setIsFadingOut(false)
          onComplete?.()
        }, 500)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [show, type, onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center justify-center">
        {type === "loading" && (
          <div className="animate-icon-scale">
            <div className="p-6 bg-white rounded-full shadow-2xl">
              <Mail className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 animate-pulse" />
            </div>
          </div>
        )}

        {type === "error" && (
          <div className="animate-error-pop">
            <div className="p-6 bg-white rounded-full shadow-2xl">
              <AlertCircle className="w-20 h-20 sm:w-24 sm:h-24 text-red-600" />
            </div>
          </div>
        )}

        {type === "success" && (
          <div className="animate-success-check">
            <div className="p-6 bg-white rounded-full shadow-2xl">
              <Check className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 stroke-3" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes icon-scale {
          0% {
            opacity: 0;
            transform: scale(0.1) blur(12px);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) blur(0px);
          }
        }

        @keyframes error-pop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes success-check {
          0% {
            opacity: 0;
            transform: scale(0.1) blur(12px);
          }
          50% {
            opacity: 1;
            transform: scale(1.15) blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) blur(0px);
          }
        }

        .animate-icon-scale {
          animation: icon-scale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-error-pop {
          animation: error-pop 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-success-check {
          animation: success-check 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  )
}