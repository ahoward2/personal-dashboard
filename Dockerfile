FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

RUN npm prune --production

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:server"]

