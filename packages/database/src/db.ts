import { drizzle } from "drizzle-orm/libsql";

//import { createClient } from "@libsql/client";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require("@libsql/client");

const turso = createClient({
  // eslint-disable-next-line
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);
