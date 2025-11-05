"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  progress?: number // 0-100, 
  onComplete?: () => void
  className?: string
  progressPosition?: "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function LoadingScreen1({ progress, onComplete, className, progressPosition = "bottom" }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [indeterminateProgress, setIndeterminateProgress] = useState(0)
  const [isIndeterminate, setIsIndeterminate] = useState(false)

  // Handle indeterminate animation
  useEffect(() => {
    if (progress === undefined || isIndeterminate) {
      const interval = setInterval(() => {
        setIndeterminateProgress((prev) => (prev >= 100 ? 0 : prev + 2))
      }, 30)
      return () => clearInterval(interval)
    }
  }, [progress, isIndeterminate])

  // Switch to indeterminate if progress stalls
  useEffect(() => {
    if (progress !== undefined && progress < 100) {
      const timeout = setTimeout(() => {
        setIsIndeterminate(true)
      }, 5000) // Switch after 5 seconds
      return () => clearTimeout(timeout)
    }
  }, [progress])

  // Handle completion
  useEffect(() => {
    if (progress === 100) {
      setIsComplete(true)
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 600) // Match fade-out duration
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  const currentProgress = progress !== undefined && !isIndeterminate ? progress : indeterminateProgress
  const segment4Visible = currentProgress >= 0
  const segment1Visible = currentProgress >= 25
  const segment3Visible = currentProgress >= 50
  const segment2Visible = currentProgress >= 75

  const getProgressBarClasses = () => {
    switch (progressPosition) {
      case "top-left":
        return "absolute top-0 left-0 w-32 h-2"
      case "top-right":
        return "absolute top-0 right-0 w-32 h-2"
      case "bottom-left":
        return "absolute bottom-0 left-0 w-32 h-2"
      case "bottom-right":
        return "absolute bottom-0 right-0 w-32 h-2"
      default:
        return "w-64 h-2 mt-8"
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-600",
        isComplete && "opacity-0 pointer-events-none",
        className,
      )}
    >
      {/* Logo Container */}
      <div className="relative w-48 h-56">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.02 221.85" className="w-full h-full">
          <defs>
            <style>{`
              .segment {
                transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
              }
              .segment-hidden {
                opacity: 0;
                transform: scale(0.8);
              }
              .segment-visible {
                opacity: 1;
                transform: scale(1);
              }
            `}</style>
          </defs>
          <g id="logo_principal">
            {/* Segment 1 - Purple top */}
            <path
              className={cn("segment", segment1Visible ? "segment-visible" : "segment-hidden")}
              fill="#5c2483"
              d="M128.23,23.78,41.51,73.93a3.82,3.82,0,0,1-3.22.1l-32.47-16a3.47,3.47,0,0,1-.2-6.11L94.77.46a3.52,3.52,0,0,1,3.47,0l30,17.32A3.46,3.46,0,0,1,128.23,23.78Z"
            />

            {/* Segment 2 - Purple right */}
            <path
              className={cn("segment", segment2Visible ? "segment-visible" : "segment-hidden")}
              fill="#5c2483"
              d="M193,125.82v38.83a3.81,3.81,0,0,1-1.71,3l-48.68,28.1c-2.82,1.63-5.12.3-5.12-3V151.14a3.79,3.79,0,0,0-1.73-3Q116.13,137,96.5,125.89l2.67-25.54,41.66-6.47,50.47,29A3.78,3.78,0,0,1,193,125.82Z"
            />

            {/* Segment 3 - Dark blue center */}
            <path
              className={cn("segment", segment3Visible ? "segment-visible" : "segment-hidden")}
              fill="#2e388e"
              d="M133,157.53v41.92a3.17,3.17,0,0,1-1.59,2.76l-20,11.57L98.1,221.42a3.19,3.19,0,0,1-3.19,0L1.6,167.54A3.18,3.18,0,0,1,0,164.78V68.19a3.19,3.19,0,0,1,4.6-2.86L38,81.79a3.73,3.73,0,0,1,1.9,3.07q-.06,26.65-.13,53.32A3.17,3.17,0,0,0,41.38,141l53.52,31a3.18,3.18,0,0,0,3.2,0q6.56-3.81,13.23-7.63,8.49-4.86,16.9-9.52A3.19,3.19,0,0,1,133,157.53Z"
            />

            {/* Segment 4 - Light blue top right */}
            <path
              className={cn("segment", segment4Visible ? "segment-visible" : "segment-hidden")}
              fill="#257dc1"
              d="M193,57.24V91.46a3.55,3.55,0,0,1-5.32,3.08C177,88.4,150.2,72.94,106.33,47.67c-2.81-1.62-2.82-4.28,0-5.91l29.87-17.32a3.56,3.56,0,0,1,3.56,0l51.49,29.73A3.55,3.55,0,0,1,193,57.24Z"
            />
          </g>
        </svg>

        {/* Progress Bar */}
        <div className={cn("bg-muted rounded-full overflow-hidden", getProgressBarClasses())}>
          {progress !== undefined && !isIndeterminate ? (
            // Determinate progress bar
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${currentProgress}%` }}
            />
          ) : (
            // Indeterminate progress bar
            <div className="h-full w-full relative">
              <div
                className="absolute h-full w-1/3 bg-primary animate-[shimmer_1.5s_ease-in-out_infinite]"
                style={{
                  left: `${(indeterminateProgress % 100) - 33}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Progress Text */}
      {progress !== undefined && !isIndeterminate && progressPosition === "bottom" && (
        <p className="mt-4 text-sm text-muted-foreground font-mono">{Math.round(currentProgress)}%</p>
      )}
    </div>
  )
}
