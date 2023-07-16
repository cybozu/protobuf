import { FieldRules, StringRules } from "./options_pb.js";
/**
 * FieldRules encapsulates the rules for each type of field.
 * Depending on the field type, one or two rule sets can be specified.
 *
 * @generated from message cybozu.validate.FieldRules
 */
export declare const FieldRulesValidators: {
    /**
     * One of these constraints can be specified for a field.
     *
     * If the field is `optional` and not set, the specified rule will not be applied.
     * For a map type field like `map<string, int64>`, you may specify a rule for the value type, here `int64`.
     *
     * @generated from oneof cybozu.validate.FieldRules.type
     */
    validateType: (value: unknown) => asserts value is FieldRules["type"]["value"];
    /**
     * One of these constraints can be specified for a repeated field or a map field.
     *
     * @generated from oneof cybozu.validate.FieldRules.items
     */
    validateItems: (value: unknown) => asserts value is FieldRules["items"]["value"];
};
/**
 * ItemsRules are optional message to specify the constraints on the number
 * of items in a repeated field or a map type.
 *
 * @generated from message cybozu.validate.ItemsRules
 */
export declare const ItemsRulesValidators: {};
/**
 * FloatRules provides rules for `float` field.
 *
 * @generated from message cybozu.validate.FloatRules
 */
export declare const FloatRulesValidators: {};
/**
 * DoubleRules provides rules for `double` field.
 *
 * @generated from message cybozu.validate.DoubleRules
 */
export declare const DoubleRulesValidators: {};
/**
 * Int32Rules provides rules for `int32`, `sint32`, `sfixed32` fields.
 *
 * @generated from message cybozu.validate.Int32Rules
 */
export declare const Int32RulesValidators: {};
/**
 * Int64Rules provides rules for `int64`, `sint64`, `sfixed64` fields.
 *
 * @generated from message cybozu.validate.Int64Rules
 */
export declare const Int64RulesValidators: {};
/**
 * Uint32Rules provides rules for `uint32` and `fixed32` fields.
 *
 * @generated from message cybozu.validate.Uint32Rules
 */
export declare const Uint32RulesValidators: {};
/**
 * Uint64Rules provides rules for `uint64` and `fixed64` fields.
 *
 * @generated from message cybozu.validate.Uint64Rules
 */
export declare const Uint64RulesValidators: {};
/**
 * BoolRules provides rules for `bool` field.
 * Currently, no rule is available.
 *
 * @generated from message cybozu.validate.BoolRules
 */
export declare const BoolRulesValidators: {};
/**
 * StringRules provides rules for `string` field.
 *
 * @generated from message cybozu.validate.StringRules
 */
export declare const StringRulesValidators: {
    /**
     * For convenience, one of the following well-known pattern can be specified.
     *
     * @generated from oneof cybozu.validate.StringRules.predefined
     */
    validatePredefined: (value: unknown) => asserts value is StringRules["predefined"]["value"];
};
/**
 * BytesRules provides rules for `bytes` field.
 *
 * @generated from message cybozu.validate.BytesRules
 */
export declare const BytesRulesValidators: {};
/**
 * EnumRules provides rules for `enum` field.
 *
 * @generated from message cybozu.validate.EnumRules
 */
export declare const EnumRulesValidators: {};
/**
 * MessageRules provides rules for `message` field.
 * For a message field, validation/normalization will be done recursively.
 *
 * @generated from message cybozu.validate.MessageRules
 */
export declare const MessageRulesValidators: {};
