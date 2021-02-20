FROM node:15.5.1-slim

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .