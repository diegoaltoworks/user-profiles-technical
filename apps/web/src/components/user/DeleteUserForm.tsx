"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/useUser";

export default function EditUserForm() {
  const user = useUser();
  const utils = trpc.useUtils();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const { mutate, data: response } = trpc.user.delete.useMutation({
    onSuccess() {
      utils.user.retrieve.invalidate();
      utils.user.search.invalidate();
      router.back();
    },
  });

  if (!user) return ",,, ";

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      mutate({ id: user.id });
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Delete User</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>Are you sure you want to delete {user.name}?</div>
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Yes, Delete User
        </Button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
