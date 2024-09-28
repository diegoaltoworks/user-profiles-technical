import { createServer } from "./server";
import { log } from "@repo/logger";

const port = Number(process.env.PORT) || 3001;
const server = createServer();

server.listen({ port }, (err, address) => {
  if (err) {
    log(`Error starting server: ${err.message}`);
    process.exit(1);
  }
  log(`API running at ${address}`);
});
