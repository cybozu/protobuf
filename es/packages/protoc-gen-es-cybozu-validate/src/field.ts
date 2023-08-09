import { DescField, DescOneof, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  ImportSymbol,
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
  StringRules,
} from "@cybozu/protobuf/dist/validate/options_pb";
import { capitalizeFirstLetter } from "./string-utils";
import { EXTENSION_NUMBER } from "./constants";

type NumberRules =
  | FloatRules
  | DoubleRules
  | Int32Rules
  | Int64Rules
  | Uint32Rules
  | Uint64Rules;

type Rules = NonNullable<FieldRules["type"]["value"]>;

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
  f.print`      throw new CybozuValidateTypeError("array", typeof value)`;
  f.print`    }`;

  if (itemsRules) {
    const conditions: string[] = [];
    const expectedFields: string[] = [];
    if (itemsRules.maxItems) {
      conditions.push(`value.length > ${itemsRules.maxItems}`);
      expectedFields.push(`maxItems: ${itemsRules.maxItems}`);
    }
    if (itemsRules.minItems) {
      conditions.push(`value.length < ${itemsRules.minItems}`);
      expectedFields.push(`minItems: ${itemsRules.minItems}`);
    }
    const condition = conditions.join(" || ");
    const expected = expectedFields.join(", ");
    f.print`    if (${condition}) {`;
    f.print`      throw new CybozuValidateItemsRuleError({ ${expected} }, value)`;
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

function renderMap(
  f: GeneratedFile,
  field: DescField,
  itemsRules: ItemsRules | undefined,
  itemRules: FieldRules | EnumRules | StringRules | undefined
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
