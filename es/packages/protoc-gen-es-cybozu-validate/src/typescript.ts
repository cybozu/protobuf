import { DescMessage, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  ImportSymbol,
  Schema,
  findCustomMessageOption,
  findCustomScalarOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import { renderFieldValidator, renderOneof } from "./field";
import { capitalizeFirstLetter } from "./string-utils";
import { FieldRules } from "@cybozu/protobuf-validate";

const helpers = [
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

function printValidatorsType(
  f: GeneratedFile,
  message: DescMessage,
  messageImport: ImportSymbol
) {
  for (const field of message.fields) {
    if (!field.oneof) {
      const customOption = findCustomMessageOption(field, 1179, FieldRules);
      // no available rule for boolean
      if (field.scalar === ScalarType.BOOL || !customOption) {
        continue;
      }
      const localFieldName = localName(field);
      const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
      f.print(makeJsDoc(field, "  "));
      f.print`  validate${capitalizedFieldName}: (value: unknown) => asserts value is ${messageImport}["${localFieldName}"];`;
    }
  }

  for (const oneof of message.oneofs) {
    const localOneofName = localName(oneof);
    const capitalizedOneofName = capitalizeFirstLetter(localOneofName);
    f.print(makeJsDoc(oneof, "  "));
    f.print`  validate${capitalizedOneofName}: (value: unknown) => asserts value is ${messageImport}["${localOneofName}"]["value"];`;
  }
}

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
      const ignored = !!findCustomScalarOption(message, 1179, ScalarType.BOOL);

      if (ignored) {
        continue;
      }

      const localMessageName = localName(message);
      const messageImport = f.import(message);

      f.print(makeJsDoc(message));
      f.print`export const ${localMessageName}Validators: {`;

      printValidatorsType(f, message, messageImport);

      f.print`} = {`;

      for (const field of message.fields.filter((field) => !field.oneof)) {
        renderFieldValidator(f, field);
      }
      for (const oneof of message.oneofs) {
        renderOneof(f, oneof);
      }

      f.print`}`;
      f.print();
    }
  }
}
