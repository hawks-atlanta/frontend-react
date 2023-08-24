# --- Build stage ---
FROM node:20.5.1-alpine3.18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Run stage ---
FROM nginx:1-alpine3.18-slim AS runner

COPY ./config/default.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/capyfile/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
