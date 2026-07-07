import { useState } from "react"
import { useStore } from "../store"
import { categoryLabel } from "../lib/i18n"

export default function Footer() {
  const { navigate, language } = useStore()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-2xl tracking-[0.28em]">GANYMEDE</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A Seoul house of quiet luxury. Considered garments, made to endure.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-wide-sm text-muted-foreground">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              {["Outerwear", "Knitwear", "Tailoring"].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => navigate("collection")}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {categoryLabel(language, c)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-wide-sm text-muted-foreground">
              House
            </h4>
            <ul className="space-y-3 text-sm">
              {["Atelier", "Sustainability", "Client Care", "Stores"].map((c) => (
                <li key={c}>
                  <a
                    href="#atelier"
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-5 text-[11px] uppercase tracking-wide-sm text-muted-foreground">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="text-sm text-accent-strong">
                Thank you. Welcome to the house.
              </p>
            ) : (
              <form onSubmit={onSubscribe} className="flex items-center border-b border-border-strong">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap py-2 text-[11px] uppercase tracking-wide-sm text-foreground transition-colors hover:text-accent-strong"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-[11px] uppercase tracking-wide-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} GANYMEDE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#atelier" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#atelier" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#atelier" className="transition-colors hover:text-foreground">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
