GOVERSION := $(shell go version | cut -d ' ' -f 3 | cut -d '.' -f 2)
NAME=github.com/raystack/frontier
TAG := $(shell git rev-list --tags --max-count=1)
VERSION := $(shell git describe --tags ${TAG})
.PHONY: build check fmt lint test test-race vet test-cover-html help install proto ui
.DEFAULT_GOAL := build
PROTON_COMMIT := "a581f01a8c3e6cc8593363b6e06c2fa715455a47"

ui:
	@echo " > generating ui build"
	@cd ui && $(MAKE) 

install:
	@echo "Clean up imports..."
	@go mod download
	@go install github.com/vektra/mockery/v2@v2.32.4

build:
	CGO_ENABLED=0 go build -ldflags "-X ${NAME}/config.Version=${VERSION}" -o frontier .

generate: ## run all go generate in the code base (including generating mock files)
	@go generate ./...
	@echo " > generating mock files"
	@mockery

lint: ## Run linters
	golangci-lint run

lint-fix:
	golangci-lint run --fix

# TODO: create separate command for integration tests
test: ## Run tests
	@go test -race $(shell go list ./... | grep -v /ui | grep -v /vendor/ | grep -v /test/) -coverprofile=coverage.out -count 2 -timeout 150s

test-all: test e2e-smoke-test e2e-regression-test integration-test lint ## Run all tests

e2e-test: ## Run all e2e tests
	## run `docker network prune` if docker fails to find non-overlapping ipv4 address pool
	go test -v -race ./test/e2e/...

e2e-smoke-test: ## Run smoke tests
	go test -v -race ./test/e2e/smoke

e2e-regression-test: ## Run regression tests
	go test -v -race ./test/e2e/regression

integration-test:
	go test -v -race ./test/integration

benchmark: ## Run benchmarks
	go test -run=XX -bench=Benchmark. -count 3 -benchtime=1s github.com/raystack/frontier/test/integration

coverage: ## print code coverage
	go test -race -coverprofile coverage.out -covermode=atomic ./... -tags=unit_test && go tool cover -html=coverage.out

clean :
	rm -rf dist

proto: ## Generate the protobuf files
	@echo " > generating protobuf from raystack/proton"
	@echo " > [info] make sure correct version of dependencies are installed using 'make install'"
	@buf generate https://github.com/raystack/proton/archive/${PROTON_COMMIT}.zip#strip_components=1 --template buf.gen.yaml --path raystack/frontier
	@cp -R proto/raystack/frontier/* proto/ && rm -Rf proto/raystack
	@echo " > protobuf compilation finished"

clean-doc:
	@echo "> cleaning up auto-generated docs"
	@rm -rf ./docs/docs/reference/cli.md

doc: clean-doc ## Generate api and cli documentation
	@echo "> generate cli docs"
	@go run . reference --plain | sed '1 s,.*,# CLI,' > ./docs/docs/reference/cli.md
	@echo ">generate api docs"
	@cd $(CURDIR)/docs/docs; yarn docusaurus clean-api-docs all;  yarn docusaurus gen-api-docs all
	@echo "> format api docs"
	@npx prettier --write $(CURDIR)/docs/docs/apis/*.mdx

doc-build: ## Run documentation locally
	@echo "> building docs"
	@cd $(CURDIR)/docs/docs; yarn start

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
