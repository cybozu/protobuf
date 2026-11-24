package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/types/pluginpb"

	"github.com/cybozu/protobuf/cybozu/validate"
)

// skipPackages are the packages of the custom options. Their messages are
// option values, not API messages, so they need no validation code, and their
// Go packages must not depend on cybozu/validate.
var skipPackages = map[protoreflect.FullName]struct{}{
	"cybozu.validate":  {},
	"cybozu.stability": {},
}

func main() {
	opts := protogen.Options{}
	opts.Run(pluginMain)
}

func pluginMain(p *protogen.Plugin) error {
	p.SupportedFeatures |= uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)
	if len(os.Args) == 0 {
		return errors.New("no args")
	}
	me := filepath.Base(os.Args[0])
	if err := checkOptionsVersion(p); err != nil {
		return err
	}

	for _, f := range p.Files {
		if !f.Generate {
			continue
		}
		if len(f.Messages) == 0 {
			// nothing to generate
			continue
		}
		if _, ok := skipPackages[f.Desc.Package()]; ok {
			continue
		}
		filename := fmt.Sprintf("%s_cybozu_validate.pb.go", f.GeneratedFilenamePrefix)
		gen := p.NewGeneratedFile(filename, f.GoImportPath)
		renderer := NewRenderer(me, gen)
		if err := renderer.Execute(f.GoPackageName, f.Messages); err != nil {
			return err
		}
	}
	return nil
}

// checkOptionsVersion fails when the protos were compiled against a
// cybozu/validate/options.proto whose extension numbers differ from the ones
// this generator reads. Without the check, the generator would find no
// options and silently generate no validation.
func checkOptionsVersion(p *protogen.Plugin) error {
	want := validate.E_Rules.TypeDescriptor()
	f, ok := p.FilesByPath[want.ParentFile().Path()]
	if !ok {
		return nil
	}
	exts := f.Desc.Extensions()
	for i := 0; i < exts.Len(); i++ {
		ext := exts.Get(i)
		if ext.FullName() != want.FullName() {
			continue
		}
		if ext.Number() != want.Number() {
			return fmt.Errorf("%s has number %d, but this generator reads %d: use the same version of github.com/cybozu/protobuf for the protos and the generator",
				ext.FullName(), ext.Number(), want.Number())
		}
	}
	return nil
}
