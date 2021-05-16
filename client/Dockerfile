FROM node:alpine as builder

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn

# start app
RUN yarn build

# # stage1 as builder
# FROM node:10-alpine as builder

# # copy the package.json to install dependencies
# COPY package.json yarn.lock ./

# # Install the dependencies and make the folder
# RUN npm install && mkdir /nextjs-ui && mv ./node_modules ./nextjs-ui

# WORKDIR /nextjs-ui

# COPY . .

# # Build the project and copy the files
# RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
# COPY --from=builder /nextjs-ui/out /usr/share/nginx/html
COPY --from=builder /usr/src/out /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]