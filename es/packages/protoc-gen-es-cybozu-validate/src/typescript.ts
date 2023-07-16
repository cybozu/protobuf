import { Schema } from "@bufbuild/protoplugin/ecmascript";
import { renderMessage } from "./message";

const helpers = [
  `function throwIfEveryFailed(...validators: Array<() => void>) {
    const validatorsLength = validators.length;
    const validatorErrors = validators
      .map((validator) => {
        try {
          validator();
        } catch (e) {
          return e;
        }
        return null;
      })
      .filter(Boolean);
    if (validatorsLength === validatorErrors.length) {
      throw new AggregateError(validatorErrors);
    }
  }`,
  `function throwIfSomeFailed(...validators: Array<() => void>) {
    for (const validator of validators) {
      validator();
    }
  }`,
  `type CybozuValidateValueType =
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
      const message = \`Expected \${expected} but got \${actual}\`;
      super(message);
    }
  }
  `,
  `class CybozuValidateItemsRuleError extends Error {
    name = "CybozuValidateItemsRuleError";

    constructor(
      public expected: {
        maxItems?: number;
        minItems?: number;
      },
      public actual: unknown
    ) {
      super("expected " + JSON.stringify(expected) + ", but got " + actual);
    }
  }`,
  `class CybozuValidateNumberRuleError extends Error {
    constructor(
      public readonly expected: {
        gt?: number;
        lt?: number;
        gte?: number;
        lte?: number;
      },
      public readonly actual: number
    ) {
      super("expected: " + JSON.stringify(expected) + ", actual: " + actual);
    }
  }`,
  `class CybozuValidateBytesRuleError extends Error {
    name = "CybozuValidateBytesRuleError";
  
    constructor(
      public expected: {
        maxLength?: number;
        minLength?: number;
      },
      public actual: Uint8Array
    ) {
      super("expected " + JSON.stringify(expected) + ", but got " + actual);
    }
  }`,
  `class CybozuValidateStringRuleError extends Error {
    name = "CybozuValidateStringRuleError";
  
    constructor(
      public expected: {
        maxLength?: number;
        minLength?: number;
      },
      public actual: string
    ) {
      super("expected " + JSON.stringify(expected) + ", but got " + actual);
    }
  }`,
  `class CybozuValidateEnumRuleError extends Error {
    name = "CybozuValidateEnumRuleError";

    constructor(
      public expected: {
        required?: boolean;
        definedOnly?: boolean;
      },
      public actual: unknown
    ) {
      super("expected " + JSON.stringify(expected) + ", but got " + actual);
    }
  }`,
  `class CybozuValidateNonNullError extends Error {
    name = "CybozuValidateNonNullError";
    constructor() {
      super("expected is non-null, but actual is null");
    }
  }`,
];

export function generateTs(schema: Schema) {
  for (const file of schema.files) {
    if (file.messages.length === 0) {
      // noting to generate
      continue;
    }
    const filename = `${file.name}_cybozu_validate.pb.ts`;
    const f = schema.generateFile(filename);

    for (const helper of helpers) {
      f.print(helper);
    }

    for (const message of file.messages) {
      renderMessage(f, message);
    }
  }
}
