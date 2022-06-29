FROM node:16.15.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src/
COPY webpack.config.js .
COPY public/ ./public/
CMD ["npm", "start"]