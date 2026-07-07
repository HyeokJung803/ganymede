import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Check, Minus, Plus } from "lucide-react"
import { useStore } from "../store"
import { categoryLabel, t } from "../lib/i18n"
import { cn, formatPrice } from "../lib/utils"
import ProductImage from "../components/ProductImage"
import ProductCard from "../components/ProductCard"
import type { Product } from "../types"

export default function ProductDetail({ products }: { products: Product[] }) {
  const { route, navigate, addToCart, language } = useStore()
  const product = useMemo(
    () => products.find((p) => p.id === route.productId),
    [products, route.productId],
  )

  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>("details")

  useEffect(() => {
    if (product) {
      setColor(product.colors?.[0] ?? "One colour")
      setSize(null)
      setQuantity(1)
      setActiveImage(0)
      setAdded(false)
    }
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-serif text-3xl">Piece not found</h1>
        <button
          onClick={() => navigate("collection")}
          className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide-sm text-foreground underline underline-offset-4"
        >
          Return to the collection
        </button>
      </div>
    )
  }

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.hoverImage].filter(Boolean) as string[]

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  const onAdd = () => {
    if (!size) return
    addToCart(product, size, color ?? "One colour", quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const sections = [
    { id: "details", title: t(language, "details"), body: product.details },
    {
      id: "fabric",
      title: t(language, "fabricCare"),
      body: [product.fabric, product.origin, "Specialist dry clean only"].filter(
        Boolean,
      ) as string[],
    },
    {
      id: "shipping",
      title: t(language, "shippingReturns"),
      body: [
        "Complimentary worldwide shipping",
        "Delivered in 3-6 business days",
        "Returns accepted within 30 days",
      ],
    },
  ]

  return (
    <div className="animate-fade-in mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-12">
      <button
        onClick={() => navigate("collection")}
        className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft strokeWidth={1.25} className="h-4 w-4" /> {t(language, "collection")}
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {gallery.length > 1 && (
            <div className="flex gap-3 md:flex-col">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-[3/4] w-16 shrink-0 overflow-hidden bg-muted transition-opacity md:w-20",
                    activeImage === i ? "opacity-100 ring-1 ring-foreground" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <ProductImage src={img} alt={`${product.name} view ${i + 1}`} label={product.name} />
                </button>
              ))}
            </div>
          )}
          <div className="aspect-[3/4] flex-1 overflow-hidden bg-muted">
            <ProductImage
              src={gallery[activeImage]}
              alt={product.name}
              label={product.name}
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:py-6">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            {categoryLabel(language, product.category)}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            {formatPrice(product.price, product.currency)}
          </p>

          {product.description && (
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Colour */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide-sm text-muted-foreground">
                  {t(language, "colour")}
                </span>
                <span className="text-[11px] uppercase tracking-wide-sm text-foreground">
                  {color}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "px-4 py-2 text-[11px] uppercase tracking-wide-sm transition-colors",
                      color === c
                        ? "bg-foreground text-background"
                        : "border border-border text-foreground hover:border-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide-sm text-muted-foreground">
                  {t(language, "size")}
                </span>
                <a
                  href="#atelier"
                  className="text-[11px] uppercase tracking-wide-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {t(language, "sizeGuide")}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-[52px] px-4 py-3 text-[11px] uppercase tracking-wide-sm transition-colors",
                      size === s
                        ? "bg-foreground text-background"
                        : "border border-border text-foreground hover:border-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="mt-3 text-[11px] uppercase tracking-wide-sm text-muted-foreground">
                  {t(language, "pleaseSelectSize")}
                </p>
              )}
            </div>
          )}

          {/* Quantity + Add */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-4 text-foreground transition-colors hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus strokeWidth={1.25} className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-4 text-foreground transition-colors hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus strokeWidth={1.25} className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={onAdd}
              disabled={product.soldOut || !size}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 px-8 py-4 text-[11px] uppercase tracking-wide-sm transition-colors",
                product.soldOut
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : !size
                    ? "cursor-not-allowed bg-foreground/40 text-background"
                    : "bg-foreground text-background hover:bg-charcoal",
              )}
            >
              {product.soldOut ? (
                t(language, "soldOut")
              ) : added ? (
                <>
                  <Check strokeWidth={1.5} className="h-4 w-4" /> {t(language, "addedToBag")}
                </>
              ) : (
                t(language, "addToBag")
              )}
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-12 border-t border-border">
            {sections.map((s) => (
              <div key={s.id} className="border-b border-border">
                <button
                  onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-[11px] uppercase tracking-wide-sm text-foreground">
                    {s.title}
                  </span>
                  {openSection === s.id ? (
                    <Minus strokeWidth={1.25} className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Plus strokeWidth={1.25} className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {openSection === s.id && s.body && (
                  <ul className="animate-fade-in space-y-2 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {s.body.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-10 text-center font-serif text-3xl text-foreground md:text-4xl">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
