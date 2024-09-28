"use client";

import { trpc } from "@/utils/trpc";
import { Button } from "@repo/ui/button";
import { PaginationProps, paginationSchema } from "@repo/schema";
import { useParsedQueryParams } from "@/hooks/useParsedQueryParams";

export default function ListUsersTable() {
  const params = useParsedQueryParams<PaginationProps>(paginationSchema);
  const {
    data: users,
    isLoading,
    error,
  } = trpc.user.getUsers.useQuery({
    curPage: params.curPage,
    perPage: params.perPage,
  });

  const updateState = (update: any) => {
    const np = { ...params, ...update };
    const nq = new URLSearchParams(np).toString();
    window.history.pushState(null, "", `?${nq}`);
  };

  const handleNextPage = () => {
    updateState({ curPage: params.curPage + 1 });
  };

  const handlePreviousPage = () => {
    if (params.curPage > 1) {
      updateState({ curPage: params.curPage - 1 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={handlePreviousPage} disabled={params.curPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage}>Next</Button>
      </div>
    </div>
  );
}
