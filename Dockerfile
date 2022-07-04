ARG ENV=""
ARG ENV_BUILD=".envbuild"
ARG GIT_TAG=""
ARG GIT_REF=""

FROM node:16.15.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/
ARG ENV_BUILD
COPY ${ENV_BUILD} .env

ARG GIT_TAG
ARG GIT_REF
ENV REACT_APP_VERSION="${GIT_TAG}${GIT_REF}"
RUN echo ${VERSION} ${GIT_TAG} ${GIT_REF}

RUN npm run build

FROM builder as tester

RUN npm run test -- --watchAll=false

FROM nginx:1.23.0

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80