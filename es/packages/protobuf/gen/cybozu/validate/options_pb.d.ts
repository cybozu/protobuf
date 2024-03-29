// @generated by protoc-gen-es v1.3.0 with parameter "target=js+dts"
// @generated from file cybozu/validate/options.proto (package cybozu.validate, syntax proto3)
/* eslint-disable */
// @ts-nocheck

// Custom extensions to generate code for gRPC request validation/normalization.
//
// The custom options defined here are:
// - `cybozu.validate.ignored` message option.
// - `cybozu.validate.required` oneof option.
// - `cybozu.validate.rules` field option.
//
// To generate normalization/validation code, use `protoc-gen-$LANG-cybozu-validate`
// for the target language.

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * FieldRules encapsulates the rules for each type of field.
 * Depending on the field type, one or two rule sets can be specified.
 *
 * @generated from message cybozu.validate.FieldRules
 */
export declare class FieldRules extends Message<FieldRules> {
  /**
   * One of these constraints can be specified for a field.
   *
   * If the field is `optional` and not set, the specified rule will not be applied.
   * For a map type field like `map<string, int64>`, you may specify a rule for the value type, here `int64`.
   *
   * @generated from oneof cybozu.validate.FieldRules.type
   */
  type: {
    /**
     * `float` can be specified for a float type field.
     *
     * @generated from field: cybozu.validate.FloatRules float = 1;
     */
    value: FloatRules;
    case: "float";
  } | {
    /**
     * `double` can be specified for a double type field.
     *
     * @generated from field: cybozu.validate.DoubleRules double = 2;
     */
    value: DoubleRules;
    case: "double";
  } | {
    /**
     * `int32` can be specified for an int32 type field.
     *
     * @generated from field: cybozu.validate.Int32Rules int32 = 3;
     */
    value: Int32Rules;
    case: "int32";
  } | {
    /**
     * `int64` can be specified for an int64 type field.
     *
     * @generated from field: cybozu.validate.Int64Rules int64 = 4;
     */
    value: Int64Rules;
    case: "int64";
  } | {
    /**
     * `uint32` can be specified for a uint32 type field.
     *
     * @generated from field: cybozu.validate.Uint32Rules uint32 = 5;
     */
    value: Uint32Rules;
    case: "uint32";
  } | {
    /**
     * `uint64` can be specified for a uint64 type field.
     *
     * @generated from field: cybozu.validate.Uint64Rules uint64 = 6;
     */
    value: Uint64Rules;
    case: "uint64";
  } | {
    /**
     * `sint32` can be specified for a sint32 type field.
     *
     * @generated from field: cybozu.validate.Int32Rules sint32 = 7;
     */
    value: Int32Rules;
    case: "sint32";
  } | {
    /**
     * `sint64` can be specified for a sint64 type field.
     *
     * @generated from field: cybozu.validate.Int64Rules sint64 = 8;
     */
    value: Int64Rules;
    case: "sint64";
  } | {
    /**
     * `fixed32` can be specified for a fixed32 type field.
     *
     * @generated from field: cybozu.validate.Uint32Rules fixed32 = 9;
     */
    value: Uint32Rules;
    case: "fixed32";
  } | {
    /**
     * `fixed64` can be specified for a fixed64 type field.
     *
     * @generated from field: cybozu.validate.Uint64Rules fixed64 = 10;
     */
    value: Uint64Rules;
    case: "fixed64";
  } | {
    /**
     * `sfixed32` can be specified for an sfixed32 type field.
     *
     * @generated from field: cybozu.validate.Int32Rules sfixed32 = 11;
     */
    value: Int32Rules;
    case: "sfixed32";
  } | {
    /**
     * `sfixed64` can be specified for an sfixed64 type field.
     *
     * @generated from field: cybozu.validate.Int64Rules sfixed64 = 12;
     */
    value: Int64Rules;
    case: "sfixed64";
  } | {
    /**
     * `bool` can be specified for a bool type field.
     *
     * @generated from field: cybozu.validate.BoolRules bool = 13;
     */
    value: BoolRules;
    case: "bool";
  } | {
    /**
     * `string` can be specified for a string type field.
     *
     * @generated from field: cybozu.validate.StringRules string = 14;
     */
    value: StringRules;
    case: "string";
  } | {
    /**
     * `bytes` can be specified for a bytes type field.
     *
     * @generated from field: cybozu.validate.BytesRules bytes = 15;
     */
    value: BytesRules;
    case: "bytes";
  } | {
    /**
     * `enum` can be specified for an enum type field.
     *
     * @generated from field: cybozu.validate.EnumRules enum = 16;
     */
    value: EnumRules;
    case: "enum";
  } | {
    /**
     * `message` can be specified for a message type field except for the well-known types.
     *
     * @generated from field: cybozu.validate.MessageRules message = 17;
     */
    value: MessageRules;
    case: "message";
  } | { case: undefined; value?: undefined };

  /**
   * One of these constraints can be specified for a repeated field or a map field.
   *
   * @generated from oneof cybozu.validate.FieldRules.items
   */
  items: {
    /**
     * `repeated` can be specified for any field with `repeated` specifier.
     *
     * @generated from field: cybozu.validate.ItemsRules repeated = 1000;
     */
    value: ItemsRules;
    case: "repeated";
  } | {
    /**
     * `map` can be specified for any map type field.
     *
     * @generated from field: cybozu.validate.ItemsRules map = 1001;
     */
    value: ItemsRules;
    case: "map";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<FieldRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.FieldRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FieldRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FieldRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FieldRules;

  static equals(a: FieldRules | PlainMessage<FieldRules> | undefined, b: FieldRules | PlainMessage<FieldRules> | undefined): boolean;
}

/**
 * ItemsRules are optional message to specify the constraints on the number
 * of items in a repeated field or a map type.
 *
 * @generated from message cybozu.validate.ItemsRules
 */
export declare class ItemsRules extends Message<ItemsRules> {
  /**
   * `min_items` specifies that this field must have the specified number of items at a minimum.
   *
   * @generated from field: optional uint32 min_items = 1;
   */
  minItems?: number;

  /**
   * `max_items` specifies that this field must have the specified number of items at a maximum.
   *
   * @generated from field: optional uint32 max_items = 2;
   */
  maxItems?: number;

  constructor(data?: PartialMessage<ItemsRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.ItemsRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ItemsRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ItemsRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ItemsRules;

  static equals(a: ItemsRules | PlainMessage<ItemsRules> | undefined, b: ItemsRules | PlainMessage<ItemsRules> | undefined): boolean;
}

/**
 * FloatRules provides rules for `float` field.
 *
 * @generated from message cybozu.validate.FloatRules
 */
export declare class FloatRules extends Message<FloatRules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional float lt = 1;
   */
  lt?: number;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional float lte = 2;
   */
  lte?: number;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional float gt = 3;
   */
  gt?: number;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional float gte = 4;
   */
  gte?: number;

  constructor(data?: PartialMessage<FloatRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.FloatRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FloatRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FloatRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FloatRules;

  static equals(a: FloatRules | PlainMessage<FloatRules> | undefined, b: FloatRules | PlainMessage<FloatRules> | undefined): boolean;
}

/**
 * DoubleRules provides rules for `double` field.
 *
 * @generated from message cybozu.validate.DoubleRules
 */
export declare class DoubleRules extends Message<DoubleRules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional double lt = 1;
   */
  lt?: number;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional double lte = 2;
   */
  lte?: number;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional double gt = 3;
   */
  gt?: number;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional double gte = 4;
   */
  gte?: number;

  constructor(data?: PartialMessage<DoubleRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.DoubleRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DoubleRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DoubleRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DoubleRules;

  static equals(a: DoubleRules | PlainMessage<DoubleRules> | undefined, b: DoubleRules | PlainMessage<DoubleRules> | undefined): boolean;
}

/**
 * Int32Rules provides rules for `int32`, `sint32`, `sfixed32` fields.
 *
 * @generated from message cybozu.validate.Int32Rules
 */
export declare class Int32Rules extends Message<Int32Rules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional int32 lt = 1;
   */
  lt?: number;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional int32 lte = 2;
   */
  lte?: number;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional int32 gt = 3;
   */
  gt?: number;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional int32 gte = 4;
   */
  gte?: number;

  constructor(data?: PartialMessage<Int32Rules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.Int32Rules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Int32Rules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Int32Rules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Int32Rules;

  static equals(a: Int32Rules | PlainMessage<Int32Rules> | undefined, b: Int32Rules | PlainMessage<Int32Rules> | undefined): boolean;
}

/**
 * Int64Rules provides rules for `int64`, `sint64`, `sfixed64` fields.
 *
 * @generated from message cybozu.validate.Int64Rules
 */
export declare class Int64Rules extends Message<Int64Rules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional int64 lt = 1;
   */
  lt?: bigint;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional int64 lte = 2;
   */
  lte?: bigint;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional int64 gt = 3;
   */
  gt?: bigint;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional int64 gte = 4;
   */
  gte?: bigint;

  constructor(data?: PartialMessage<Int64Rules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.Int64Rules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Int64Rules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Int64Rules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Int64Rules;

  static equals(a: Int64Rules | PlainMessage<Int64Rules> | undefined, b: Int64Rules | PlainMessage<Int64Rules> | undefined): boolean;
}

/**
 * Uint32Rules provides rules for `uint32` and `fixed32` fields.
 *
 * @generated from message cybozu.validate.Uint32Rules
 */
export declare class Uint32Rules extends Message<Uint32Rules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional uint32 lt = 1;
   */
  lt?: number;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional uint32 lte = 2;
   */
  lte?: number;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional uint32 gt = 3;
   */
  gt?: number;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional uint32 gte = 4;
   */
  gte?: number;

  constructor(data?: PartialMessage<Uint32Rules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.Uint32Rules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Uint32Rules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Uint32Rules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Uint32Rules;

  static equals(a: Uint32Rules | PlainMessage<Uint32Rules> | undefined, b: Uint32Rules | PlainMessage<Uint32Rules> | undefined): boolean;
}

/**
 * Uint64Rules provides rules for `uint64` and `fixed64` fields.
 *
 * @generated from message cybozu.validate.Uint64Rules
 */
export declare class Uint64Rules extends Message<Uint64Rules> {
  /**
   * `lt` specifies that this field must be less than the specified value.
   *
   * @generated from field: optional uint64 lt = 1;
   */
  lt?: bigint;

  /**
   * `lte` specifies that this field must be less than or equal to the specified value.
   *
   * @generated from field: optional uint64 lte = 2;
   */
  lte?: bigint;

  /**
   * `gt` specifies that this field must be greater than the specified value.
   *
   * @generated from field: optional uint64 gt = 3;
   */
  gt?: bigint;

  /**
   * `gte` specifies that this field must be greater than or equal to the specified value.
   *
   * @generated from field: optional uint64 gte = 4;
   */
  gte?: bigint;

  constructor(data?: PartialMessage<Uint64Rules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.Uint64Rules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Uint64Rules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Uint64Rules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Uint64Rules;

  static equals(a: Uint64Rules | PlainMessage<Uint64Rules> | undefined, b: Uint64Rules | PlainMessage<Uint64Rules> | undefined): boolean;
}

/**
 * BoolRules provides rules for `bool` field.
 * Currently, no rule is available.
 *
 * @generated from message cybozu.validate.BoolRules
 */
export declare class BoolRules extends Message<BoolRules> {
  constructor(data?: PartialMessage<BoolRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.BoolRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BoolRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BoolRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BoolRules;

  static equals(a: BoolRules | PlainMessage<BoolRules> | undefined, b: BoolRules | PlainMessage<BoolRules> | undefined): boolean;
}

/**
 * StringRules provides rules for `string` field.
 *
 * @generated from message cybozu.validate.StringRules
 */
export declare class StringRules extends Message<StringRules> {
  /**
   * `norm` specifies which normalization is to be applied to the string.
   * By default, strings are normalized into the NFC form.
   *
   * @generated from field: cybozu.validate.StringRules.UnicodeNormalizationForm norm = 1;
   */
  norm: StringRules_UnicodeNormalizationForm;

  /**
   * `ignore_empty` specifies whether to ignore validation rules when the string is empty.
   *
   * @generated from field: bool ignore_empty = 2;
   */
  ignoreEmpty: boolean;

  /**
   * `min_length` specifies the minimum string length.
   * The length is counted as the number of UNICODE codepoints after normalization is applied.
   *
   * @generated from field: optional uint32 min_length = 3;
   */
  minLength?: number;

  /**
   * `max_length` specifies the maximum string length.
   * The length is counted as the number of UNICODE codepoints after normalization is applied.
   *
   * @generated from field: optional uint32 max_length = 4;
   */
  maxLength?: number;

  /**
   * `regex` specifies a regular expression that the string must match.
   * The syntax of the regular expression is the same as google/re2.
   * https://github.com/google/re2/wiki/Syntax
   *
   * @generated from field: optional string regex = 5;
   */
  regex?: string;

  /**
   * For convenience, one of the following well-known pattern can be specified.
   *
   * @generated from oneof cybozu.validate.StringRules.predefined
   */
  predefined: {
    /**
     * `email` specifies that the field must be canonicalized and validated as an email address as defined by Section 3.4.1 in RFC 5322.
     * See https://www.rfc-editor.org/rfc/rfc5322#section-3.4.1
     *
     * @generated from field: bool email = 100;
     */
    value: boolean;
    case: "email";
  } | {
    /**
     * `uri` specifies that the field must be canonicalized and validated as an absolute URI as defined by RFC 3986.
     *
     * @generated from field: bool uri = 101;
     */
    value: boolean;
    case: "uri";
  } | {
    /**
     * `e164` specifies that the field must be canonicalized and validated as a telephone number as defined by E.164
     * with a prefixing `+` sign and optional hyphen separators. E.g., "+81-3-1111-1111".
     * See https://en.wikipedia.org/wiki/E.164
     *
     * @generated from field: bool e164 = 102;
     */
    value: boolean;
    case: "e164";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<StringRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.StringRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StringRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StringRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StringRules;

  static equals(a: StringRules | PlainMessage<StringRules> | undefined, b: StringRules | PlainMessage<StringRules> | undefined): boolean;
}

/**
 * UNICODE normalization forms.
 * In addition to the forms defined by https://www.unicode.org/reports/tr15/,
 * we include PRECIS profiles as they are considered a variant of the NFC form.
 *
 * @generated from enum cybozu.validate.StringRules.UnicodeNormalizationForm
 */
export declare enum StringRules_UnicodeNormalizationForm {
  /**
   * NFC form as defined by https://www.unicode.org/reports/tr15/
   *
   * @generated from enum value: NFC = 0;
   */
  NFC = 0,

  /**
   * NFD form as defined by https://www.unicode.org/reports/tr15/
   *
   * @generated from enum value: NFD = 1;
   */
  NFD = 1,

  /**
   * NFKC form as defined by https://www.unicode.org/reports/tr15/
   *
   * @generated from enum value: NFKC = 2;
   */
  NFKC = 2,

  /**
   * NFKD form as defined by https://www.unicode.org/reports/tr15/
   *
   * @generated from enum value: NFKD = 3;
   */
  NFKD = 3,

  /**
   * PRECIS UsernameCaseMapped profile as defined by RFC 8265
   *
   * @generated from enum value: PRECIS_USERNAME_CASE_MAPPED = 100;
   */
  PRECIS_USERNAME_CASE_MAPPED = 100,

  /**
   * PRECIS UsernameCasePreserved profile as defined by RFC 8265
   *
   * @generated from enum value: PRECIS_USERNAME_CASE_PRESERVED = 101;
   */
  PRECIS_USERNAME_CASE_PRESERVED = 101,

  /**
   * PRECIS OpaqueString profile as defined by RFC 8265
   *
   * @generated from enum value: PRECIS_OPAQUE_STRING = 102;
   */
  PRECIS_OPAQUE_STRING = 102,
}

/**
 * BytesRules provides rules for `bytes` field.
 *
 * @generated from message cybozu.validate.BytesRules
 */
export declare class BytesRules extends Message<BytesRules> {
  /**
   * `min_length` specifies the minimum length.
   * The length is counted as the number of bytes.
   *
   * @generated from field: optional uint32 min_length = 3;
   */
  minLength?: number;

  /**
   * `max_length` specifies the maximum length.
   * The length is counted as the number of bytes.
   *
   * @generated from field: optional uint32 max_length = 4;
   */
  maxLength?: number;

  constructor(data?: PartialMessage<BytesRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.BytesRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BytesRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BytesRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BytesRules;

  static equals(a: BytesRules | PlainMessage<BytesRules> | undefined, b: BytesRules | PlainMessage<BytesRules> | undefined): boolean;
}

/**
 * EnumRules provides rules for `enum` field.
 *
 * @generated from message cybozu.validate.EnumRules
 */
export declare class EnumRules extends Message<EnumRules> {
  /**
   * `required` specifies that this field must not be zero (usually, zero means unspecified).
   *
   * @generated from field: bool required = 1;
   */
  required: boolean;

  /**
   * `defined_only` specifies that this field must be only one of the defined
   * values for this enum, failing on any undefined value.
   *
   * @generated from field: bool defined_only = 2;
   */
  definedOnly: boolean;

  constructor(data?: PartialMessage<EnumRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.EnumRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EnumRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EnumRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EnumRules;

  static equals(a: EnumRules | PlainMessage<EnumRules> | undefined, b: EnumRules | PlainMessage<EnumRules> | undefined): boolean;
}

/**
 * MessageRules provides rules for `message` field.
 * For a message field, validation/normalization will be done recursively.
 *
 * @generated from message cybozu.validate.MessageRules
 */
export declare class MessageRules extends Message<MessageRules> {
  /**
   * `required` specifies that this field must be set.
   *
   * @generated from field: bool required = 1;
   */
  required: boolean;

  constructor(data?: PartialMessage<MessageRules>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "cybozu.validate.MessageRules";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageRules;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageRules;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageRules;

  static equals(a: MessageRules | PlainMessage<MessageRules> | undefined, b: MessageRules | PlainMessage<MessageRules> | undefined): boolean;
}

