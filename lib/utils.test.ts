import { test, expect, it } from "vitest";
import { welcomeMessage,convertToNestedObject } from "./utils";

test("utils", () => {
  it("should return a welcome message", () => {
    expect(welcomeMessage("John")).toBe("Hello John, Welcome to PBandJ!");
  });
});
test('convertToNestedObject', () => {
  const before = {
    'vendor.name': 'Vendor Name',
    'vendor.slug': 'Vendor Slug',
    'role': 'editor'
  };

  const after = convertToNestedObject(before);
  expect(after).toEqual({
    vendor: {
      name: 'Vendor Name',
      slug: 'Vendor Slug'
    },
    role: 'editor'
  });
});
