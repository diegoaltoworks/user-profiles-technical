import { userSchema } from "@repo/schema";
import { initTRPC } from '@trpc/server';
import { z, ZodError } from 'zod';
import type { Context } from './context.ts';
//import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
	//transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});
export const appRouter = t.router({
  sayHello: t.procedure
    .input(userSchema)
    .output(z.object({ message: z.string() }))
    .query((opts) => {
      const message: string = `Hello ${opts.input.name}`
      return {message};
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;