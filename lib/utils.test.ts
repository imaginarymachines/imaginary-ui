import { test, expect, it } from "vitest";
import { TFields } from "./Fields";
import {
  validator,
  welcomeMessage,
  convertToNestedObject,
  collectFieldValues,
  collectFieldRules,
} from "./utils";

test("utils", () => {
  it("should return a welcome message", () => {
    expect(welcomeMessage("John")).toBe("Hello John, Welcome to PBandJ!");
  });
});
test("convertToNestedObject", () => {
  const before = {
    "vendor.name": "Vendor Name",
    "vendor.slug": "Vendor Slug",
    role: "editor",
  };

  const after = convertToNestedObject(before);
  expect(after).toEqual({
    vendor: {
      name: "Vendor Name",
      slug: "Vendor Slug",
    },
    role: "editor",
  });
});
const fields: TFields = [
  {
    id: "field-1",
    type: "text",
    label: "Field 1",
    name: "field_1",
    required: true,
    rules: "required",
    fieldType: "input",
  },
  {
    id: "field-2",
    type: "text",
    label: "Field 2",
    name: "field_2",
    defaultValue: "trover",
    required: true,
    rules: "required|lowercase",
  },
  {
    id: "email",
    type: "email",
    label: "Field 3",
    name: "email",
    required: true,
    rules: "email",
  },
];
test("collectFieldRules", () => {
  const rules = collectFieldRules(fields);
  expect(rules).toEqual({
    field_1: "required",
    field_2: "required|lowercase",
    email: "email|required",
  });
});

test("collectFieldValues uses default", () => {
  const allValues = {
    field_1: "Field 1",
    email: "test@name.com",
    spatula: "city",
  };
  const values = collectFieldValues(fields, allValues);

  expect(values).toEqual({
    field_1: "Field 1",
    field_2: "trover",
    email: "test@name.com",
  });
});

test("validator no value for required makes error", () => {
  const allValues = {
    field_1: "Field 1",
  };
  const rules = collectFieldRules(fields);
  //rules[email] = 'required|email'
  expect(rules.email).toEqual("email|required");
  const values = collectFieldValues(fields, allValues);

  const { isValid, errors } = validator(values, rules);

  //has errors[email]
  expect(errors.email).toBeTruthy();
  expect(isValid).toBeFalsy();
});
