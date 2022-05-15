FROM node:16.15.0-alpine3.14
# ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn tsc

CMD [ "node", "dist/index.js" ]
