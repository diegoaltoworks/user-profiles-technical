import { z } from "zod";
import { db } from "@repo/database";
import { userTable } from "@repo/database";
import { paginationSchema, userSchema } from "@repo/schema";
import { router, publicProcedure } from "../app";
import { desc } from "drizzle-orm";

export const userRouter = router({
  addUser: publicProcedure
    .input(userSchema)
    .output(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const user = await db
        .insert(userTable)
        .values(opts.input)
        .returning({ id: userTable.id });
      return { id: user?.[0].id };
    }),
  getUsers: publicProcedure
    .input(paginationSchema)
    .output(z.array(userSchema))
    .query(async (opts) => {
      const limit = opts.input.perPage;
      const offset = (opts.input.curPage - 1) * opts.input.perPage;
      const results = await db
        .select()
        .from(userTable)
        .orderBy(userTable.createdAt, desc(userTable.createdAt))
        .limit(limit + 1)
        .offset(offset);

      //todo: report rangew headers for pagination
      const hasMore = results.length > limit;
      const records = results.slice(0, limit);

      return records;
    }),
});
