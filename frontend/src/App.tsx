import { useEffect, useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Auth from "./pages/Auth"
import Account from "./pages/Account"
import { useStore } from "./store"
import { fetchProducts } from "./api"
import type { Product } from "./types"

export default function App() {
  const { route } = useStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchProducts().then((data) => {
      if (active) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      active = false
    }
  }, [])

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return <Home products={products} loading={loading} />
      case "collection":
        return <Collection products={products} loading={loading} />
      case "product":
        return <ProductDetail products={products} />
      case "cart":
        return <Cart />
      case "auth":
        return <Auth />
      case "account":
        return <Account />
      default:
        return <Home products={products} loading={loading} />
    }
  }

  const bare = route.page === "auth"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{renderPage()}</main>
      {!bare && <Footer />}
    </div>
  )
}
