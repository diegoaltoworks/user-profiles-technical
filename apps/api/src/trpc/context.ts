import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  auth: string | null;
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const auth = req.headers.token;
  return { req, res, auth };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return { auth: null };
}
