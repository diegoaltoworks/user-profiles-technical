import Fastify from "fastify";
import cors from "@fastify/cors";
import { log } from "@repo/logger";
import { trpcHandler } from "./plugins/trpc";
import { panelHandler } from "./plugins/panel";
import { restHandler } from "./plugins/rest";
import { docsHandler } from "./plugins/docs";
import { openApiJsonHandler } from "./plugins/openapijson";
import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  HOST: str({ default: "0.0.0.0" }), // Add this line to allow configuration of the host
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
  try {
    await server.listen({ port: env.PORT, host: env.HOST });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    log(`API running at ${env.HOST}:${port}`);
  } catch (err) {
    log(`Error starting server: ${err}`);
    process.exit(1);
  }
  return server;
};
