#!/bin/bash

# Script para executar todos os testes do projeto ETMA Soluções
# Backend e Frontend

echo "🧪 Executando Testes - ETMA Soluções"
echo "======================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se um comando foi executado com sucesso
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Verificando dependências...${NC}"

# Verificar se as dependências estão instaladas
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do backend...${NC}"
    cd backend && npm install
    check_status "Dependências do backend instaladas"
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do frontend...${NC}"
    cd frontend && npm install
    check_status "Dependências do frontend instaladas"
    cd ..
fi

echo -e "${BLUE}🔧 Executando linting...${NC}"

# Linting do backend
echo -e "${YELLOW}📝 Linting do backend...${NC}"
cd backend
npm run lint
check_status "Linting do backend concluído"
cd ..

# Linting do frontend
echo -e "${YELLOW}📝 Linting do frontend...${NC}"
cd frontend
npm run lint
check_status "Linting do frontend concluído"
cd ..

echo -e "${BLUE}🧪 Executando testes do backend...${NC}"

# Testes do backend
cd backend
echo -e "${YELLOW}🔬 Testes unitários do backend...${NC}"
npm test -- --coverage --watchAll=false
check_status "Testes unitários do backend concluídos"

echo -e "${YELLOW}🔍 Testes de integração do backend...${NC}"
npm run test:integration
check_status "Testes de integração do backend concluídos"
cd ..

echo -e "${BLUE}🧪 Executando testes do frontend...${NC}"

# Testes do frontend
cd frontend
echo -e "${YELLOW}🔬 Testes unitários do frontend...${NC}"
npm test -- --coverage --watchAll=false --passWithNoTests
check_status "Testes unitários do frontend concluídos"
cd ..

echo -e "${BLUE}🔍 Executando testes E2E...${NC}"

# Testes E2E (se configurados)
if [ -f "cypress.config.js" ]; then
    echo -e "${YELLOW}🌐 Testes E2E com Cypress...${NC}"
    npm run test:e2e
    check_status "Testes E2E concluídos"
else
    echo -e "${YELLOW}⚠️  Testes E2E não configurados${NC}"
fi

echo -e "${BLUE}📊 Gerando relatório de cobertura...${NC}"

# Gerar relatório de cobertura combinado
if [ -d "backend/coverage" ] && [ -d "frontend/coverage" ]; then
    echo -e "${YELLOW}📈 Relatório de cobertura do backend:${NC}"
    cat backend/coverage/lcov-report/index.html | grep -o 'coverage.*%' || echo "Cobertura não disponível"
    
    echo -e "${YELLOW}📈 Relatório de cobertura do frontend:${NC}"
    cat frontend/coverage/lcov-report/index.html | grep -o 'coverage.*%' || echo "Cobertura não disponível"
fi

echo ""
echo -e "${GREEN}🎉 Todos os testes foram executados com sucesso!${NC}"
echo ""
echo -e "${BLUE}📋 Resumo:${NC}"
echo "  ✅ Linting do backend"
echo "  ✅ Linting do frontend"
echo "  ✅ Testes unitários do backend"
echo "  ✅ Testes de integração do backend"
echo "  ✅ Testes unitários do frontend"
echo "  ✅ Testes E2E (se configurados)"
echo ""
echo -e "${BLUE}📁 Relatórios de cobertura:${NC}"
echo "  📊 Backend: backend/coverage/lcov-report/index.html"
echo "  📊 Frontend: frontend/coverage/lcov-report/index.html"
echo ""
echo -e "${BLUE}🚀 Próximos passos:${NC}"
echo "  1. Verificar relatórios de cobertura"
echo "  2. Corrigir quaisquer problemas encontrados"
echo "  3. Executar testes novamente se necessário"
echo "  4. Fazer deploy quando todos os testes passarem"
