# Manual Deployment Procedure:
# 1. Run production build `yarn build`
# 2. Delete node_modules folder
# 3. Install production dependencies `yarn install --frozen-lockfile --prod`
# 4. Build new docker image `docker build -t <image_name> .` (optional for testing predeployment)
# 5. Login to fly `flyctl auth login`
# 6. Deploy new image `flyctl deploy` 

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY /dist/ /app/dist/
COPY /node_modules/ /app/node_modules/
COPY package.json /app/
COPY yarn.lock /app/
EXPOSE 8080
CMD ["yarn", "start:prodserver"]