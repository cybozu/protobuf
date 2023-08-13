# @cybozu/protoc-gen-es-cybozu-validate

A protoc plugin that generates validators for TypeScript from the custom fields defined in [`cybozu.validate`](../../../README.md#cybozuvalidate).

## Inatall

```
npm i @cybozu/protoc-gen-es-cybozu-validate
```

## Usage

The following is an example `buf.gen.yaml` to generate validation code:

```yaml
version: v1
plugins:
  - plugin: es
    out: .
    opt:
      - target=ts
  - plugin: es-cybozu-validate
    out: .
```

## Examples

This protoc plugin takes the following message type as input:

```proto
message Scalars {
  float float = 1 [(cybozu.validate.rules).float = {lt: 3.2}];
  double double = 2 [(cybozu.validate.rules).double = {gt: 3.2}];
}
```

And outputs the following TypeScript code:

```ts
export const ScalarsValidators: {
  /**
   * @generated from field: float float = 1;
   */
  validateFloat: (value: unknown) => asserts value is Scalars["float"];
  /**
   * @generated from field: double double = 2;
   */
  validateDouble: (value: unknown) => asserts value is Scalars["double"];
} = {
  /**
   * @generated from field: float float = 1;
   */
  validateFloat(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value >= 3.200000047683716) {
      throw new CybozuValidateNumberRuleError({ lt: 3.200000047683716 }, value);
    }
  },
  /**
   * @generated from field: double double = 2;
   */
  validateDouble(value) {
    if (typeof value !== "number") {
      throw new CybozuValidateTypeError("number", typeof value);
    }
    if (value <= 3.2) {
      throw new CybozuValidateNumberRuleError({ gt: 3.2 }, value);
    }
  },
};
```

This is designed to provide validation functions for each field, not for each message type, as it is intended for frontend form validation.
