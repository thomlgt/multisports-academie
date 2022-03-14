### STAGE 1:BUILD ###
FROM node:16.14-alpine3.14 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/front .
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
