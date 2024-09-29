import { config } from "./config";
import { createClient } from "@libsql/client";
export const client = createClient(config);
