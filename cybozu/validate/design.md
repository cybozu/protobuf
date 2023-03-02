# Design notes

- [Background and motivation](#background-and-motivation)
- [Why we create a new tool](#why-we-create-a-new-tool)
- [Goals](#goals)
- [The actual design](#the-actual-design)
  - [Normalization/validation rules](#normalizationvalidation-rules)
  - [Code generator](#code-generator)
  - [The generated code](#the-generated-code)

## Background and motivation

Protocol Buffers and gRPC enables schema-first style API development.
With them, both clients and servers can handle requests and responses
in a type-safe manner in a statically typed language.

However, the standard code generation tools of Protocol Buffers such
as `protoc-gen-go` does not generate code to validate values. All
message fields in Protocol Buffers are optional, so we cannot even
ensure a field value is set.

Since validating values in request messages is considered a generic
requirement, we wanted to generate code for request validation from
Protocol Buffers.

## Why we create a new tool

There are a few existing tools to generate validation code from Protocol
Buffers as of March in 2023.

- [bufbuild/protoc-gen-validate][PGV]
- [mwitkow/go-proto-validators][go-proto-validators]

We do not use these tools because our requirements are different.
We wanted to do some normalization and canonicalizaion over string values
_before_ validation.

UNICODE has different byte representations for the same string. For example,
"が" can be represented in UTF-8 either `0xE3`, `0x81`, `0x8C` or
`0xE3`, `0x81`, `0x8B`, `0xE3`, `0x82`, `0x99`. Without a normalization like
NFC, we could not compare two semantically same UNICODE strings.

Moreover, we wanted to enforce a string to match a common pattern such as URI
or email address and canonicalize them automatically. For example,
a URI `HTTPS://example.com/` should be canonicalized to `https://example.com/`.

## Goals

- UNICODE strings are always normalized.
- Provide a set of predefined rules for common use cases.
- The rules should be language agnostic so that we can generate validation code for any language.
- No dependency on gRPC implementation.
    - There are two gRPC implementations for Go, namely, `grpc-go` and `connect-go`. We do not enforce either.

## The actual design

### Normalization/validation rules

We provide custom options of Protocol Buffers to declare
normalization/validation rules. The rule syntax is inspired from
[bufbuild/protoc-gen-validate][PGV] but adds normalization rules and removes
unnecessary rules for us.

In addition to the standard UNICODE normalization forms such as NFC or NFKD,
we provide normalization and validation using [PRECIS framework][PRECIS]
because PRECIS profiles are useful for usernames and passwords.

The options are language-agnostic; they should not rely on features or
functions that are not available for all languages.

### Code generator

We create a code generator for each target language.

For Go, we create `protoc-gen-go-cybozu-validate`.
For ECMAScript/TypeScript, we create `protoc-gen-es-cybozu-validate`.

This is because generating code for a target language is generally easy
when the same language is used.

### The generated code

The generated code should add a validation method to the generated struct or
class for each protobuf message. This is consistent with what other tools
are doing.

For Go, we will add `Validate() error` method to generated structs.
The error returned is not a gRPC error to avoid dependency on a specific
gRPC implementation.

[PGV]: https://github.com/bufbuild/protoc-gen-validate
[go-proto-validators]: https://github.com/mwitkow/go-proto-validators
[PRECIS]: https://www.rfc-editor.org/rfc/rfc8264.html
