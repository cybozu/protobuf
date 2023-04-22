import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("validation", () => {
  describe("examples.Scalars", () => {
    describe("validateFloat", () => {
      test("test", () => {
        assert("foo" === "foo");
      });
    });
  });
});
