import Fastify from "fastify";
import cors from "@fastify/cors";
import { log } from "@repo/logger";
import { trpcHandler } from "./trpc/handler";

const port = Number(process.env.PORT) || 3001;

export const server = Fastify({
  logger: true,
});

server.register(cors);
server.register(trpcHandler);

server.get("/message/:name", async (request, reply) => {
  const { name } = request.params as { name: string };
  return reply.send({ message: `hello ${name}` });
});

server.get("/status", async (_, reply) => {
  return reply.send({ ok: true });
});

export const startServer = async () => {
  server.listen({ port }, (err, address) => {
    if (err) {
      log(`Error starting server: ${err.message}`);
      process.exit(1);
    }
    log(`API running at ${address}`);
  });

  return server;
};
