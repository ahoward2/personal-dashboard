# For this to work, yarn install and yarn build must be
# run locally then the image must be built and ran/pushed from local.
# Would be ideal to automate this in the cheapest way possible for
# deployments to a linode instance (aws is overkill).
# Also should use docker compose to manage secrets otherwise linode may
# have some good solution.

# To run:
#
# - Must have .env file with necessary secrets
# - Run yarn install && yarn build
# - docker build -t . austinhowardtech/composable-dashboard
# - docker run -p 8080 austinhowardtech/composable-dashboard
#

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
RUN yarn install --frozen-lockfile --prod
COPY /dist/ /app/dist/
COPY /node_modules/ /app/node_modules/
COPY package.json /app/
COPY yarn.lock /app/
EXPOSE 8080
CMD ["node", "dist/server/main.js"]