"use client"

import { Product, TaxtData, } from "@/types/woocommerce"
import { ReactNode, createContext, useCallback, useEffect, useState } from "react"

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
    Color?: string,
    Size?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  cartTotal: number
  totalItems: number
  shipping: number | null
  setShipping: (shipping: number | null) => void
  isItemInCart: (productId: number) => boolean
  appliedCoupon: string | null
  setAppliedCoupon: (coupon: string | null) => void
  selectedTaxes: TaxtData[]
  setSelectedTaxes: (taxes: TaxtData[]) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)


type Props = {
  children: ReactNode
}

const CartProvider = ({ children }: Props) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidCartItem = (item: any): item is CartItem => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "number" &&
      (item.variation_id === undefined || typeof item.variation_id === "number") &&
      typeof item.name === "string" &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      Array.isArray(item.images) &&
      item.images.every(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (img: any) =>
          typeof img === "object" &&
          typeof img.src === "string" &&
          typeof img.alt === "string"
      ) &&
      (item.selectedAttributes === undefined ||
        (typeof item.selectedAttributes === "object" &&
          (item.selectedAttributes.Color === undefined || typeof item.selectedAttributes.Color === "string") &&
          (item.selectedAttributes.Size === undefined || typeof item.selectedAttributes.Size === "string"))) &&
      (item.size === undefined || typeof item.size === "string") &&
      (item.color === undefined || typeof item.color === "string")
    );
  };

  // * cart items
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedItems = localStorage.getItem("cartItems");
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems) && parsedItems.every(isValidCartItem)) {
          return parsedItems;
        }
      }
      return [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false)
  const [shipping, setShipping] = useState<number | null>(null)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [selectedTaxes, setSelectedTaxes] = useState<TaxtData[]>([])





  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("cartItems", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);


  // * add Item to cart
  const addItem = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // Get default attributes
      // const defaultSize = product.default_attributes?.find(attr => attr.name === 'Size')?.option
      // const defaultColor = product.default_attributes?.find(attr => attr.name === 'Color')?.option

      return [...prevItems, {
        id: product.id,
        name: product.name,
        images: product.images,
        price: Number(product.price),
        quantity: 1,
        variation_id: product.variation_id || undefined,
        selectedAttributes: product.selectedAttributes,
      }]
    })
    setIsOpen(true)
  }, [])

  // * remove Item 
  const removeItem = useCallback((productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  // * update quantity
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  // * clear cart
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // * calculate total items
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // * check if item is in cart
  const isItemInCart = useCallback((productId: number) => {
    return items.some((item) => item.id === productId)
  }, [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, cartTotal, totalItems, setShipping, shipping, isItemInCart, appliedCoupon, setAppliedCoupon, selectedTaxes, setSelectedTaxes }} >
      {children}
    </CartContext.Provider >
  )
}

export default CartProvider