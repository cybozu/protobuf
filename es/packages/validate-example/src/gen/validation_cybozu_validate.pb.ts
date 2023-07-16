import {
  Composed,
  Enums,
  Enums_Enum,
  Maps,
  Nested,
  Oneofs,
  OptionalScalars,
  RepeatedScalars,
  Scalars,
  Strings,
} from "./validation_pb.js";

function allFailed(...validators: Array<() => void>) {
  function throws(validator: () => void) {
    let failed = false;
    try {
      validator();
    } catch {
      failed = true;
    }
    return failed;
  }
  return validators.every(throws);
}

function someFailed(...validators: Array<() => void>) {
  function throws(validator: () => void) {
    let failed = false;
    try {
      validator();
    } catch {
      failed = true;
    }
    return failed;
  }
  return validators.some(throws);
}
type CybozuValidateValueType =
  | "boolean"
  | "number"
  | "string"
  | "object"
  | "array"
  | "null"
  | "bigint"
  | "function"
  | "symbol"
  | "undefined"
  | "uint8array";

class CybozuValidateTypeError extends Error {
  name = "CybozuValidateTypeError";
  constructor(
    public expected: CybozuValidateValueType,
    public actual: CybozuValidateValueType
  ) {
    const message = `Expected ${expected} but got ${actual}`;
    super(message);
  }
}

class CybozuValidateItemsRuleError extends Error {
  name = "CybozuValidateItemsRuleError";

  constructor(
    public expected: {
      maxItems?: number;
      minItems?: number;
    },
    public actual: Array<unknown>
  ) {
    super("expected " + JSON.stringify(expected) + ", but got " + actual);
  }
}
/**
 * All scalar types can have constraint rules except for bools.
 *
 * @generated from message examples.Scalars
 */
export const ScalarsValidators: {
  /**
   * @generated from field: float float = 1;
   */
  validateFloat: (value: unknown) => asserts value is Scalars["float"];
  /**
   * @generated from field: double double = 2;
   */
  validateDouble: (value: unknown) => asserts value is Scalars["double"];
  /**
   * @generated from field: int32 int32 = 3;
   */
  validateInt32: (value: unknown) => asserts value is Scalars["int32"];
  /**
   * @generated from field: int64 int64 = 4;
   */
  validateInt64: (value: unknown) => asserts value is Scalars["int64"];
  /**
   * @generated from field: uint32 uint32 = 5;
   */
  validateUint32: (value: unknown) => asserts value is Scalars["uint32"];
  /**
   * @generated from field: uint64 uint64 = 6;
   */
  validateUint64: (value: unknown) => asserts value is Scalars["uint64"];
  /**
   * @generated from field: sint32 sint32 = 7;
   */
  validateSint32: (value: unknown) => asserts value is Scalars["sint32"];
  /**
   * @generated from field: sint64 sint64 = 8;
   */
  validateSint64: (value: unknown) => asserts value is Scalars["sint64"];
  /**
   * @generated from field: fixed32 fixed32 = 9;
   */
  validateFixed32: (value: unknown) => asserts value is Scalars["fixed32"];
  /**
   * @generated from field: fixed64 fixed64 = 10;
   */
  validateFixed64: (value: unknown) => asserts value is Scalars["fixed64"];
  /**
   * @generated from field: sfixed32 sfixed32 = 11;
   */
  validateSfixed32: (value: unknown) => asserts value is Scalars["sfixed32"];
  /**
   * @generated from field: sfixed64 sfixed64 = 12;
   */
  validateSfixed64: (value: unknown) => asserts value is Scalars["sfixed64"];
  /**
   * @generated from field: string string = 14;
   */
  validateString: (value: unknown) => asserts value is Scalars["string"];
  /**
   * @generated from field: bytes bytes = 15;
   */
  validateBytes: (value: unknown) => asserts value is Scalars["bytes"];
} = {
  /**
   * @generated from field: float float = 1;
   */
  validateFloat(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value >= 3.200000047683716) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: double double = 2;
   */
  validateDouble(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 3.2) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: int32 int32 = 3;
   */
  validateInt32(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value > -3) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: int64 int64 = 4;
   */
  validateInt64(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: uint32 uint32 = 5;
   */
  validateUint32(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: uint64 uint64 = 6;
   */
  validateUint64(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: sint32 sint32 = 7;
   */
  validateSint32(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: sint64 sint64 = 8;
   */
  validateSint64(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: fixed32 fixed32 = 9;
   */
  validateFixed32(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: fixed64 fixed64 = 10;
   */
  validateFixed64(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: sfixed32 sfixed32 = 11;
   */
  validateSfixed32(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: sfixed64 sfixed64 = 12;
   */
  validateSfixed64(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: string string = 14;
   */
  validateString(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
    if (value === "") {
      return;
    }
    if ([...value].length < 3) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: bytes bytes = 15;
   */
  validateBytes(value) {
    if (!(value instanceof Uint8Array)) {
      throw new CybozuValidateTypeError("uint8array", typeof value);
    }
    if (value.byteLength > 10) {
      // TODO: improve error message
      throw new Error("");
    }
  },
};

/**
 * rules for optional fields are enforced only if the field is set.
 *
 * @generated from message examples.OptionalScalars
 */
export const OptionalScalarsValidators: {
  /**
   * @generated from field: optional float float = 1;
   */
  validateFloat: (value: unknown) => asserts value is OptionalScalars["float"];
  /**
   * @generated from field: optional double double = 2;
   */
  validateDouble: (
    value: unknown
  ) => asserts value is OptionalScalars["double"];
  /**
   * @generated from field: optional int32 int32 = 3;
   */
  validateInt32: (value: unknown) => asserts value is OptionalScalars["int32"];
  /**
   * @generated from field: optional int64 int64 = 4;
   */
  validateInt64: (value: unknown) => asserts value is OptionalScalars["int64"];
  /**
   * @generated from field: optional uint32 uint32 = 5;
   */
  validateUint32: (
    value: unknown
  ) => asserts value is OptionalScalars["uint32"];
  /**
   * @generated from field: optional uint64 uint64 = 6;
   */
  validateUint64: (
    value: unknown
  ) => asserts value is OptionalScalars["uint64"];
  /**
   * @generated from field: optional sint32 sint32 = 7;
   */
  validateSint32: (
    value: unknown
  ) => asserts value is OptionalScalars["sint32"];
  /**
   * @generated from field: optional sint64 sint64 = 8;
   */
  validateSint64: (
    value: unknown
  ) => asserts value is OptionalScalars["sint64"];
  /**
   * @generated from field: optional fixed32 fixed32 = 9;
   */
  validateFixed32: (
    value: unknown
  ) => asserts value is OptionalScalars["fixed32"];
  /**
   * @generated from field: optional fixed64 fixed64 = 10;
   */
  validateFixed64: (
    value: unknown
  ) => asserts value is OptionalScalars["fixed64"];
  /**
   * @generated from field: optional sfixed32 sfixed32 = 11;
   */
  validateSfixed32: (
    value: unknown
  ) => asserts value is OptionalScalars["sfixed32"];
  /**
   * @generated from field: optional sfixed64 sfixed64 = 12;
   */
  validateSfixed64: (
    value: unknown
  ) => asserts value is OptionalScalars["sfixed64"];
  /**
   * @generated from field: optional string string = 14;
   */
  validateString: (
    value: unknown
  ) => asserts value is OptionalScalars["string"];
  /**
   * @generated from field: optional bytes bytes = 15;
   */
  validateBytes: (value: unknown) => asserts value is OptionalScalars["bytes"];
} = {
  /**
   * @generated from field: optional float float = 1;
   */
  validateFloat(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value >= 3.200000047683716) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional double double = 2;
   */
  validateDouble(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 3.2) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional int32 int32 = 3;
   */
  validateInt32(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value > -3) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional int64 int64 = 4;
   */
  validateInt64(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional uint32 uint32 = 5;
   */
  validateUint32(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional uint64 uint64 = 6;
   */
  validateUint64(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional sint32 sint32 = 7;
   */
  validateSint32(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional sint64 sint64 = 8;
   */
  validateSint64(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional fixed32 fixed32 = 9;
   */
  validateFixed32(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional fixed64 fixed64 = 10;
   */
  validateFixed64(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional sfixed32 sfixed32 = 11;
   */
  validateSfixed32(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 1 || value >= 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional sfixed64 sfixed64 = 12;
   */
  validateSfixed64(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value < 1 || value > 5) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional string string = 14;
   */
  validateString(value) {
    if (value == null) {
      return;
    }
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
    if (value === "") {
      return;
    }
    if ([...value].length < 3) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * @generated from field: optional bytes bytes = 15;
   */
  validateBytes(value) {
    if (value == null) {
      return;
    }
    if (!(value instanceof Uint8Array)) {
      throw new CybozuValidateTypeError("uint8array", typeof value);
    }
    if (value.byteLength > 10) {
      // TODO: improve error message
      throw new Error("");
    }
  },
};

/**
 * @generated from message examples.RepeatedScalars
 */
export const RepeatedScalarsValidators: {
  /**
   * a repeated field can specify `repeated` constraints like this
   *
   * @generated from field: repeated float float = 1;
   */
  validateFloat: (value: unknown) => asserts value is RepeatedScalars["float"];
  /**
   * or this
   *
   * @generated from field: repeated double double = 2;
   */
  validateDouble: (
    value: unknown
  ) => asserts value is RepeatedScalars["double"];
  /**
   * or this.
   *
   * @generated from field: repeated string string = 3;
   */
  validateString: (
    value: unknown
  ) => asserts value is RepeatedScalars["string"];
} = {
  /**
   * a repeated field can specify `repeated` constraints like this
   *
   * @generated from field: repeated float float = 1;
   */
  validateFloat(value) {
    if (!Array.isArray(value)) {
      throw new CybozuValidateTypeError("array", typeof value);
    }
    if (value.length < 1) {
      throw new CybozuValidateItemsRuleError({ minItems: 1 }, value);
    }
    for (const item of value) {
      if (typeof item !== "number") {
        throw new CybozuValidateTypeError("number", typeof item);
      }
      if (item >= 3.200000047683716) {
        // TODO: improve error message
        throw new Error("");
      }
    }
  },
  /**
   * or this
   *
   * @generated from field: repeated double double = 2;
   */
  validateDouble(value) {
    if (!Array.isArray(value)) {
      throw new CybozuValidateTypeError("array", typeof value);
    }
    if (value.length > 3) {
      throw new CybozuValidateItemsRuleError({ maxItems: 3 }, value);
    }
    for (const item of value) {
      if (typeof item !== "number") {
        throw new CybozuValidateTypeError("number", typeof item);
      }
      if (item <= 3.2) {
        // TODO: improve error message
        throw new Error("");
      }
    }
  },
  /**
   * or this.
   *
   * @generated from field: repeated string string = 3;
   */
  validateString(value) {
    if (!Array.isArray(value)) {
      throw new CybozuValidateTypeError("array", typeof value);
    }
    if (value.length < 2) {
      throw new CybozuValidateItemsRuleError({ minItems: 2 }, value);
    }
  },
};

/**
 * Strings have the richest set of constraint rules.
 *
 * @generated from message examples.Strings
 */
export const StringsValidators: {
  /**
   * normalize into the NFD form.
   *
   * @generated from field: string s2 = 2;
   */
  validateS2: (value: unknown) => asserts value is Strings["s2"];
  /**
   * enforce the minimum length of the string if the string is NOT empty.
   * This check is done after NFC normalization.
   *
   * @generated from field: string s3 = 3;
   */
  validateS3: (value: unknown) => asserts value is Strings["s3"];
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s4 = 4;
   */
  validateS4: (value: unknown) => asserts value is Strings["s4"];
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s5 = 5;
   */
  validateS5: (value: unknown) => asserts value is Strings["s5"];
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s6 = 6;
   */
  validateS6: (value: unknown) => asserts value is Strings["s6"];
  /**
   * enforce that the string matches a regular expresson. The regular expression syntax is RE2.
   * See https://github.com/google/re2/wiki/Syntax
   *
   * @generated from field: string s7 = 7;
   */
  validateS7: (value: unknown) => asserts value is Strings["s7"];
  /**
   * enforce that the string is a valid email address as defined in RFC 5322.
   *
   * @generated from field: string s8 = 8;
   */
  validateS8: (value: unknown) => asserts value is Strings["s8"];
  /**
   * enforce that the string is a valid URI as defined in RFC 3986.
   * The string will also be canonicalized.
   *
   * @generated from field: string s9 = 9;
   */
  validateS9: (value: unknown) => asserts value is Strings["s9"];
  /**
   * enforce that the string is a valid telephone number as defined by E.164.
   * An example is "+81-80-0000-0000".
   *
   * @generated from field: string s10 = 10;
   */
  validateS10: (value: unknown) => asserts value is Strings["s10"];
} = {
  /**
   * normalize into the NFD form.
   *
   * @generated from field: string s2 = 2;
   */
  validateS2(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * enforce the minimum length of the string if the string is NOT empty.
   * This check is done after NFC normalization.
   *
   * @generated from field: string s3 = 3;
   */
  validateS3(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
    if (value === "") {
      return;
    }
    if ([...value].length < 10) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s4 = 4;
   */
  validateS4(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s5 = 5;
   */
  validateS5(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s6 = 6;
   */
  validateS6(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * enforce that the string matches a regular expresson. The regular expression syntax is RE2.
   * See https://github.com/google/re2/wiki/Syntax
   *
   * @generated from field: string s7 = 7;
   */
  validateS7(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * enforce that the string is a valid email address as defined in RFC 5322.
   *
   * @generated from field: string s8 = 8;
   */
  validateS8(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * enforce that the string is a valid URI as defined in RFC 3986.
   * The string will also be canonicalized.
   *
   * @generated from field: string s9 = 9;
   */
  validateS9(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
  /**
   * enforce that the string is a valid telephone number as defined by E.164.
   * An example is "+81-80-0000-0000".
   *
   * @generated from field: string s10 = 10;
   */
  validateS10(value) {
    if (typeof value !== "string") {
      throw new CybozuValidateTypeError("string", typeof value);
    }
  },
};

/**
 * In addition to the validation code generated from the protobuf options,
 * this message implements a custom validation. See `example_custom.go`
 * in the same directory.
 *
 * @generated from message examples.Maps
 */
export const MapsValidators: {
  /**
   * you can put a constraint for map and a constraint for the value type as follows.
   *
   * @generated from field: map<string, int32> map1 = 1;
   */
  validateMap1: (value: unknown) => asserts value is Maps["map1"];
  /**
   * or either one of them. The following enforces that the timestamp is set.
   *
   * @generated from field: map<string, google.protobuf.Timestamp> map2 = 2;
   */
  validateMap2: (value: unknown) => asserts value is Maps["map2"];
} = {
  /**
   * you can put a constraint for map and a constraint for the value type as follows.
   *
   * @generated from field: map<string, int32> map1 = 1;
   */
  validateMap1(value) {
    if (typeof value !== "object" || value === null) {
      // TODO: improve error message
      throw new Error("");
    }
    if (Object.keys(value).length < 1) {
      // TODO: improve error message
      throw new Error("");
    }
    for (const v of Object.values(value)) {
      if (typeof v !== "number") {
        throw new CybozuValidateTypeError("number", typeof v);
      }
      if (v <= 3) {
        // TODO: improve error message
        throw new Error("");
      }
    }
  },
  /**
   * or either one of them. The following enforces that the timestamp is set.
   *
   * @generated from field: map<string, google.protobuf.Timestamp> map2 = 2;
   */
  validateMap2(value) {
    if (typeof value !== "object" || value === null) {
      // TODO: improve error message
      throw new Error("");
    }
    for (const v of Object.values(value)) {
      // TODO: implement message
    }
  },
};

/**
 * @generated from message examples.Enums
 */
export const EnumsValidators: {
  /**
   * enforces that `e1` is not the zero value.
   *
   * @generated from field: examples.Enums.Enum e1 = 1;
   */
  validateE1: (value: unknown) => asserts value is Enums["e1"];
  /**
   * enforces that `e2` is one of the defined enum value.
   *
   * @generated from field: examples.Enums.Enum e2 = 2;
   */
  validateE2: (value: unknown) => asserts value is Enums["e2"];
  /**
   * enforces that `e3` is one of the defined enum value other than zero.
   *
   * @generated from field: repeated examples.Enums.Enum e3 = 3;
   */
  validateE3: (value: unknown) => asserts value is Enums["e3"];
  /**
   * enforces that `e4` is, if given, one of the defined enum value other than zero.
   *
   * @generated from field: optional examples.Enums.Enum e4 = 4;
   */
  validateE4: (value: unknown) => asserts value is Enums["e4"];
} = {
  /**
   * enforces that `e1` is not the zero value.
   *
   * @generated from field: examples.Enums.Enum e1 = 1;
   */
  validateE1(value) {
    if (value === 0) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * enforces that `e2` is one of the defined enum value.
   *
   * @generated from field: examples.Enums.Enum e2 = 2;
   */
  validateE2(value) {
    if (typeof value !== "number" || !Enums_Enum[value]) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * enforces that `e3` is one of the defined enum value other than zero.
   *
   * @generated from field: repeated examples.Enums.Enum e3 = 3;
   */
  validateE3(value) {
    if (!Array.isArray(value)) {
      throw new CybozuValidateTypeError("array", typeof value);
    }
    if (value.length < 2) {
      throw new CybozuValidateItemsRuleError({ minItems: 2 }, value);
    }
    for (const item of value) {
      if (item === 0) {
        // TODO: improve error message
        throw new Error("");
      }
    }
  },
  /**
   * enforces that `e4` is, if given, one of the defined enum value other than zero.
   *
   * @generated from field: optional examples.Enums.Enum e4 = 4;
   */
  validateE4(value) {
    if (value == null) {
      return;
    }
    if (value === 0) {
      // TODO: improve error message
      throw new Error("");
    }
    if (typeof value !== "number" || !Enums_Enum[value]) {
      // TODO: improve error message
      throw new Error("");
    }
  },
};

/**
 * @generated from message examples.Oneofs
 */
export const OneofsValidators: {
  /**
   * @generated from oneof examples.Oneofs.o1
   */
  validateO1: (value: unknown) => asserts value is Oneofs["o1"]["value"];
  /**
   * @generated from oneof examples.Oneofs.o2
   */
  validateO2: (value: unknown) => asserts value is Oneofs["o2"]["value"];
} = {
  /**
   * @generated from oneof examples.Oneofs.o1
   */
  validateO1(value) {
    if (value == null) {
      return;
    }
    const validateInt32 = (value: unknown) => {
      if (typeof value !== "number") {
        throw new CybozuValidateTypeError("number", typeof value);
      }
      if (value > -3) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    const validateString = (value: unknown) => {
      if (typeof value !== "string") {
        throw new CybozuValidateTypeError("string", typeof value);
      }
    };
    if (
      allFailed(
        // @ts-ignore
        () => validateInt32(value),
        // @ts-ignore
        () => validateString(value)
      )
    ) {
      throw new Error("// TODO: improve error message");
    }
  },
  /**
   * @generated from oneof examples.Oneofs.o2
   */
  validateO2(value) {
    if (value == null) {
      return;
    }
    const validateTs = (value: unknown) => {
      if (typeof value !== "object" || value === null) {
        // TODO: improve error mesage
        throw new Error("");
      }
      const validateSeconds = (value: unknown) => {
        if (typeof value !== "number") {
          throw new CybozuValidateTypeError("number", typeof value);
        }
      };
      const validateNanos = (value: unknown) => {
        if (typeof value !== "number") {
          throw new CybozuValidateTypeError("number", typeof value);
        }
      };
      if (
        someFailed(
          // @ts-ignore
          () => validateSeconds(value["seconds"]),
          // @ts-ignore
          () => validateNanos(value["nanos"])
        )
      ) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    const validateBool = (value: unknown) => {
      if (typeof value !== "boolean") {
        throw new CybozuValidateTypeError("boolean", typeof value);
      }
    };
    if (
      allFailed(
        // @ts-ignore
        () => validateTs(value),
        // @ts-ignore
        () => validateBool(value)
      )
    ) {
      throw new Error("// TODO: improve error message");
    }
  },
};

/**
 * message type fields are normalized/validated recursively.
 *
 * @generated from message examples.Composed
 */
export const ComposedValidators: {
  /**
   * enforces that `ignored` is set.
   *
   * @generated from field: examples.Ignored ignored = 1;
   */
  validateIgnored: (value: unknown) => asserts value is Composed["ignored"];
  /**
   * enforces that all messages in `enums` are set.
   *
   * @generated from field: repeated examples.Enums enums = 4;
   */
  validateEnums: (value: unknown) => asserts value is Composed["enums"];
} = {
  /**
   * enforces that `ignored` is set.
   *
   * @generated from field: examples.Ignored ignored = 1;
   */
  validateIgnored(value) {
    if (typeof value !== "object" || value === null) {
      // TODO: improve error mesage
      throw new Error("");
    }
    const validateFoo = (value: unknown) => {
      if (typeof value !== "string") {
        throw new CybozuValidateTypeError("string", typeof value);
      }
    };
    const validateBar = (value: unknown) => {
      if (typeof value !== "number") {
        throw new CybozuValidateTypeError("number", typeof value);
      }
      if (value >= 100) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    if (
      someFailed(
        // @ts-ignore
        () => validateFoo(value["foo"]),
        // @ts-ignore
        () => validateBar(value["bar"])
      )
    ) {
      // TODO: improve error message
      throw new Error("");
    }
  },
  /**
   * enforces that all messages in `enums` are set.
   *
   * @generated from field: repeated examples.Enums enums = 4;
   */
  validateEnums(value) {
    if (typeof value !== "object" || value === null) {
      // TODO: improve error mesage
      throw new Error("");
    }
    const validateE1 = (value: unknown) => {
      if (value === 0) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    const validateE2 = (value: unknown) => {
      if (typeof value !== "number" || !Enums_Enum[value]) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    const validateE3 = (value: unknown) => {
      if (!Array.isArray(value)) {
        throw new CybozuValidateTypeError("array", typeof value);
      }
      if (value.length < 2) {
        throw new CybozuValidateItemsRuleError({ minItems: 2 }, value);
      }
      for (const item of value) {
        if (item === 0) {
          // TODO: improve error message
          throw new Error("");
        }
      }
    };
    const validateE4 = (value: unknown) => {
      if (value == null) {
        return;
      }
      if (value === 0) {
        // TODO: improve error message
        throw new Error("");
      }
      if (typeof value !== "number" || !Enums_Enum[value]) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    if (
      someFailed(
        // @ts-ignore
        () => validateE1(value["e1"]),
        // @ts-ignore
        () => validateE2(value["e2"]),
        // @ts-ignore
        () => validateE3(value["e3"]),
        // @ts-ignore
        () => validateE4(value["e4"])
      )
    ) {
      // TODO: improve error message
      throw new Error("");
    }
  },
};

/**
 * @generated from message examples.Nested
 */
export const NestedValidators: {
  /**
   * @generated from field: examples.Nested.Inner inner = 1;
   */
  validateInner: (value: unknown) => asserts value is Nested["inner"];
} = {
  /**
   * @generated from field: examples.Nested.Inner inner = 1;
   */
  validateInner(value) {
    if (typeof value !== "object" || value === null) {
      // TODO: improve error mesage
      throw new Error("");
    }
    const validateInt32 = (value: unknown) => {
      if (typeof value !== "number") {
        throw new CybozuValidateTypeError("number", typeof value);
      }
      if (value <= 3) {
        // TODO: improve error message
        throw new Error("");
      }
    };
    if (
      someFailed(
        // @ts-ignore
        () => validateInt32(value["int32"])
      )
    ) {
      // TODO: improve error message
      throw new Error("");
    }
  },
};
