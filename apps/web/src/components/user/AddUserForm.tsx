"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { userSchema, UserProps } from "@repo/schema";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddUserForm() {
  const utils = trpc.useUtils();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProps>({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState<string | undefined>();
  const {
    mutate,
    isLoading,
    data: response,
  } = trpc.user.create.useMutation({
    onSuccess() {
      utils.user.retrieve.invalidate();
      utils.user.search.invalidate();
    },
  });

  const onSubmit = async (data: UserProps) => {
    if (Object.keys(errors).length > 0) return;

    try {
      mutate(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const onReset = () => {
    reset();
  };
  useEffect(() => {
    if (response?.[0]?.id) {
      reset();
    }
  }, [response]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Submit
        </Button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div data-setid="user-added">
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>User added!</p>
          </div>
          <Button
            onClick={() => router.push("/users")}
            className="mt-2 w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back to List
          </Button>
        </div>
      )}
    </div>
  );
}
