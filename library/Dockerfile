FROM node:20.17-alpine

WORKDIR /library

ARG NODE_ENV=production

COPY ./*.json ./
RUN npm install
COPY ./ ./

CMD ["npm","run","prod"]