FROM node:10.21.0-alpine3.11

COPY . /opt/2b
WORKDIR /opt/2b
RUN npm install