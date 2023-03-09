package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/cybozu/protobuf/cybozu/validate"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func (r *Renderer) renderField(f *protogen.Field, oneof bool) error {
	fd := f.Desc
	if !fd.HasOptionalKeyword() && (fd.ContainingOneof() != nil) && !oneof {
		return nil
	}

	switch fd.Kind() {
	case protoreflect.FloatKind:
		return r.renderFloat(f)
	case protoreflect.DoubleKind:
		return r.renderDouble(f)
	case protoreflect.Int32Kind:
		return r.renderInt32(f)
	case protoreflect.Int64Kind:
		return r.renderInt64(f)
	case protoreflect.Uint32Kind:
		return r.renderUint32(f)
	case protoreflect.Uint64Kind:
		return r.renderUint64(f)
	case protoreflect.Sint32Kind:
		return r.renderSint32(f)
	case protoreflect.Sint64Kind:
		return r.renderSint64(f)
	case protoreflect.Fixed32Kind:
		return r.renderFixed32(f)
	case protoreflect.Fixed64Kind:
		return r.renderFixed64(f)
	case protoreflect.Sfixed32Kind:
		return r.renderSfixed32(f)
	case protoreflect.Sfixed64Kind:
		return r.renderSfixed64(f)
	case protoreflect.BoolKind:
		return nil // nothing to do
	case protoreflect.StringKind:
		return r.renderString(f)
	case protoreflect.BytesKind:
		return r.renderBytes(f)
	case protoreflect.EnumKind:
		return r.renderEnum(f)
	case protoreflect.MessageKind:
		if fd.IsMap() {
			// a map is translated into a sequence of a special message.
			// see the description of `IsMap` of FieldDescriptor.
			// https://pkg.go.dev/google.golang.org/protobuf/reflect/protoreflect#FieldDescriptor
			return r.renderMap(f)
		} else {
			return r.renderMessageField(f)
		}
	default:
		fmt.Fprintf(os.Stderr, "warning: unknown field kind: %v", fd.Kind().String())
	}

	return nil
}

func fieldError(msg string, fd protoreflect.FieldDescriptor) error {
	return fmt.Errorf(msg+" %s of %s in %s", fd.Name(), fd.Parent().Name(), fd.ParentFile().Path())
}

func (r *Renderer) renderItemsRule(f *protogen.Field, ext *validate.FieldRules) error {
	if ext.GetItems() == nil {
		return nil
	}

	fd := f.Desc
	repeated := fd.Cardinality() == protoreflect.Repeated
	isMap := fd.IsMap()

	var rule *validate.ItemsRules
	switch val := ext.Items.(type) {
	case *validate.FieldRules_Map:
		if !isMap {
			return fieldError("map rule is given to a non-map field", fd)
		}
		rule = val.Map
	case *validate.FieldRules_Repeated:
		if isMap || (!repeated) {
			return fieldError("repeated rule is given to a non-repeated field", fd)
		}
		rule = val.Repeated
	default:
		panic("fix me")
	}

	if rule.MaxItems != nil {
		r.FL(`if len(x.%s) > %#v {`, f.GoName, *rule.MaxItems)
		r.FL(`el = append(el, %s("too many items in %s of %s"))`, identErrorf, fd.Name(), fd.Parent().Name())
		r.PL(`}`)
	}
	if rule.MinItems != nil {
		r.FL(`if len(x.%s) < %#v {`, f.GoName, *rule.MinItems)
		r.FL(`el = append(el, %s("too few items in %s of %s"))`, identErrorf, fd.Name(), fd.Parent().Name())
		r.PL(`}`)
	}
	return nil
}

func (r *Renderer) renderFloat(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Float)
		if !ok {
			return fieldError("wrong validation rule for a float field", fd)
		}

		rule := t.Float
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderDouble(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Double)
		if !ok {
			return fieldError("wrong validation rule for a double field", fd)
		}

		rule := t.Double
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderInt32(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Int32)
		if !ok {
			return fieldError("wrong validation rule for an int32 field", fd)
		}

		rule := t.Int32
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderInt64(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Int64)
		if !ok {
			return fieldError("wrong validation rule for an int64 field", fd)
		}

		rule := t.Int64
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderUint32(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Uint32)
		if !ok {
			return fieldError("wrong validation rule for a uint32 field", fd)
		}

		rule := t.Uint32
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderUint64(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Uint64)
		if !ok {
			return fieldError("wrong validation rule for a uint64 field", fd)
		}

		rule := t.Uint64
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderSint32(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Sint32)
		if !ok {
			return fieldError("wrong validation rule for a sint32 field", fd)
		}

		rule := t.Sint32
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderSint64(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Sint64)
		if !ok {
			return fieldError("wrong validation rule for a sint64 field", fd)
		}

		rule := t.Sint64
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderFixed32(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Fixed32)
		if !ok {
			return fieldError("wrong validation rule for a fixed32 field", fd)
		}

		rule := t.Fixed32
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderFixed64(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Fixed64)
		if !ok {
			return fieldError("wrong validation rule for a fixed64 field", fd)
		}

		rule := t.Fixed64
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderSfixed32(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Sfixed32)
		if !ok {
			return fieldError("wrong validation rule for a sfixed32 field", fd)
		}

		rule := t.Sfixed32
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderSfixed64(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Sfixed64)
		if !ok {
			return fieldError("wrong validation rule for a sfixed64 field", fd)
		}

		rule := t.Sfixed64
		var conds []string
		if rule.Gt != nil {
			conds = append(conds, fmt.Sprintf("v <= %#v", *rule.Gt))
		}
		if rule.Lt != nil {
			conds = append(conds, fmt.Sprintf("v >= %#v", *rule.Lt))
		}
		if rule.Gte != nil {
			conds = append(conds, fmt.Sprintf("v < %#v", *rule.Gte))
		}
		if rule.Lte != nil {
			conds = append(conds, fmt.Sprintf("v > %#v", *rule.Lte))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderString(f *protogen.Field) error {
	fd := f.Desc
	repeated := fd.Cardinality() == protoreflect.Repeated
	optional := fd.HasOptionalKeyword()
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)

	if ext.GetType() == nil {
		indexStr := ""
		pointerStr := ""
		if repeated {
			r.FL(`for i, v := range x.%s {`, f.GoName)
			indexStr = "[i]"
		} else if optional {
			r.FL(`if x.%s != nil {`, f.GoName)
			r.FL(`v := *x.%s`, f.GoName)
			pointerStr = "&"
		} else {
			r.FL(`if v := x.%s; true {`, f.GoName)
		}
		r.FL(`v = %s.String(v)`, identNormNFC)
		r.FL(`x.%s%s = %sv`, f.GoName, indexStr, pointerStr)
		r.PL(`}`)
	} else {
		t, ok := ext.Type.(*validate.FieldRules_String_)
		if !ok {
			return fieldError("wrong validation rule for a string field", fd)
		}

		rule := t.String_
		indexStr := ""
		pointerStr := ""
		if repeated {
			r.FL(`for i, v := range x.%s {`, f.GoName)
			indexStr = "[i]"
		} else if optional {
			r.FL(`if x.%s != nil {`, f.GoName)
			r.FL(`v := *x.%s`, f.GoName)
			pointerStr = "&"
		} else {
			r.FL(`if v := x.%s; true {`, f.GoName)
		}
		switch rule.Norm {
		case validate.StringRules_NFC:
			r.FL(`v = %s.String(v)`, identNormNFC)
		case validate.StringRules_NFD:
			r.FL(`v = %s.String(v)`, identNormNFD)
		case validate.StringRules_NFKC:
			r.FL(`v = %s.String(v)`, identNormNFKC)
		case validate.StringRules_NFKD:
			r.FL(`v = %s.String(v)`, identNormNFKD)
		case validate.StringRules_PRECIS_USERNAME_CASE_MAPPED:
			r.FL(`if v2, err := %s.String(v); err != nil {`, identPRECISUsernameCaseMapped)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v, %%w", v, err))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`} else {`)
			r.PL(`v = v2`)
			r.PL(`}`)
		case validate.StringRules_PRECIS_USERNAME_CASE_PRESERVED:
			r.FL(`if v2, err := %s.String(v); err != nil {`, identPRECISUsernameCasePreserved)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v, %%w", v, err))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`} else {`)
			r.PL(`v = v2`)
			r.PL(`}`)
		case validate.StringRules_PRECIS_OPAQUE_STRING:
			r.FL(`if v2, err := %s.String(v); err != nil {`, identPRECISOpaqueString)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v, %%w", v, err))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`} else {`)
			r.PL(`v = v2`)
			r.PL(`}`)
		default:
			return fmt.Errorf("unknown normalization type: %v", int32(rule.Norm))
		}
		if rule.IgnoreEmpty {
			r.PL(`if v != "" {`)
		}
		if rule.MaxLength != nil || rule.MinLength != nil {
			conds := make([]string, 0, 2)
			if rule.MaxLength != nil {
				conds = append(conds, fmt.Sprintf("vlen > %#v", *rule.MaxLength))
			}
			if rule.MinLength != nil {
				conds = append(conds, fmt.Sprintf("vlen < %#v", *rule.MinLength))
			}
			r.FL(`if vlen := %s(v); %s {`, identRuneCountInString, strings.Join(conds, " || "))
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
		}
		if rule.Regex != nil {
			_, err := regexp.Compile(*rule.Regex)
			if err != nil {
				return fieldError(fmt.Sprintf("invalid regular expression %q: %v", *rule.Regex, err), fd)
			}
			r.addRegexp(f, *rule.Regex)
			r.FL(`if !regex_%s.MatchString(v) {`, f.GoIdent.GoName)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
		}
		if rule.Predefined != nil {
			switch val := rule.Predefined.(type) {
			case *validate.StringRules_Email:
				if val.Email {
					r.FL(`if a, err := %s(v); err != nil {`, identMailParseAddress)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v, %%w", v, err))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.PL(`} else if a.Name != "" {`)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.PL(`} else {`)
					r.PL(`v = a.Address`)
					r.PL(`}`)
				}
			case *validate.StringRules_Uri:
				if val.Uri {
					r.FL(`if u, err := %s(v); err != nil {`, identURLParse)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v, %%w", v, err))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.PL(`} else if !u.IsAbs() {`)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.PL(`} else {`)
					r.PL(`v = u.String()`)
					r.PL(`}`)
				}
			case *validate.StringRules_E164:
				if val.E164 {
					r.FL(`if !%s.MatchString(v) {`, identE164Pattern)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.FL(`} else if len(v)-%s(v, "-") > 16 {`, identStringsCount)
					r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
					r.PL(`}`)
				}
			default:
				return fieldError("unsupported predefined rule for a string field", fd)
			}
		}
		if rule.IgnoreEmpty {
			r.PL(`}`)
		}
		r.FL(`x.%s%s = %sv`, f.GoName, indexStr, pointerStr)
		r.PL(`}`)
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderBytes(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Bytes)
		if !ok {
			return fieldError("wrong validation rule for a bytes field", fd)
		}

		rule := t.Bytes
		var conds []string
		if rule.MaxLength != nil {
			conds = append(conds, fmt.Sprintf("vlen > %#v", *rule.MaxLength))
		}
		if rule.MinLength != nil {
			conds = append(conds, fmt.Sprintf("vlen < %#v", *rule.MinLength))
		}
		if len(conds) > 0 {
			cond := strings.Join(conds, " || ")
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if v := x.%s; v != nil {`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			r.FL(`if vlen := len(v); %s {`, cond)
			r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
			r.PL(`}`)
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderEnum(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)
	if ext == nil {
		return nil
	}

	if ext.Type != nil {
		t, ok := ext.Type.(*validate.FieldRules_Enum)
		if !ok {
			return fieldError("wrong validation rule for an enum field", fd)
		}

		rule := t.Enum
		if rule.Required || rule.DefinedOnly {
			switch {
			case fd.Cardinality() == protoreflect.Repeated:
				r.FL(`for _, v := range x.%s {`, f.GoName)
			case fd.HasOptionalKeyword():
				r.FL(`if x.%s != nil {`, f.GoName)
				r.FL(`v := *x.%s`, f.GoName)
			default:
				r.FL(`if v := x.%s; true {`, f.GoName)
			}
			if rule.Required {
				r.FL(`if v == %s(0) {`, f.Enum.GoIdent)
				r.FL(`el = append(el, %s("field %s of %s must not be zero-value"))`, identErrorsNew, fd.Name(), fd.Parent().FullName())
				r.PL(`}`)
			}
			if rule.DefinedOnly {
				r.FL(`if _, ok := %s_name[int32(v)]; !ok {`, f.Enum.GoIdent)
				r.FL(`el = append(el, %s("invalid value for %s of %s: %%v", v))`, identErrorf, fd.Name(), fd.Parent().FullName())
				r.PL(`}`)
			}
			r.PL(`}`)
		}
	}

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderMessageField(f *protogen.Field) error {
	fd := f.Desc
	ext := proto.GetExtension(fd.Options(), validate.E_Rules).(*validate.FieldRules)

	required := false
	if ext.GetType() != nil {
		t, ok := ext.Type.(*validate.FieldRules_Message)
		if !ok {
			return fieldError("wrong validation rule for a message field", fd)
		}

		required = t.Message.Required
	}

	switch {
	case fd.Cardinality() == protoreflect.Repeated:
		r.FL(`for _, v := range x.%s {`, f.GoName)
	default:
		r.FL(`if v := x.%s; true {`, f.GoName)
	}

	if required {
		r.PL(`if v == nil {`)
		r.FL(`el = append(el, %s("required field %s of %s is missing"))`, identErrorsNew, fd.Name(), fd.Parent().FullName())
		r.PL(`}`)
	}

	r.PL(`if v != nil {`)
	r.FL(`if err := %s(v); err != nil {`, identCallValidate)
	r.PL(`if v, ok := err.(interface{ Unwrap() []error }); ok {`)
	r.PL(`el = append(el, v.Unwrap()...)`)
	r.PL(`} else {`)
	r.PL(`el = append(el, err)`)
	r.PL(`}`)
	r.PL(`}`)
	r.PL(`}`)

	r.PL(`}`)

	return r.renderItemsRule(f, ext)
}

func (r *Renderer) renderMap(f *protogen.Field) error {
	fd := f.Desc

	if fd.MapKey().Kind() == protoreflect.StringKind {
		r.FL(`for k, v := range x.%s {`, f.GoName)
		r.FL(`delete(x.%s, k)`, f.GoName)
		r.FL(`x.%s[%s.String(k)] = v`, f.GoName, identNormNFC)
		r.PL(`}`)
	}

	switch fd.MapValue().Kind() {
	case protoreflect.FloatKind:
		return r.renderFloat(f)
	case protoreflect.DoubleKind:
		return r.renderDouble(f)
	case protoreflect.Int32Kind:
		return r.renderInt32(f)
	case protoreflect.Int64Kind:
		return r.renderInt64(f)
	case protoreflect.Uint32Kind:
		return r.renderUint32(f)
	case protoreflect.Uint64Kind:
		return r.renderUint64(f)
	case protoreflect.Sint32Kind:
		return r.renderSint32(f)
	case protoreflect.Sint64Kind:
		return r.renderSint64(f)
	case protoreflect.Fixed32Kind:
		return r.renderFixed32(f)
	case protoreflect.Fixed64Kind:
		return r.renderFixed64(f)
	case protoreflect.Sfixed32Kind:
		return r.renderSfixed32(f)
	case protoreflect.Sfixed64Kind:
		return r.renderSfixed64(f)
	case protoreflect.BoolKind:
		return nil // nothing to do
	case protoreflect.StringKind:
		return r.renderString(f)
	case protoreflect.BytesKind:
		return r.renderBytes(f)
	case protoreflect.EnumKind:
		return r.renderEnum(f)
	case protoreflect.MessageKind:
		// map value cannot be another map.
		return r.renderMessageField(f)
	default:
		fmt.Fprintf(os.Stderr, "warning: unknown field kind: %v", f.Desc.Kind().String())
	}

	return nil
}
