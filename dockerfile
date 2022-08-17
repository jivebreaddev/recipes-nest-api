FROM node:18-alpine

## create user for having non root user
RUN adduser --disabled-password myuser
# setting working directory for docker
WORKDIR /usr/src/app  

## for caching  http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY ./recipe-api/package*.json ./
RUN npm ci

# copying our app to the work dir
COPY ./recipe-api .
# install dependencies


# RUN npm ci --only=production
# https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable
RUN npm run build

EXPOSE 3000

# Start the server using the production build
USER myuser
CMD [ "node", "dist/main.js" ]