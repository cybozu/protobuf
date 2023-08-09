import { DescField } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  findCustomMessageOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName } from "@bufbuild/protoplugin/ecmascript";
import { FieldRules } from "@cybozu/protobuf/dist/validate/options_pb";
import { EXTENSION_NUMBER } from "../constants";
import { getFieldFnName, renderEachFieldValidation } from "./common";

function renderMessageField(
  f: GeneratedFile,
  field: DescField,
  innerName: string
) {
  f.print`  if (typeof ${innerName} !== "object" || ${innerName} === null) {`;
  f.print`    throw new CybozuValidateNonNullError()`;
  f.print`  }`;

  if (!field.message) {
    return;
  }

  const callEachFieldValidations: string[] = [];

  for (const innerField of field.message.fields) {
    const innerFieldCustomOption = findCustomMessageOption(
      innerField,
      EXTENSION_NUMBER,
      // @ts-expect-error -- foo
      FieldRules
    );
    const fnName = getFieldFnName(innerField);
    renderEachFieldValidation(
      f,
      fnName,
      innerField,
      // @ts-expect-error -- foo
      innerFieldCustomOption
    );
    callEachFieldValidations.push(
      "\n    // @ts-ignore\n" +
        `    () => ${fnName}(${innerName}["${localName(innerField)}"])`
    );
  }

  f.print`  throwIfSomeFailed(${callEachFieldValidations.join(", ")})`;
}

export { renderMessageField };
