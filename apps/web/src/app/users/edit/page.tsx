import React, { Suspense } from "react";
import EditUserForm from "~/components/user/EditUserForm";

export default function Page(): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditUserForm />
    </Suspense>
  );
}
