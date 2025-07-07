import { CartItem } from "@/context/CartContext"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to a more readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function decodeHtmlEntities(html: string) {
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  }
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Today"
  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}


export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericPrice)
  } catch (e) {
    console.log(`Error formating price: ${e}`)
  }
  return String(price)

}

export const calculatePrice = (product: CartItem) => {
  let price: string | number | undefined;

  if (product.selectedColor || product.selectedSize) {
    if (product.selectedVariation?.on_sale) {
      price = product.selectedVariation.sale_price;
    } else if ((product.selectedColor || product.selectedSize) && !product.selectedVariation) {
      price = product.price
    } else {
      price = product.selectedVariation?.regular_price ?? product.selectedVariation?.price;
    }
  } else {
    if (product.on_sale) {
      price = product.sale_price;
    } else {
      price = product.regular_price ?? product.price;
    }
  }

  // Convert to number and ensure we have a valid price
  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price;
  return numericPrice && numericPrice > 0 ? numericPrice : 0;
}