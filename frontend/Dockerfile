# Fase 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Construïm els fitxers estàtics per producció
RUN npm run build

# Fase 2: Servidor web (Nginx)
FROM nginx:alpine

# Copiem el build generat cap a la carpeta pública del Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiem la configuració per defecte de Nginx si fos necessari per rutes de React
# Aquí usarem un default basic on nginx serveix estàtics
# Si tens problemes de rutes en refrescar (react-router), caldria un nginx.conf custom

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
