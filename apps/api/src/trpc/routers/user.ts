import { z } from "zod";
import { db } from "@repo/database";
import { userTable } from "@repo/database";
import {
  idPropArraySchema,
  idSchema,
  newUsersSchema,
  paginationMetaSchema,
  paginationSchema,
  searchSchema,
  userSchema,
} from "@repo/schema";
import { router, publicProcedure } from "../app";
import { desc, inArray, or, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { safeLike, totalCount } from "@repo/database";

export const userRouter = router({
  create: publicProcedure
    .input(newUsersSchema)
    .output(idPropArraySchema)
    .mutation(async (opts) => {
      const data = await db
        .insert(userTable)
        .values(opts.input)
        .returning({ id: userTable.id });

      if (data.length !== opts.input.length) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create all requested users",
        });
      }

      return data;
    }),

  retrieve: publicProcedure
    .input(
      z.object({
        ids: idSchema,
        meta: z.intersection(paginationSchema, searchSchema),
      }),
    )
    .output(
      z.object({
        data: z.array(userSchema),
        meta: paginationMetaSchema,
      }),
    )
    .query(async (opts) => {
      const { ids, meta } = opts.input;

      if (!ids.length)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unspecified record IDs",
        });

      const criteria = inArray(userTable.id, ids);

      const data = await db
        .select()
        .from(userTable)
        .where(criteria)
        .orderBy(desc(userTable.createdAt))
        // todo: refactor pagination to offset/limit
        .offset((meta.curPage - 1) * meta.perPage + 1)
        .limit(meta.perPage);
      const rowCount = await totalCount(userTable, criteria, data.length);

      return {
        data,
        meta: {
          rowCount,
        },
      };
    }),

  search: publicProcedure
    .input(z.intersection(paginationSchema, searchSchema).optional())
    .output(
      z.object({
        data: z.array(userSchema),
        meta: paginationMetaSchema,
      }),
    )
    .query(async (opts) => {
      const meta = opts.input;

      const criteria = meta
        ? or(
            meta.search ? safeLike(userTable.name, meta.search) : sql`true`,
            // todo: add email, address, other columns
          )
        : undefined;

      const query = db
        .select()
        .from(userTable)
        .where(criteria)
        .orderBy(desc(userTable.createdAt));
      // todo: refactor pagination to offset/limit
      meta && query.offset((meta.curPage - 1) * meta.perPage + 1);
      meta && query.limit(meta.perPage);

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
    .input(
      z.object({
        ids: idSchema,
        data: userSchema.partial().omit({ id: true }),
      }),
    )
    .output(z.array(userSchema))
    .mutation(async (opts) => {
      const { ids, data } = opts.input;

      const updatedUsers = await db
        .update(userTable)
        .set(data)
        .where(inArray(userTable.id, ids))
        .returning();

      if (updatedUsers.length !== ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some users to update were not found",
        });
      }

      return updatedUsers;
    }),

  delete: publicProcedure
    .input(z.object({ ids: idSchema }))
    .output(z.array(z.object({ id: z.string() })))
    .mutation(async (opts) => {
      const { ids } = opts.input;

      const deletedUsers = await db
        .delete(userTable)
        .where(inArray(userTable.id, ids))
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
