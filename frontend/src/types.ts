export interface Product {
  id: number
  name: string
  category: string
  price: number
  currency?: string
  description?: string
  image: string
  /** Secondary image revealed on hover (typically the model shot). */
  hoverImage?: string
  images?: string[]
  colors?: string[]
  sizes?: string[]
  details?: string[]
  fabric?: string
  origin?: string
  soldOut?: boolean
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Order {
  id: string
  date: string
  status: string
  total: number
  items: { name: string; quantity: number; price: number }[]
}

export type PageName =
  | "home"
  | "collection"
  | "product"
  | "cart"
  | "auth"
  | "account"
