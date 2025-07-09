# Etapa base para dependencias
ARG NODE_ENV=production
FROM node:18-alpine AS prod
FROM node:18 AS dev

# Selección dinámica de la base según el contexto
FROM prod AS base
ARG NODE_ENV

# Si es desarrollo, usa node:18
RUN if [ "$NODE_ENV" = "development" ]; then \
    echo "Usando imagen de desarrollo (node:18)"; \
  else \
    echo "Usando imagen de producción (node:18-alpine)"; \
  fi

WORKDIR /app

# Instalar OpenSSL para Prisma (solo en Alpine)
RUN if [ "$NODE_ENV" = "production" ]; then apk add --no-cache openssl; fi

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .
COPY prisma ./prisma
COPY scripts ./scripts

RUN npx prisma generate

# Construir la aplicación (solo en producción)
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start:prod"]