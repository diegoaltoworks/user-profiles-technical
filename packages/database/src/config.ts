import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  TURSO_DATABASE_URL: str(),
  TURSO_AUTH_TOKEN: str(),
});

export const config = {
  // eslint-disable-next-line
  url: env.TURSO_DATABASE_URL!,
  authToken: env.TURSO_AUTH_TOKEN,
};
