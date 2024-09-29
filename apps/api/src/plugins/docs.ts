import { FastifyPluginAsync } from "fastify";
import { openApiDocument } from "./openapijson";

export const docsHandler: FastifyPluginAsync = async (fastify) => {
  await fastify.register(require("@scalar/fastify-api-reference"), {
    routePrefix: "/",
    configuration: {
      spec: {
        content: openApiDocument,
      },
    },
  });
};
