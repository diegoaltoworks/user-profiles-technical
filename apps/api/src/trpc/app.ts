import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { OpenApiMeta } from "trpc-openapi";
import type { Context } from "./context";
//import superjson from 'superjson';

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({
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
export const createCallerFactory = t.createCallerFactory;
export const privateProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth) {
    // ❌ user is not authenticated
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // ✅ user is authenticated, carry on
  return next();
});
