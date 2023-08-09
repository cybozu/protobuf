import { DescField } from "@bufbuild/protobuf";
import { GeneratedFile, ImportSymbol } from "@bufbuild/protoplugin/ecmascript";
import {
  EnumRules,
  ItemsRules,
} from "@cybozu/protobuf/dist/validate/options_pb";
import { renderItems } from "./items";

function renderEnum(
  f: GeneratedFile,
  field: DescField,
  itemsRules: ItemsRules | undefined,
  enumRules: EnumRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    renderItems(f, field, itemsRules, enumRules, renderEnumItem);
  } else {
    renderEnumItem(f, field, enumRules, "value", 4);
  }
}

function renderEnumItem(
  f: GeneratedFile,
  field: DescField,
  itemRules: EnumRules | undefined,
  innerName: string,
  baseIndent: number
) {
  const enumImport = f.import(field.enum!);
  renderEnumItemValidations(
    f,
    field,
    itemRules,
    innerName,
    baseIndent,
    enumImport
  );
}

function renderEnumItemValidations(
  f: GeneratedFile,
  field: DescField,
  itemRules: EnumRules | undefined,
  innerName: string,
  baseIndent: number,
  enumImport: ImportSymbol
) {
  const throwError = `throw new CybozuValidateEnumRuleError({ required: ${!!itemRules?.required}, definedOnly: ${!!itemRules?.definedOnly} }, ${innerName})`;
  if (itemRules?.required) {
    f.print`  if (${innerName} === 0) {`;
    f.print`    ${throwError}`;
    f.print`  }`;
  }
  if (itemRules?.definedOnly) {
    f.print`  if (typeof ${innerName} !== "number" || !${enumImport}[${innerName}]) {`;
    f.print`    ${throwError}`;
    f.print`  }`;
  }
}

export { renderEnum, renderEnumItemValidations };
