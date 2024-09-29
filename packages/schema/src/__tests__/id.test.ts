import { faker } from "@faker-js/faker";
import { idSchema, IdProps } from "@repo/schema";

describe("idSchema", () => {
  it("should pass for a valid UUID", () => {
    const validInput: IdProps = { id: faker.string.uuid() };
    expect(() => idSchema.parse(validInput)).not.toThrow();
  });

  it("should fail for an invalid UUID", () => {
    const invalidInput = { id: faker.lorem.word() };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for a missing id property", () => {
    const missingIdInput = {};
    expect(() => idSchema.parse(missingIdInput)).toThrow();
  });

  it("should fail for an array of UUIDs", () => {
    const validArrayInput = {
      id: [faker.string.uuid(), faker.string.uuid()],
    };
    expect(() => idSchema.parse(validArrayInput)).toThrow();
  });

  // TODO: allow either id or ids, but not both
  it.skip("should fail for an object with both id and ids properties", () => {
    const invalidInput = {
      id: faker.string.uuid(),
      ids: [faker.string.uuid()],
    };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should pass for multiple valid UUIDs", () => {
    for (let i = 0; i < 5; i++) {
      const validInput: IdProps = { id: faker.string.uuid() };
      expect(() => idSchema.parse(validInput)).not.toThrow();
    }
  });

  it("should fail for various invalid types", () => {
    const invalidInputs = [
      { id: faker.number.int() },
      { id: faker.datatype.boolean() },
      { id: faker.date.recent() },
      { id: faker.color.human() },
      { id: faker.lorem.word() },
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
});
