FROM node:16.4-alpine3.14 AS builder
WORKDIR /dist/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --production
CMD ["npm", "run", "start:prod"]