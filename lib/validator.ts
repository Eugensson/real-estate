import { z } from "zod";

export const AgentInputSchema = z.object({
  image: z.string().min(1, "Image is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
});

export const PropertyInputSchema = z.object({
  type: z.string().min(1, "Type is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  bedrooms: z.coerce
    .number()
    .int()
    .nonnegative("Bedrooms must be a non-negative number"),
  bathrooms: z.coerce
    .number()
    .int()
    .nonnegative("Bathrooms must be a non-negative number"),
  surface: z.coerce
    .number()
    .int()
    .nonnegative("Surface must be a non-negative number"),
  year: z.coerce
    .number()
    .int()
    .nonnegative("Year must be a non-negative number"),
  price: z
    .number()
    .min(1, "Price is required")
    .nonnegative("Year must be a non-negative number"),
  agent: AgentInputSchema,
});
