import { useEffect, useState } from "react"
import { Menu, ShoppingBag, User, X } from "lucide-react"
import { useStore } from "../store"
import { t } from "../lib/i18n"
import { cn } from "../lib/utils"
import type { PageName } from "../types"

export default function Header() {
  const { navigate, cartCount, user, route, language, toggleLanguage } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav: { label: string; page: PageName }[] = [
    { label: t(language, "collection"), page: "collection" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const go = (page: PageName) => {
    setMobileOpen(false)
    navigate(page)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-500",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
        {/* Left: nav (desktop) / menu (mobile) */}
        <div className="flex flex-1 items-center gap-8">
          <button
            className="md:hidden -ml-1 p-1 text-foreground"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu strokeWidth={1.25} className="h-5 w-5" />
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={cn(
                  "text-xs uppercase tracking-wide-sm transition-colors hover:text-foreground",
                  route.page === item.page ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
            <a
              href="#atelier"
              className="text-xs uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(language, "atelier")}
            </a>
          </nav>
        </div>

        {/* Center: wordmark */}
        <button
          onClick={() => go("home")}
          className="flex flex-col items-center"
          aria-label="GANYMEDE home"
        >
          <img
            src="/images/brand/ganymede-logo-main.png"
            alt="GANYMEDE"
            className="h-[68px] w-[120px] object-contain md:h-[74px] md:w-[140px]"
          />
        </button>

        {/* Right: account + cart */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <button
            onClick={toggleLanguage}
            className="text-xs uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle language"
          >
            {language === "en" ? "KO" : "EN"}
          </button>
          <button
            onClick={() => go(user ? "account" : "auth")}
            className="hidden items-center gap-2 text-xs uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <User strokeWidth={1.25} className="h-[18px] w-[18px]" />
            <span className="hidden lg:inline">
              {user ? t(language, "account") : t(language, "signIn")}
            </span>
          </button>
          <button
            onClick={() => go(user ? "account" : "auth")}
            className="text-foreground sm:hidden"
            aria-label="Account"
          >
            <User strokeWidth={1.25} className="h-5 w-5" />
          </button>
          <button
            onClick={() => go("cart")}
            className="relative flex items-center gap-2 text-xs uppercase tracking-wide-sm text-foreground"
            aria-label={`Cart, ${cartCount} items`}
          >
            <span className="relative">
              <ShoppingBag strokeWidth={1.25} className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-normal text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="hidden lg:inline">{t(language, "bag")}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setMobileOpen(false)}
          />
          <div className="animate-fade-in absolute left-0 top-0 h-full w-[82%] max-w-sm bg-background p-8">
            <div className="mb-12 flex items-center justify-between">
              <img
                src="/images/brand/ganymede-logo-main.png"
                alt="GANYMEDE"
                className="h-20 w-32 object-contain"
              />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X strokeWidth={1.25} className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <button
                onClick={() => go("home")}
                className="text-left font-serif text-2xl"
              >
                {t(language, "home")}
              </button>
              <button
                onClick={() => go("collection")}
                className="text-left font-serif text-2xl"
              >
                {t(language, "collection")}
              </button>
              <button
                onClick={() => go(user ? "account" : "auth")}
                className="text-left font-serif text-2xl"
              >
                {user ? t(language, "myAccount") : t(language, "signIn")}
              </button>
              <button
                onClick={() => go("cart")}
                className="text-left font-serif text-2xl"
              >
                {t(language, "bag")} ({cartCount})
              </button>
              <button
                onClick={toggleLanguage}
                className="text-left font-serif text-2xl"
              >
                {language === "en" ? "한국어" : "English"}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
