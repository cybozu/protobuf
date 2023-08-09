import { DescField } from "@bufbuild/protobuf";
import { GeneratedFile } from "@bufbuild/protoplugin/ecmascript";
import { ItemsRules } from "@cybozu/protobuf/dist/validate/options_pb";

import { RenderItem, Rules } from "./types";

export function renderItems<T extends Rules | undefined>(
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
