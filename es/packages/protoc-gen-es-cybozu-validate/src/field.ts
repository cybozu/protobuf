import { DescField, DescOneof, ScalarType } from "@bufbuild/protobuf";
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
  MessageRules,
} from "@cybozu/protobuf-validate";
import { capitalizeFirstLetter } from "./string-utils";

import * as fs from "node:fs";
import * as path from "node:path";

function log(value: unknown) {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: string, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  fs.appendFileSync(
    path.join(
      "/Users/sosuke.suzuki/ghq/github.com/cybozu/protobuf/es/packages/protoc-gen-es-cybozu-validate",
      "log.txt"
    ),
    "[main thread " +
      new Date().toString() +
      "]" +
      "\n    " +
      JSON.stringify(value, getCircularReplacer()) +
      "\n"
  );
}

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
      renderEnum(f);
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
  itemRules: T,
  innerName: string,
  baseIndent: number
) => void;

function renderItems<T extends Rules | undefined>(
  f: GeneratedFile,
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
    renderItem(f, rules, "item", 6);
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
    renderItems(f, itemsRules, bytesRules, renderScalarBytesItem);
  } else {
    renderScalarBytesItem(f, bytesRules, "value", 4);
  }
}

function renderScalarBytesItem(
  f: GeneratedFile,
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
    renderItems(f, itemsRules, numberRules, renderScalarNumberItem);
  } else {
    renderScalarNumberItem(f, numberRules, "value", 4);
  }
}

function renderScalarNumberItem(
  f: GeneratedFile,
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
    renderItems(f, itemsRules, undefined, renderScalarBooleanItem);
  } else {
    renderScalarBooleanItem(f, undefined, "value", 4);
  }
}

function renderScalarBooleanItem(
  f: GeneratedFile,
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

function renderEnum(f: GeneratedFile) {
  // TODO: implement
  f.print("    // TODO: implement enum");
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
