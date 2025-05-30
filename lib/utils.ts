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

export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericPrice)
  } catch(e) {
    console.log(`Error formating price: ${e}`)
  } 
  return String(price)

}