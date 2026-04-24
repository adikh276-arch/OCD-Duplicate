FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built assets into the subpath directory
COPY --from=builder /app/dist /usr/share/nginx/html/ocd_selfcare

# Remove default nginx config and replace with subpath config
RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
