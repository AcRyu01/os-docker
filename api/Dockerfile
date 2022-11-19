FROM node:16-alpine 

# Add a work directory
WORKDIR /usr/src/os-docker/api

# Cache and Install dependencies
COPY ./package.json ./

RUN yarn 

# Copy app files
COPY . .

EXPOSE 80

CMD [ "yarn", "start" ]