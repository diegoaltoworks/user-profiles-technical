import React, { Suspense } from "react";
import DeleteUserForm from "~/components/user/DeleteUserForm";

export default function Page(): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteUserForm />
    </Suspense>
  );
}
