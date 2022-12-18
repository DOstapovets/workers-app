FROM node:18

RUN npm i -g pnpm

COPY package.json .
COPY .pnpmrc .
COPY .pnpm-workspace .

RUN pnpm install

