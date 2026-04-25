FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]
