import { startServer } from "../server";
import { FastifyInstance } from "fastify";
import supertest from "supertest";

let fastify: FastifyInstance;
beforeAll(async () => {
  fastify = await startServer();
});
afterAll(async () => {
  fastify.close();
});

describe("server", () => {
  it("status check returns 200", async () => {
    const res = await supertest(fastify.server).get("/status");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
