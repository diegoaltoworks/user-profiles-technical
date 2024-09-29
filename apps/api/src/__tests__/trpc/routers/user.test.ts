//import { AppRouter, createCaller } from "../../../trpc/router";
//import { inferProcedureInput } from '@trpc/server';
//import { createContextInner } from "../../../trpc/context";

test("add and get post", async () => {
  expect(true).toBe(true);
  // todo: trpc testing
  /*
  const ctx = await createContextInner({auth: null});
  const caller = createCaller(ctx);
  const input: inferProcedureInput<AppRouter['user']['create']> = {
    name: 'test user'
  };
  const data = await caller.user.create(input);
  expect(data.length).toBe(1);
  const id = data?.[0].id;
  const byId = await caller.user.retrieve({ ids: id });
  expect(byId).toMatchObject({...input, id});
  */
});
