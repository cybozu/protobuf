import { Schema } from "@bufbuild/protoplugin/ecmascript";
import { renderMessage } from "./message";

const helpers = [
  `function allFailed(...validators: Array<() => void>) {
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
`,
  `function someFailed(...validators: Array<() => void>) {
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
      public actual: Array<unknown>
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
