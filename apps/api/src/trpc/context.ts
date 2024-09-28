import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
export function createContext({ req, res }: CreateFastifyContextOptions) {
  const auth = { name: req.headers.token ?? "" };
  return { req, res, auth };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
