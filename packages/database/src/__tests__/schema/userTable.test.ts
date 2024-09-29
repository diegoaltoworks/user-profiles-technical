import { userTable } from "@repo/database";
import { sql } from "drizzle-orm";

describe("userTable Schema", () => {
  it("should have an id column with correct properties", () => {
    const idColumn = userTable.id;
    expect(idColumn.name).toBe("id");
    expect(idColumn.notNull).toBe(true);
    expect(idColumn.primary).toBe(true);
    expect(idColumn.isUnique).toBe(true);
    expect(idColumn.default).toStrictEqual(sql`(uuid4())`);
  });

  it("should have a name column with correct properties", () => {
    const nameColumn = userTable.name;
    expect(nameColumn.name).toBe("name");
    expect(nameColumn.notNull).toBe(true);
  });

  it("should have a createdAt column with correct properties", () => {
    const createdAtColumn = userTable.createdAt;
    expect(createdAtColumn.name).toBe("createdAt");
    expect(createdAtColumn.notNull).toBe(true);
    expect(createdAtColumn.default).toStrictEqual(sql`CURRENT_TIMESTAMP`);
  });

  it("should have an updatedAt column with correct properties", () => {
    const updatedAtColumn = userTable.updatedAt;
    expect(updatedAtColumn.name).toBe("updatedAt");
    expect(updatedAtColumn.notNull).toBe(true);
    expect(updatedAtColumn.default).toStrictEqual(sql`CURRENT_TIMESTAMP`);
  });

  it("should have the correct number of columns", () => {
    const columns = Object.keys(userTable);
    expect(columns.length).toBe(4);
  });
});
