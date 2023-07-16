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
      public expectedType: CybozuValidateValueType,
      public actualType: CybozuValidateValueType
    ) {
      const message = \`Expected \${expectedType} but got \${actualType}\`;
      super(message);
    }
  }
  `,
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
