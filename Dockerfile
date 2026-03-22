# Build stage (Vite project)
FROM node:20-slim AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy source code and other configuration files (tsconfig, vite.config etc.)
COPY . .

# Build the project
RUN npm run build

# Production stage (serve static files via Nginx)
FROM nginx:stable-alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
