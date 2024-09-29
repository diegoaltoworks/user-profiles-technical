import { FastifyPluginAsync } from "fastify";
import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "../trpc/router";
import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  PROJECT_NAME: str(),
  PROJECT_VERSION: str(),
  NEXT_PUBLIC_API_HOST: str(),
});

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: env.PROJECT_NAME!,
  version: env.PROJECT_VERSION!,
  baseUrl: `${env.NEXT_PUBLIC_API_HOST!}/api`,
});

export const openApiJsonHandler: FastifyPluginAsync = async (fastify) => {
  fastify.get("/openapi.json", async (request, reply) => {
    reply.header("Content-Type", "application/json").send(openApiDocument);
  });
};
