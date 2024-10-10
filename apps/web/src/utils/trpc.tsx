import type { AppRouter } from "@repo/api/src/trpc";
import { createTRPCReact } from "@trpc/react-query";

// Add this import
import type { CreateTRPCReact } from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, unknown, null> =
  createTRPCReact<AppRouter>();
