import { FastifyPluginAsync } from "fastify";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../trpc/router";
import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_HOST: str(),
});

export const panelHandler: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (request, reply) => {
    const html = renderTrpcPanel(appRouter, {
      url: `${env.NEXT_PUBLIC_API_HOST}/trpc`,
    });
    reply.type("text/html").send(html);
  });
};
