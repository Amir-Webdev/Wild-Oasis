import { z } from "zod";

export const CabinSchema = z.object({
  id: z.number().int(),
  created_at: z.string(),
  name: z.string(),
  maxCapacity: z.number().int(),
  regularPrice: z.number().int(),
  discount: z.number().int(),
  description: z.string(),
  image: z.string(),
});

export type CabinType = z.infer<typeof CabinSchema>;
