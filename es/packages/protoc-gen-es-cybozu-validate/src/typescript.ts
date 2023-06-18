import { Schema } from "@bufbuild/protoplugin/ecmascript";
import { renderMessage } from "./message";

const helpers = [
  // for oneof validator
  `function bothFailed<T>(
  value: T,
  validatorA: (t: T) => void,
  validatorB: (t: T) => void
) {
  let aFailed = false;
  let bFailed = false;
  try {
    validatorA(value);
  } catch (error) {
    aFailed = true;
  }
  try {
    validatorB(value);
  } catch (error) {
    bFailed = true;
  }
  return aFailed && bFailed;
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
