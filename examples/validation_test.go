package examples_test

import (
	"testing"
	"unicode/utf8"

	"github.com/cybozu/protobuf/cybozu/validate"
	"github.com/cybozu/protobuf/examples"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	norm "golang.org/x/text/unicode/norm"
	"google.golang.org/protobuf/proto"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
)

func TestValidation(t *testing.T) {
	e4val := examples.Enums_E_VAL1
	e4val2 := examples.Enums_E_UNSPECIFIED

	tests := []struct {
		name    string
		valid   bool
		message any
	}{
		{"ignored/1", true, &examples.Ignored{}},
		{"ignored/2", true, &examples.Ignored{Bar: 1000}},
		{"scalars/valid", true, NewScalars().Value()},
		{"scalars/float/invalid", false, NewScalars().Float(5).Value()},
		{"scalars/double/invalid", false, NewScalars().Double(1).Value()},
		{"scalars/int32/invalid", false, NewScalars().Int32(0).Value()},
		{"scalars/int64/invalid", false, NewScalars().Int64(0).Value()},
		{"scalars/uint32/invalid/1", false, NewScalars().Uint32(0).Value()},
		{"scalars/uint64/invalid/1", false, NewScalars().Uint64(0).Value()},
		{"scalars/uint32/invalid/2", false, NewScalars().Uint32(6).Value()},
		{"scalars/uint64/invalid/2", false, NewScalars().Uint64(6).Value()},
		{"scalars/sint32/invalid/1", false, NewScalars().Sint32(0).Value()},
		{"scalars/sint64/invalid/1", false, NewScalars().Sint64(0).Value()},
		{"scalars/sint32/invalid/2", false, NewScalars().Sint32(6).Value()},
		{"scalars/sint64/invalid/2", false, NewScalars().Sint64(6).Value()},
		{"scalars/fixed32/invalid/1", false, NewScalars().Fixed32(0).Value()},
		{"scalars/fixed64/invalid/1", false, NewScalars().Fixed64(0).Value()},
		{"scalars/fixed32/invalid/2", false, NewScalars().Fixed32(6).Value()},
		{"scalars/fixed64/invalid/2", false, NewScalars().Fixed64(6).Value()},
		{"scalars/sfixed32/invalid/1", false, NewScalars().Sfixed32(0).Value()},
		{"scalars/sfixed64/invalid/1", false, NewScalars().Sfixed64(0).Value()},
		{"scalars/sfixed32/invalid/2", false, NewScalars().Sfixed32(6).Value()},
		{"scalars/sfixed64/invalid/2", false, NewScalars().Sfixed64(6).Value()},
		{"scalars/string/invalid/1", false, NewScalars().String_("a").Value()},
		{"scalars/string/invalid/2", false, NewScalars().String_("あい").Value()}, // 2 UNICODE codepoints
		{"scalars/string/valid", true, NewScalars().String_("abcd").Value()},
		{"scalars/bytes/invalid", false, NewScalars().Bytes("012345678901").Value()},
		{"scalars/bytes/valid", true, NewScalars().Bytes("0123456789").Value()},
		{"optional/valid", true, &examples.OptionalScalars{}},
		{"optional/float/invalid", false, &examples.OptionalScalars{Float: proto.Float32(5)}},
		{"optional/float/valid", true, &examples.OptionalScalars{Float: proto.Float32(1)}},
		{"optional/double/invalid", false, &examples.OptionalScalars{Double: proto.Float64(1)}},
		{"optional/double/valid", true, &examples.OptionalScalars{Double: proto.Float64(5)}},
		{"optoinal/int32/invalid", false, &examples.OptionalScalars{Int32: proto.Int32(0)}},
		{"optoinal/int32/valid", true, &examples.OptionalScalars{Int32: proto.Int32(-3)}},
		{"optoinal/int64/invalid", false, &examples.OptionalScalars{Int64: proto.Int64(-1)}},
		{"optoinal/int64/valid", true, &examples.OptionalScalars{Int64: proto.Int64(1)}},
		{"optional/uint32/invalid", false, &examples.OptionalScalars{Uint32: proto.Uint32(0)}},
		{"optional/uint32/valid", true, &examples.OptionalScalars{Uint32: proto.Uint32(3)}},
		{"optional/uint64/invalid", false, &examples.OptionalScalars{Uint64: proto.Uint64(6)}},
		{"optional/uint64/valid", true, &examples.OptionalScalars{Uint64: proto.Uint64(5)}},
		{"optional/sint32/invalid", false, &examples.OptionalScalars{Sint32: proto.Int32(0)}},
		{"optional/sint32/valid", true, &examples.OptionalScalars{Sint32: proto.Int32(3)}},
		{"optional/sint64/invalid", false, &examples.OptionalScalars{Sint64: proto.Int64(6)}},
		{"optional/sint64/valid", true, &examples.OptionalScalars{Sint64: proto.Int64(5)}},
		{"optional/fixed32/invalid", false, &examples.OptionalScalars{Fixed32: proto.Uint32(0)}},
		{"optional/fixed32/valid", true, &examples.OptionalScalars{Fixed32: proto.Uint32(3)}},
		{"optional/fixed64/invalid", false, &examples.OptionalScalars{Fixed64: proto.Uint64(6)}},
		{"optional/fixed64/valid", true, &examples.OptionalScalars{Fixed64: proto.Uint64(5)}},
		{"optional/sfixed32/invalid", false, &examples.OptionalScalars{Sfixed32: proto.Int32(0)}},
		{"optional/sfixed32/valid", true, &examples.OptionalScalars{Sfixed32: proto.Int32(3)}},
		{"optional/sfixed64/invalid", false, &examples.OptionalScalars{Sfixed64: proto.Int64(6)}},
		{"optional/sfixed64/valid", true, &examples.OptionalScalars{Sfixed64: proto.Int64(5)}},
		{"optional/string/valid/1", true, &examples.OptionalScalars{String_: proto.String("")}},
		{"optional/string/valid/2", true, &examples.OptionalScalars{String_: proto.String("abc")}},
		{"optional/string/invalid", false, &examples.OptionalScalars{String_: proto.String("a")}},
		{"optonal/bytes/invalid", false, &examples.OptionalScalars{Bytes: []byte("012345678901")}},
		{"optonal/bytes/valid", true, &examples.OptionalScalars{Bytes: []byte("0")}},
		{"repeated/valid/1", true, &examples.RepeatedScalars{Float: []float32{1}, String_: []string{"", ""}}},
		{"repeated/valid/2", true, &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4}, String_: []string{"", ""}}},
		{"repeated/invalid/1", false, &examples.RepeatedScalars{Double: []float64{4}, String_: []string{"", ""}}},
		{"repeated/invalid/2", false, &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4, 5, 6, 7}, String_: []string{"", ""}}},
		{"repeated/invalid/3", false, &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{1}, String_: []string{"", ""}}},
		{"repeated/invalid/4", false, &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4}}},
		{"repeated/invalid/5", false, &examples.RepeatedScalars{Float: []float32{7}, String_: []string{"", ""}}},
		{"strings/valid", true, NewStrings().Value()},
		{"strings/s3/invalid", false, NewStrings().S3("abc").Value()},
		{"strings/s3/valid", true, NewStrings().S3("0123456789").Value()},
		{"strings/s4/invalid", false, NewStrings().S4("ABC def").Value()},
		{"strings/s5/invalid", false, NewStrings().S5("ABC def").Value()},
		{"strings/s6/invalid/1", false, NewStrings().S6("abc\ndef").Value()},
		{"strings/s6/invalid/2", false, NewStrings().S6("").Value()},
		{"strings/s7/invalid", false, NewStrings().S7("def").Value()},
		{"strings/s8/invalid/1", false, NewStrings().S8("foo").Value()},
		{"strings/s8/invalid/2", false, NewStrings().S8("").Value()},
		{"strings/s9/invalid/1", false, NewStrings().S9("/abc/def").Value()},
		{"strings/s9/invalid/2", false, NewStrings().S9("").Value()},
		{"strings/s10/invalid/1", false, NewStrings().S10("123456789").Value()},
		{"strings/s10/invalid/2", false, NewStrings().S10("+1234567890123456789").Value()},
		{"strings/s10/invalid/3", false, NewStrings().S10("").Value()},
		{"maps/valid", true, &examples.Maps{Map1: map[string]int32{"a": 4}}},
		{"maps/map1/invalid/1", false, &examples.Maps{Map1: map[string]int32{"a": 3}}},
		{"maps/map1/invalid/2", false, &examples.Maps{Map1: map[string]int32{}}},
		{"maps/map2/valid", true, &examples.Maps{Map1: map[string]int32{"a": 4}, Map2: map[string]*timestamppb.Timestamp{"a": timestamppb.Now()}}},
		{"maps/map2/invalid", false, &examples.Maps{Map1: map[string]int32{"a": 4}, Map2: map[string]*timestamppb.Timestamp{"a": nil}}},
		{"maps/map4/invalid", false, &examples.Maps{Map1: map[string]int32{"a": 4}, Map4: map[string]*examples.Scalars{"a": NewScalars().Float(5).Value()}}},
		{"maps/custom/invalid", false, &examples.Maps{Map1: map[string]int32{"a": 4}, Map3: map[uint32]string{0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: ""}}},
		{"enums/valid/1", true, &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}},
		{"enums/valid/2", true, &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_UNSPECIFIED, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}, E4: &e4val}},
		{"enums/e1/invalid", false, &examples.Enums{E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}},
		{"enums/e2/invalid", false, &examples.Enums{E1: examples.Enums_Enum(10), E2: examples.Enums_Enum(10), E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}},
		{"enums/e3/invalid/1", false, &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1}}},
		{"enums/e3/invalid/2", false, &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_E_UNSPECIFIED}}},
		{"enums/e4/invalid", false, &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_UNSPECIFIED, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}, E4: &e4val2}},
		{"oneofs/valid/1", true, &examples.Oneofs{O2: &examples.Oneofs_Bool{Bool: false}}},
		{"oneofs/valid/2", true, &examples.Oneofs{O1: &examples.Oneofs_Int32{Int32: -3}, O2: &examples.Oneofs_Ts{Ts: timestamppb.Now()}}},
		{"oneofs/o1/invalid", false, &examples.Oneofs{O1: &examples.Oneofs_Int32{Int32: 3}, O2: &examples.Oneofs_Ts{Ts: timestamppb.Now()}}},
		{"oneofs/o2/invalid", false, &examples.Oneofs{}},
		{"composed/valid/1", true, &examples.Composed{Ignored: &examples.Ignored{}}},
		{"composed/valid/2", true, &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}}}},
		{"composed/scalars/invalid", false, &examples.Composed{Ignored: &examples.Ignored{}, Scalars: NewScalars().Float(5).Value()}},
		{"composed/maps/invalid", false, &examples.Composed{Ignored: &examples.Ignored{}, Maps: []*examples.Maps{{Map1: map[string]int32{"a": 3}}}}},
		{"composed/enums/invalid/1", false, &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{nil}}},
		{"composed/enums/invalid/2", false, &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{{}}}},
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

var (
	nfcKaGa  = norm.NFC.String("ｶが")
	nfdKaGa  = norm.NFD.String("ｶが")
	nfkcKaGa = norm.NFKC.String("ｶが")
	nfkdKaGa = norm.NFKD.String("ｶが")
)

func TestNormalization(t *testing.T) {
	// test strings in Strings, Maps, and Oneofs
	t.Run("strings", testNormalizationStrings)
	t.Run("maps", testNormalizationMaps)
	t.Run("oneofs", testNormalizationOneofs)
}

func testNormalizationStrings(t *testing.T) {
	r := require.New(t)
	a := assert.New(t)

	v := NewStrings().S1(nfdKaGa).Value()
	err := validate.CallValidate(v)
	r.NoError(err)
	a.Equal(nfcKaGa, v.S1)

	v = NewStrings().S2(nfcKaGa).Value()
	err = validate.CallValidate(v)
	r.NoError(err)
	a.Equal(nfdKaGa, v.S2)

	r.EqualValues(3, utf8.RuneCountInString(nfdKaGa))
	v = NewStrings().S3(nfdKaGa + nfdKaGa + nfdKaGa + nfdKaGa).Value()
	err = validate.CallValidate(v)
	a.Error(err)

	v = NewStrings().S4("ABCdef" + nfdKaGa).Value()
	err = validate.CallValidate(v)
	r.NoError(err)
	a.Equal("abcdef"+nfkcKaGa, v.S4)

	v = NewStrings().S5("ABCdef" + nfkdKaGa).Value()
	err = validate.CallValidate(v)
	r.NoError(err)
	a.Equal("ABCdef"+nfkcKaGa, v.S5)

	v = NewStrings().S9("HTTPS://foo.bar.com/").Value()
	err = validate.CallValidate(v)
	r.NoError(err)
	a.Equal("https://foo.bar.com/", v.S9)
}

func testNormalizationMaps(t *testing.T) {
	v := &examples.Maps{
		Map1: map[string]int32{nfdKaGa: 4},
		Map3: map[uint32]string{10: nfdKaGa},
		Map4: map[string]*examples.Scalars{"a": NewScalars().String_(nfdKaGa + nfdKaGa).Value()},
	}
	err := validate.CallValidate(v)
	require.NoError(t, err)

	a := assert.New(t)
	var k1 string
	for key := range v.Map1 {
		k1 = key
		break
	}
	a.Equal(nfcKaGa, k1)

	var v2 string
	for _, val := range v.Map3 {
		v2 = val
	}
	a.Equal(nfcKaGa, v2)

	a.Equal(nfcKaGa+nfcKaGa, v.Map4["a"].String_)
}

func testNormalizationOneofs(t *testing.T) {
	v := &examples.Oneofs{
		O1: &examples.Oneofs_String_{String_: nfdKaGa},
		O2: &examples.Oneofs_Bool{Bool: true},
	}
	err := validate.CallValidate(v)
	require.NoError(t, err)
	assert.Equal(t, nfcKaGa, v.O1.(*examples.Oneofs_String_).String_)
}

type scalars struct {
	v *examples.Scalars
}

func NewScalars() *scalars {
	return &scalars{
		v: &examples.Scalars{
			Double:   5,
			Int32:    -5,
			Int64:    1,
			Uint32:   2,
			Uint64:   2,
			Sint32:   2,
			Sint64:   2,
			Fixed32:  2,
			Fixed64:  2,
			Sfixed32: 2,
			Sfixed64: 2,
		},
	}
}

func (s *scalars) Value() *examples.Scalars {
	return s.v
}

func (s *scalars) Float(v float32) *scalars {
	s.v.Float = v
	return s
}

func (s *scalars) Double(v float64) *scalars {
	s.v.Double = v
	return s
}

func (s *scalars) Int32(v int32) *scalars {
	s.v.Int32 = v
	return s
}

func (s *scalars) Int64(v int64) *scalars {
	s.v.Int64 = v
	return s
}

func (s *scalars) Uint32(v uint32) *scalars {
	s.v.Uint32 = v
	return s
}

func (s *scalars) Uint64(v uint64) *scalars {
	s.v.Uint64 = v
	return s
}

func (s *scalars) Sint32(v int32) *scalars {
	s.v.Sint32 = v
	return s
}

func (s *scalars) Sint64(v int64) *scalars {
	s.v.Sint64 = v
	return s
}

func (s *scalars) Fixed32(v uint32) *scalars {
	s.v.Fixed32 = v
	return s
}

func (s *scalars) Fixed64(v uint64) *scalars {
	s.v.Fixed64 = v
	return s
}

func (s *scalars) Sfixed32(v int32) *scalars {
	s.v.Sfixed32 = v
	return s
}

func (s *scalars) Sfixed64(v int64) *scalars {
	s.v.Sfixed64 = v
	return s
}

func (s *scalars) String_(v string) *scalars {
	s.v.String_ = v
	return s
}

func (s *scalars) Bytes(v string) *scalars {
	s.v.Bytes = []byte(v)
	return s
}

type strs struct {
	v *examples.Strings
}

func NewStrings() *strs {
	return &strs{
		v: &examples.Strings{
			S6:  "password",
			S7:  "abcde",
			S8:  "foo@example.com",
			S9:  "http://example.org/",
			S10: "+81-80-0000-0000",
		},
	}
}

func (s *strs) Value() *examples.Strings {
	return s.v
}

func (s *strs) S1(v string) *strs  { s.v.S1 = v; return s }
func (s *strs) S2(v string) *strs  { s.v.S2 = v; return s }
func (s *strs) S3(v string) *strs  { s.v.S3 = v; return s }
func (s *strs) S4(v string) *strs  { s.v.S4 = v; return s }
func (s *strs) S5(v string) *strs  { s.v.S5 = v; return s }
func (s *strs) S6(v string) *strs  { s.v.S6 = v; return s }
func (s *strs) S7(v string) *strs  { s.v.S7 = v; return s }
func (s *strs) S8(v string) *strs  { s.v.S8 = v; return s }
func (s *strs) S9(v string) *strs  { s.v.S9 = v; return s }
func (s *strs) S10(v string) *strs { s.v.S10 = v; return s }
