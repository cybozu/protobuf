import { Composed, Enums, Maps, Nested, Oneofs, OptionalScalars, RepeatedScalars, Scalars, Strings } from "./validation_pb.js";

/**
 * This message is marked ignored, so no validation method is generated.
 *
 * @generated from message examples.Ignored
 */
export const IgnoredValidators = {
}

/**
 * All scalar types can have constraint rules except for bools.
 *
 * @generated from message examples.Scalars
 */
export const ScalarsValidators = {
  /**
   * @generated from field: float float = 1;
   */
  validateFloat(value: unknown): asserts value is Scalars["float"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: double double = 2;
   */
  validateDouble(value: unknown): asserts value is Scalars["double"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: int32 int32 = 3;
   */
  validateInt32(value: unknown): asserts value is Scalars["int32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: int64 int64 = 4;
   */
  validateInt64(value: unknown): asserts value is Scalars["int64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: uint32 uint32 = 5;
   */
  validateUint32(value: unknown): asserts value is Scalars["uint32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: uint64 uint64 = 6;
   */
  validateUint64(value: unknown): asserts value is Scalars["uint64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: sint32 sint32 = 7;
   */
  validateSint32(value: unknown): asserts value is Scalars["sint32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: sint64 sint64 = 8;
   */
  validateSint64(value: unknown): asserts value is Scalars["sint64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: fixed32 fixed32 = 9;
   */
  validateFixed32(value: unknown): asserts value is Scalars["fixed32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: fixed64 fixed64 = 10;
   */
  validateFixed64(value: unknown): asserts value is Scalars["fixed64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: sfixed32 sfixed32 = 11;
   */
  validateSfixed32(value: unknown): asserts value is Scalars["sfixed32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: sfixed64 sfixed64 = 12;
   */
  validateSfixed64(value: unknown): asserts value is Scalars["sfixed64"] {
    // TODO: implement scalar
  },
  /**
   * no available rules for bools
   *
   * @generated from field: bool bool = 13;
   */
  validateBool(value: unknown): asserts value is Scalars["bool"] {
  },
  /**
   * @generated from field: string string = 14;
   */
  validateString(value: unknown): asserts value is Scalars["string"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: bytes bytes = 15;
   */
  validateBytes(value: unknown): asserts value is Scalars["bytes"] {
    // TODO: implement scalar
  },
}

/**
 * rules for optional fields are enforced only if the field is set.
 *
 * @generated from message examples.OptionalScalars
 */
export const OptionalScalarsValidators = {
  /**
   * @generated from field: optional float float = 1;
   */
  validateFloat(value: unknown): asserts value is OptionalScalars["float"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional double double = 2;
   */
  validateDouble(value: unknown): asserts value is OptionalScalars["double"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional int32 int32 = 3;
   */
  validateInt32(value: unknown): asserts value is OptionalScalars["int32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional int64 int64 = 4;
   */
  validateInt64(value: unknown): asserts value is OptionalScalars["int64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional uint32 uint32 = 5;
   */
  validateUint32(value: unknown): asserts value is OptionalScalars["uint32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional uint64 uint64 = 6;
   */
  validateUint64(value: unknown): asserts value is OptionalScalars["uint64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional sint32 sint32 = 7;
   */
  validateSint32(value: unknown): asserts value is OptionalScalars["sint32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional sint64 sint64 = 8;
   */
  validateSint64(value: unknown): asserts value is OptionalScalars["sint64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional fixed32 fixed32 = 9;
   */
  validateFixed32(value: unknown): asserts value is OptionalScalars["fixed32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional fixed64 fixed64 = 10;
   */
  validateFixed64(value: unknown): asserts value is OptionalScalars["fixed64"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional sfixed32 sfixed32 = 11;
   */
  validateSfixed32(value: unknown): asserts value is OptionalScalars["sfixed32"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional sfixed64 sfixed64 = 12;
   */
  validateSfixed64(value: unknown): asserts value is OptionalScalars["sfixed64"] {
    // TODO: implement scalar
  },
  /**
   * no available rules for bool
   *
   * @generated from field: optional bool bool = 13;
   */
  validateBool(value: unknown): asserts value is OptionalScalars["bool"] {
  },
  /**
   * @generated from field: optional string string = 14;
   */
  validateString(value: unknown): asserts value is OptionalScalars["string"] {
    // TODO: implement scalar
  },
  /**
   * @generated from field: optional bytes bytes = 15;
   */
  validateBytes(value: unknown): asserts value is OptionalScalars["bytes"] {
    // TODO: implement scalar
  },
}

/**
 * @generated from message examples.RepeatedScalars
 */
export const RepeatedScalarsValidators = {
  /**
   * a repeated field can specify `repeated` constraints like this
   *
   * @generated from field: repeated float float = 1;
   */
  validateFloat(value: unknown): asserts value is RepeatedScalars["float"] {
    // TODO: implement scalar
  },
  /**
   * or this
   *
   * @generated from field: repeated double double = 2;
   */
  validateDouble(value: unknown): asserts value is RepeatedScalars["double"] {
    // TODO: implement scalar
  },
  /**
   * or this.
   *
   * @generated from field: repeated string string = 3;
   */
  validateString(value: unknown): asserts value is RepeatedScalars["string"] {
    // TODO: implement scalar
  },
}

/**
 * Strings have the richest set of constraint rules.
 *
 * @generated from message examples.Strings
 */
export const StringsValidators = {
  /**
   * NFC normalization is applied if no options are given.
   *
   * @generated from field: string s1 = 1;
   */
  validateS1(value: unknown): asserts value is Strings["s1"] {
  },
  /**
   * normalize into the NFD form.
   *
   * @generated from field: string s2 = 2;
   */
  validateS2(value: unknown): asserts value is Strings["s2"] {
    // TODO: implement scalar
  },
  /**
   * enforce the minimum length of the string if the string is NOT empty.
   * This check is done after NFC normalization.
   *
   * @generated from field: string s3 = 3;
   */
  validateS3(value: unknown): asserts value is Strings["s3"] {
    // TODO: implement scalar
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s4 = 4;
   */
  validateS4(value: unknown): asserts value is Strings["s4"] {
    // TODO: implement scalar
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s5 = 5;
   */
  validateS5(value: unknown): asserts value is Strings["s5"] {
    // TODO: implement scalar
  },
  /**
   * normalize and validate the string with a PRECIS profile.
   *
   * @generated from field: string s6 = 6;
   */
  validateS6(value: unknown): asserts value is Strings["s6"] {
    // TODO: implement scalar
  },
  /**
   * enforce that the string matches a regular expresson. The regular expression syntax is RE2.
   * See https://github.com/google/re2/wiki/Syntax
   *
   * @generated from field: string s7 = 7;
   */
  validateS7(value: unknown): asserts value is Strings["s7"] {
    // TODO: implement scalar
  },
  /**
   * enforce that the string is a valid email address as defined in RFC 5322.
   *
   * @generated from field: string s8 = 8;
   */
  validateS8(value: unknown): asserts value is Strings["s8"] {
    // TODO: implement scalar
  },
  /**
   * enforce that the string is a valid URI as defined in RFC 3986.
   * The string will also be canonicalized.
   *
   * @generated from field: string s9 = 9;
   */
  validateS9(value: unknown): asserts value is Strings["s9"] {
    // TODO: implement scalar
  },
  /**
   * enforce that the string is a valid telephone number as defined by E.164.
   * An example is "+81-80-0000-0000".
   *
   * @generated from field: string s10 = 10;
   */
  validateS10(value: unknown): asserts value is Strings["s10"] {
    // TODO: implement scalar
  },
}

/**
 * In addition to the validation code generated from the protobuf options,
 * this message implements a custom validation. See `example_custom.go`
 * in the same directory.
 *
 * @generated from message examples.Maps
 */
export const MapsValidators = {
  /**
   * you can put a constraint for map and a constraint for the value type as follows.
   *
   * @generated from field: map<string, int32> map1 = 1;
   */
  validateMap1(value: unknown): asserts value is Maps["map1"] {
    // TODO: implement map
  },
  /**
   * or either one of them. The following enforces that the timestamp is set.
   *
   * @generated from field: map<string, google.protobuf.Timestamp> map2 = 2;
   */
  validateMap2(value: unknown): asserts value is Maps["map2"] {
    // TODO: implement map
  },
  /**
   * string values are normalized into the NFC form even if there's no rules specified.
   *
   * @generated from field: map<uint32, string> map3 = 3;
   */
  validateMap3(value: unknown): asserts value is Maps["map3"] {
  },
  /**
   * if the map key is a string, it is normalized into the NFC.
   * if the map vakue is a message, fields in it are always normalized/validated.
   *
   * @generated from field: map<string, examples.Scalars> map4 = 4;
   */
  validateMap4(value: unknown): asserts value is Maps["map4"] {
  },
}

/**
 * @generated from message examples.Enums
 */
export const EnumsValidators = {
  /**
   * enforces that `e1` is not the zero value.
   *
   * @generated from field: examples.Enums.Enum e1 = 1;
   */
  validateE1(value: unknown): asserts value is Enums["e1"] {
    // TODO: implement enum
  },
  /**
   * enforces that `e2` is one of the defined enum value.
   *
   * @generated from field: examples.Enums.Enum e2 = 2;
   */
  validateE2(value: unknown): asserts value is Enums["e2"] {
    // TODO: implement enum
  },
  /**
   * enforces that `e3` is one of the defined enum value other than zero.
   *
   * @generated from field: repeated examples.Enums.Enum e3 = 3;
   */
  validateE3(value: unknown): asserts value is Enums["e3"] {
    // TODO: implement enum
  },
  /**
   * enforces that `e4` is, if given, one of the defined enum value other than zero.
   *
   * @generated from field: optional examples.Enums.Enum e4 = 4;
   */
  validateE4(value: unknown): asserts value is Enums["e4"] {
    // TODO: implement enum
  },
}

/**
 * @generated from message examples.Oneofs
 */
export const OneofsValidators = {
  /**
   * @generated from oneof examples.Oneofs.o1
   */
  validateO1(value: unknown): asserts value is Oneofs["o1"] {
  },
  /**
   * @generated from oneof examples.Oneofs.o2
   */
  validateO2(value: unknown): asserts value is Oneofs["o2"] {
  },
}

/**
 * message type fields are normalized/validated recursively.
 *
 * @generated from message examples.Composed
 */
export const ComposedValidators = {
  /**
   * enforces that `ignored` is set.
   *
   * @generated from field: examples.Ignored ignored = 1;
   */
  validateIgnored(value: unknown): asserts value is Composed["ignored"] {
    // TODO: implement message
  },
  /**
   * @generated from field: examples.Scalars scalars = 2;
   */
  validateScalars(value: unknown): asserts value is Composed["scalars"] {
  },
  /**
   * @generated from field: repeated examples.Maps maps = 3;
   */
  validateMaps(value: unknown): asserts value is Composed["maps"] {
  },
  /**
   * enforces that all messages in `enums` are set.
   *
   * @generated from field: repeated examples.Enums enums = 4;
   */
  validateEnums(value: unknown): asserts value is Composed["enums"] {
    // TODO: implement message
  },
}

/**
 * @generated from message examples.Nested
 */
export const NestedValidators = {
  /**
   * @generated from field: examples.Nested.Inner inner = 1;
   */
  validateInner(value: unknown): asserts value is Nested["inner"] {
    // TODO: implement message
  },
}

