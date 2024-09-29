import AddUserForm from "@/components/user/AddUserForm";
import ListUsersTable from "@/components/user/ListUsersTable";
import { Suspense } from "react";

export default function Web() {
  return (
    <main>
      <AddUserForm />
      <Suspense fallback={<div>Loading...</div>}>
        <ListUsersTable />
      </Suspense>
    </main>
  );
}
