"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./trpc";

export const TRPCQueryClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    // fixed! no need to ts-ignore any more
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_API_HOST as string}/trpc`,
          async headers() {
            return {};
          },
        }),
      ],
    }),
  );
  return (
    <>
      {/* @ts-ignore */}
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        {/* @ts-ignore */}
      </trpc.Provider>
    </>
  );
};
