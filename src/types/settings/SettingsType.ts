import { z } from "zod";

export const baseSettingsSchema = z.object({
  minBookingsLength: z.number().int(),
  maxBookingsLength: z.number().int(),
  maxGuestsPerBooking: z.number().int(),
  breakfastPrice: z.number().int(),
});

export const settingsFromServerSchema = baseSettingsSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
});

export type BaseSettings = z.infer<typeof baseSettingsSchema>;
export type SettingsFromServer = z.infer<typeof settingsFromServerSchema>;
