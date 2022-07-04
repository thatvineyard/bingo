FROM node:16.15.1 AS builder

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/
COPY .env .env

RUN npm run build

FROM builder as tester

RUN npm run test -- --watchAll=false

FROM nginx:1.23.0

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80