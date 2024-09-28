import { createServer } from "../server";

const port = Number(process.env.PORT) || 3001;
const fastify = createServer();

const startServer = async () => {
  try {
    return await fastify.listen({ port });
  } catch (err: any) {
    process.exit(1);
  }
};

const endServer = async () => {
  fastify.close();
};

export { fastify, startServer, endServer };
