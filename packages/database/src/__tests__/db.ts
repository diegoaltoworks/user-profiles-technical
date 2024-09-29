// Define a type for our db methods
type DbMethods = {
  insert: jest.Mock;
  select: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};

// Mock the entire db module
jest.mock("@repo/database", () => {
  const mockDb: DbMethods = {
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  return { db: mockDb };
});

// Import the mocked db after the mock is set up
import { db } from "@repo/database";

export { db };
