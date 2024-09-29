import { z } from "zod";

export const idSchema = z.object({
  id: z.string().uuid(),
  // todo: alternatively accept an array of IDs?
  // ids: z.array(z.string().uuid()),
  // findMany alternative to findOne or findAll
});

export type IdProps = z.infer<typeof idSchema>;
