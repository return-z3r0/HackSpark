# Step 1: Base image
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Step 2: Dependencies
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Step 3: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Add environment variables if needed during build time
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
RUN pnpm run build

# Step 4: Production (Serve with Nginx)
FROM nginx:stable-alpine AS runner
# Copy custom nginx config if you have one, otherwise use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]