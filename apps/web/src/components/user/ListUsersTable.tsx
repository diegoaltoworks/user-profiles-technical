"use client";

import { trpc } from "@/utils/trpc";
import { Button } from "@repo/ui/button";
import {
  PaginationProps,
  paginationSchema,
  SearchProps,
  searchSchema,
} from "@repo/schema";
import { useParsedQueryParams } from "@/hooks/useParsedQueryParams";

export default function ListUsersTable() {
  const query = useParsedQueryParams<any>();
  const pagination: PaginationProps = paginationSchema.parse(query);
  const search: SearchProps = searchSchema.parse(query);
  const { data, isLoading, error } = trpc.user.search.useQuery({
    search: search.search,
    curPage: pagination.curPage,
    perPage: pagination.perPage,
  });

  const { data: users, meta } = data || {};

  const updateState = (update: any) => {
    const np = { ...pagination, ...update };
    const nq = new URLSearchParams(np).toString();
    window.history.pushState(null, "", `?${nq}`);
  };

  const handleNextPage = () => {
    updateState({ curPage: pagination.curPage + 1 });
  };

  const handlePreviousPage = () => {
    if (pagination.curPage > 1) {
      updateState({ curPage: pagination.curPage - 1 });
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
        <Button
          onClick={handlePreviousPage}
          disabled={pagination.curPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={
            meta && pagination.curPage >= meta.rowCount / pagination.perPage
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
