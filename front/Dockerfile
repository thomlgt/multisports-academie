### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
FROM node:14-alpine3.12 AS build
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /app/dist/front .
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80
