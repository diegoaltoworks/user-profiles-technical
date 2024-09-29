import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  TURSO_DATABASE_URL: str(),
  TURSO_AUTH_TOKEN: str(),
});

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./src/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL!,
    authToken: env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
