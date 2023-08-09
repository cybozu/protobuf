import { DescField, ScalarType } from "@bufbuild/protobuf";
import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import {
  BytesRules,
  EnumRules,
  FieldRules,
  ItemsRules,
  StringRules,
} from "@cybozu/protobuf/dist/validate/options_pb";
import {
  renderScalarBooleanItem,
  renderScalarNumberItem,
  renderScalarStringItem,
  renderScalarBytesItem,
} from "./scalar";
import { renderEnumItemValidations } from "./enum";
import { NumberRules } from "./types";
import { renderMessageField } from "./message";

function renderMap(
  f: GeneratedFile,
  field: DescField,
  itemsRules: ItemsRules | undefined,
  itemRules: FieldRules | EnumRules | StringRules | BytesRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    // do nothing?
  } else {
    f.print`  if (typeof value !== "object" || value === null) {`;
    f.print`    throw new CybozuValidateNonNullError()`;
    f.print`  }`;

    if (itemsRules) {
      const conditions: string[] = [];
      const expectedFields: string[] = [];
      if (itemsRules.maxItems) {
        conditions.push(`Object.keys(value).length > ${itemsRules.maxItems}`);
        expectedFields.push(`maxItems: ${itemsRules.maxItems}`);
      }
      if (itemsRules.minItems) {
        conditions.push(`Object.keys(value).length < ${itemsRules.minItems}`);
        expectedFields.push(`minItems: ${itemsRules.minItems}`);
      }
      if (conditions.length > 0) {
        const condition = conditions.join(" || ");
        const expected = expectedFields.join(", ");
        f.print`    if (${condition}) {`;
        f.print`      throw new CybozuValidateItemsRuleError({ ${expected} }, value)`;
        f.print`    }`;
      }
    }

    f.print`  for (const v of Object.values(value)) {`;

    const kind = field.mapValue?.kind;

    switch (kind) {
      case "scalar":
        switch (field.mapValue?.scalar) {
          case ScalarType.BOOL:
            renderScalarBooleanItem(f, field, undefined, "v", 4);
            break;
          case ScalarType.BYTES:
            itemRules as BytesRules;
            renderScalarBytesItem(f, field, itemRules as BytesRules, "v", 4);
            break;
          case ScalarType.STRING:
            renderScalarStringItem(f, field, itemRules as StringRules, "v", 4);
            break;
          case ScalarType.FLOAT:
          case ScalarType.INT64:
          case ScalarType.INT32:
          case ScalarType.FIXED64:
          case ScalarType.FIXED32:
          case ScalarType.DOUBLE:
          case ScalarType.SFIXED32:
          case ScalarType.SFIXED64:
          case ScalarType.SINT32:
          case ScalarType.SINT64:
          case ScalarType.UINT32:
          case ScalarType.UINT64:
            renderScalarNumberItem(f, field, itemRules as NumberRules, "v", 4);
            break;
        }
        break;
      case "enum":
        renderEnumItemValidations(
          f,
          field,
          itemRules as EnumRules,
          "v",
          4,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          f.import(field.mapValue?.enum!)
        );
        break;
      case "message":
        renderMessageField(f, field, "v");
        break;
    }

    f.print`  }`;
  }
}

export { renderMap };
