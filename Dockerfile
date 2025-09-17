# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Starts the API
CMD ["node", "dist/main.js"]
