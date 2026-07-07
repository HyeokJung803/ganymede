import { useMemo, useState } from "react"
import { cn } from "../lib/utils"
import { categoryLabel, t } from "../lib/i18n"
import { useStore } from "../store"
import ProductCard from "../components/ProductCard"
import { CATEGORIES } from "../data"
import type { Product } from "../types"

type Sort = "featured" | "price-asc" | "price-desc"

export default function Collection({
  products,
  loading,
}: {
  products: Product[]
  loading: boolean
}) {
  const { language } = useStore()
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState<Sort>("featured")

  const filtered = useMemo(() => {
    let list = category === "All" ? products : products.filter((p) => p.category === category)
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, category, sort])

  return (
    <div className="animate-fade-in mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
      {/* Heading */}
      <div className="border-b border-border pb-10 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-luxe text-muted-foreground">
          Autumn / Winter Collection
        </p>
        <h1 className="font-serif text-5xl text-foreground md:text-6xl">The Wardrobe</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          A concise offering of outerwear, knitwear, and tailoring - each piece
          intended to be kept.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6 border-b border-border py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "text-[11px] uppercase tracking-wide-sm transition-colors",
                category === c
                  ? "text-foreground underline decoration-accent underline-offset-8"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {categoryLabel(language, c)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-wide-sm text-muted-foreground">
            {t(language, "sort")}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border-b border-border-strong bg-transparent py-1 text-[11px] uppercase tracking-wide-sm text-foreground outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] w-full bg-muted" />
              <div className="mt-4 h-3 w-1/3 bg-muted" />
              <div className="mt-2 h-4 w-2/3 bg-muted" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">
          No pieces in this category yet.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
