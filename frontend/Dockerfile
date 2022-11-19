# Stage 1 - The building process
FROM node:16-alpine AS builder
# Add a work directory
WORKDIR /usr/src/os-frontend
# Cache and Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

# Stage 2 - Bundle static assets with nginx
FROM nginx:1.23-alpine as production
# Copy built assets from builder
COPY --from=builder /usr/src/os-frontend/build /usr/share/nginx/html
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]