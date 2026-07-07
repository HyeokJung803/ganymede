import { useState } from "react"
import { cn } from "../lib/utils"

interface Props {
  src?: string
  alt: string
  className?: string
  label?: string
}

/**
 * Image with a graceful, on-brand fallback when the asset is missing.
 * Product photography is supplied by the project owner under /images.
 */
export default function ProductImage({ src, alt, className, label }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-muted",
          className,
        )}
        aria-label={alt}
      >
        <span className="px-6 text-center font-serif text-lg italic text-muted-foreground">
          {label || "GANYMEDE"}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
