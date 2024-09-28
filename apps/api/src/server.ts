import Fastify from "fastify";
import cors from "@fastify/cors";
import { trpcHandler } from "./trpc/handler";

export const createServer = () => {
  const app = Fastify({
      logger: true
  });

  app.register(cors);
  app.register(trpcHandler);

  app.get("/message/:name", async (request, reply) => {
    const { name } = request.params as { name: string };
    return reply.send({ message: `hello ${name}` });
  });

  app.get("/status", async (_, reply) => {
    return reply.send({ ok: true });
  });

  return app;
};
