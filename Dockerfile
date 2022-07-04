FROM node:16.15.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/

RUN npm run build

CMD ["bash", "-c", "npm start"]

FROM builder as tester

RUN npm run test -- --watchAll=false

# CMD ["bash", "-c", "npm test -- --watch"]

FROM nginx:1.23.0

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80