import { faker } from "@faker-js/faker";
import { searchSchema as schema } from "@repo/schema"; // Adjust import path as needed

describe("searchSchema", () => {
  it("should return default values when no input is provided", () => {
    const result = schema.parse({});
    expect(result).toEqual({ offset: 0, limit: 10 });
  });

  it("should parse valid values for offset, limit, and keyword", () => {
    const offset = faker.number.int({ min: 0, max: 1000 });
    const limit = faker.number.int({ min: 10, max: 500 });
    const keyword = faker.word.sample();
    const result = schema.parse({ offset, limit, keyword });
    expect(result).toEqual({ offset, limit, keyword });
  });

  it("should coerce string values to numbers for offset and limit", () => {
    const result = schema.parse({ offset: "3", limit: "100" });
    expect(result).toEqual({ offset: 3, limit: 100 });
  });

  it("should apply the default value for offset if it is missing", () => {
    const limit = faker.number.int({ min: 10, max: 500 });
    const result = schema.parse({ limit });
    expect(result.offset).toBe(0);
    expect(result.limit).toBe(limit);
    expect(result).not.toHaveProperty("keyword");
  });

  it("should apply the default value for limit if it is missing", () => {
    const offset = faker.number.int({ min: 0, max: 1000 });
    const result = schema.parse({ offset });
    expect(result.offset).toBe(offset);
    expect(result.limit).toBe(10);
    expect(result).not.toHaveProperty("keyword");
  });

  it("should not throw an error if offset is 0", () => {
    const result = schema.parse({ offset: 0 });
    expect(result.offset).toBe(0);
  });

  it("should throw an error if limit is less than 10", () => {
    expect(() => schema.parse({ limit: 9 })).toThrow("Must be >= 10");
  });

  it("should throw an error if limit is greater than 500", () => {
    expect(() => schema.parse({ limit: 501 })).toThrow("Must be <= 500");
  });

  it("should handle floating point numbers by rounding down", () => {
    const result = schema.parse({ offset: 2.7, limit: 15.3 });
    expect(result).toEqual({ offset: 2, limit: 15 });
  });

  it("should pass for edge cases", () => {
    const edgeCases = [
      { offset: 0, limit: 10 },
      { offset: 0, limit: 500 },
      { offset: Number.MAX_SAFE_INTEGER, limit: 10 },
    ];
    edgeCases.forEach((input) => {
      const result = schema.parse(input);
      expect(result).toEqual(input);
      expect(result).not.toHaveProperty("keyword");
    });
  });

  it("should handle undefined keyword by not including it in the result", () => {
    const result = schema.parse({});
    expect(result).not.toHaveProperty("keyword");
  });

  it("should handle empty string keyword", () => {
    const result = schema.parse({ keyword: "" });
    expect(result.keyword).toBe("");
  });

  it("should include keyword when provided", () => {
    const keyword = faker.word.sample();
    const result = schema.parse({ keyword });
    expect(result.keyword).toBe(keyword);
  });
});
