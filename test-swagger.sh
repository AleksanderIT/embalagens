#!/bin/bash

# Script para testar a documentação Swagger da ETMA Soluções

echo "🧪 Testando Swagger/OpenAPI - ETMA Soluções"
echo "============================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URLs
SWAGGER_URL="http://localhost:5002/api-docs"
HEALTH_URL="http://localhost:5002/api/health"
API_BASE="http://localhost:5002/api"

echo -e "${BLUE}🔍 Verificando se o backend está rodando...${NC}"

# Verificar se o backend está rodando
if ! curl -s $HEALTH_URL > /dev/null; then
    echo -e "${RED}❌ Backend não está rodando na porta 5002${NC}"
    echo -e "${YELLOW}💡 Execute: cd backend && npm run dev${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend está rodando${NC}"

echo -e "${BLUE}📚 Testando documentação Swagger...${NC}"

# Testar acesso ao Swagger
if curl -s $SWAGGER_URL > /dev/null; then
    echo -e "${GREEN}✅ Swagger está acessível em: $SWAGGER_URL${NC}"
else
    echo -e "${RED}❌ Erro ao acessar Swagger${NC}"
    exit 1
fi

echo -e "${BLUE}🔧 Testando endpoints da API...${NC}"

# Testar health check
echo -e "${YELLOW}📊 Testando health check...${NC}"
HEALTH_RESPONSE=$(curl -s $HEALTH_URL)
if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo -e "${GREEN}✅ Health check funcionando${NC}"
    echo "   Resposta: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Health check falhou${NC}"
fi

# Testar endpoint de produtos
echo -e "${YELLOW}📦 Testando endpoint de produtos...${NC}"
PRODUCTS_RESPONSE=$(curl -s "$API_BASE/products?limit=1")
if echo "$PRODUCTS_RESPONSE" | grep -q "products"; then
    echo -e "${GREEN}✅ Endpoint de produtos funcionando${NC}"
else
    echo -e "${RED}❌ Endpoint de produtos falhou${NC}"
fi

# Testar endpoint de categorias
echo -e "${YELLOW}🏷️  Testando endpoint de categorias...${NC}"
CATEGORIES_RESPONSE=$(curl -s "$API_BASE/products/categories/list")
if echo "$CATEGORIES_RESPONSE" | grep -q "embalagens"; then
    echo -e "${GREEN}✅ Endpoint de categorias funcionando${NC}"
else
    echo -e "${RED}❌ Endpoint de categorias falhou${NC}"
fi

# Testar endpoint de contato
echo -e "${YELLOW}📞 Testando endpoint de contato...${NC}"
CONTACT_RESPONSE=$(curl -s "$API_BASE/contact/info")
if echo "$CONTACT_RESPONSE" | grep -q "company"; then
    echo -e "${GREEN}✅ Endpoint de contato funcionando${NC}"
else
    echo -e "${RED}❌ Endpoint de contato falhou${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Testes concluídos!${NC}"
echo ""
echo -e "${BLUE}📋 URLs importantes:${NC}"
echo -e "  🌐 Swagger UI: ${GREEN}$SWAGGER_URL${NC}"
echo -e "  🔧 Health Check: ${GREEN}$HEALTH_URL${NC}"
echo -e "  📦 Produtos: ${GREEN}$API_BASE/products${NC}"
echo -e "  🏷️  Categorias: ${GREEN}$API_BASE/products/categories/list${NC}"
echo -e "  📞 Contato: ${GREEN}$API_BASE/contact/info${NC}"
echo ""
echo -e "${YELLOW}💡 Para testar endpoints protegidos:${NC}"
echo "   1. Acesse $SWAGGER_URL"
echo "   2. Faça login em /auth/login"
echo "   3. Use o token no botão 'Authorize'"
echo ""
echo -e "${BLUE}📚 Documentação completa: docs/SWAGGER.md${NC}"
