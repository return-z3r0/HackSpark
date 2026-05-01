# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
# Frontend seems to be empty in this repo, so we just create a dummy file
RUN echo "Frontend placeholder" > index.html

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/index.html .
# Use a simple http server to serve the placeholder
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
