import { DescField } from "@bufbuild/protobuf";
import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import {
  DoubleRules,
  Int32Rules,
  Int64Rules,
  Uint32Rules,
  Uint64Rules,
  FloatRules,
  FieldRules,
} from "@cybozu/protobuf/dist/validate/options_pb";

export type Rules = NonNullable<FieldRules["type"]["value"]>;

export type RenderItem<T extends Rules | undefined> = (
  f: GeneratedFile,
  field: DescField,
  itemRules: T,
  innerName: string,
  baseIndent: number
) => void;

export type NumberRules =
  | FloatRules
  | DoubleRules
  | Int32Rules
  | Int64Rules
  | Uint32Rules
  | Uint64Rules;
