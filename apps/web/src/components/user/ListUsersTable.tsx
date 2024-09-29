"use client";

import { trpc } from "@/utils/trpc";
import { Button } from "@repo/ui/button";
import { SearchProps, searchSchema, UserProps } from "@repo/schema";
import { useParsedQueryParams } from "@/hooks/useParsedQueryParams";

export default function ListUsersTable() {
  const search = useParsedQueryParams<SearchProps>(searchSchema);
  const { data, isLoading, error } = trpc.user.search.useQuery({
    keyword: search.keyword,
    offset: search.offset,
    limit: search.limit,
  });

  const { data: users, meta } = data || {};

  const updateState = (update: any) => {
    const np = { ...search, ...update };
    const nq = new URLSearchParams(np).toString();
    window.history.pushState(null, "", `?${nq}`);
  };

  const handleNextPage = () => {
    updateState({ offset: search.offset + 1 });
  };

  const handlePreviousPage = () => {
    if (search.offset > 1) {
      updateState({ offset: search.offset - 1 });
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
          {users?.map((user: UserProps) => (
            <tr key={user.id}>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={handlePreviousPage} disabled={search.offset === 1}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={meta && search.offset >= meta.rowCount / search.limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
