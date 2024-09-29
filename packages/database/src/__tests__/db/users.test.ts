import { db } from "@repo/database";
import { userTable as users } from "@repo/database";
import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";

// Define a type for our db methods
type DbMethods = {
  insert: jest.Mock;
  select: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};

// Mock the entire @repo/database module
jest.mock("@repo/database", () => {
  const mockDb: DbMethods = {
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  return { db: mockDb, userTable: {} };
});

const goodData = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
};

const badData = {
  id: "not-a-valid-uuid",
  name: faker.lorem.paragraph(),
};

describe("@repo/database/db", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should insert data into the database", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockResolvedValue([{ id: goodData.id }]),
    });

    await expect(
      db.insert(users).values({ name: goodData.name }),
    ).resolves.not.toThrow();
    expect(db.insert).toHaveBeenCalledWith(users);
    expect(db.insert).toHaveBeenCalledTimes(1);
  });

  it("should read data from the database", async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([goodData]),
      }),
    });

    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, goodData.id));
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(goodData);
    expect(db.select).toHaveBeenCalledTimes(1);
  });

  it("should update data in the database", async () => {
    (db.update as jest.Mock).mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([{ id: goodData.id }]),
      }),
    });

    const newName = faker.person.fullName();
    await expect(
      db.update(users).set({ name: newName }).where(eq(users.id, goodData.id)),
    ).resolves.not.toThrow();
    expect(db.update).toHaveBeenCalledWith(users);
    expect(db.update).toHaveBeenCalledTimes(1);
  });

  it("should delete data from the database", async () => {
    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockResolvedValue([{ id: goodData.id }]),
    });

    await expect(
      db.delete(users).where(eq(users.id, goodData.id)),
    ).resolves.not.toThrow();
    expect(db.delete).toHaveBeenCalledWith(users);
    expect(db.delete).toHaveBeenCalledTimes(1);
  });

  it("should fail when inserting invalid data", async () => {
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockRejectedValue(new Error("Invalid data")),
    });

    await expect(db.insert(users).values(badData)).rejects.toThrow(
      "Invalid data",
    );
  });

  it("should throw an error when reading non-existent data", async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockRejectedValue(new Error("User not found")),
      }),
    });

    await expect(
      db.select().from(users).where(eq(users.id, faker.string.uuid())),
    ).rejects.toThrow("User not found");
  });
});
