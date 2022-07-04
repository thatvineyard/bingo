ENV=prod
ifeq (${ENV},prod)
DOCKER_COMPOSE_FILE := docker-compose.yml
ENV_FILE := .env
GIT_TAG := 123
GIT_REF := 10fa3621
else
DOCKER_COMPOSE_FILE := docker-compose.${ENV}.yml
ENV_FILE := .env.${ENV}
GIT_TAG := 123
GIT_REF := 10fa3621
endif


build:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE}  build --build-arg GIT_TAG=${GIT_TAG} GIT_REF=${GIT_REF}

start:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} up -f

stop:
	docker-compose -f ${DOCKER_COMPOSE_FILE} --env-file=${ENV_FILE} down