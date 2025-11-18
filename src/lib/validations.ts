import { z } from "zod";

export const coversQuerySchema = z.object({
  offset: z.string().default("0"),
  limit: z.string().optional(),
  searchTerm: z.string().optional(),
});

export type CoversQuery = z.infer<typeof coversQuerySchema>;
