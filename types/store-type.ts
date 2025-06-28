import { Product } from "./product-type"

// export type CartItem = 
export type CartItem = Pick<Product, "id" | "name" | "images"> & {
  quantity: number
  size?: string
  variation_id?: number
  price: number
  color?: string
  attributes?: {
    id: number
    name: string
    slug: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }[],
  selectedAttributes?: {
    [key: string]: string
  }
}