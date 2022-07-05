ENV=prod

# Set environment based values
ifeq (${ENV},prod)
DOCKER_COMPOSE_FILE := docker-compose.yml
ENV_FILE := .env
else
DOCKER_COMPOSE_FILE := docker-compose.${ENV}.yml
ENV_FILE := .env.${ENV}
endif

# Calc verison
GIT_TAG := $(shell git describe --tags --abbrev=0)
GIT_REF := $(shell git log -1 --pretty=format:'%h' --abbrev=0)
ifeq (${GIT_REF},)
BUILD_VERSION := ${GIT_TAG}
else
BUILD_VERSION := ${GIT_TAG}-${GIT_REF}
endif


.PHONY: build start logs stop

build:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} build --build-arg BUILD_VERSION=${BUILD_VERSION} --build-arg BUILD_ENV=${ENV}

start:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} up -d

logs:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} logs -f

stop:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} down