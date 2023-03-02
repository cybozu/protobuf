package examples_test

import (
	"testing"

	"github.com/cybozu/protobuf/cybozu/validate"
	"github.com/cybozu/protobuf/examples"
	"github.com/stretchr/testify/assert"
)

func TestValidation(t *testing.T) {
	tests := []struct {
		name    string
		valid   bool
		message any
	}{
		{"ignored", true, &examples.Ignored{}},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			err := validate.CallValidate(tt.message)
			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
			}
		})
	}
}
