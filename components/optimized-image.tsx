"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

// Base64 placeholder for loading state
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a2e" offset="20%" />
      <stop stop-color="#2a2a3e" offset="50%" />
      <stop stop-color="#1a1a2e" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a2e" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Handle external URLs (Unsplash) vs local images
  const isExternal = src.startsWith("http")
  
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0",
        className
      )}
      onLoad={() => setIsLoading(false)}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
      unoptimized={isExternal}
    />
  )
}

// Lazy loaded background image component
export function LazyBackgroundImage({
  src,
  alt,
  className,
  overlayClassName,
  children,
}: {
  src: string
  alt: string
  className?: string
  overlayClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("relative", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}
      {children}
    </div>
  )
}
