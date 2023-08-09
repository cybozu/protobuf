import { DescField, ScalarType } from "@bufbuild/protobuf";
import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import {
  BytesRules,
  FieldRules,
  ItemsRules,
  StringRules,
} from "@cybozu/protobuf/dist/validate/options_pb";
import { renderItems } from "./items";
import { NumberRules } from "./types";

function renderScalarBytes(
  f: GeneratedFile,
  field: DescField,
  bytesRules: BytesRules,
  itemsRules: ItemsRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    renderItems(f, field, itemsRules, bytesRules, renderScalarBytesItem);
  } else {
    renderScalarBytesItem(f, field, bytesRules, "value", 4);
  }
}

function renderScalarBytesItem(
  f: GeneratedFile,
  field: DescField,
  itemRules: BytesRules | undefined,
  innerName: string,
  baseIndent: number
) {
  const indent = " ".repeat(baseIndent);
  f.print(indent + `if (!(${innerName} instanceof Uint8Array)) {`);
  f.print`  throw new CybozuValidateTypeError("uint8array", typeof ${innerName})`;
  f.print(indent + `}`);
  if (itemRules) {
    const conditions: string[] = [];
    const expectedFields: string[] = [];
    if (itemRules.maxLength) {
      conditions.push(`${innerName}.byteLength > ${itemRules.maxLength}`);
      expectedFields.push(`maxLength: ${itemRules.maxLength}`);
    }
    if (itemRules.minLength) {
      conditions.push(`${innerName}.byteLength < ${itemRules.minLength}`);
      expectedFields.push(`minLength: ${itemRules.minLength}`);
    }
    if (conditions.length > 0) {
      const condition = conditions.join(" || ");
      const expected = expectedFields.join(", ");
      f.print(indent + `if (${condition}) {`);
      f.print`    throw new CybozuValidateBytesRuleError({ ${expected} }, ${innerName})`;
      f.print(indent + `}`);
    }
  }
}

function renderScalarNumber(
  f: GeneratedFile,
  field: DescField,
  numberRules: NumberRules,
  itemsRules: ItemsRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    renderItems(f, field, itemsRules, numberRules, renderScalarNumberItem);
  } else {
    renderScalarNumberItem(f, field, numberRules, "value", 4);
  }
}

function renderScalarNumberItem(
  f: GeneratedFile,
  field: DescField,
  itemRules: NumberRules | undefined,
  innerName: string,
  baseIndent: number
) {
  const indent = " ".repeat(baseIndent);
  f.print(indent + `if (typeof ${innerName} !== "number") {`);
  f.print`  throw new CybozuValidateTypeError("number", typeof ${innerName})`;
  f.print(indent + `}`);
  if (itemRules) {
    const conditions: string[] = [];
    const expectedFields: string[] = [];
    if (itemRules.gt) {
      conditions.push(`${innerName} <= ${itemRules.gt}`);
      expectedFields.push(`gt: ${itemRules.gt}`);
    }
    if (itemRules.lt) {
      conditions.push(`${innerName} >= ${itemRules.lt}`);
      expectedFields.push(`lt: ${itemRules.lt}`);
    }
    if (itemRules.gte) {
      conditions.push(`${innerName} < ${itemRules.gte}`);
      expectedFields.push(`gte: ${itemRules.gte}`);
    }
    if (itemRules.lte) {
      conditions.push(`${innerName} > ${itemRules.lte}`);
      expectedFields.push(`lte: ${itemRules.lte}`);
    }
    if (conditions.length > 0) {
      const condition = conditions.join(" || ");
      const expected = expectedFields.join(", ");
      f.print(indent + `if (${condition}) {`);
      f.print`   throw new CybozuValidateNumberRuleError({ ${expected} }, ${innerName})`;
      f.print(indent + `}`);
    }
  }
}

function renderScalarString(
  f: GeneratedFile,
  field: DescField,
  stringRules: StringRules,
  itemsRules: ItemsRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    renderItems(f, field, itemsRules, stringRules, renderScalarStringItem);
  } else {
    renderScalarStringItem(f, field, stringRules, "value", 4);
  }
}

function renderScalarStringItem(
  f: GeneratedFile,
  field: DescField,
  stringRules: StringRules,
  innerName: string,
  baseIndent: number
) {
  f.print`if (typeof ${innerName} !== "string") {`;
  f.print`  throw new CybozuValidateTypeError("string", typeof ${innerName})`;
  f.print`}`;

  if (stringRules) {
    if (stringRules.ignoreEmpty) {
      f.print`if (${innerName} === "") {`;
      f.print`  return;`;
      f.print`}`;
    }

    // count as a UNICODE code points
    const valueLength = `[...${innerName}].length`;
    const lengthConditions: string[] = [];
    const expectedFields: string[] = [];
    if (stringRules.maxLength) {
      lengthConditions.push(`${valueLength} > ${stringRules.maxLength}`);
      expectedFields.push(`maxLength: ${stringRules.maxLength}`);
    }
    if (stringRules.minLength) {
      lengthConditions.push(`${valueLength} < ${stringRules.minLength}`);
      expectedFields.push(`minLength: ${stringRules.minLength}`);
    }
    if (lengthConditions.length > 0) {
      const condition = lengthConditions.join(" || ");
      const expected = expectedFields.join(", ");
      f.print`if (${condition}) {`;
      f.print`  throw new CybozuValidateStringRuleError({ ${expected} }, ${innerName})`;
      f.print`}`;
    }

    if (stringRules.regex) {
      // TODO: support RegExp?
    }
  }
}

function renderScalarBoolean(
  f: GeneratedFile,
  field: DescField,
  itemsRules: ItemsRules | undefined
) {
  const { repeated } = field;
  if (repeated) {
    renderItems(f, field, itemsRules, undefined, renderScalarBooleanItem);
  } else {
    renderScalarBooleanItem(f, field, undefined, "value", 4);
  }
}

function renderScalarBooleanItem(
  f: GeneratedFile,
  field: DescField,
  itemRules: undefined,
  innerName: string,
  baseIndent: number
) {
  const indent = " ".repeat(baseIndent);
  f.print(indent + `if (typeof ${innerName} !== "boolean") {`);
  f.print`  throw new CybozuValidateTypeError("boolean", typeof ${innerName})`;
  f.print(indent + `}`);
}

function renderScalar(
  f: GeneratedFile,
  field: DescField,
  customOption: FieldRules | undefined
) {
  switch (field.scalar) {
    case ScalarType.BOOL:
      renderScalarBoolean(f, field, customOption?.items.value);
      break;
    case ScalarType.BYTES:
      renderScalarBytes(
        f,
        field,
        customOption?.type.value as BytesRules,
        customOption?.items.value
      );
      break;
    case ScalarType.STRING:
      renderScalarString(
        f,
        field,
        customOption?.type.value as StringRules,
        customOption?.items.value
      );
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
      renderScalarNumber(
        f,
        field,
        customOption?.type.value as NumberRules,
        customOption?.items.value
      );
      break;
  }
}

export {
  renderScalar,
  renderScalarBooleanItem,
  renderScalarStringItem,
  renderScalarNumberItem,
  renderScalarBytesItem,
};
