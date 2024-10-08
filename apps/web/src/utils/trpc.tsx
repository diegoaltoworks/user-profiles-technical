import type { AppRouter } from "api/src/trpc";
import { createTRPCReact } from "@trpc/react-query";

// Add this import
import type { CreateTRPCReact } from "@trpc/react-query";

// Explicitly type the trpc constant with all three type arguments
export const trpc: CreateTRPCReact<AppRouter, unknown, unknown> =
  createTRPCReact<AppRouter>();
