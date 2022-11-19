FROM node:16-alpine 

# Add a work directory
WORKDIR /usr/src/os-api-gateway

# Cache and Install dependencies
COPY ./package.json ./

RUN yarn 

# Copy app files
COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]