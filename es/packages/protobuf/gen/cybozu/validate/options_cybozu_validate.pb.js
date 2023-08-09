import "./options_pb.js";
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
 * FieldRules encapsulates the rules for each type of field.
 * Depending on the field type, one or two rule sets can be specified.
 *
 * @generated from message cybozu.validate.FieldRules
 */
export const FieldRulesValidators = {
    /**
     * One of these constraints can be specified for a field.
     *
     * If the field is `optional` and not set, the specified rule will not be applied.
     * For a map type field like `map<string, int64>`, you may specify a rule for the value type, here `int64`.
     *
     * @generated from oneof cybozu.validate.FieldRules.type
     */
    validateType(value) {
        if (value == null) {
            return;
        }
        const validateFloat = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateDouble = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateInt32 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateInt64 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateUint32 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateUint64 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateSint32 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateSint64 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateFixed32 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateFixed64 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateSfixed32 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateSfixed64 = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateLt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateLte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGt = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateGte = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateLt(value["lt"]), 
            // @ts-ignore
            () => validateLte(value["lte"]), 
            // @ts-ignore
            () => validateGt(value["gt"]), 
            // @ts-ignore
            () => validateGte(value["gte"]));
        };
        const validateBool = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            throwIfSomeFailed();
        };
        const validateString = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateNorm = (value) => {
            };
            const validateIgnoreEmpty = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            const validateMinLength = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateMaxLength = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateRegex = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "string") {
                    throw new CybozuValidateTypeError("string", typeof value);
                }
            };
            const validateEmail = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            const validateUri = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            const validateE164 = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateNorm(value["norm"]), 
            // @ts-ignore
            () => validateIgnoreEmpty(value["ignoreEmpty"]), 
            // @ts-ignore
            () => validateMinLength(value["minLength"]), 
            // @ts-ignore
            () => validateMaxLength(value["maxLength"]), 
            // @ts-ignore
            () => validateRegex(value["regex"]), 
            // @ts-ignore
            () => validateEmail(value["email"]), 
            // @ts-ignore
            () => validateUri(value["uri"]), 
            // @ts-ignore
            () => validateE164(value["e164"]));
        };
        const validateBytes = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateMinLength = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateMaxLength = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateMinLength(value["minLength"]), 
            // @ts-ignore
            () => validateMaxLength(value["maxLength"]));
        };
        const validateEnum = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateRequired = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            const validateDefinedOnly = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateRequired(value["required"]), 
            // @ts-ignore
            () => validateDefinedOnly(value["definedOnly"]));
        };
        const validateMessage = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateRequired = (value) => {
                if (typeof value !== "boolean") {
                    throw new CybozuValidateTypeError("boolean", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateRequired(value["required"]));
        };
        throwIfEveryFailed(
        // @ts-ignore
        () => validateFloat(value), 
        // @ts-ignore
        () => validateDouble(value), 
        // @ts-ignore
        () => validateInt32(value), 
        // @ts-ignore
        () => validateInt64(value), 
        // @ts-ignore
        () => validateUint32(value), 
        // @ts-ignore
        () => validateUint64(value), 
        // @ts-ignore
        () => validateSint32(value), 
        // @ts-ignore
        () => validateSint64(value), 
        // @ts-ignore
        () => validateFixed32(value), 
        // @ts-ignore
        () => validateFixed64(value), 
        // @ts-ignore
        () => validateSfixed32(value), 
        // @ts-ignore
        () => validateSfixed64(value), 
        // @ts-ignore
        () => validateBool(value), 
        // @ts-ignore
        () => validateString(value), 
        // @ts-ignore
        () => validateBytes(value), 
        // @ts-ignore
        () => validateEnum(value), 
        // @ts-ignore
        () => validateMessage(value));
    },
    /**
     * One of these constraints can be specified for a repeated field or a map field.
     *
     * @generated from oneof cybozu.validate.FieldRules.items
     */
    validateItems(value) {
        if (value == null) {
            return;
        }
        const validateRepeated = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateMinItems = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateMaxItems = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateMinItems(value["minItems"]), 
            // @ts-ignore
            () => validateMaxItems(value["maxItems"]));
        };
        const validateMap = (value) => {
            if (typeof value !== "object" || value === null) {
                throw new CybozuValidateNonNullError();
            }
            const validateMinItems = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            const validateMaxItems = (value) => {
                if (value == null) {
                    return;
                }
                if (typeof value !== "number") {
                    throw new CybozuValidateTypeError("number", typeof value);
                }
            };
            throwIfSomeFailed(
            // @ts-ignore
            () => validateMinItems(value["minItems"]), 
            // @ts-ignore
            () => validateMaxItems(value["maxItems"]));
        };
        throwIfEveryFailed(
        // @ts-ignore
        () => validateRepeated(value), 
        // @ts-ignore
        () => validateMap(value));
    },
};
/**
 * ItemsRules are optional message to specify the constraints on the number
 * of items in a repeated field or a map type.
 *
 * @generated from message cybozu.validate.ItemsRules
 */
export const ItemsRulesValidators = {};
/**
 * FloatRules provides rules for `float` field.
 *
 * @generated from message cybozu.validate.FloatRules
 */
export const FloatRulesValidators = {};
/**
 * DoubleRules provides rules for `double` field.
 *
 * @generated from message cybozu.validate.DoubleRules
 */
export const DoubleRulesValidators = {};
/**
 * Int32Rules provides rules for `int32`, `sint32`, `sfixed32` fields.
 *
 * @generated from message cybozu.validate.Int32Rules
 */
export const Int32RulesValidators = {};
/**
 * Int64Rules provides rules for `int64`, `sint64`, `sfixed64` fields.
 *
 * @generated from message cybozu.validate.Int64Rules
 */
export const Int64RulesValidators = {};
/**
 * Uint32Rules provides rules for `uint32` and `fixed32` fields.
 *
 * @generated from message cybozu.validate.Uint32Rules
 */
export const Uint32RulesValidators = {};
/**
 * Uint64Rules provides rules for `uint64` and `fixed64` fields.
 *
 * @generated from message cybozu.validate.Uint64Rules
 */
export const Uint64RulesValidators = {};
/**
 * BoolRules provides rules for `bool` field.
 * Currently, no rule is available.
 *
 * @generated from message cybozu.validate.BoolRules
 */
export const BoolRulesValidators = {};
/**
 * StringRules provides rules for `string` field.
 *
 * @generated from message cybozu.validate.StringRules
 */
export const StringRulesValidators = {
    /**
     * For convenience, one of the following well-known pattern can be specified.
     *
     * @generated from oneof cybozu.validate.StringRules.predefined
     */
    validatePredefined(value) {
        if (value == null) {
            return;
        }
        const validateEmail = (value) => {
            if (typeof value !== "boolean") {
                throw new CybozuValidateTypeError("boolean", typeof value);
            }
        };
        const validateUri = (value) => {
            if (typeof value !== "boolean") {
                throw new CybozuValidateTypeError("boolean", typeof value);
            }
        };
        const validateE164 = (value) => {
            if (typeof value !== "boolean") {
                throw new CybozuValidateTypeError("boolean", typeof value);
            }
        };
        throwIfEveryFailed(
        // @ts-ignore
        () => validateEmail(value), 
        // @ts-ignore
        () => validateUri(value), 
        // @ts-ignore
        () => validateE164(value));
    },
};
/**
 * BytesRules provides rules for `bytes` field.
 *
 * @generated from message cybozu.validate.BytesRules
 */
export const BytesRulesValidators = {};
/**
 * EnumRules provides rules for `enum` field.
 *
 * @generated from message cybozu.validate.EnumRules
 */
export const EnumRulesValidators = {};
/**
 * MessageRules provides rules for `message` field.
 * For a message field, validation/normalization will be done recursively.
 *
 * @generated from message cybozu.validate.MessageRules
 */
export const MessageRulesValidators = {};
