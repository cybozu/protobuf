# Makefile for compiling protobuf files

# Tool versions
BUF_VERSION = 1.57.2
GO_VERSION := $(shell awk '/^go / {print $$2}' go.mod)
PROTOC_GEN_GO_VERSION := $(shell awk '/google.golang.org\/protobuf/ {print substr($$NF, 2)}' go.mod)

## sanity checks
ifeq ($(shell go version | grep -F $(GO_VERSION)),)
$(error Go must be version $(GO_VERSION))
endif

# Variables
PWD := $(shell pwd)
BUF = $(PWD)/bin/buf
RUN_BUF = PATH=$(PWD)/bin:$$PATH ./bin/buf
PROTOC_GEN_GO = $(PWD)/bin/protoc-gen-go
ES_PACKAGES = ./es/packages
ES_PACKAGES_PROTOBUF = ./es/packages/protobuf
ES_PACKAGES_PROTOC_GEN_ES_CYBOZU_VALIDATE = ./es/packages/protoc-gen-es-cybozu-validate

help:
	@echo 'Available targets:'
	@echo '    all:             build everything.'
	@echo '    test:            run tests.'
	@echo '    es-test:         run tests for ECMAScript.'
	@echo '    clean:           remove downloaded files.'
	@echo '    check-generate:  test if the generated files are up-to-date or not.'
	@echo '    lint:            lint protobuf files.'
	@echo '    format:          format protobuf files.'
	@echo '    go:              generate Go code with protoc-gen-go.'
	@echo '    es:              generate ECMAScript code with protoc-gen-es.'
	@echo '    validate:        generate code for normalization/validation for Go.'
	@echo '    es-validate:     generate code for normalization/validation for ECMAScript.'
	@echo '    create-tag:      creates a new Git tag.'

$(BUF):
	mkdir -p bin
	GOBIN=$(PWD)/bin go install github.com/bufbuild/buf/cmd/buf@v$(BUF_VERSION)

$(PROTOC_GEN_GO):
	mkdir -p bin
	GOBIN=$(PWD)/bin go install google.golang.org/protobuf/cmd/protoc-gen-go@v$(PROTOC_GEN_GO_VERSION)

.PHONY: all
all:
	$(MAKE) format
	$(MAKE) go
	$(MAKE) validate

.PHONY: test
test:
	go test -count 1 -v ./...
	go vet ./...
	test -z $$(gofmt -s -l . | tee /dev/stderr)

.PHONY: clean
clean:
	rm -rf bin dist

.PHONY: check-generate
check-generate:
	$(MAKE) all
	go mod tidy
	git diff --exit-code --name-only

.PHONY: lint
lint: $(BUF)
	$(RUN_BUF) lint

.PHONY: format
format: $(BUF)
	$(RUN_BUF) format -w

.PHONY: go
go: $(BUF) $(PROTOC_GEN_GO)
	$(RUN_BUF) generate --template buf.go.gen.yaml

# We build protoc-gen-go-cybozu-validate everytime to
# make sure it is up-to-date.
.PHONY: validate
validate: $(BUF)
	mkdir -p bin
	go build -o bin/protoc-gen-go-cybozu-validate ./cmd/protoc-gen-go-cybozu-validate
	$(RUN_BUF) generate --template buf.go-cybozu-validate.gen.yaml

.PHONY: es
es: $(BUF)
	cd $(ES_PACKAGES) && npm ci
	$(RUN_BUF) generate --template ./buf.es.gen.yaml
	cd $(ES_PACKAGES_PROTOBUF) && npm run build

.PHONY: es-validate
es-validate:
	$(MAKE) es
	cd $(ES_PACKAGES_PROTOC_GEN_ES_CYBOZU_VALIDATE) && npm run build
	$(RUN_BUF) generate --template ./buf.es-cybozu-validate.gen.yaml

.PHONY: es-test
es-test:
	$(MAKE) es-validate
	cd $(ES_PACKAGES_PROTOBUF) && npm run test

.PHONY: create-tag
create-tag:
	./create-tag.sh
