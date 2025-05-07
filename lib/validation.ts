import { z } from "zod"

// Define the schema for delivery information
export const deliverySchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  address_1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required").optional(),
  postcode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
})

// Define the schema for the entire form
export const formSchema = z.object({
  delivery: deliverySchema,
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export type FormValues = z.infer<typeof formSchema>

// Define the schema for the order data
// We still maintain the original structure for compatibility with the server action
export const orderDataSchema = z.object({
  billing: deliverySchema,
  shipping: deliverySchema,
  payment_method: z.literal("cod"),
})

export type OrderData = z.infer<typeof orderDataSchema>

