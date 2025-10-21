FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN bun i

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PORT
ARG DATABASE_URL
ARG REDIS_URL
ARG SHEET_URL
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET
ARG ADMIN_PASSWORD
ENV NODE_ENV=production

RUN bun build:prod

FROM base AS prod-deps
COPY package.json ./
RUN bun i --omit=dev --omit=peer --omit=optional

FROM oven/bun:alpine AS runtime
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY drizzle ./drizzle
COPY drizzle.config.ts ./

ENV NODE_ENV=production

ENTRYPOINT ["bun", "dist:prod"]