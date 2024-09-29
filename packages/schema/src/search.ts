import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().optional().nullable(),
  // todo: add other common search props
  //  date: z.date().optional(),
  //  active: z.boolean().optional(),
});

export type SearchProps = z.infer<typeof searchSchema>;
