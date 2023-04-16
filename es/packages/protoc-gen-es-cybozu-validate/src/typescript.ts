import { ScalarType } from "@bufbuild/protobuf";
import {
  Schema,
  findCustomScalarOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import { renderField, renderOneof } from "./field";

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
