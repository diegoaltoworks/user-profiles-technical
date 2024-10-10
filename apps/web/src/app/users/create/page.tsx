import React, { Suspense } from "react";
import AddUserForm from "~/components/user/AddUserForm";

export default function Page(): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddUserForm />
    </Suspense>
  );
}
