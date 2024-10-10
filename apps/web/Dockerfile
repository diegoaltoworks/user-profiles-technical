FROM node:22-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-user-profiles-technical.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN npx turbo prune @repo/web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .

# Set build arguments
ARG PROJECT_NAME
ARG PROJECT_VERSION
ARG NEXT_PUBLIC_API_HOST
ARG NEXT_PUBLIC_WEB_HOST
ARG NEXT_PUBLIC_GITHUB_USERNAME

# Check for required build arguments
RUN test -n "$PROJECT_NAME" || (echo "PROJECT_NAME build arg is required" && false)
RUN test -n "$PROJECT_VERSION" || (echo "PROJECT_VERSION build arg is required" && false)
RUN test -n "$NEXT_PUBLIC_API_HOST" || (echo "NEXT_PUBLIC_API_HOST build arg is required" && false)
RUN test -n "$NEXT_PUBLIC_WEB_HOST" || (echo "NEXT_PUBLIC_WEB_HOST build arg is required" && false)
RUN test -n "$NEXT_PUBLIC_GITHUB_USERNAME" || (echo "NEXT_PUBLIC_GITHUB_USERNAME build arg is required" && false)

# Set environment variables
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_WEB_HOST=$NEXT_PUBLIC_WEB_HOST
ENV NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN npx turbo build --filter=@repo/web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Set runtime environment variables
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_WEB_HOST=$NEXT_PUBLIC_WEB_HOST
ENV NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME

CMD node apps/web/server.js
