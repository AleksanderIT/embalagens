#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento ETMA Soluções
# Backend na porta 5002 e Frontend na porta 3002

echo "🚀 Iniciando ETMA Soluções - Ambiente de Desenvolvimento"
echo "========================================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Porta $1 já está em uso${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Porta $1 está livre${NC}"
        return 0
    fi
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    exit 1
fi

echo -e "${BLUE}🔍 Verificando portas...${NC}"

# Verificar portas
check_port 5002 || exit 1
check_port 3002 || exit 1

echo -e "${BLUE}📋 Verificando dependências...${NC}"

# Verificar se as dependências estão instaladas
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do backend...${NC}"
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do frontend...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${BLUE}🔧 Iniciando aplicações...${NC}"

# Função para limpar processos ao sair
cleanup() {
    echo -e "\n${YELLOW}🛑 Parando aplicações...${NC}"
    pkill -f "node.*backend" 2>/dev/null
    pkill -f "react-scripts" 2>/dev/null
    echo -e "${GREEN}✅ Aplicações paradas${NC}"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar backend em background
echo -e "${YELLOW}🔧 Iniciando backend na porta 5002...${NC}"
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
echo -e "${BLUE}⏳ Aguardando backend inicializar...${NC}"
sleep 5

# Verificar se backend está rodando
if curl -s http://localhost:5002/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend iniciado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar backend${NC}"
    echo "Logs do backend:"
    cat backend.log
    cleanup
fi

# Iniciar frontend em background
echo -e "${YELLOW}🌐 Iniciando frontend na porta 3002...${NC}"
cd frontend
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Aguardar frontend inicializar
echo -e "${BLUE}⏳ Aguardando frontend inicializar...${NC}"
sleep 10

# Verificar se frontend está rodando
if curl -s http://localhost:3002 > /dev/null; then
    echo -e "${GREEN}✅ Frontend iniciado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar frontend${NC}"
    echo "Logs do frontend:"
    cat frontend.log
    cleanup
fi

echo ""
echo -e "${GREEN}🎉 Ambiente de desenvolvimento iniciado com sucesso!${NC}"
echo ""
echo -e "${BLUE}📋 URLs:${NC}"
echo -e "  🌐 Frontend: ${GREEN}http://localhost:3002${NC}"
echo -e "  🔧 Backend: ${GREEN}http://localhost:5002${NC}"
echo -e "  📊 Health Check: ${GREEN}http://localhost:5002/api/health${NC}"
echo ""
echo -e "${BLUE}📁 Logs:${NC}"
echo -e "  📝 Backend: ${YELLOW}backend.log${NC}"
echo -e "  📝 Frontend: ${YELLOW}frontend.log${NC}"
echo ""
echo -e "${YELLOW}💡 Pressione Ctrl+C para parar as aplicações${NC}"
echo ""

# Manter script rodando
while true; do
    sleep 1
done
