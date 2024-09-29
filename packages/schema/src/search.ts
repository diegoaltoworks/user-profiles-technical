import { z } from "zod";

export const searchSchema = z.object({
  keyword: z.string().optional(),

  // todo: add other common search props
  //  date: z.date().optional(),
  //  active: z.boolean().optional(),

  offset: z.coerce.number().min(0).transform(Math.floor).optional().default(0),

  limit: z.coerce
    .number()
    .min(10, { message: "Must be >= 10" })
    .max(500, { message: "Must be <= 500" })
    .transform(Math.floor)
    .optional()
    .default(10),
});

export type SearchProps = z.infer<typeof searchSchema>;
