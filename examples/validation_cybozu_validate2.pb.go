package examples

import (
	"errors"
	"fmt"
	"net/mail"
	"net/url"
	"regexp"
	"strings"
	"unicode/utf8"

	"github.com/cybozu/protobuf/cybozu/validate"
	"golang.org/x/text/secure/precis"
	"golang.org/x/text/unicode/norm"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (x *Scalars) Validate() error {
	var el []error
	if v := x.Float; true {
		if v >= 3.2 {
			el = append(el, fmt.Errorf("invalid value for Scalars.float: %v", v))
		}
	}
	if v := x.Uint32; true {
		if v <= 1 || v >= 5 {
			el = append(el, fmt.Errorf("invalid value for Scalars.uint32: %v", v))
		}
	}
	x.String_ = norm.NFC.String(x.String_)
	if v := x.String_; true {
		if v != "" {
			if len(v) < 3 {
				el = append(el, fmt.Errorf("too short string for Scalars.string"))
			}
		}
	}
	if v := x.Bytes; true {
		if len(v) > 10 {
			el = append(el, fmt.Errorf("too long bytes for Scalars.bytes"))
		}
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *OptionalScalars) Validate() error {
	var el []error
	if x.Float != nil {
		v := *x.Float
		if v >= 3.2 {
			el = append(el, fmt.Errorf("invalid value for OptionalScalars.float: %v", v))
		}
	}
	if x.Uint32 != nil {
		v := *x.Uint32
		if v <= 1 || v >= 5 {
			el = append(el, fmt.Errorf("invalid value for OptionalScalars.uint32: %v", v))
		}
	}
	if x.String_ != nil {
		v := *x.String_
		*x.String_ = norm.NFC.String(v)
		if v != "" {
			if len(v) < 3 {
				el = append(el, fmt.Errorf("too short string for OptionalScalars.string"))
			}
		}
	}
	if len(x.Bytes) > 10 {
		el = append(el, fmt.Errorf("too long bytes for OptionalScalars.bytes"))
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *RepeatedScalars) Validate() error {
	var el []error
	if len(x.Float) < 1 {
		el = append(el, fmt.Errorf("too few items in RepeatedScalars.float"))
	}
	for _, v := range x.Float {
		if v >= 3.2 {
			el = append(el, fmt.Errorf("invalid value for RepeatedScalars.float: %v", v))
		}
	}
	if len(x.Double) > 3 {
		el = append(el, fmt.Errorf("too many items in RepeatedScalars.double"))
	}
	for _, v := range x.Double {
		if v <= 3.2 {
			el = append(el, fmt.Errorf("invalid value for RepeatedScalars.double: %v", v))
		}
	}
	if len(x.String_) < 2 {
		el = append(el, fmt.Errorf("too few items in RepeatedScalars.string"))
	}
	for i, v := range x.String_ {
		x.String_[i] = norm.NFC.String(v)
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

var regex_Strings_S5 = regexp.MustCompile(`^abc`)

func (x *Strings) Validate() error {
	var el []error
	x.S1 = norm.NFC.String(x.S1)
	x.S2 = norm.NFD.String(x.S2)
	x.S3 = norm.NFC.String(x.S3)
	if v := x.S3; true {
		if v != "" {
			if vlen := utf8.RuneCountInString(v); vlen < 10 {
				el = append(el, fmt.Errorf("invalid value for Strings.s3: %v", v))
			}
		}
	}
	if v, err := precis.UsernameCaseMapped.String(x.S4); err != nil {
		el = append(el, fmt.Errorf("invalid value for Strings.s4: %v, %w", v, err))
	} else {
		x.S4 = v
	}
	x.S5 = norm.NFC.String(x.S5)
	if v := x.S5; true {
		if !regex_Strings_S5.MatchString(v) {
			el = append(el, fmt.Errorf("invalid value for Strings.s5: %v", v))
		}
	}
	x.S6 = norm.NFC.String(x.S6)
	if v := x.S6; true {
		if a, err := mail.ParseAddress(v); err != nil {
			el = append(el, fmt.Errorf("invalid value for Strings.s6: %v, %w", v, err))
		} else if a.Name != "" {
			el = append(el, fmt.Errorf("invalid value for Strings.s6: %v", v))
		} else {
			x.S6 = a.Address
		}
	}
	x.S7 = norm.NFC.String(x.S7)
	if v := x.S7; true {
		if u, err := url.Parse(v); err != nil {
			el = append(el, fmt.Errorf("invalid value for Strings.s7: %v, %w", v, err))
		} else if !u.IsAbs() {
			el = append(el, fmt.Errorf("invalid value for Strings.s7: %v", v))
		} else {
			x.S7 = u.String()
		}
	}
	x.S8 = norm.NFC.String(x.S8)
	if v := x.S8; true {
		if !validate.E164Pattern.MatchString(v) {
			el = append(el, fmt.Errorf("invalid value for Strings.s8: %v", v))
		} else if len(v)-strings.Count(v, "-") > 16 {
			el = append(el, fmt.Errorf("invalid value for Strings.s8: %v", v))
		}
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *Maps) Validate() error {
	var el []error
	if len(x.Map1) > 0 {
		m := make(map[string]int32)
		for k, v := range x.Map1 {
			m[norm.NFC.String(k)] = v
		}
		x.Map1 = m
	}
	if len(x.Map1) < 1 {
		el = append(el, fmt.Errorf("too few items in Maps.map1"))
	}
	for _, v := range x.Map1 {
		if v <= 3 {
			el = append(el, fmt.Errorf("invalid value for Maps.map1: %v", v))
		}
	}
	if len(x.Map2) > 0 {
		m := make(map[string]*timestamppb.Timestamp)
		for k, v := range x.Map2 {
			if err := validate.CallValidate(v); err != nil {
				if v, ok := err.(interface{ Unwrap() []error }); ok {
					el = append(el, v.Unwrap()...)
				} else {
					el = append(el, err)
				}
			}
			m[norm.NFC.String(k)] = v
		}
		x.Map2 = m
	}
	for _, v := range x.Map2 {
		if v == nil {
			el = append(el, fmt.Errorf("values of Maps.map2 are required"))
		}
	}
	if len(x.Map3) > 0 {
		m := make(map[uint32]string)
		for k, v := range x.Map3 {
			m[k] = norm.NFC.String(v)
		}
		x.Map3 = m
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *Enums) Validate() error {
	var el []error
	if v := x.E1; true {
		if v == Enums_Enum(0) {
			el = append(el, fmt.Errorf("invalid value for Enums.e1: %v", v))
		}
	}
	if v := x.E2; true {
		if _, ok := Enums_Enum_name[int32(v)]; !ok {
			el = append(el, fmt.Errorf("invalid value for Enums.e2: %v", v))
		}
	}
	if v := x.E3; true {
		if v == Enums_Enum(0) {
			el = append(el, fmt.Errorf("invalid value for Enums.e3: %v", v))
		}
		if _, ok := Enums_Enum_name[int32(v)]; !ok {
			el = append(el, fmt.Errorf("invalid value for Enums.e3: %v", v))
		}
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *Oneofs) Validate() error {
	var el []error
	switch v := x.O1.(type) {
	case *Oneofs_Int32:
		if v := v.Int32; true {
			if v > -3 {
				el = append(el, fmt.Errorf("invalid value for Oneofs.int32: %v", v))
			}
		}
	case *Oneofs_String_:
		v.String_ = norm.NFC.String(v.String_)
	}
	if x.O2 == nil {
		el = append(el, fmt.Errorf("a value is required for Oneofs.o2"))
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}

func (x *Composed) Validate() error {
	var el []error
	if v := x.Ignored; true {
		if v == nil {
			el = append(el, fmt.Errorf("a value is required for Composed.ignored"))
		}
		if v != nil {
			if err := validate.CallValidate(v); err != nil {
				if v, ok := err.(interface{ Unwrap() []error }); ok {
					el = append(el, v.Unwrap()...)
				} else {
					el = append(el, err)
				}
			}
		}
	}
	if v := x.Scalars; true {
		if v != nil {
			if err := validate.CallValidate(v); err != nil {
				if v, ok := err.(interface{ Unwrap() []error }); ok {
					el = append(el, v.Unwrap()...)
				} else {
					el = append(el, err)
				}
			}
		}
	}
	for _, v := range x.Maps {
		if v != nil {
			if err := validate.CallValidate(v); err != nil {
				if v, ok := err.(interface{ Unwrap() []error }); ok {
					el = append(el, v.Unwrap()...)
				} else {
					el = append(el, err)
				}
			}
		}
	}
	for _, v := range x.Enums {
		if v == nil {
			el = append(el, fmt.Errorf("a value is required for Composed.enums"))
		}
		if v != nil {
			if err := validate.CallValidate(v); err != nil {
				if v, ok := err.(interface{ Unwrap() []error }); ok {
					el = append(el, v.Unwrap()...)
				} else {
					el = append(el, err)
				}
			}
		}
	}

	if err := validate.CallValidateCustom(x); err != nil {
		if v, ok := err.(interface{ Unwrap() []error }); ok {
			el = append(el, v.Unwrap()...)
		} else {
			el = append(el, err)
		}
	}

	if len(el) == 0 {
		return nil
	}
	return errors.Join(el...)
}
