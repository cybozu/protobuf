import { DescField, DescOneof, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  findCustomMessageOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import { FieldRules } from "@cybozu/protobuf/dist/validate/options_pb";
import { renderField } from "./field";
import { capitalizeFirstLetter } from "../string-utils";
import { EXTENSION_NUMBER } from "../constants";
import { getFieldFnName, renderEachFieldValidation } from "./common";

function renderFieldValidator(f: GeneratedFile, field: DescField) {
  const customOption = findCustomMessageOption(
    field,
    EXTENSION_NUMBER,
    // @ts-expect-error -- foo
    FieldRules
  );
  // no available rules for bools
  if (field.scalar === ScalarType.BOOL || !customOption) {
    return;
  }
  const localFieldName = localName(field);
  const capitalizedFieldName = capitalizeFirstLetter(localFieldName);

  f.print(makeJsDoc(field, "  "));
  f.print`  validate${capitalizedFieldName}(value) {`;

  renderField(
    f,
    field,
    // @ts-expect-error -- foo
    customOption
  );

  f.print`  },`;
}

function renderOneofValidator(f: GeneratedFile, oneof: DescOneof) {
  const localOneofName = localName(oneof);
  const capitalizedOneofName = capitalizeFirstLetter(localOneofName);
  f.print(makeJsDoc(oneof, "  "));
  f.print`  validate${capitalizedOneofName}(value) {`;

  // If cybozu.validate.required is true, this statement should be skipped,
  // but there is no way to get the custom option.
  f.print`    if (value == null) {`;
  f.print`      return;`;
  f.print`    }`;

  for (const field of oneof.fields) {
    const fieldCustomOption = findCustomMessageOption(
      field,
      EXTENSION_NUMBER,
      // @ts-expect-error -- foo
      FieldRules
    );
    renderEachFieldValidation(
      f,
      getFieldFnName(field),
      field,
      // @ts-expect-error -- foo
      fieldCustomOption
    );
  }

  const fieldsValidationsCalls = oneof.fields
    .map((field) => {
      const fnName = getFieldFnName(field);
      return "\n// @ts-ignore\n" + `() => ${fnName}(value)`;
    })
    .join(", ");

  f.print`  throwIfEveryFailed(${fieldsValidationsCalls})`;

  f.print`  },`;
}

export { renderFieldValidator, renderOneofValidator };
