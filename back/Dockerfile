FROM node:14-alpine3.12 AS build
WORKDIR /dist/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
CMD ["npm", "run", "start:prod"]