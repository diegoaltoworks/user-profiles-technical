import { userSchema } from "..";

describe("@repo/schema", () => {
  it("throws error", () => {
    expect(() => {
      userSchema.parse({});
    }).toThrow();
  });
  it("accepts valid name", () => {
    expect(() => {
      userSchema.parse({ name: "diego" });
    }).not.toThrow();
  });
});
