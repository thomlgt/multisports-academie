FROM node:16.14-alpine3.14 AS builder
WORKDIR /dist/src/app
COPY package.json ./
# RUN rm -rf nodes_modules
RUN npm install
# RUN npm uninstall bcrypt && npm i bcrypt:5.0.1
# RUN apk add --no-cache make gcc g++ && \
#   npm install && \
#   npm rebuild bcrypt --build-from-source && \
#   apk del make gcc g++
COPY . .
RUN npm run build --production
CMD ["npm", "run", "start:prod"]