import { DescField, DescOneof, ScalarType } from "@bufbuild/protobuf";
import {
  GeneratedFile,
  ImportSymbol,
  Schema,
  findCustomMessageOption,
  findCustomScalarOption,
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
} from "@cybozu/protobuf-validate";

type NumberRules =
  | FloatRules
  | DoubleRules
  | Int32Rules
  | Int64Rules
  | Uint32Rules
  | Uint64Rules;

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateTs(schema: Schema) {
  for (const file of schema.files) {
    if (file.messages.length === 0) {
      // noting to generate
      continue;
    }
    const filename = `${file.name}_cybozu_validate.pb.ts`;
    const f = schema.generateFile(filename);

    for (const message of file.messages) {
      const localMessageName = localName(message);
      f.print(makeJsDoc(message));
      f.print`export const ${localMessageName}Validators = {`;

      const ignored = !!findCustomScalarOption(message, 1179, ScalarType.BOOL);

      if (ignored) {
        f.print`}`;
        f.print();
        continue;
      }

      const messageImport = f.import(message);

      for (const field of message.fields) {
        renderField(f, field, messageImport);
      }
      for (const oneof of message.oneofs) {
        renderOneof(f, oneof, messageImport);
      }

      f.print`}`;
      f.print();
    }
  }
}

function renderField(
  f: GeneratedFile,
  field: DescField,
  messageImport: ImportSymbol
) {
  if (!field.oneof) {
    const localFieldName = localName(field);
    const capitalizedFieldName = capitalizeFirstLetter(localFieldName);

    const customOption = findCustomMessageOption(field, 1179, FieldRules);

    // no available rules for bools
    if (field.scalar === ScalarType.BOOL || !customOption) {
      return;
    }

    f.print(makeJsDoc(field, "  "));
    f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;

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
    f.print`  },`;
  }
}

function renderScalar(
  f: GeneratedFile,
  field: DescField,
  customOption: FieldRules
) {
  switch (field.scalar) {
    case ScalarType.BOOL:
      // no available rules for bools
      break;
    case ScalarType.BYTES:
      renderScalarBytes(f, field, customOption.type.value as BytesRules);
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
        customOption.type.value as NumberRules,
        customOption.items.value
      );
      break;
  }
}

function renderScalarBytes(
  f: GeneratedFile,
  field: DescField,
  bytesRules: BytesRules
) {
  f.print`    if (!(value instanceof Uint8Array)) {`;
  f.print`      // TODO: improve error message`;
  f.print`      throw new Error("");`;
  f.print`    }`;
  const conditions: string[] = [];
  if (bytesRules.maxLength) {
    conditions.push(`value.byteLength > ${bytesRules.maxLength}`);
  }
  if (bytesRules.minLength) {
    conditions.push(`valute.byteLength < ${bytesRules.minLength}`);
  }
  if (conditions.length > 0) {
    const condition = conditions.join(" || ");
    f.print`    if (${condition}) {`;
    f.print`      // TODO: improve error message`;
    f.print`      throw new Error("")`;
    f.print`    }`;
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

    const conditions: string[] = [];
    if (numberRules.gt) {
      conditions.push(`item <= ${numberRules.gt}`);
    }
    if (numberRules.lt) {
      conditions.push(`item >= ${numberRules.lt}`);
    }
    if (numberRules.gte) {
      conditions.push(`item < ${numberRules.gte}`);
    }
    if (numberRules.lte) {
      conditions.push(`item > ${numberRules.lte}`);
    }

    f.print`    for (const item of value) {`;
    f.print`      if (typeof item !== "number") {`;
    f.print`        // TODO: improve error message`;
    f.print`        throw new Error("");`;
    f.print`      }`;
    if (conditions.length > 0) {
      const condition = conditions.join(" || ");
      f.print`      if (${condition}) {`;
      f.print`        // TODO: improve error message`;
      f.print`        throw new Error("");`;
      f.print`      }`;
    }
    f.print`    }`;
    return;
  }

  f.print`    if (typeof value !== "number") {`;
  f.print`      // TODO: improve error message`;
  f.print`      throw new Error("");`;
  f.print`    }`;
  const conditions: string[] = [];
  if (numberRules.gt) {
    conditions.push(`value <= ${numberRules.gt}`);
  }
  if (numberRules.lt) {
    conditions.push(`value >= ${numberRules.lt}`);
  }
  if (numberRules.gte) {
    conditions.push(`value < ${numberRules.gte}`);
  }
  if (numberRules.lte) {
    conditions.push(`value > ${numberRules.lte}`);
  }
  if (conditions.length > 0) {
    const condition = conditions.join(" || ");
    f.print`    if (${condition}) {`;
    f.print`      // TODO: improve error message`;
    f.print`      throw new Error("");`;
    f.print`    }`;
  }
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

function renderOneof(
  f: GeneratedFile,
  oneof: DescOneof,
  messageImport: ImportSymbol
) {
  const localFieldName = localName(oneof);
  const capitalizedFieldName = capitalizeFirstLetter(localFieldName);
  f.print(makeJsDoc(oneof, "  "));
  f.print`  validate${capitalizedFieldName}(value: unknown): asserts value is ${messageImport}["${localFieldName}"] {`;
  // TODO: rendering validaation
  f.print`  },`;
}
