import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";

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

      const messageImport = f.import(message);

      for (const field of message.fields) {
        if (!field.oneof) {
          const localFieldName = localName(field);
          const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
          f.print(makeJsDoc(field, "  "));
          f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;
          // TODO: rendering validaation
          f.print`  },`;
        }
      }

      for (const oneof of message.oneofs) {
        const localFieldName = localName(oneof);
        const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
        f.print(makeJsDoc(oneof, "  "));
        f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;
        // TODO: rendering validaation
        f.print`  },`;
      }

      f.print`}`;
      f.print();
    }
  }
}
