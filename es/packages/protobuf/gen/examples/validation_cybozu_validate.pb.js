import { Enums_Enum } from "./validation_pb.js";
function throwIfEveryFailed(...validators) {
    const validatorsLength = validators.length;
    const validatorErrors = validators
        .map((validator) => {
        try {
            validator();
        }
        catch (e) {
            return e;
        }
        return null;
    })
        .filter(Boolean);
    if (validatorsLength === validatorErrors.length) {
        throw new AggregateError(validatorErrors);
    }
}
function throwIfSomeFailed(...validators) {
    for (const validator of validators) {
        validator();
    }
}
class CybozuValidateTypeError extends Error {
    constructor(expected, actual) {
        const message = `Expected ${expected} but got ${actual}`;
        super(message);
        this.expected = expected;
        this.actual = actual;
        this.name = "CybozuValidateTypeError";
    }
}
class CybozuValidateItemsRuleError extends Error {
    constructor(expected, actual) {
        super("expected " + JSON.stringify(expected) + ", but got " + actual);
        this.expected = expected;
        this.actual = actual;
        this.name = "CybozuValidateItemsRuleError";
    }
}
class CybozuValidateNumberRuleError extends Error {
    constructor(expected, actual) {
        super("expected: " + JSON.stringify(expected) + ", actual: " + actual);
        this.expected = expected;
        this.actual = actual;
    }
}
class CybozuValidateBytesRuleError extends Error {
    constructor(expected, actual) {
        super("expected " + JSON.stringify(expected) + ", but got " + actual);
        this.expected = expected;
        this.actual = actual;
        this.name = "CybozuValidateBytesRuleError";
    }
}
class CybozuValidateStringRuleError extends Error {
    constructor(expected, actual) {
        super("expected " + JSON.stringify(expected) + ", but got " + actual);
        this.expected = expected;
        this.actual = actual;
        this.name = "CybozuValidateStringRuleError";
    }
}
class CybozuValidateEnumRuleError extends Error {
    constructor(expected, actual) {
        super("expected " + JSON.stringify(expected) + ", but got " + actual);
        this.expected = expected;
        this.actual = actual;
        this.name = "CybozuValidateEnumRuleError";
    }
}
class CybozuValidateNonNullError extends Error {
    constructor() {
        super("expected is non-null, but actual is null");
        this.name = "CybozuValidateNonNullError";
    }
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
    validateFloat(value) {
        if (typeof value !== "number") {
            throw new CybozuValidateTypeError("number", typeof value);
        }
        if (value >= 3.200000047683716) {
            throw new CybozuValidateNumberRuleError({ lt: 3.200000047683716 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 3.2 }, value);
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
            throw new CybozuValidateNumberRuleError({ lte: -3 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateStringRuleError({ minLength: 3 }, value);
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
            throw new CybozuValidateBytesRuleError({ maxLength: 10 }, value);
        }
    },
};
/**
 * rules for optional fields are enforced only if the field is set.
 *
 * @generated from message examples.OptionalScalars
 */
export const OptionalScalarsValidators = {
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
            throw new CybozuValidateNumberRuleError({ lt: 3.200000047683716 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 3.2 }, value);
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
            throw new CybozuValidateNumberRuleError({ lte: -3 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gt: 1, lt: 5 }, value);
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
            throw new CybozuValidateNumberRuleError({ gte: 1, lte: 5 }, value);
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
            throw new CybozuValidateStringRuleError({ minLength: 3 }, value);
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
            throw new CybozuValidateBytesRuleError({ maxLength: 10 }, value);
        }
    },
};
/**
 * @generated from message examples.RepeatedScalars
 */
export const RepeatedScalarsValidators = {
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
                throw new CybozuValidateNumberRuleError({ lt: 3.200000047683716 }, item);
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
                throw new CybozuValidateNumberRuleError({ gt: 3.2 }, item);
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
export const StringsValidators = {
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
            throw new CybozuValidateStringRuleError({ minLength: 10 }, value);
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
export const MapsValidators = {
    /**
     * you can put a constraint for map and a constraint for the value type as follows.
     *
     * @generated from field: map<string, int32> map1 = 1;
     */
    validateMap1(value) {
        if (typeof value !== "object" || value === null) {
            throw new CybozuValidateNonNullError();
        }
        if (Object.keys(value).length < 1) {
            throw new CybozuValidateItemsRuleError({ minItems: 1 }, value);
        }
        for (const v of Object.values(value)) {
            if (typeof v !== "number") {
                throw new CybozuValidateTypeError("number", typeof v);
            }
            if (v <= 3) {
                throw new CybozuValidateNumberRuleError({ gt: 3 }, v);
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
            throw new CybozuValidateNonNullError();
        }
        for (const v of Object.values(value)) {
            if (typeof v !== "object" || v === null) {
                throw new CybozuValidateNonNullError();
            }
        }
    },
};
/**
 * @generated from message examples.Enums
 */
export const EnumsValidators = {
    /**
     * enforces that `e1` is not the zero value.
     *
     * @generated from field: examples.Enums.Enum e1 = 1;
     */
    validateE1(value) {
        if (value === 0) {
            throw new CybozuValidateEnumRuleError({ required: true, definedOnly: false }, value);
        }
    },
    /**
     * enforces that `e2` is one of the defined enum value.
     *
     * @generated from field: examples.Enums.Enum e2 = 2;
     */
    validateE2(value) {
        if (typeof value !== "number" || !Enums_Enum[value]) {
            throw new CybozuValidateEnumRuleError({ required: false, definedOnly: true }, value);
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
                throw new CybozuValidateEnumRuleError({ required: true, definedOnly: false }, item);
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
            throw new CybozuValidateEnumRuleError({ required: true, definedOnly: true }, value);
        }
        if (typeof value !== "number" || !Enums_Enum[value]) {
            throw new CybozuValidateEnumRuleError({ required: true, definedOnly: true }, value);
        }
    },
};
/**
 * @generated from message examples.Oneofs
 */
export const OneofsValidators = {
    /**
     * @generated from oneof examples.Oneofs.o1
     */
    validateO1(value) {
        if (value == null) {
            return;
        }
        const validateInt32 = (value) => {
            if (typeof value !== "number") {
                throw new CybozuValidateTypeError("number", typeof value);
            }
            if (value > -3) {
                throw new CybozuValidateNumberRuleError({ lte: -3 }, value);
            }
        };
        const validateString = (value) => {
            if (typeof value !== "string") {
                throw new CybozuValidateTypeError("string", typeof value);
            }
        };
        throwIfEveryFailed(
        // @ts-ignore
        () => validateInt32(value), 
        // @ts-ignore
        () => validateString(value));
    },
    /**
     * @generated from oneof examples.Oneofs.o2
     */
    validateO2(value) {
        if (value == null) {
            return;
        }
        const validateTs = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateSeconds = (value) => {
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateNanos = (value) => {
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateSeconds(value["seconds"]), 
            // @ts-ignore
            () => validateNanos(value["nanos"]));
        };
        const validateBool = (value) => {
            if (typeof value !== "boolean") {
                throw new CybozuValidateTypeError("boolean", typeof value);
            }
        };
        throwIfEveryFailed(
        // @ts-ignore
        () => validateTs(value), 
        // @ts-ignore
        () => validateBool(value));
    },
};
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
    validateIgnored(value) {
        if (typeof value !== "object" || value === null) {
            throw new CybozuValidateNonNullError();
        }
        const validateFoo = (value) => {
            if (typeof value !== "string") {
                throw new CybozuValidateTypeError("string", typeof value);
            }
        };
        const validateBar = (value) => {
            if (typeof value !== "number") {
                throw new CybozuValidateTypeError("number", typeof value);
            }
            if (value >= 100) {
                throw new CybozuValidateNumberRuleError({ lt: 100 }, value);
            }
        };
        throwIfSomeFailed(
        // @ts-ignore
        () => validateFoo(value["foo"]), 
        // @ts-ignore
        () => validateBar(value["bar"]));
    },
    /**
     * enforces that all messages in `enums` are set.
     *
     * @generated from field: repeated examples.Enums enums = 4;
     */
    validateEnums(value) {
        if (typeof value !== "object" || value === null) {
            throw new CybozuValidateNonNullError();
        }
        const validateE1 = (value) => {
            if (value === 0) {
                throw new CybozuValidateEnumRuleError({ required: true, definedOnly: false }, value);
            }
        };
        const validateE2 = (value) => {
            if (typeof value !== "number" || !Enums_Enum[value]) {
                throw new CybozuValidateEnumRuleError({ required: false, definedOnly: true }, value);
            }
        };
        const validateE3 = (value) => {
            if (!Array.isArray(value)) {
                throw new CybozuValidateTypeError("array", typeof value);
            }
            if (value.length < 2) {
                throw new CybozuValidateItemsRuleError({ minItems: 2 }, value);
            }
            for (const item of value) {
                if (item === 0) {
                    throw new CybozuValidateEnumRuleError({ required: true, definedOnly: false }, item);
                }
            }
        };
        const validateE4 = (value) => {
            if (value == null) {
                return;
            }
            if (value === 0) {
                throw new CybozuValidateEnumRuleError({ required: true, definedOnly: true }, value);
            }
            if (typeof value !== "number" || !Enums_Enum[value]) {
                throw new CybozuValidateEnumRuleError({ required: true, definedOnly: true }, value);
            }
        };
        throwIfSomeFailed(
        // @ts-ignore
        () => validateE1(value["e1"]), 
        // @ts-ignore
        () => validateE2(value["e2"]), 
        // @ts-ignore
        () => validateE3(value["e3"]), 
        // @ts-ignore
        () => validateE4(value["e4"]));
    },
};
/**
 * @generated from message examples.Nested
 */
export const NestedValidators = {
    /**
     * @generated from field: examples.Nested.Inner inner = 1;
     */
    validateInner(value) {
        if (typeof value !== "object" || value === null) {
            throw new CybozuValidateNonNullError();
        }
        const validateInt32 = (value) => {
            if (typeof value !== "number") {
                throw new CybozuValidateTypeError("number", typeof value);
            }
            if (value <= 3) {
                throw new CybozuValidateNumberRuleError({ gt: 3 }, value);
            }
        };
        throwIfSomeFailed(
        // @ts-ignore
        () => validateInt32(value["int32"]));
    },
};
