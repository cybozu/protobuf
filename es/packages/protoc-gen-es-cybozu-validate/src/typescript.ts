import { DescField, DescOneof, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  ImportSymbol,
  Schema,
  findCustomMessageOption,
  findCustomScalarOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import { FieldRules } from "@cybozu/protobuf-validate";

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateTs(schema: Schema) {
  for (const file of schema.files) {
    if (file.messages.length === 0) {
      // noting to generate
      continue;
    }
    const filename = `${file.name}_cybozu_validate.pb.ts`;
    const f = schema.generateFile(filename);

    for (const message of file.messages) {
      const localMessageName = localName(message);
      f.print(makeJsDoc(message));
      f.print`export const ${localMessageName}Validators = {`;

      const ignored = !!findCustomScalarOption(message, 1179, ScalarType.BOOL);

      if (ignored) {
        f.print`}`;
        f.print();
        continue;
      }

      const messageImport = f.import(message);

      for (const field of message.fields) {
        renderField(f, field, messageImport);
      }
      for (const oneof of message.oneofs) {
        renderOneof(f, oneof, messageImport);
      }

      f.print`}`;
      f.print();
    }
  }
}

function renderField(
  f: GeneratedFile,
  field: DescField,
  messageImport: ImportSymbol
) {
  if (!field.oneof) {
    const localFieldName = localName(field);
    const capitalizedFieldName = capitalizeFirstLetter(localFieldName);

    f.print(makeJsDoc(field, "  "));
    f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;

    const customOption = findCustomMessageOption(field, 1179, FieldRules);
    if (customOption) {
      switch (field.fieldKind) {
        case "scalar":
          renderScalar();
          break;
        case "enum":
          renderEnum();
          break;
        case "map":
          renderMap();
          break;
        case "message":
          renderMessage();
          break;
      }
    }
    f.print`  },`;
  }
}

function renderScalar() {
  // TODO: implement
}

function renderEnum() {
  // TODO: implement
}

function renderMap() {
  // TODO: implement
}

function renderMessage() {
  // TODO: implement
}

function renderOneof(
  f: GeneratedFile,
  oneof: DescOneof,
  messageImport: ImportSymbol
) {
  const localFieldName = localName(oneof);
  const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
  f.print(makeJsDoc(oneof, "  "));
  f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;
  // TODO: rendering validaation
  f.print`  },`;
}
