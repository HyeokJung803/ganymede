import { useState } from "react"
import { useStore } from "../store"
import { categoryLabel, t } from "../lib/i18n"
import { formatPrice } from "../lib/utils"
import ProductImage from "./ProductImage"
import type { Product } from "../types"

export default function ProductCard({ product }: { product: Product }) {
  const { navigate, language } = useStore()
  const [hover, setHover] = useState(false)
  const hasHover = Boolean(product.hoverImage)

  return (
    <button
      onClick={() => navigate("product", product.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block text-left"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {/* Primary image */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            hasHover && hover ? "opacity-0" : "opacity-100"
          }`}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            label={product.name}
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Hover (model) image */}
        {hasHover && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <ProductImage
              src={product.hoverImage}
              alt={`${product.name} on model`}
              label={product.name}
              className="scale-[1.03]"
            />
          </div>
        )}

        {product.soldOut && (
          <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-wide-sm text-muted-foreground">
            {t(language, "soldOut")}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide-sm text-muted-foreground">
            {categoryLabel(language, product.category)}
          </p>
          <h3 className="mt-1 font-serif text-lg leading-snug text-foreground">
            {product.name}
          </h3>
        </div>
        <p className="mt-1 whitespace-nowrap text-sm text-foreground/80">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </button>
  )
}
