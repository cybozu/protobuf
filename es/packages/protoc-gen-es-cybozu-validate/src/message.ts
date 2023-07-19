import { DescMessage, ScalarType } from "@bufbuild/protobuf";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import {
  GeneratedFile,
  ImportSymbol,
  findCustomMessageOption,
  findCustomScalarOption,
} from "@bufbuild/protoplugin/ecmascript";
import { renderFieldValidator, renderOneof } from "./field";
import { FieldRules } from "@cybozu/protobuf/dist/validate/options_pb";
import { capitalizeFirstLetter } from "./string-utils";

function renderValidatorsType(
  f: GeneratedFile,
  message: DescMessage,
  messageImport: ImportSymbol
) {
  for (const field of message.fields) {
    if (!field.oneof) {
      const customOption = findCustomMessageOption(
        field,
        1179,
        // @ts-expect-error -- foo
        FieldRules
      );
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

export function renderMessage(f: GeneratedFile, message: DescMessage) {
  const ignored = !!findCustomScalarOption(message, 1179, ScalarType.BOOL);

  if (ignored) {
    return;
  }

  const localMessageName = localName(message);
  const messageImport = f.import(message);

  f.print(makeJsDoc(message));
  f.print`export const ${localMessageName}Validators: {`;

  renderValidatorsType(f, message, messageImport);

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
