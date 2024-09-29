import Fastify from "fastify";
import cors from "@fastify/cors";
import { log } from "@repo/logger";
import { trpcHandler } from "./plugins/trpc";
import { panelHandler } from "./plugins/panel";
import { restHandler } from "./plugins/rest";
import { docsHandler } from "./plugins/docs";
import { openApiJsonHandler } from "./plugins/openapijson";
import { cleanEnv, num } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
});

export const server = Fastify({
  logger: true,
});

server.register(cors);
server.register(trpcHandler, { prefix: "/trpc" });
server.register(panelHandler, { prefix: "/panel" });
server.register(restHandler, { prefix: "/api" });
server.register(docsHandler, { prefix: "/docs" });
server.register(openApiJsonHandler, { prefix: "/" });

server.get("/status", async (_, reply) => {
  return reply.send({ ok: true });
});

export const startServer = async () => {
  server.listen({ port: env.PORT }, (err, address) => {
    if (err) {
      log(`Error starting server: ${err.message}`);
      process.exit(1);
    }
    log(`API running at ${address}`);
  });

  return server;
};
