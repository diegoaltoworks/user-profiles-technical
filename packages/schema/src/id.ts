import { z } from "zod";

export const idSchema = z.object({
  id: z.string().uuid(),
  // TODO: allow either id or ids, but not both
  /*
   .optional().refine((val, ctx) => {
    if (!val && !ctx.parent.ids) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either 'id' or 'ids' must be provided",
      });
      return false;
    }
    return true;
  }),
  ids: z.array(z.string().uuid()).optional(),
  */
});

export type IdProps = z.infer<typeof idSchema>;
