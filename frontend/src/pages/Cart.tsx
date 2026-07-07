import { useState } from "react"
import { ArrowRight, Minus, Plus, X } from "lucide-react"
import { useStore } from "../store"
import { t } from "../lib/i18n"
import { formatPrice } from "../lib/utils"
import ProductImage from "../components/ProductImage"

export default function Cart() {
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    navigate,
    user,
    clearCart,
    language,
  } = useStore()
  const [placed, setPlaced] = useState(false)

  const shipping = 0
  const total = cartTotal + shipping

  const checkout = () => {
    if (!user) {
      navigate("auth")
      return
    }
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="animate-fade-in mx-auto max-w-xl px-5 py-32 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-luxe text-muted-foreground">
          Order confirmed
        </p>
        <h1 className="font-serif text-4xl text-foreground md:text-5xl">
          Thank you
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted-foreground">
          Your order has been received. A confirmation has been sent to your
          email, and each piece will be prepared with care before it ships.
        </p>
        <button
          onClick={() => navigate("collection")}
          className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal"
        >
          {t(language, "continueShopping")} <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-serif text-4xl text-foreground md:text-5xl">
          {t(language, "emptyBag")}
        </h1>
        <p className="mx-auto mt-6 max-w-sm leading-relaxed text-muted-foreground">
          Nothing has been added yet. Explore the wardrobe to begin.
        </p>
        <button
          onClick={() => navigate("collection")}
          className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal"
        >
          {t(language, "exploreCollection")} <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
      <h1 className="mb-12 font-serif text-4xl text-foreground md:text-5xl">
        {t(language, "bag")}
      </h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="border-t border-border">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-5 border-b border-border py-6"
              >
                <button
                  onClick={() => navigate("product", item.product.id)}
                  className="aspect-[3/4] w-24 shrink-0 overflow-hidden bg-muted md:w-28"
                >
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    label={item.product.name}
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <button
                        onClick={() => navigate("product", item.product.id)}
                        className="text-left font-serif text-xl text-foreground"
                      >
                        {item.product.name}
                      </button>
                      <p className="mt-1 text-[11px] uppercase tracking-wide-sm text-muted-foreground">
                        {item.color} / {t(language, "size")} {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.size, item.color)
                      }
                      aria-label="Remove item"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <X strokeWidth={1.25} className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                        className="px-3 py-2 transition-colors hover:bg-muted"
                        aria-label="Decrease quantity"
                      >
                        <Minus strokeWidth={1.25} className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                        className="px-3 py-2 transition-colors hover:bg-muted"
                        aria-label="Increase quantity"
                      >
                        <Plus strokeWidth={1.25} className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm text-foreground/80">
                      {formatPrice(item.product.price * item.quantity, item.product.currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("collection")}
            className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t(language, "continueShopping")}
          </button>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="border border-border p-8">
            <h2 className="font-serif text-2xl text-foreground">{t(language, "orderSummary")}</h2>
            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t(language, "subtotal")}</dt>
                <dd className="text-foreground">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t(language, "shipping")}</dt>
                <dd className="text-foreground">{t(language, "complimentary")}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4">
                <dt className="text-[11px] uppercase tracking-wide-sm text-foreground">
                  {t(language, "total")}
                </dt>
                <dd className="font-serif text-xl text-foreground">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <button
              onClick={checkout}
              className="mt-8 flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal"
            >
              {user ? t(language, "checkout") : t(language, "signInCheckout")}
              <ArrowRight strokeWidth={1.25} className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
              Taxes and duties calculated at checkout. Complimentary returns
              within 30 days.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
