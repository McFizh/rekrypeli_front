# Build frontend
FROM node:12-slim AS builder

WORKDIR /services

COPY *.js package* ./
COPY src src
COPY public public

RUN npm ci ; npm run build

# Create container for running frontend
FROM nginx:1.18

EXPOSE 80

COPY --from=builder /services/dist /usr/share/nginx/html
