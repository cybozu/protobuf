import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { ScalarsValidators } from "../gen/validation_cybozu_validate.pb";

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
});
