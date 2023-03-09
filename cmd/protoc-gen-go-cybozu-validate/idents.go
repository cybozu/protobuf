package main

import "google.golang.org/protobuf/compiler/protogen"

var (
	identErrorsJoin = protogen.GoIdent{
		GoImportPath: "errors",
		GoName:       "Join",
	}
	identErrorsNew = protogen.GoIdent{
		GoImportPath: "errors",
		GoName:       "New",
	}
	identErrorf = protogen.GoIdent{
		GoImportPath: "fmt",
		GoName:       "Errorf",
	}

	identMailParseAddress = protogen.GoIdent{
		GoImportPath: "net/mail",
		GoName:       "ParseAddress",
	}

	identURLParse = protogen.GoIdent{
		GoImportPath: "net/url",
		GoName:       "Parse",
	}

	identRegexpMustCompile = protogen.GoIdent{
		GoImportPath: "regexp",
		GoName:       "MustCompile",
	}

	identStringsCount = protogen.GoIdent{
		GoImportPath: "strings",
		GoName:       "Count",
	}

	identRuneCountInString = protogen.GoIdent{
		GoImportPath: "unicode/utf8",
		GoName:       "RuneCountInString",
	}

	identCallValidate = protogen.GoIdent{
		GoImportPath: "github.com/cybozu/protobuf/cybozu/validate",
		GoName:       "CallValidate",
	}
	identCallValidateCustom = protogen.GoIdent{
		GoImportPath: "github.com/cybozu/protobuf/cybozu/validate",
		GoName:       "CallValidateCustom",
	}
	identE164Pattern = protogen.GoIdent{
		GoImportPath: "github.com/cybozu/protobuf/cybozu/validate",
		GoName:       "E164Pattern",
	}

	identNormNFC = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/unicode/norm",
		GoName:       "NFC",
	}
	identNormNFD = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/unicode/norm",
		GoName:       "NFD",
	}
	identNormNFKC = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/unicode/norm",
		GoName:       "NFKC",
	}
	identNormNFKD = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/unicode/norm",
		GoName:       "NFKD",
	}

	identPRECISUsernameCaseMapped = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/secure/precis",
		GoName:       "UsernameCaseMapped",
	}
	identPRECISUsernameCasePreserved = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/secure/precis",
		GoName:       "UsernameCasePreserved",
	}
	identPRECISOpaqueString = protogen.GoIdent{
		GoImportPath: "golang.org/x/text/secure/precis",
		GoName:       "OpaqueString",
	}
)
