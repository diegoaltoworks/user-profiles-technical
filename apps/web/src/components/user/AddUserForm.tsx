"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import { userSchema, UserProps } from "@repo/schema";
import { trpc } from "@/utils/trpc";

export default function AddUserForm() {
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
    isPending,
    data: response,
  } = trpc.user.addUser.useMutation();

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
    if (response?.id) {
      reset();
    }
  }, [response]);

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name")} id="name"></input>
        {errors.name && <p>{errors.name.message}</p>}
        <Button type="submit">Submit</Button>
      </form>
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div>
          <p>User added!</p>
          <Button onClick={onReset} disabled={isPending}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
