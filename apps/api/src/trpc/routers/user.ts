import { z } from "zod";
import { db } from "@repo/database";
import { userTable } from "@repo/database";
import { router, publicProcedure } from "../app";
import { desc, inArray, or, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { safeLike, totalCount } from "@repo/database";
import * as schema from "@repo/schema";
export const userRouter = router({
  create: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/user/create" },
    })
    .input(schema.userSchema.omit({ id: true }))
    .output(schema.idSchema.array())
    .mutation(async (opts) => {
      const input = opts.input;
      const data = await db
        .insert(userTable)
        .values(opts.input)
        .returning({ id: userTable.id });
      return data;
    }),

  retrieve: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/user/retrieve" },
    })
    .input(
      z.object({
        ...schema.idSchema.shape,
        ...schema.searchSchema.shape,
      }),
    )
    .output(
      z.object({
        data: schema.userSchema.array(),
        meta: schema.metaSchema,
      }),
    )
    .query(async (opts) => {
      const criteria = inArray(userTable.id, [opts.input.id]);

      const data = await db
        .select()
        .from(userTable)
        .where(criteria)
        .orderBy(desc(userTable.createdAt))
        .offset(opts.input.offset)
        .limit(opts.input.limit);
      const rowCount = await totalCount(userTable, criteria, data.length);

      return {
        data,
        meta: {
          rowCount,
        },
      };
    }),

  search: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/user/search" },
    })
    .input(schema.searchSchema)
    .output(
      z.object({
        data: schema.userSchema.array(),
        meta: schema.metaSchema,
      }),
    )
    .query(async (opts) => {
      const criteria = or(
        ...[
          opts.input.keyword
            ? safeLike(userTable.name, opts.input.keyword)
            : sql`true`,
          // todo: add email, address, other columns
        ],
      );
      const query = db
        .select()
        .from(userTable)
        .where(criteria)
        .orderBy(desc(userTable.createdAt))
        .offset(opts.input.offset)
        .limit(opts.input.limit);
      const data = await query;
      const rowCount = await totalCount(userTable, criteria, data.length);

      return {
        data,
        meta: {
          rowCount,
        },
      };
    }),

  update: publicProcedure

    .meta({
      openapi: { method: "GET", path: "/user/update" },
    })
    .input(schema.userSchema)
    .output(schema.userSchema.array())
    .mutation(async (opts) => {
      if (!schema.idSchema.safeParse({ id: opts.input.id }).success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input: id is required",
        });
      }
      const criteria = inArray(userTable.id, [opts.input.id as string]);
      const updatedUsers = await db
        .update(userTable)
        .set(opts.input)
        .where(criteria)
        .returning();

      return updatedUsers;
    }),

  delete: publicProcedure

    .meta({
      openapi: { method: "GET", path: "/user/delete" },
    })
    .input(schema.idSchema)
    .output(schema.idSchema.array())
    .mutation(async (opts) => {
      const ids = [opts.input.id];
      const criteria = inArray(userTable.id, ids);
      const deletedUsers = await db
        .delete(userTable)
        .where(criteria)
        .returning({ id: userTable.id });

      if (deletedUsers.length !== ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some users to delete were not found",
        });
      }

      return deletedUsers;
    }),
});
