import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { createContext } from './context';
import { appRouter, AppRouter } from './router';

// tRPC handler plugin for Fastify
export const trpcHandler: FastifyPluginCallback = (server: FastifyInstance, opts, done) => {
  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // Report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
  });

  done();
};
