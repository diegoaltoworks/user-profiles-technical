import { Suspense } from "react";
import ListUsersTable from "~/components/user/ListUsersTable";

export default function Page(): React.ReactNode {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ListUsersTable />
      </Suspense>
    </main>
  );
}
