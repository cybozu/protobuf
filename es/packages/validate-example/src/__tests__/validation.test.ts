import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  ScalarsValidators,
  OptionalScalarsValidators,
  RepeatedScalarsValidators,
} from "../gen/validation_cybozu_validate.pb";

describe("validation", () => {
  describe("ScalarsValidators", () => {
    describe("validateFloat", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateFloat("foo");
        });
      });
      it("throws an error when recieve the value >= 3.2", () => {
        assert.throws(() => {
          ScalarsValidators.validateFloat(3.3);
        });
      });
      it("does not throws error when receive the value < 3.2", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateFloat(3.1);
        });
      });
    });

    describe("validateDouble", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateDouble("foo");
        });
      });
      it("throws an error when receive the value <= 3.2", () => {
        assert.throws(() => {
          ScalarsValidators.validateDouble(3.2);
        });
      });
      it("does not throws error when receive the value > 3.2", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateDouble(3.3);
        });
      });
    });

    describe("validateInt32", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateInt32("foo");
        });
      });
      it("throws an error when recieve the value > -3", () => {
        assert.throws(() => {
          ScalarsValidators.validateInt32(-2);
        });
      });
      it("does not throws error when receive the value <= -3", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateInt32(-3);
        });
      });
    });

    describe("validateInt64", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateInt64("foo");
        });
      });
      it("throws an error when recieve the value < 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateInt64(0);
        });
      });
      it("does not throws error when receive the value >= 1", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateInt64(1);
        });
      });
    });

    describe("validateUint32", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint32("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint32(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint32(1);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateUint32(3);
        });
      });
    });

    describe("validateUint64", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint64("foo");
        });
      });
      it("throws an error when recieve the value < 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint64(0);
        });
      });
      it("throws an error when recieve the value > 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateUint64(6);
        });
      });
      it("does not throws error when receive 1 <= value <= 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateUint64(3);
        });
      });
    });

    describe("validateSint32", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint32("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint32(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint32(5);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateSint32(3);
        });
      });
    });

    describe("validateSint64", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint64("foo");
        });
      });
      it("throws an error when recieve the value < 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint64(0);
        });
      });
      it("throws an error when recieve the value > 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateSint64(6);
        });
      });
      it("does not throws error when receive 1 <= value <= 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateSint64(3);
        });
      });
    });

    describe("validateFixed32", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed32("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed32(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed32(5);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateFixed32(3);
        });
      });
    });

    describe("validateFixed64", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed64("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed64(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateFixed64(5);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateFixed64(3);
        });
      });
    });

    describe("validateSfixed32", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed32("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed32(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed32(5);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateSfixed32(3);
        });
      });
    });

    describe("validateSfixed64", () => {
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed64("foo");
        });
      });
      it("throws an error when recieve the value <= 1", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed64(1);
        });
      });
      it("throws an error when recieve the value >= 5", () => {
        assert.throws(() => {
          ScalarsValidators.validateSfixed64(5);
        });
      });
      it("does not throws error when receive 1 < value < 5", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateSfixed64(3);
        });
      });
    });

    describe("validateString", () => {
      it("throws an error when receive non String value", () => {
        assert.throws(() => {
          ScalarsValidators.validateString(3);
        });
      });

      it("throws an error when receive length < 3", () => {
        assert.throws(() => {
          ScalarsValidators.validateString("f");
        });
      });

      it("throws an error when receive length < 3", () => {
        assert.throws(() => {
          // `"𠮟る".length` is 3 but consists of 2 code points.
          // Our validator counts strings by code points.
          ScalarsValidators.validateString("𠮟る");
        });
      });

      it("does not throws error when receive length >= 3", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateString("foo");
        });
      });
    });

    describe("validateBytes", () => {
      it("throws an error when receive non Uint8Array value", () => {
        assert.throws(() => {
          ScalarsValidators.validateBytes("foo");
        });
      });
      it("throws an error when recieve byteLength > 10", () => {
        assert.throws(() => {
          ScalarsValidators.validateBytes(new Uint8Array(11));
        });
      });
      it("does not throws error when receive byteLength <= 10", () => {
        assert.doesNotThrow(() => {
          ScalarsValidators.validateBytes(new Uint8Array(10));
        });
      });
    });
  });

  describe("OptionalScalarsValidators", () => {
    describe("validateFloat", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFloat(null);
        });
      });
      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFloat("foo");
        });
      });
      it("throws an error when recieve the value >= 3.2", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFloat(3.3);
        });
      });
      it("does not throws error when receive the value < 3.2", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFloat(3.1);
        });
      });
    });

    describe("validateDouble", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateDouble(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateDouble("foo");
        });
      });

      it("throws an error when recieve the value <= 3.2", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateDouble(3.1);
        });
      });

      it("does not throws error when receive the value > 3.2", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateDouble(3.3);
        });
      });
    });

    describe("validateInt32", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateInt32(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateInt32("foo");
        });
      });

      it("throws an error when recieve the value > -3", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateInt32(-2);
        });
      });

      it("does not throws error when receive the value <= -3", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateInt32(-3);
        });
      });
    });

    describe("validateInt64", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateInt64(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateInt64("foo");
        });
      });

      it("throws an error when recieve the value < 1", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateInt64(0);
        });
      });

      it("does not throws error when receive the value >= 1", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateInt64(1);
        });
      });
    });

    describe("validateUint32", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateUint32(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateUint32("foo");
        });
      });

      it("throws an error when recieve the value <= 1 or value >= 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateUint32(1);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateUint32(5);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateUint32(3);
        });
      });
    });

    describe("validateUint64", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateUint64(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateUint64("foo");
        });
      });

      it("throws an error when recieve the value < 1 or value > 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateUint64(0);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateUint64(6);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateUint64(3);
        });
      });
    });

    describe("validateSint32", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSint32(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSint32("foo");
        });
      });

      it("throws an error when recieve the value <= 1 or value >= 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSint32(1);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateSint32(5);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSint32(3);
        });
      });
    });

    describe("validateSint64", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSint64(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSint64("foo");
        });
      });

      it("throws an error when recieve the value < 1 or value > 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSint64(0);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateSint64(6);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSint64(3);
        });
      });
    });

    describe("validateFixed32", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFixed32(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed32("foo");
        });
      });

      it("throws an error when recieve the value <= 1 or value >= 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed32(1);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed32(5);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFixed32(3);
        });
      });
    });

    describe("validateFixed64", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFixed64(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed64("foo");
        });
      });

      it("throws an error when recieve the value < 1 or value > 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed64(0);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateFixed64(6);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateFixed64(3);
        });
      });
    });

    describe("validateSfixed32", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSfixed32(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed32("foo");
        });
      });

      it("throws an error when recieve the value <= 1 or value >= 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed32(1);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed32(5);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSfixed32(3);
        });
      });
    });

    describe("validateSfixed64", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSfixed64(null);
        });
      });

      it("throws an error when receive non number value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed64("foo");
        });
      });

      it("throws an error when recieve the value < 1 or value > 5", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed64(0);
        });
        assert.throws(() => {
          OptionalScalarsValidators.validateSfixed64(6);
        });
      });

      it("does not throws error when receive the value between 1 and 5", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateSfixed64(3);
        });
      });
    });

    describe("validateString", () => {
      it("throws an error when receive non String value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateString(3);
        });
      });

      it("throws an error when receive length < 3", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateString("f");
        });
      });

      it("throws an error when receive length < 3", () => {
        assert.throws(() => {
          // `"𠮟る".length` is 3 but consists of 2 code points.
          // Our validator counts strings by code points.
          OptionalScalarsValidators.validateString("𠮟る");
        });
      });

      it("does not throws error when receive null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateString(null);
        });
      });

      it("does not throws error when receive length >= 3", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateString("foo");
        });
      });
    });

    describe("validateBytes", () => {
      it("does not throw an error when value is null", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateBytes(null);
        });
      });
      it("throws an error when receive non Uint8Array value", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateBytes("foo");
        });
      });
      it("throws an error when recieve byteLength > 10", () => {
        assert.throws(() => {
          OptionalScalarsValidators.validateBytes(new Uint8Array(11));
        });
      });
      it("does not throws error when receive byteLength <= 10", () => {
        assert.doesNotThrow(() => {
          OptionalScalarsValidators.validateBytes(new Uint8Array(10));
        });
      });
    });
  });

  describe("RepeatedScalarsValidators", () => {
    describe("validateFloat", () => {
      it("throws an error when value is not an array", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateFloat("not an array");
        });
      });

      it("throws an error when array length is less than 1", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateFloat([]);
        });
      });

      it("throws an error when array items are not numbers", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateFloat([1, 2, "three"]);
        });
      });

      it("throws an error when array items are greater than or equal to 3.200000047683716", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateFloat([1, 2, 3.200000047683716]);
        });
      });

      it("does not throw an error for valid arrays", () => {
        assert.doesNotThrow(() => {
          RepeatedScalarsValidators.validateFloat([1, 2, 3.2]);
        });
      });
    });

    describe("validateDouble", () => {
      it("throws an error when value is not an array", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateDouble("not an array");
        });
      });

      it("throws an error when array length is more than 3", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateDouble([1, 2, 3, 4]);
        });
      });

      it("throws an error when array items are not numbers", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateDouble([1, 2, "three"]);
        });
      });

      it("throws an error when array items are less than or equal to 3.2", () => {
        assert.throws(() => {
          RepeatedScalarsValidators.validateDouble([1, 2, 3.2]);
        });
      });

      it("does not throw an error for valid arrays", () => {
        assert.doesNotThrow(() => {
          RepeatedScalarsValidators.validateDouble([3.3, 3.4, 3.5]);
        });
      });
    });

    describe.skip("validateString", () => {
      // TODO: add test for validate string
    });
  });
});
