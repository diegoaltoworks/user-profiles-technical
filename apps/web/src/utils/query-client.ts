import { QueryClient } from "@tanstack/react-query";

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });
};
