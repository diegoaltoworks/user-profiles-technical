import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .min(1, { message: "Required" })
    .max(30, { message: "Name should be less than 30 characters" }),
});

export type UserProps = z.infer<typeof userSchema>;

export const usersSchema = z
  .union([userSchema, z.array(userSchema)])
  .transform((val) => (Array.isArray(val) ? val : [val]))
  .refine((val) => val.length > 0, {
    message: "At least one user must be provided",
  });

export type Users = UserProps[];

export const newUserSchema = userSchema.omit({ id: true });
export const newUsersSchema = z
  .union([newUserSchema, z.array(newUserSchema)])
  .transform((val) => (Array.isArray(val) ? val : [val]))
  .refine((val) => val.length > 0, {
    message: "At least one user must be provided",
  });

export type NewUserProps = z.infer<typeof newUserSchema>;
export type NewUsers = UserProps[];
