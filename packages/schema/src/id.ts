import { z } from "zod";

export const pkSchema = z.string().uuid();

export const idInputSchema = z.object({
  id: pkSchema.optional(),
  ids: z.array(pkSchema).optional(),
});

export const idSchema = idInputSchema
  .refine((data) => data.id !== undefined || data.ids !== undefined, {
    message: "Either 'id' or 'ids' must be provided",
  })
  .refine((data) => !(data.id !== undefined && data.ids !== undefined), {
    message: "Only one of 'id' or 'ids' should be provided",
  })
  .transform((val) => ({
    ids: val.id ? [val.id] : val.ids || [],
  }))
  .refine((data) => data.ids.length > 0, {
    message: "At least one ID must be provided",
  })
  .transform((val) => val.ids)
  .pipe(z.array(pkSchema));

export type IdProps = z.infer<typeof idInputSchema>;
export type IdArray = z.infer<typeof idSchema>;

export const idPropArraySchema = z.array(z.object({ id: pkSchema }));
export type IdPropArray = z.infer<typeof idPropArraySchema>;
