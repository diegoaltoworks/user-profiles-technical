import supertest from "supertest";
import { fastify, endServer, startServer } from "./server";

beforeAll(async () => await startServer());
afterAll(async () => await endServer());

describe("server", () => {
  it("status check returns 200", async () => {
    const res = await supertest(fastify.server).get("/status");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it.only("message endpoint says hello", async () => {
    const res = await supertest(fastify.server).get("/message/diego");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("hello diego");
  });
});
