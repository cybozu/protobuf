import type { Schema } from "@bufbuild/protoplugin/ecmascript";
import { localName } from "@bufbuild/protobuf/dist/types/private/names";

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

    const { Message } = schema.runtime;
    const MessageAsType = Message.toTypeOnly();

    for (const message of file.messages) {
      const localMessageName = localName(message);
      f.print`export const ${localMessageName}Validators = {`;

      for (const field of message.fields) {
        const localFieldName = capitalizeFirstLetter(localName(field));
        const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
        f.print`validate${capitalizedFieldName}(value: unkown): asserts value is ${MessageAsType}[${localFieldName}] {`;
        f.print`},`;
      }

      f.print`}`;
    }
  }
}
