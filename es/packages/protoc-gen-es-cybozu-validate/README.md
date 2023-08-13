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
