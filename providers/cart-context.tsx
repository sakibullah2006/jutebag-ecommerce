"use client"

import { Product, } from "@/types/woocommerce"
import { ReactNode, createContext, useCallback, useEffect, useState } from "react"

// export type CartItem = 
export type CartItem = Pick<Product, "id" | "name" | "images" | "price"> & {
  quantity: number
  size?: string
  vairation_id?: number
  // total: number
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
  setShipping: (shipping: number) => void
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
      typeof item.vairation_id === "number" &&
      typeof item.name === "string" &&
      typeof item.price === "string" &&
      typeof item.quantity === "number" &&
      Array.isArray(item.default_attributes) &&
      item.default_attributes.every(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (attr: any) =>
          typeof attr === "object" &&
          typeof attr.id === "number" &&
          typeof attr.name === "string" &&
          typeof attr.option === "string"
      ) &&
      Array.isArray(item.images) &&
      item.images.every(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (img: any) =>
          typeof img === "object" &&
          typeof img.src === "string" &&
          typeof img.alt === "string"
      ) &&
      (item.size === undefined || typeof item.size === "string")
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
      return [...prevItems, { ...product, quantity: 1 }]
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

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, cartTotal, totalItems, setShipping, shipping }} >
      {children}
    </CartContext.Provider >
  )
}

export default CartProvider