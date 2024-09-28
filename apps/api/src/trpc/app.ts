import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import type { Context } from "./context";
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

export const router = t.router;
export const publicProcedure = t.procedure;
