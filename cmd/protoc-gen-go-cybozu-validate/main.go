package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

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
		if f.Desc.Package() == "cybozu.validate" {
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
