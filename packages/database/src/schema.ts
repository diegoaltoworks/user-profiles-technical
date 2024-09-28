import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id")
    .unique()
    .primaryKey()
    .notNull()
    .default(sql`(uuid4())`),
  name: text("name").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
