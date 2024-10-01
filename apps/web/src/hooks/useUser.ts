"use client";

import { useEffect, useState } from "react";
import { ExistingUserProps } from "@repo/schema";
import { trpc } from "~/utils/trpc";
import { useParsedQueryParams } from "~/hooks/useParsedQueryParams";

export const useUser = () => {
  const query = useParsedQueryParams<{ id: string }>();
  const [user, setUser] = useState<ExistingUserProps | null>(null);
  const { data: result } = trpc.user.retrieve.useQuery({ id: query.id });

  useEffect(() => {
    if (!result) return;
    if (!Array.isArray(result.data)) return;
    if (result.data.length === 0) return;

    setUser(result.data[0]);
  }, [result]);

  return user;
};
