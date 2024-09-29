import { z } from "zod";

export const paginationSchema = z.object({
  curPage: z.coerce
    .number()
    .min(1, { message: "Must be >= 1" })
    .transform(Math.floor)
    .optional()
    .default(1),
  perPage: z.coerce
    .number()
    .min(10, { message: "Must be >= 10" })
    .max(500, { message: "Must be <= 500" })
    .transform(Math.floor)
    .optional()
    .default(10),
});

export type PaginationProps = z.infer<typeof paginationSchema>;
