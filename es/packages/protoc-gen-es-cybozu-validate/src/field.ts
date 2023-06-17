import { DescField, DescOneof, Enum, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  findCustomMessageOption,
} from "@bufbuild/protoplugin/ecmascript";
import { localName, makeJsDoc } from "@bufbuild/protoplugin/ecmascript";
import {
  DoubleRules,
  Int32Rules,
  Int64Rules,
  Uint32Rules,
  Uint64Rules,
  FloatRules,
  FieldRules,
  BytesRules,
  ItemsRules,
  EnumRules,
} from "@cybozu/protobuf-validate";
import { capitalizeFirstLetter } from "./string-utils";

type NumberRules =
  | FloatRules
  | DoubleRules
  | Int32Rules
  | Int64Rules
  | Uint32Rules
  | Uint64Rules;

type Rules = NonNullable<FieldRules["type"]["value"]>;

function renderFieldValidator(f: GeneratedFile, field: DescField) {
  const customOption = findCustomMessageOption(field, 1179, FieldRules);
  // no available rules for bools
  if (field.scalar === ScalarType.BOOL || !customOption) {
    return;
  }
  const localFieldName = localName(field);
  const capitalizedFieldName = capitalizeFirstLetter(localFieldName);

  f.print(makeJsDoc(field, "  "));
  f.print`  validate${capitalizedFieldName}(value) {`;

  renderField(f, field, customOption);

  f.print`  },`;
}

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
      renderMap(f);
      break;
    case "message":
      renderMessage(f);
      break;
  }
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
      f.print("    // TODO: implement scalar string");
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

type RenderItem<T extends Rules | undefined> = (
  f: GeneratedFile,
  field: DescField,
  itemRules: T,
  innerName: string,
  baseIndent: number
) => void;

function renderItems<T extends Rules | undefined>(
  f: GeneratedFile,
  field: DescField,
  itemsRules: ItemsRules | undefined,
  rules: T | undefined,
  renderItem: RenderItem<T>
) {
  f.print`    if (!Array.isArray(value)) {`;
  f.print`      // TODO: improve error message`;
  f.print`      throw new Error("");`;
  f.print`    }`;

  if (itemsRules) {
    const conditions: string[] = [];
    if (itemsRules.maxItems) {
      conditions.push(`value.length > ${itemsRules.maxItems}`);
    }
    if (itemsRules.minItems) {
      conditions.push(`value.length < ${itemsRules.minItems}`);
    }
    const condition = conditions.join(" || ");
    f.print`    if (${condition}) {`;
    f.print`      // TODO: improve error message`;
    f.print`      throw new Error("");`;
    f.print`    }`;
  }

  if (rules) {
    f.print`    for (const item of value) {`;
    renderItem(f, field, rules, "item", 6);
    f.print`    }`;
  }
}

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
  f.print(indent + `  // TODO: improve error message`);
  f.print(indent + `  throw new Error("");`);
  f.print(indent + `}`);
  if (itemRules) {
    const conditions: string[] = [];
    if (itemRules.maxLength) {
      conditions.push(`${innerName}.byteLength > ${itemRules.maxLength}`);
    }
    if (itemRules.minLength) {
      conditions.push(`${innerName}.byteLength < ${itemRules.minLength}`);
    }
    if (conditions.length > 0) {
      const condition = conditions.join(" || ");
      f.print(indent + `if (${condition}) {`);
      f.print(indent + `  // TODO: improve error message`);
      f.print(indent + `  throw new Error("")`);
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
  f.print(indent + `  // TODO: improve error message`);
  f.print(indent + `  throw new Error("");`);
  f.print(indent + `}`);
  if (itemRules) {
    const conditions: string[] = [];
    if (itemRules.gt) {
      conditions.push(`${innerName} <= ${itemRules.gt}`);
    }
    if (itemRules.lt) {
      conditions.push(`${innerName} >= ${itemRules.lt}`);
    }
    if (itemRules.gte) {
      conditions.push(`${innerName} < ${itemRules.gte}`);
    }
    if (itemRules.lte) {
      conditions.push(`${innerName} > ${itemRules.lte}`);
    }
    if (conditions.length > 0) {
      const condition = conditions.join(" || ");
      f.print(indent + `if (${condition}) {`);
      f.print(indent + `  // TODO: improve error message`);
      f.print(indent + `  throw new Error("");`);
      f.print(indent + `}`);
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
  f.print(indent + `  // TODO: improve error message`);
  f.print(indent + `  throw new Error("");`);
  f.print(indent + `}`);
}

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
  if (itemRules?.required) {
    f.print`  if (${innerName} === ${enumImport}[0]) {`;
    f.print`    // TODO: improve error message`;
    f.print`    throw new Error("")`;
    f.print`  }`;
  }
  if (itemRules?.definedOnly) {
    f.print`  // TODO: definedOnly validation`;
  }
}

function renderMap(f: GeneratedFile) {
  // TODO: implement
  f.print("    // TODO: implement map");
}

function renderMessage(f: GeneratedFile) {
  // TODO: implement
  f.print("    // TODO: implement message");
}

function renderOneofField(
  f: GeneratedFile,
  fnName: string,
  field: DescField,
  customOption: FieldRules | undefined
) {
  f.print`  const ${fnName} = (value: unknown) => {`;
  renderField(f, field, customOption);
  f.print`  }`;
}

function renderOneof(f: GeneratedFile, oneof: DescOneof) {
  const localOneofName = localName(oneof);
  const capitalizedOneofName = capitalizeFirstLetter(localOneofName);
  f.print(makeJsDoc(oneof, "  "));
  f.print`  validate${capitalizedOneofName}(value) {`;

  // If cybozu.validate.required is true, this statement should be skipped,
  // but there is no way to get the custom option.
  f.print`    if (value == null) {`;
  f.print`      return;`;
  f.print`    }`;

  const getFieldFnName = (field: DescField) => {
    const localFieldName = localName(field);
    const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
    return `validate${capitalizedFieldName}`;
  };

  for (const field of oneof.fields) {
    const fieldCustomOption = findCustomMessageOption(field, 1179, FieldRules);
    renderOneofField(f, getFieldFnName(field), field, fieldCustomOption);
  }

  f.print`  if (bothFailed(value, ${oneof.fields
    .map(getFieldFnName)
    .join(", ")})) {`;
  f.print`    throw new Error("// TODO: improve error message")`;
  f.print`  }`;

  f.print`  },`;
}

export { renderFieldValidator, renderOneof };
