import { faker } from "@faker-js/faker";
import { idSchema, IdProps } from "@repo/schema";

describe("idSchema", () => {
  it("should pass for a valid UUID", () => {
    const uuid = faker.string.uuid();
    const validInput: IdProps = { id: uuid };
    const result = idSchema.parse(validInput);
    expect(result).toEqual({ id: uuid });
  });

  it("should fail for an invalid UUID", () => {
    const invalidInput = { id: faker.lorem.word() };
    expect(() => idSchema.parse(invalidInput)).toThrow();
  });

  it("should fail for a missing id property", () => {
    const missingIdInput = {};
    expect(() => idSchema.parse(missingIdInput)).toThrow();
  });

  it("should fail for various invalid types", () => {
    const invalidInputs = [
      { id: faker.number.int() },
      { id: faker.datatype.boolean() },
      { id: faker.date.recent() },
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
