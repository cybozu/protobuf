package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/types/pluginpb"
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
