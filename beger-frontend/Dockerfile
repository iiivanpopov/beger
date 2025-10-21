FROM oven/bun:alpine AS builder
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

COPY . .

ENV VITE_PUBLIC_BASE_URL=/api

RUN bun run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]