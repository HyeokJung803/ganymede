import { useEffect, useState } from "react"
import { useStore } from "../store"
import { t } from "../lib/i18n"
import { cn, formatPrice } from "../lib/utils"
import { fetchOrders } from "../api"
import type { Order } from "../types"

type Tab = "orders" | "details" | "wishlist"

export default function Account() {
  const { user, logout, navigate, language } = useStore()
  const [tab, setTab] = useState<Tab>("orders")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate("auth")
      return
    }
    let active = true
    setLoading(true)
    fetchOrders(user.id).then((data) => {
      if (active) {
        setOrders(data)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [user, navigate])

  if (!user) return null

  const tabs: { id: Tab; label: string }[] = [
    { id: "orders", label: "Order History" },
    { id: "details", label: "Account Details" },
    { id: "wishlist", label: "Wishlist" },
  ]

  return (
    <div className="animate-fade-in mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-10 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-luxe text-muted-foreground">
            {t(language, "myAccount")}
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">
            Good day, {user.name}
          </h1>
        </div>
        <button
          onClick={logout}
          className="text-[11px] uppercase tracking-wide-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {t(language, "signOut")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Side nav */}
        <nav className="flex gap-6 overflow-x-auto lg:flex-col lg:gap-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "whitespace-nowrap text-left text-[11px] uppercase tracking-wide-sm transition-colors",
                tab === t.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div>
          {tab === "orders" && (
            <div>
              {loading ? (
                <div className="space-y-4">
                  {[0, 1].map((i) => (
                    <div key={i} className="h-24 w-full animate-pulse bg-muted" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <p className="text-muted-foreground">You have no orders yet.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((o) => (
                    <div key={o.id} className="border border-border p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                        <div className="flex flex-wrap gap-x-8 gap-y-1">
                          <Meta label="Order" value={o.id} />
                          <Meta label="Placed" value={o.date} />
                          <Meta label="Status" value={o.status} />
                        </div>
                        <p className="font-serif text-xl text-foreground">
                          {formatPrice(o.total)}
                        </p>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm">
                        {o.items.map((it, i) => (
                          <li
                            key={i}
                            className="flex justify-between text-muted-foreground"
                          >
                            <span>
                              {it.name} x {it.quantity}
                            </span>
                            <span className="text-foreground/80">
                              {formatPrice(it.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "details" && (
            <div className="max-w-md space-y-8">
              <Detail label="Full name" value={user.name} />
              <Detail label="Email address" value={user.email} />
              <Detail label="Member since" value="2024" />
              <button className="mt-4 bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal">
                Edit details
              </button>
            </div>
          )}

          {tab === "wishlist" && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">{t(language, "wishlistEmpty")}</p>
              <button
                onClick={() => navigate("collection")}
                className="mt-6 inline-flex text-[11px] uppercase tracking-wide-sm text-foreground underline underline-offset-4"
              >
                {t(language, "discoverCollection")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide-sm text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-4">
      <p className="text-[11px] uppercase tracking-wide-sm text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-lg text-foreground">{value}</p>
    </div>
  )
}
