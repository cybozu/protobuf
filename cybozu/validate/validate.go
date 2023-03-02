package validate

import "regexp"

// E164Pattern is a regular expression to match E.164 telephone number format.
var E164Pattern = regexp.MustCompile(`^\+[1-9][0-9-]+$`)

// CustomValidator is the interface that a message struct can optionally implement.
// The generated `Validate()` function will call `ValidateCustom()` from inside
// if available.
type CustomValidator interface {
	ValidateCustom() error
}

// CallValidate calls `Validate() error` function if `m` implements it.
func CallValidate(m any) error {
	v, ok := m.(interface{ Validate() error })
	if !ok {
		return nil
	}
	return v.Validate()
}

// CallValidate calls `ValidateCustom() error` function if `m` implements it.
func CallValidateCustom(m any) error {
	v, ok := m.(CustomValidator)
	if !ok {
		return nil
	}
	return v.ValidateCustom()
}
