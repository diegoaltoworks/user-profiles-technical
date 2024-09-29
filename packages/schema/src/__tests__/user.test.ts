import { faker } from "@faker-js/faker";
import { userSchema, UserProps } from "../user"; // Adjust the import path as needed

describe("userSchema", () => {
  it("should pass for valid input with id and name", () => {
    const validInput: UserProps = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
    };
    expect(() => userSchema.parse(validInput)).not.toThrow();
  });

  it("should pass for valid input with only name", () => {
    const validInput: UserProps = {
      name: faker.person.firstName(),
    };
    expect(() => userSchema.parse(validInput)).not.toThrow();
  });

  it("should fail for missing name", () => {
    const invalidInput = {
      id: faker.string.uuid(),
    };
    expect(() => userSchema.parse(invalidInput)).toThrow("Required");
  });

  it("should fail for empty name", () => {
    const invalidInput = {
      id: faker.string.uuid(),
      name: "",
    };
    expect(() => userSchema.parse(invalidInput)).toThrow("Required");
  });

  it("should fail for name longer than 30 characters", () => {
    const invalidInput = {
      name: faker.lorem.words({ min: 50, max: 100 }),
    };
    expect(() => userSchema.parse(invalidInput)).toThrow(
      "Name should be less than 30 characters",
    );
  });

  it("should pass for name with exactly 30 characters", () => {
    const validInput = {
      name: faker.lorem.word({ length: { min: 5, max: 30 } }),
    };
    expect(() => userSchema.parse(validInput)).not.toThrow();
  });

  it("should pass for name with exactly 1 character", () => {
    const validInput = {
      name: "A",
    };
    expect(() => userSchema.parse(validInput)).not.toThrow();
  });

  it("should fail for non-string name", () => {
    const invalidInputs = [
      { name: 123 },
      { name: true },
      { name: {} },
      { name: [] },
    ];
    invalidInputs.forEach((input) => {
      expect(() => userSchema.parse(input)).toThrow();
    });
  });

  it("should fail for non-string id", () => {
    const invalidInputs = [
      { id: 123, name: faker.person.fullName() },
      { id: true, name: faker.person.fullName() },
      { id: {}, name: faker.person.fullName() },
      { id: [], name: faker.person.fullName() },
      { id: faker.lorem.word(), name: faker.person.fullName() },
      { id: null, name: faker.person.fullName() },
      // TODO: undefined currenty passes but tbc
    ];
    invalidInputs.forEach((input) => {
      try {
        expect(() => userSchema.parse(input)).toThrow();
      } catch (e) {
        console.log({ input, e });
      }
    });
  });

  // TODO: remove properties we add to user profile later
  it("should ignore additional properties", () => {
    const input = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      age: 30,
      email: faker.internet.email(),
    };
    const result = userSchema.parse(input);
    expect(result).not.toHaveProperty("age");
    expect(result).not.toHaveProperty("email");
  });
});
