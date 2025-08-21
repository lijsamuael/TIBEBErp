"use client"

import { cn } from "../../lib/utils"
import * as React from "react"

interface SkeletonProps extends React.ComponentProps<"div"> {
  height?: string
  width?: string
  variant?: "light" | "dark"
}

function Skeleton({
  className,
  height = "h-8",
  width = "w-48",
  variant = "dark",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        variant === "dark" ? "bg-gray-600" : "bg-gray-300",
        height,
        width,
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
