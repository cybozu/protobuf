import { DescField } from "@bufbuild/protobuf";
import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { localName } from "@bufbuild/protoplugin/ecmascript";
import { capitalizeFirstLetter } from "../string-utils";
import { FieldRules } from "@cybozu/protobuf/dist/validate/options_pb";
import { renderField } from "./field";

function renderEachFieldValidation(
  f: GeneratedFile,
  fnName: string,
  field: DescField,
  customOption: FieldRules | undefined
) {
  f.print`  const ${fnName} = (value: unknown) => {`;
  renderField(f, field, customOption);
  f.print`  }`;
}

function getFieldFnName(field: DescField) {
  const localFieldName = localName(field);
  const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
  return `validate${capitalizedFieldName}`;
}

export { renderEachFieldValidation, getFieldFnName };
