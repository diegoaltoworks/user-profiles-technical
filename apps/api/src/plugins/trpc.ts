import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { createContext } from "../trpc/context";
import { appRouter, AppRouter } from "../trpc/router";

// tRPC handler plugin for Fastify
export const trpcHandler: FastifyPluginCallback = (
  server: FastifyInstance,
  opts,
  done,
) => {
  server.register(fastifyTRPCPlugin, {
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // Report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });

  done();
};
