FROM node:16.15.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/

RUN npm run build

CMD ["npm", "start"]

FROM nginx:1.23.0

EXPOSE 80

COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80