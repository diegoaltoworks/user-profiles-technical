import { FastifyPluginAsync } from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";

export const restHandler: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyTRPCPlugin, {
    prefix: "/",
    trpcOptions: { router: appRouter, createContext },
  });
};
