import { like, SQL, sql } from "drizzle-orm";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { db } from "./db";

export const safeLike = (column: SQLiteColumn, pattern: string): SQL => {
  const escapedPattern = pattern.replace(/[%_\\]/g, "\\$&");
  return like(column, `%${escapedPattern}%`);
};
export const totalCount = async (
  table: SQLiteTable,
  criteria?: SQL,
  knownCount?: number,
) => {
  const zeroCount = [{ count: 0 }];
  const [countResult] = !knownCount
    ? zeroCount
    : await db
        .select({ count: sql<number>`count(*)` })
        .from(table)
        .where(criteria);
  return countResult?.count || 0;
};
