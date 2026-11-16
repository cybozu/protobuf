package examples_test

import (
	"testing"

	"github.com/cybozu/protobuf/cybozu/stability"
	"github.com/cybozu/protobuf/examples"
	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func TestStability(t *testing.T) {
	// stabilityOf returns the stability option of an element, or nil when the
	// element has none.
	stabilityOf := func(d protoreflect.Descriptor, xt protoreflect.ExtensionType) *stability.Stability {
		s, _ := proto.GetExtension(d.Options(), xt).(*stability.Stability)
		return s
	}

	svc := examples.File_examples_stability_proto.Services().ByName("BookService")
	assert.Nil(t, stabilityOf(svc, stability.E_Service))
	assert.Nil(t, stabilityOf(svc.Methods().ByName("GetBook"), stability.E_Method))

	search := stabilityOf(svc.Methods().ByName("SearchBooks"), stability.E_Method)
	assert.Equal(t, stability.Stage_STAGE_PREVIEW, search.GetStage())
	assert.Equal(t, "book-search", search.GetReleaseFlag())

	get := (&examples.GetBookRequest{}).ProtoReflect().Descriptor()
	assert.Nil(t, stabilityOf(get, stability.E_Message))
	assert.Nil(t, stabilityOf(get.Fields().ByName("id"), stability.E_Field))
	reviews := stabilityOf(get.Fields().ByName("include_reviews"), stability.E_Field)
	assert.Equal(t, stability.Stage_STAGE_PREVIEW, reviews.GetStage())
	assert.Empty(t, reviews.GetReleaseFlag())

	req := (&examples.SearchBooksRequest{}).ProtoReflect().Descriptor()
	assert.Equal(t, stability.Stage_STAGE_PREVIEW, stabilityOf(req, stability.E_Message).GetStage())
}
