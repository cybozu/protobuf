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
 * @generated from message examples.GetBookRequest
 */
export const GetBookRequestValidators = {};
/**
 * @generated from message examples.GetBookResponse
 */
export const GetBookResponseValidators = {};
/**
 * SearchBooksRequest is preview, and so is everything inside it.
 *
 * @generated from message examples.SearchBooksRequest
 */
export const SearchBooksRequestValidators = {};
/**
 * @generated from message examples.SearchBooksResponse
 */
export const SearchBooksResponseValidators = {};
