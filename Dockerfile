# Multi-stage build para otimizar o tamanho da imagem
FROM node:18-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências
RUN npm ci --only=production

# Stage para build do frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copiar arquivos do frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage para build do backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copiar arquivos do backend
COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

# Stage final
FROM node:18-alpine AS runner

WORKDIR /app

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=base /app/node_modules ./node_modules
COPY --from=frontend-builder /app/frontend/build ./frontend/build
COPY --from=backend-builder /app/backend ./backend

# Criar diretório de uploads
RUN mkdir -p backend/uploads && chown -R nextjs:nodejs backend/uploads

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 5002

# Comando para iniciar a aplicação
CMD ["node", "backend/src/server.js"]
