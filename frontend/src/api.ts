import type { Order, Product, User } from "./types"
import { FALLBACK_PRODUCTS } from "./data"

/**
 * Base URL for the GANYMEDE backend. Preserved per project spec.
 */
export const API_BASE = "http://localhost:8080/api"

const TIMEOUT_MS = 4000

interface ApiProduct {
  id: number
  name: string
  category: string
  price: number
  description?: string
  thumbnailUrl?: string
  thumbnail_url?: string
  images?: Array<string | { imageUrl?: string; image_url?: string }>
  imageUrls?: string[]
  stock?: number
}

function normalizeCategory(category: string) {
  const map: Record<string, string> = {
    APPAREL: "Knitwear",
    NEW_ARRIVALS: "Outerwear",
    BAGS: "Accessories",
    SHOES: "Tailoring",
    ACCESSORIES: "Accessories",
  }
  return map[category] ?? category
}

function normalizeProduct(product: ApiProduct): Product {
  const image =
    product.thumbnailUrl ||
    product.thumbnail_url ||
    "/images/products/ganymede-black-coat.png"
  const rawImages = product.images ?? product.imageUrls ?? []
  const images = [
    image,
    ...rawImages.map((item) =>
      typeof item === "string" ? item : item.imageUrl || item.image_url || "",
    ),
  ].filter(Boolean)
  const uniqueImages = Array.from(new Set(images))

  return {
    id: product.id,
    name: product.name,
    category: normalizeCategory(product.category),
    price: Number(product.price),
    currency: "KRW",
    description: product.description,
    image,
    hoverImage: uniqueImages[1],
    images: uniqueImages,
    colors: ["Black", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Premium material selected for daily wear",
      "Clean silhouette with subtle GANYMEDE identity",
      "Finished in Seoul",
    ],
    fabric: "Premium wool blend",
    origin: "Made in Seoul",
    soldOut: product.stock === 0,
  }
}

function normalizeAuthResponse(data: User | { user?: User; token?: string }): User {
  if ("token" in data && data.token) localStorage.setItem("token", data.token)
  if ("user" in data && data.user) return data.user
  return data as User
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
      signal: controller.signal,
      ...options,
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(timeout)
  }
}

/** Fetch the full catalogue. Falls back to local data if the API is offline. */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await request<ApiProduct[]>("/products")
    return products.map(normalizeProduct)
  } catch {
    return FALLBACK_PRODUCTS
  }
}

/** Fetch a single product by id, with graceful fallback. */
export async function fetchProduct(id: number): Promise<Product | undefined> {
  try {
    const product = await request<ApiProduct>(`/products/${id}`)
    return normalizeProduct(product)
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.id === id)
  }
}

export async function loginRequest(email: string, password: string): Promise<User> {
  try {
    const data = await request<User | { user?: User; token?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    return normalizeAuthResponse(data)
  } catch {
    // Offline demo fallback
    return { id: 1, name: email.split("@")[0] || "Member", email }
  }
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  try {
    const data = await request<User | { user?: User; token?: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone: "" }),
    })
    return normalizeAuthResponse(data)
  } catch {
    return { id: Date.now(), name, email }
  }
}

export async function fetchOrders(userId: number): Promise<Order[]> {
  try {
    return await request<Order[]>(`/orders?userId=${userId}`)
  } catch {
    return [
      {
        id: "GNY-1042",
        date: "2025-02-18",
        status: "Delivered",
        total: 1710,
        items: [
          { name: "Structured Wool Overcoat", quantity: 1, price: 1290 },
          { name: "Merino Crewneck Knit", quantity: 1, price: 420 },
        ],
      },
      {
        id: "GNY-0987",
        date: "2025-01-06",
        status: "Delivered",
        total: 680,
        items: [{ name: "Cashmere Ribbed Turtleneck", quantity: 1, price: 680 }],
      },
    ]
  }
}
