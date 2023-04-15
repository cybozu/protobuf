import { Composed, Enums, Ignored, Maps, Nested, Oneofs, OptionalScalars, RepeatedScalars, Scalars, Strings } from "./validation_pb.js";

export const IgnoredValidators = {
  validateFoo(value: unknown): asserts value is Ignored["foo"] {
  },
  validateBar(value: unknown): asserts value is Ignored["bar"] {
  },
}
export const ScalarsValidators = {
  validateFloat(value: unknown): asserts value is Scalars["float"] {
  },
  validateDouble(value: unknown): asserts value is Scalars["double"] {
  },
  validateInt32(value: unknown): asserts value is Scalars["int32"] {
  },
  validateInt64(value: unknown): asserts value is Scalars["int64"] {
  },
  validateUint32(value: unknown): asserts value is Scalars["uint32"] {
  },
  validateUint64(value: unknown): asserts value is Scalars["uint64"] {
  },
  validateSint32(value: unknown): asserts value is Scalars["sint32"] {
  },
  validateSint64(value: unknown): asserts value is Scalars["sint64"] {
  },
  validateFixed32(value: unknown): asserts value is Scalars["fixed32"] {
  },
  validateFixed64(value: unknown): asserts value is Scalars["fixed64"] {
  },
  validateSfixed32(value: unknown): asserts value is Scalars["sfixed32"] {
  },
  validateSfixed64(value: unknown): asserts value is Scalars["sfixed64"] {
  },
  validateBool(value: unknown): asserts value is Scalars["bool"] {
  },
  validateString(value: unknown): asserts value is Scalars["string"] {
  },
  validateBytes(value: unknown): asserts value is Scalars["bytes"] {
  },
}
export const OptionalScalarsValidators = {
  validateFloat(value: unknown): asserts value is OptionalScalars["float"] {
  },
  validateDouble(value: unknown): asserts value is OptionalScalars["double"] {
  },
  validateInt32(value: unknown): asserts value is OptionalScalars["int32"] {
  },
  validateInt64(value: unknown): asserts value is OptionalScalars["int64"] {
  },
  validateUint32(value: unknown): asserts value is OptionalScalars["uint32"] {
  },
  validateUint64(value: unknown): asserts value is OptionalScalars["uint64"] {
  },
  validateSint32(value: unknown): asserts value is OptionalScalars["sint32"] {
  },
  validateSint64(value: unknown): asserts value is OptionalScalars["sint64"] {
  },
  validateFixed32(value: unknown): asserts value is OptionalScalars["fixed32"] {
  },
  validateFixed64(value: unknown): asserts value is OptionalScalars["fixed64"] {
  },
  validateSfixed32(value: unknown): asserts value is OptionalScalars["sfixed32"] {
  },
  validateSfixed64(value: unknown): asserts value is OptionalScalars["sfixed64"] {
  },
  validateBool(value: unknown): asserts value is OptionalScalars["bool"] {
  },
  validateString(value: unknown): asserts value is OptionalScalars["string"] {
  },
  validateBytes(value: unknown): asserts value is OptionalScalars["bytes"] {
  },
}
export const RepeatedScalarsValidators = {
  validateFloat(value: unknown): asserts value is RepeatedScalars["float"] {
  },
  validateDouble(value: unknown): asserts value is RepeatedScalars["double"] {
  },
  validateString(value: unknown): asserts value is RepeatedScalars["string"] {
  },
}
export const StringsValidators = {
  validateS1(value: unknown): asserts value is Strings["s1"] {
  },
  validateS2(value: unknown): asserts value is Strings["s2"] {
  },
  validateS3(value: unknown): asserts value is Strings["s3"] {
  },
  validateS4(value: unknown): asserts value is Strings["s4"] {
  },
  validateS5(value: unknown): asserts value is Strings["s5"] {
  },
  validateS6(value: unknown): asserts value is Strings["s6"] {
  },
  validateS7(value: unknown): asserts value is Strings["s7"] {
  },
  validateS8(value: unknown): asserts value is Strings["s8"] {
  },
  validateS9(value: unknown): asserts value is Strings["s9"] {
  },
  validateS10(value: unknown): asserts value is Strings["s10"] {
  },
}
export const MapsValidators = {
  validateMap1(value: unknown): asserts value is Maps["map1"] {
  },
  validateMap2(value: unknown): asserts value is Maps["map2"] {
  },
  validateMap3(value: unknown): asserts value is Maps["map3"] {
  },
  validateMap4(value: unknown): asserts value is Maps["map4"] {
  },
}
export const EnumsValidators = {
  validateE1(value: unknown): asserts value is Enums["e1"] {
  },
  validateE2(value: unknown): asserts value is Enums["e2"] {
  },
  validateE3(value: unknown): asserts value is Enums["e3"] {
  },
  validateE4(value: unknown): asserts value is Enums["e4"] {
  },
}
export const OneofsValidators = {
  validateO1(value: unknown): asserts value is Oneofs["o1"] {
  },
  validateO2(value: unknown): asserts value is Oneofs["o2"] {
  },
}
export const ComposedValidators = {
  validateIgnored(value: unknown): asserts value is Composed["ignored"] {
  },
  validateScalars(value: unknown): asserts value is Composed["scalars"] {
  },
  validateMaps(value: unknown): asserts value is Composed["maps"] {
  },
  validateEnums(value: unknown): asserts value is Composed["enums"] {
  },
}
export const NestedValidators = {
  validateInner(value: unknown): asserts value is Nested["inner"] {
  },
}
