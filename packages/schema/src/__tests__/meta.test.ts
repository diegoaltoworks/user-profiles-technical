import { metaSchema, MetaProps } from "@repo/schema"; // Adjust the import path as needed

describe("metaSchema", () => {
  it("should use default value for rowCount when not provided", () => {
    const result = metaSchema.parse({});
    expect(result).toEqual({ rowCount: 0 });
  });

  it("should accept a valid rowCount", () => {
    const validInput: MetaProps = { rowCount: 100 };
    const result = metaSchema.parse(validInput);
    expect(result).toEqual(validInput);
  });

  it("should accept zero as a valid rowCount", () => {
    const validInput: MetaProps = { rowCount: 0 };
    const result = metaSchema.parse(validInput);
    expect(result).toEqual(validInput);
  });

  it("should accept a large number as rowCount", () => {
    const validInput: MetaProps = { rowCount: 1000000 };
    const result = metaSchema.parse(validInput);
    expect(result).toEqual(validInput);
  });

  it("should fail for non-numeric rowCount", () => {
    const invalidInputs = [
      { rowCount: "ten" },
      { rowCount: true },
      { rowCount: {} },
      { rowCount: [] },
      { rowCount: null },
    ];
    invalidInputs.forEach((input) => {
      expect(() => metaSchema.parse(input)).toThrow();
    });
  });

  it("should fail for negative rowCount", () => {
    const invalidInput = { rowCount: -1 };
    expect(() => metaSchema.parse(invalidInput)).toThrow();
  });

  it("should round-down for fractional rowCount", () => {
    const fractionalInput = { rowCount: 10.5 };
    const result = metaSchema.parse(fractionalInput);
    expect(result).toEqual({ rowCount: 10 });
  });

  it("should ignore additional properties", () => {
    const input = {
      rowCount: 50,
      extraProp: "should be ignored",
    };
    const result = metaSchema.parse(input);
    expect(result).toEqual({ rowCount: 50 });
    expect(result).not.toHaveProperty("extraProp");
  });

  // Placeholder tests for future properties
  it.todo("should accept valid updatedAt date when implemented");
  it.todo("should accept valid createdAt date when implemented");
  it.todo("should fail for invalid updatedAt format when implemented");
  it.todo("should fail for invalid createdAt format when implemented");
});
