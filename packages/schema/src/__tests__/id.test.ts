import { faker } from "@faker-js/faker";
import { idSchema, IdProps } from "@repo/schema";

describe("idSchema", () => {
  it("should pass for a valid single UUID and return an array", () => {
    const uuid = faker.string.uuid();
    const validInput: IdProps = { id: uuid };
    const result = idSchema.parse(validInput);
    expect(result).toEqual([uuid]);
  });

  it("should pass for an array of valid UUIDs and return the same array", () => {
    const uuids = [faker.string.uuid(), faker.string.uuid()];
    const validInput: IdProps = { ids: uuids };
    const result = idSchema.parse(validInput);
    expect(result).toEqual(uuids);
  });

  it("should fail for an invalid UUID", () => {
    const invalidInput = { id: faker.lorem.word() };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for a missing id and ids property", () => {
    const missingIdInput = {};
    expect(() => idSchema.parse(missingIdInput)).toThrow();
  });

  it("should fail for an object with both id and ids properties", () => {
    const invalidInput = {
      id: faker.string.uuid(),
      ids: [faker.string.uuid()],
    };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for various invalid types", () => {
    const invalidInputs = [
      { id: faker.number.int() },
      { id: faker.datatype.boolean() },
      { id: faker.date.recent() },
      { id: faker.color.human() },
      { id: faker.lorem.word() },
      { ids: [faker.number.int()] },
      { ids: [faker.string.uuid(), faker.lorem.word()] },
      { id: null },
      { id: undefined },
    ];
    invalidInputs.forEach((input) => {
      expect(() => idSchema.parse(input)).toThrow();
    });
  });

  it("should fail for UUID-like strings that are not valid UUIDs", () => {
    const almostUuid = faker.string.alphanumeric(36);
    const invalidInput = { id: almostUuid };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should pass for multiple valid single UUID inputs", () => {
    for (let i = 0; i < 5; i++) {
      const uuid = faker.string.uuid();
      const validInput: IdProps = { id: uuid };
      const result = idSchema.parse(validInput);
      expect(result).toEqual([uuid]);
    }
  });

  it("should pass for multiple valid UUID array inputs", () => {
    for (let i = 0; i < 5; i++) {
      const uuids = [faker.string.uuid(), faker.string.uuid()];
      const validInput: IdProps = { ids: uuids };
      const result = idSchema.parse(validInput);
      expect(result).toEqual(uuids);
    }
  });

  it("should fail for an empty array of UUIDs", () => {
    const invalidInput = { ids: [] };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for a single non-UUID string in the ids array", () => {
    const invalidInput = { ids: [faker.lorem.word()] };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for a mix of valid and invalid UUIDs in the ids array", () => {
    const invalidInput = { ids: [faker.string.uuid(), faker.lorem.word()] };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });
});
