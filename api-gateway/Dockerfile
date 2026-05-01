FROM oven/bun:1-alpine as builder
WORKDIR /app
COPY package.json .
RUN bun install
COPY . .

FROM oven/bun:1-alpine as runtime
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 8000
CMD ["bun", "run", "src/index.ts"]
