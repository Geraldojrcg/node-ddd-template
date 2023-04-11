FROM node:16-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .