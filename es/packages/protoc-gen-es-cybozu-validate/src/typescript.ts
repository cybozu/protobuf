import { Schema } from "@bufbuild/protoplugin/ecmascript";
import { renderMessage } from "./message";

const helpers = [
  // for oneof validator
  `function allFailedWithValue<T>(value: T, ...validators: Array<(value: T) => void>) {
    function throws(validator: (value: T) => void) {
      let failed = false;
      try {
        validator(value);
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
