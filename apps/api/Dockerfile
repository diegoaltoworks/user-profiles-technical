FROM node:22-alpine AS base

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-user-profiles-technical.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN npx turbo prune @repo/api --docker

# Set build arguments
ARG PROJECT_NAME
ARG PROJECT_VERSION
ARG TURSO_DATABASE_URL
ARG TURSO_AUTH_TOKEN

# Check for required build arguments
RUN test -n "$PROJECT_NAME" || (echo "PROJECT_NAME build arg is required" && false)
RUN test -n "$PROJECT_VERSION" || (echo "PROJECT_VERSION build arg is required" && false)
RUN test -n "$TURSO_DATABASE_URL" || (echo "TURSO_DATABASE_URL build arg is required" && false)
RUN test -n "$TURSO_AUTH_TOKEN" || (echo "TURSO_AUTH_TOKEN build arg is required" && false)

# Set environment variables
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION
ENV TURSO_DATABASE_URL=$TURSO_DATABASE_URL
ENV TURSO_AUTH_TOKEN=$TURSO_AUTH_TOKEN

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN npx turbo build --filter=@repo/api...

FROM base AS runner
WORKDIR /app

# Set environment variables
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION
ENV TURSO_DATABASE_URL=$TURSO_DATABASE_URL
ENV TURSO_AUTH_TOKEN=$TURSO_AUTH_TOKEN

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js
