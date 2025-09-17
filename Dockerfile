# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build the app (generates dist/)
RUN npm run build

# ---- Run stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./ 

# Expose app port (optional, docs only)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
