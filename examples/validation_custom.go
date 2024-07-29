package examples

import (
	"fmt"

	"github.com/cybozu/protobuf/cybozu/validate"
)

// ValidateCustom is a hand-written additional validation for Maps.
// You can do any validation/normalization here.
//
// This example checks that the total number of items in all map
// fields is not over 10.
func (x *Maps) ValidateCustom() error {
	total := len(x.Map1) + len(x.Map2) + len(x.Map3)
	if total > 10 {
		return fmt.Errorf("%w: %d", ErrValidateCustom, total)
	}
	return nil
}

// A Go idiom to statically check if a type implements an interface, here `validate.CustomValidator`.
var _ validate.CustomValidator = &Maps{}

var ErrValidateCustom = fmt.Errorf("too many items")
