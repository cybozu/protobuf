import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { renderEnum } from "./enum";
import { renderMap } from "./map";
import { renderScalar } from "./scalar";
import { DescField } from "@bufbuild/protobuf";
import {
  EnumRules,
  FieldRules,
} from "@cybozu/protobuf/dist/validate/options_pb";
import { renderMessageField } from "./message";

function renderField(
  f: GeneratedFile,
  field: DescField,
  customOption: FieldRules | undefined
) {
  if (field.optional) {
    f.print("    if (value == null) {");
    f.print("      return;");
    f.print("    }");
  }

  switch (field.fieldKind) {
    case "scalar":
      renderScalar(f, field, customOption);
      break;
    case "enum":
      renderEnum(
        f,
        field,
        customOption?.items.value,
        customOption?.type.value as EnumRules
      );
      break;
    case "map":
      renderMap(
        f,
        field,
        customOption?.items.value,
        customOption?.type.value as FieldRules
      );
      break;
    case "message":
      renderMessageField(f, field, "value");
      break;
  }
}

export { renderField };
