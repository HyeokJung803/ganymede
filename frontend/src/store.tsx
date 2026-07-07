import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { CartItem, PageName, Product, User } from "./types"
import { loginRequest, registerRequest } from "./api"
import type { Language } from "./lib/i18n"

interface Route {
  page: PageName
  productId?: number
}

interface StoreValue {
  // navigation
  route: Route
  navigate: (page: PageName, productId?: number) => void
  language: Language
  toggleLanguage: () => void

  // cart
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void
  removeFromCart: (id: number, size: string, color: string) => void
  clearCart: () => void

  // auth
  user: User | null
  authError: string | null
  authLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

const CART_KEY = "ganymede.cart"
const LANGUAGE_KEY = "ganymede.language"
const USER_KEY = "ganymede.user"

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ page: "home" })
  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem(LANGUAGE_KEY) === "ko" ? "ko" : "en"
  })

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  })

  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const navigate = useCallback((page: PageName, productId?: number) => {
    setRoute({ page, productId })
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  const addToCart = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.product.id === product.id && i.size === size && i.color === color,
        )
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
          return next
        }
        return [...prev, { product, size, color, quantity }]
      })
    },
    [],
  )

  const updateQuantity = useCallback(
    (id: number, size: string, color: string, quantity: number) => {
      setCart((prev) =>
        prev
          .map((i) =>
            i.product.id === id && i.size === size && i.color === color
              ? { ...i, quantity }
              : i,
          )
          .filter((i) => i.quantity > 0),
      )
    },
    [],
  )

  const removeFromCart = useCallback((id: number, size: string, color: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === id && i.size === size && i.color === color)),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])
  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "en" ? "ko" : "en"))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const u = await loginRequest(email, password)
      setUser(u)
      return true
    } catch {
      setAuthError("We couldn't sign you in. Please check your details.")
      return false
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setAuthLoading(true)
      setAuthError(null)
      try {
        const u = await registerRequest(name, email, password)
        setUser(u)
        return true
      } catch {
        setAuthError("We couldn't create your account. Please try again.")
        return false
      } finally {
        setAuthLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    setUser(null)
    setRoute({ page: "home" })
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  )
  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [cart],
  )

  const value: StoreValue = {
    route,
    navigate,
    language,
    toggleLanguage,
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    user,
    authError,
    authLoading,
    login,
    register,
    logout,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
