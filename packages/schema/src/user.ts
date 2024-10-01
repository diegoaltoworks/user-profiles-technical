import { z } from "zod";
import { idSchema } from "./id";

export const userSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .min(1, { message: "Required" })
    .max(30, { message: "Name should be less than 30 characters" }),
});

export type UserProps = z.infer<typeof userSchema>;

export const existingUserSchema = userSchema.extend(idSchema.shape);

export type ExistingUserProps = z.infer<typeof existingUserSchema>;
