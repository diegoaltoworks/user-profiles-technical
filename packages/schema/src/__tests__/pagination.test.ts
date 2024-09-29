import { faker } from "@faker-js/faker";
import { paginationSchema as schema } from "../pagination";

describe("paginationSchema", () => {
  it("should return default values when no input is provided", () => {
    const result = schema.parse({});
    expect(result).toEqual({ curPage: 1, perPage: 10 });
  });

  it("should parse valid values for curPage and perPage", () => {
    const curPage = faker.number.int({ min: 1, max: 100 });
    const perPage = faker.number.int({ min: 10, max: 500 });
    const result = schema.parse({
      curPage: curPage.toString(),
      perPage: perPage.toString(),
    });
    expect(result).toEqual({ curPage, perPage });
  });

  it("should coerce string values to numbers", () => {
    const result = schema.parse({ curPage: "3", perPage: "100" });
    expect(result).toEqual({ curPage: 3, perPage: 100 });
  });

  it("should apply the default value for curPage if it is missing", () => {
    const perPage = faker.number.int({ min: 10, max: 500 });
    const result = schema.parse({ perPage: perPage.toString() });
    expect(result.curPage).toBe(1);
    expect(result.perPage).toBe(perPage);
  });

  it("should apply the default value for perPage if it is missing", () => {
    const curPage = faker.number.int({ min: 1, max: 100 });
    const result = schema.parse({ curPage: curPage.toString() });
    expect(result.curPage).toBe(curPage);
    expect(result.perPage).toBe(10);
  });

  it("should throw an error if curPage is less than 1", () => {
    expect(() => schema.parse({ curPage: 0 })).toThrow("Must be >= 1");
  });

  it("should throw an error if perPage is less than 10", () => {
    expect(() => schema.parse({ perPage: 9 })).toThrow("Must be >= 10");
  });

  it("should throw an error if perPage is greater than 500", () => {
    expect(() => schema.parse({ perPage: 501 })).toThrow("Must be <= 50");
  });

  it("should throw an error if curPage is not a number", () => {
    expect(() => schema.parse({ curPage: "invalid" })).toThrow();
  });

  it("should throw an error if perPage is not a number", () => {
    expect(() => schema.parse({ perPage: "invalid" })).toThrow();
  });

  it("should handle floating point numbers by rounding down", () => {
    const result = schema.parse({ curPage: 2.7, perPage: 15.3 });
    expect(result).toEqual({ curPage: 2, perPage: 15 });
  });

  it("should pass for edge cases", () => {
    const edgeCases = [
      { curPage: 1, perPage: 10 },
      { curPage: 1, perPage: 500 },
      { curPage: Number.MAX_SAFE_INTEGER, perPage: 10 },
    ];
    edgeCases.forEach((input) => {
      expect(() => schema.parse(input)).not.toThrow();
    });
  });
});
