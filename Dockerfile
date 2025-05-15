# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from build stage
COPY --from=build /app/build .

# Add necessary permissions for nginx to run as non-root
# But initially allow root as required by Coolify
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Copy entrypoint script
COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy nginx config template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

# Use entrypoint script to replace environment variables and start nginx
ENTRYPOINT ["/docker-entrypoint.sh"]