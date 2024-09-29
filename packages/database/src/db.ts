import { drizzle } from "drizzle-orm/libsql";
import { client } from "./client";

export const db = drizzle(client, { logger: true });
