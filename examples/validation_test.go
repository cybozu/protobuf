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
		expErr  error
	}{
		{name: "ignored/1", valid: true, message: &examples.Ignored{}},
		{name: "ignored/2", valid: true, message: &examples.Ignored{Bar: 1000}},
		{name: "scalars/valid", valid: true, message: NewScalars().Value()},
		{name: "scalars/float/invalid", message: NewScalars().Float(5).Value(), expErr: examples.ErrFloatCmp_Scalars_Float},
		{name: "scalars/double/invalid", message: NewScalars().Double(1).Value(), expErr: examples.ErrDoubleCmp_Scalars_Double},
		{name: "scalars/int32/invalid", message: NewScalars().Int32(0).Value(), expErr: examples.ErrInt32Cmp_Scalars_Int32},
		{name: "scalars/int64/invalid", message: NewScalars().Int64(0).Value(), expErr: examples.ErrInt64Cmp_Scalars_Int64},
		{name: "scalars/uint32/invalid/1", message: NewScalars().Uint32(0).Value(), expErr: examples.ErrUint32Cmp_Scalars_Uint32},
		{name: "scalars/uint64/invalid/1", message: NewScalars().Uint64(0).Value(), expErr: examples.ErrUint64Cmp_Scalars_Uint64},
		{name: "scalars/uint32/invalid/2", message: NewScalars().Uint32(6).Value(), expErr: examples.ErrUint32Cmp_Scalars_Uint32},
		{name: "scalars/uint64/invalid/2", message: NewScalars().Uint64(6).Value(), expErr: examples.ErrUint64Cmp_Scalars_Uint64},
		{name: "scalars/sint32/invalid/1", message: NewScalars().Sint32(0).Value(), expErr: examples.ErrSint32Cmp_Scalars_Sint32},
		{name: "scalars/sint64/invalid/1", message: NewScalars().Sint64(0).Value(), expErr: examples.ErrSint64Cmp_Scalars_Sint64},
		{name: "scalars/sint32/invalid/2", message: NewScalars().Sint32(6).Value(), expErr: examples.ErrSint32Cmp_Scalars_Sint32},
		{name: "scalars/sint64/invalid/2", message: NewScalars().Sint64(6).Value(), expErr: examples.ErrSint64Cmp_Scalars_Sint64},
		{name: "scalars/fixed32/invalid/1", message: NewScalars().Fixed32(0).Value(), expErr: examples.ErrFixed32Cmp_Scalars_Fixed32},
		{name: "scalars/fixed64/invalid/1", message: NewScalars().Fixed64(0).Value(), expErr: examples.ErrFixed64Cmp_Scalars_Fixed64},
		{name: "scalars/fixed32/invalid/2", message: NewScalars().Fixed32(6).Value(), expErr: examples.ErrFixed32Cmp_Scalars_Fixed32},
		{name: "scalars/fixed64/invalid/2", message: NewScalars().Fixed64(6).Value(), expErr: examples.ErrFixed64Cmp_Scalars_Fixed64},
		{name: "scalars/sfixed32/invalid/1", message: NewScalars().Sfixed32(0).Value(), expErr: examples.ErrSfixed32Cmp_Scalars_Sfixed32},
		{name: "scalars/sfixed64/invalid/1", message: NewScalars().Sfixed64(0).Value(), expErr: examples.ErrSfixed64Cmp_Scalars_Sfixed64},
		{name: "scalars/sfixed32/invalid/2", message: NewScalars().Sfixed32(6).Value(), expErr: examples.ErrSfixed32Cmp_Scalars_Sfixed32},
		{name: "scalars/sfixed64/invalid/2", message: NewScalars().Sfixed64(6).Value(), expErr: examples.ErrSfixed64Cmp_Scalars_Sfixed64},
		{name: "scalars/string/invalid/1", message: NewScalars().String_("a").Value(), expErr: examples.ErrStringLen_Scalars_String_},
		{name: "scalars/string/invalid/2", message: NewScalars().String_("あい").Value(), expErr: examples.ErrStringLen_Scalars_String_}, // 2 UNICODE codepoints
		{name: "scalars/string/valid", valid: true, message: NewScalars().String_("abcd").Value()},
		{name: "scalars/bytes/invalid", message: NewScalars().Bytes("012345678901").Value(), expErr: examples.ErrBytesLen_Scalars_Bytes},
		{name: "scalars/bytes/valid", valid: true, message: NewScalars().Bytes("0123456789").Value(), expErr: examples.ErrBytesLen_Scalars_Bytes},
		{name: "optional/valid", valid: true, message: &examples.OptionalScalars{}},
		{name: "optional/float/invalid", message: &examples.OptionalScalars{Float: proto.Float32(5)}, expErr: examples.ErrFloatCmp_OptionalScalars_Float},
		{name: "optional/float/valid", valid: true, message: &examples.OptionalScalars{Float: proto.Float32(1)}},
		{name: "optional/double/invalid", message: &examples.OptionalScalars{Double: proto.Float64(1)}, expErr: examples.ErrDoubleCmp_OptionalScalars_Double},
		{name: "optional/double/valid", valid: true, message: &examples.OptionalScalars{Double: proto.Float64(5)}},
		{name: "optional/int32/invalid", message: &examples.OptionalScalars{Int32: proto.Int32(0)}, expErr: examples.ErrInt32Cmp_OptionalScalars_Int32},
		{name: "optional/int32/valid", valid: true, message: &examples.OptionalScalars{Int32: proto.Int32(-3)}},
		{name: "optional/int64/invalid", message: &examples.OptionalScalars{Int64: proto.Int64(-1)}, expErr: examples.ErrInt64Cmp_OptionalScalars_Int64},
		{name: "optional/int64/valid", valid: true, message: &examples.OptionalScalars{Int64: proto.Int64(1)}},
		{name: "optional/uint32/invalid", message: &examples.OptionalScalars{Uint32: proto.Uint32(0)}, expErr: examples.ErrUint32Cmp_OptionalScalars_Uint32},
		{name: "optional/uint32/valid", valid: true, message: &examples.OptionalScalars{Uint32: proto.Uint32(3)}},
		{name: "optional/uint64/invalid", message: &examples.OptionalScalars{Uint64: proto.Uint64(6)}, expErr: examples.ErrUint64Cmp_OptionalScalars_Uint64},
		{name: "optional/uint64/valid", valid: true, message: &examples.OptionalScalars{Uint64: proto.Uint64(5)}},
		{name: "optional/sint32/invalid", message: &examples.OptionalScalars{Sint32: proto.Int32(0)}, expErr: examples.ErrSint32Cmp_OptionalScalars_Sint32},
		{name: "optional/sint32/valid", valid: true, message: &examples.OptionalScalars{Sint32: proto.Int32(3)}},
		{name: "optional/sint64/invalid", message: &examples.OptionalScalars{Sint64: proto.Int64(6)}, expErr: examples.ErrSint64Cmp_OptionalScalars_Sint64},
		{name: "optional/sint64/valid", valid: true, message: &examples.OptionalScalars{Sint64: proto.Int64(5)}},
		{name: "optional/fixed32/invalid", message: &examples.OptionalScalars{Fixed32: proto.Uint32(0)}, expErr: examples.ErrFixed32Cmp_OptionalScalars_Fixed32},
		{name: "optional/fixed32/valid", valid: true, message: &examples.OptionalScalars{Fixed32: proto.Uint32(3)}},
		{name: "optional/fixed64/invalid", message: &examples.OptionalScalars{Fixed64: proto.Uint64(6)}, expErr: examples.ErrFixed64Cmp_OptionalScalars_Fixed64},
		{name: "optional/fixed64/valid", valid: true, message: &examples.OptionalScalars{Fixed64: proto.Uint64(5)}},
		{name: "optional/sfixed32/invalid", message: &examples.OptionalScalars{Sfixed32: proto.Int32(0)}, expErr: examples.ErrSfixed32Cmp_OptionalScalars_Sfixed32},
		{name: "optional/sfixed32/valid", valid: true, message: &examples.OptionalScalars{Sfixed32: proto.Int32(3)}},
		{name: "optional/sfixed64/invalid", message: &examples.OptionalScalars{Sfixed64: proto.Int64(6)}, expErr: examples.ErrSfixed64Cmp_OptionalScalars_Sfixed64},
		{name: "optional/sfixed64/valid", valid: true, message: &examples.OptionalScalars{Sfixed64: proto.Int64(5)}},
		{name: "optional/string/valid/1", valid: true, message: &examples.OptionalScalars{String_: proto.String("")}},
		{name: "optional/string/valid/2", valid: true, message: &examples.OptionalScalars{String_: proto.String("abc")}},
		{name: "optional/string/invalid", message: &examples.OptionalScalars{String_: proto.String("a")}, expErr: examples.ErrStringLen_OptionalScalars_String_},
		{name: "optonal/bytes/invalid", message: &examples.OptionalScalars{Bytes: []byte("012345678901")}, expErr: examples.ErrBytesLen_OptionalScalars_Bytes},
		{name: "optonal/bytes/valid", valid: true, message: &examples.OptionalScalars{Bytes: []byte("0")}},
		{name: "repeated/valid/1", valid: true, message: &examples.RepeatedScalars{Float: []float32{1}, String_: []string{"", ""}}},
		{name: "repeated/valid/2", valid: true, message: &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4}, String_: []string{"", ""}}},
		{name: "repeated/invalid/1", message: &examples.RepeatedScalars{Double: []float64{4}, String_: []string{"", ""}}, expErr: examples.ErrMinItems_RepeatedScalars_Float},
		{name: "repeated/invalid/2", message: &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4, 5, 6, 7}, String_: []string{"", ""}}, expErr: examples.ErrMaxItems_RepeatedScalars_Double},
		{name: "repeated/invalid/3", message: &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{1}, String_: []string{"", ""}}, expErr: examples.ErrDoubleCmp_RepeatedScalars_Double},
		{name: "repeated/invalid/4", message: &examples.RepeatedScalars{Float: []float32{1}, Double: []float64{4}}, expErr: examples.ErrMinItems_RepeatedScalars_String_},
		{name: "repeated/invalid/5", message: &examples.RepeatedScalars{Float: []float32{7}, String_: []string{"", ""}}, expErr: examples.ErrFloatCmp_RepeatedScalars_Float},
		{name: "strings/valid", valid: true, message: NewStrings().Value()},
		{name: "strings/s3/invalid", message: NewStrings().S3("abc").Value(), expErr: examples.ErrStringLen_Strings_S3},
		{name: "strings/s3/valid", valid: true, message: NewStrings().S3("0123456789").Value()},
		{name: "strings/s4/invalid", message: NewStrings().S4("ABC def").Value(), expErr: examples.ErrPRECISUsernameCaseMapped_Strings_S4},
		{name: "strings/s5/invalid", message: NewStrings().S5("ABC def").Value(), expErr: examples.ErrPRECISUsernameCasePreserved_Strings_S5},
		{name: "strings/s6/invalid/1", message: NewStrings().S6("abc\ndef").Value(), expErr: examples.ErrPRECISOpaqueString_Strings_S6},
		{name: "strings/s6/invalid/2", message: NewStrings().S6("").Value(), expErr: examples.ErrPRECISOpaqueString_Strings_S6},
		{name: "strings/s7/valid", valid: true, message: NewStrings().S7("Hirotaka Yamamoto").Value()},
		{name: "strings/s7/invalid", message: NewStrings().S7("Hirotaka\nYamamoto").Value(), expErr: examples.ErrPRECISNickname_Strings_S7},
		{name: "strings/s8/invalid", message: NewStrings().S8("def").Value(), expErr: examples.ErrStringRegexp_Strings_S8},
		{name: "strings/s9/invalid/1", message: NewStrings().S9("foo").Value(), expErr: examples.ErrEmail_Strings_S9},
		{name: "strings/s9/invalid/2", message: NewStrings().S9("").Value(), expErr: examples.ErrEmail_Strings_S9},
		{name: "strings/s10/invalid/1", message: NewStrings().S10("/abc/def").Value(), expErr: examples.ErrURI_Strings_S10},
		{name: "strings/s10/invalid/2", message: NewStrings().S10("").Value(), expErr: examples.ErrURI_Strings_S10},
		{name: "strings/s11/invalid/1", message: NewStrings().S11("123456789").Value(), expErr: examples.ErrE164_Strings_S11},
		{name: "strings/s11/invalid/2", message: NewStrings().S11("+1234567890123456789").Value(), expErr: examples.ErrE164_Strings_S11},
		{name: "strings/s11/invalid/3", message: NewStrings().S11("").Value(), expErr: examples.ErrE164_Strings_S11},
		{name: "maps/valid", valid: true, message: &examples.Maps{Map1: map[string]int32{"a": 4}}},
		{name: "maps/map1/invalid/1", message: &examples.Maps{Map1: map[string]int32{"a": 3}}, expErr: examples.ErrInt32Cmp_Maps_Map1},
		{name: "maps/map1/invalid/2", message: &examples.Maps{Map1: map[string]int32{}}, expErr: examples.ErrMinItems_Maps_Map1},
		{name: "maps/map2/valid", valid: true, message: &examples.Maps{Map1: map[string]int32{"a": 4}, Map2: map[string]*timestamppb.Timestamp{"a": timestamppb.Now()}}},
		{name: "maps/map2/invalid", message: &examples.Maps{Map1: map[string]int32{"a": 4}, Map2: map[string]*timestamppb.Timestamp{"a": nil}}, expErr: examples.ErrMessageRequiredField_Maps_Map2},
		{name: "maps/map4/invalid", message: &examples.Maps{Map1: map[string]int32{"a": 4}, Map4: map[string]*examples.Scalars{"a": NewScalars().Float(5).Value()}}, expErr: examples.ErrFloatCmp_Scalars_Float},
		{name: "maps/custom/invalid", message: &examples.Maps{Map1: map[string]int32{"a": 4}, Map3: map[uint32]string{0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: ""}}, expErr: examples.ErrValidateCustom},
		{name: "enums/valid/1", valid: true, message: &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}},
		{name: "enums/valid/2", valid: true, message: &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_UNSPECIFIED, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}, E4: &e4val}},
		{name: "enums/e1/invalid", message: &examples.Enums{E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}, expErr: examples.ErrEnumRequired_Enums_E1},
		{name: "enums/e2/invalid", message: &examples.Enums{E1: examples.Enums_Enum(10), E2: examples.Enums_Enum(10), E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}, expErr: examples.ErrEnumDefinedOnly_Enums_E2},
		{name: "enums/e3/invalid/1", message: &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1}}, expErr: examples.ErrMinItems_Enums_E3},
		{name: "enums/e3/invalid/2", message: &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_E_UNSPECIFIED}}, expErr: examples.ErrEnumRequired_Enums_E3},
		{name: "enums/e4/invalid", message: &examples.Enums{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_UNSPECIFIED, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}, E4: &e4val2}, expErr: examples.ErrEnumRequired_Enums_E4},
		{name: "oneofs/valid/1", valid: true, message: &examples.Oneofs{O2: &examples.Oneofs_Bool{Bool: false}}},
		{name: "oneofs/valid/2", valid: true, message: &examples.Oneofs{O1: &examples.Oneofs_Int32{Int32: -3}, O2: &examples.Oneofs_Ts{Ts: timestamppb.Now()}}},
		{name: "oneofs/o1/invalid", message: &examples.Oneofs{O1: &examples.Oneofs_Int32{Int32: 3}, O2: &examples.Oneofs_Ts{Ts: timestamppb.Now()}}, expErr: examples.ErrInt32Cmp_Oneofs_Int32},
		{name: "oneofs/o2/invalid", message: &examples.Oneofs{}, expErr: examples.ErrOneOfRequired_Oneofs_O2},
		{name: "composed/valid/1", valid: true, message: &examples.Composed{Ignored: &examples.Ignored{}}},
		{name: "composed/valid/2", valid: true, message: &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{{E1: examples.Enums_E_VAL1, E2: examples.Enums_E_VAL100, E3: []examples.Enums_Enum{examples.Enums_E_VAL1, examples.Enums_Enum(5)}}}}},
		{name: "composed/scalars/invalid", message: &examples.Composed{Ignored: &examples.Ignored{}, Scalars: NewScalars().Float(5).Value()}, expErr: examples.ErrFloatCmp_Scalars_Float},
		{name: "composed/maps/invalid", message: &examples.Composed{Ignored: &examples.Ignored{}, Maps: []*examples.Maps{{Map1: map[string]int32{"a": 3}}}}, expErr: examples.ErrInt32Cmp_Maps_Map1},
		{name: "composed/enums/invalid/1", message: &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{nil}}, expErr: examples.ErrMessageRequiredField_Composed_Enums},
		{name: "composed/enums/invalid/2", message: &examples.Composed{Ignored: &examples.Ignored{}, Enums: []*examples.Enums{{}}}, expErr: examples.ErrEnumRequired_Enums_E1},
		{name: "inner/valid", valid: true, message: &examples.Nested{Inner: &examples.Nested_Inner{Int32: 4}}},
		{name: "inner/invalid", message: &examples.Nested{Inner: &examples.Nested_Inner{Int32: 3}}, expErr: examples.ErrInt32Cmp_Nested_Inner_Int32},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			err := validate.CallValidate(tt.message)
			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
				assert.ErrorIs(t, err, tt.expErr)
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
func (s *strs) S11(v string) *strs { s.v.S11 = v; return s }
