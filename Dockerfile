ARG ENV=""
ARG ENV_BUILD=".envbuild"
ARG BUILD_VERSION="X.Y.Z-REF"
ARG BUILD_ENV="env"

FROM node:16.15.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/
ARG ENV_BUILD
COPY ${ENV_BUILD} .env

ARG BUILD_VERSION
ARG BUILD_ENV
ENV REACT_APP_BUILD_VERSION="${BUILD_VERSION}"
ENV REACT_APP_BUILD_ENV="${BUILD_ENV}"
RUN echo ${VERSION} ${GIT_TAG} ${GIT_REF}

RUN npm run build

FROM builder as tester

RUN npm run test -- --watchAll=false

FROM nginx:1.23.0

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80