import { ArrowRight } from "lucide-react"
import { useStore } from "../store"
import ProductCard from "../components/ProductCard"
import ProductImage from "../components/ProductImage"
import type { Product } from "../types"

const HERO = "/images/products/ganymede-black-coat-model.png"
const EDITORIAL = "/images/products/ganymede-black-coat.png"
const KNIT = "/images/products/ganymede-black-knit.png"

export default function Home({
  products,
  loading,
}: {
  products: Product[]
  loading: boolean
}) {
  const { navigate } = useStore()
  const featured = products.slice(0, 3)

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Copy */}
          <div className="order-2 flex flex-col justify-center px-5 py-16 md:px-10 lg:order-1 lg:py-28 lg:pl-16 xl:pl-24">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-muted-foreground">
              Autumn / Winter - Seoul
            </p>
            <h1 className="max-w-xl font-serif text-5xl leading-[1.05] text-balance text-foreground md:text-6xl xl:text-7xl">
              The quiet weight of well-made things
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              GANYMEDE composes a wardrobe of restraint - considered tailoring,
              elevated knitwear, and outerwear built to outlast the season.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                onClick={() => navigate("collection")}
                className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal"
              >
                Discover the collection
                <ArrowRight
                  strokeWidth={1.25}
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </button>
              <a
                href="#atelier"
                className="border-b border-foreground/30 pb-1 text-[11px] uppercase tracking-wide-sm text-foreground transition-colors hover:border-foreground"
              >
                The Atelier
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] w-full lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <ProductImage src={HERO} alt="GANYMEDE signature overcoat" label="The Overcoat" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / statement strip */}
      <section className="border-y border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 px-5 py-8 text-center md:flex-row md:justify-between md:px-10">
          {[
            "Made in Seoul",
            "Natural fibres only",
            "Considered, not seasonal",
            "Complimentary global shipping",
          ].map((t) => (
            <span
              key={t}
              className="text-[11px] uppercase tracking-wide-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-luxe text-muted-foreground">
              The Edit
            </p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Signature pieces
            </h2>
          </div>
          <button
            onClick={() => navigate("collection")}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-wide-sm text-foreground transition-colors hover:text-accent-strong md:inline-flex"
          >
            View all <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full bg-muted" />
                <div className="mt-4 h-3 w-1/3 bg-muted" />
                <div className="mt-2 h-4 w-2/3 bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial split */}
      <section id="atelier" className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="min-h-[480px]">
            <ProductImage src={EDITORIAL} alt="Inside the GANYMEDE atelier" label="The Atelier" />
          </div>
          <div className="flex flex-col justify-center px-5 py-16 md:px-10 lg:px-20">
            <p className="mb-6 text-[11px] uppercase tracking-luxe text-muted-foreground">
              The Atelier
            </p>
            <h2 className="max-w-md font-serif text-4xl leading-tight text-balance text-foreground md:text-5xl">
              An obsession with the unseen
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Every GANYMEDE garment begins with the cloth. We work with a small
              circle of mills in Biella and Mongolia, then cut and finish in our
              Seoul atelier - bound seams, hand-linked collars, and hardware
              chosen to age gracefully.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Nothing is rushed to a calendar. Pieces arrive when they are right.
            </p>
            <button
              onClick={() => navigate("collection")}
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-foreground/30 pb-1 text-[11px] uppercase tracking-wide-sm text-foreground transition-colors hover:border-foreground"
            >
              Explore the wardrobe
              <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Knit feature */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div className="order-2 md:order-1">
          <p className="mb-6 text-[11px] uppercase tracking-luxe text-muted-foreground">
            Knitwear
          </p>
          <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Weightless warmth, quiet lines
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Extra-fine merino and grade-A cashmere, knitted to hold their shape
            and soften with wear. The foundation of the GANYMEDE wardrobe.
          </p>
          <button
            onClick={() => navigate("collection")}
            className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal"
          >
            Shop knitwear
            <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
          </button>
        </div>
        <div className="order-1 aspect-[4/5] w-full md:order-2">
          <ProductImage src={KNIT} alt="GANYMEDE merino knitwear" label="The Knit" />
        </div>
      </section>
    </div>
  )
}
