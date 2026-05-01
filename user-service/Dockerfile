# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm run db:generate

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

RUN npm install --omit=dev

EXPOSE 8001

CMD ["node", "dist/index.js"]
