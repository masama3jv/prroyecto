# Fase 1: Dependències
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Fase 2: Producció
FROM node:18-alpine

WORKDIR /app

# Només instal·lem les dependències de producció per estalviar espai
COPY package*.json ./
RUN npm ci --only=production

# Copiem el codi des de la fase anterior
COPY --from=builder /app/src ./src

EXPOSE 3000

# Executem el projecte sense nodemon, directament amb node
CMD ["npm", "start"]
