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
	assertPreview := func(t *testing.T, d protoreflect.Descriptor, xt protoreflect.ExtensionType) {
		t.Helper()
		assert.Equal(t, stability.Stage_STAGE_PREVIEW, stabilityOf(d, xt).GetStage(), d.FullName())
	}
	file := examples.File_examples_stability_proto

	t.Run("service and method", func(t *testing.T) {
		svc := file.Services().ByName("BookService")
		assert.Nil(t, stabilityOf(svc, stability.E_Service))
		assert.Nil(t, stabilityOf(svc.Methods().ByName("GetBook"), stability.E_Method))

		search := stabilityOf(svc.Methods().ByName("SearchBooks"), stability.E_Method)
		assert.Equal(t, stability.Stage_STAGE_PREVIEW, search.GetStage())
		assert.Equal(t, "book-search", search.GetReleaseFlag())

		review := file.Services().ByName("BookReviewService")
		assertPreview(t, review, stability.E_Service)
		assert.Nil(t, stabilityOf(review.Methods().ByName("ListReviews"), stability.E_Method))
	})

	t.Run("message and field", func(t *testing.T) {
		get := (&examples.GetBookRequest{}).ProtoReflect().Descriptor()
		assert.Nil(t, stabilityOf(get, stability.E_Message))
		assert.Nil(t, stabilityOf(get.Fields().ByName("id"), stability.E_Field))
		reviews := stabilityOf(get.Fields().ByName("include_reviews"), stability.E_Field)
		assert.Equal(t, stability.Stage_STAGE_PREVIEW, reviews.GetStage())
		assert.Empty(t, reviews.GetReleaseFlag())

		assertPreview(t, (&examples.SearchBooksRequest{}).ProtoReflect().Descriptor(), stability.E_Message)
	})

	t.Run("enum and enum value", func(t *testing.T) {
		format := examples.BookFormat(0).Descriptor()
		assert.Nil(t, stabilityOf(format, stability.E_Enum))
		assert.Nil(t, stabilityOf(format.Values().ByName("BOOK_FORMAT_PAPER"), stability.E_EnumValue))
		assertPreview(t, format.Values().ByName("BOOK_FORMAT_AUDIO"), stability.E_EnumValue)

		assertPreview(t, examples.ReviewOrder(0).Descriptor(), stability.E_Enum)
	})

	t.Run("nested", func(t *testing.T) {
		res := (&examples.GetBookResponse{}).ProtoReflect().Descriptor()
		assert.Nil(t, stabilityOf(res, stability.E_Message))
		assertPreview(t, res.Messages().ByName("Edition"), stability.E_Message)
		assertPreview(t, res.Enums().ByName("Binding"), stability.E_Enum)
		assertPreview(t, res.Fields().ByName("edition"), stability.E_Field)
	})
}
