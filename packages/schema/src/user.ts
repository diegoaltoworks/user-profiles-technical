import {z} from "zod";

export const userSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "Required" })
			.max(30, { message: "Name should be less than 30 characters" }),

	});

export type UserSchema = z.infer<typeof userSchema>