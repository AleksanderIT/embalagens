#!/bin/bash

echo "🚀 Iniciando setup do projeto ETMA Soluções..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o MongoDB está instalado
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB não encontrado. Certifique-se de que o MongoDB está instalado e rodando."
    echo "   Você pode baixar em: https://www.mongodb.com/try/download/community"
fi

echo "📦 Instalando dependências do backend..."
cd backend
npm install

echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

echo "🔧 Configurando variáveis de ambiente..."
cd ../backend
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Arquivo .env criado. Configure suas variáveis de ambiente."
else
    echo "✅ Arquivo .env já existe."
fi

echo "📁 Criando diretório de uploads..."
mkdir -p uploads

echo "🎉 Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente no arquivo backend/.env"
echo "2. Inicie o MongoDB"
echo "3. Execute o backend: cd backend && npm run dev"
echo "4. Execute o frontend: cd frontend && npm start"
echo ""
echo "🌐 O frontend estará disponível em: http://localhost:3002"
echo "🔧 A API estará disponível em: http://localhost:5002"
echo ""
echo "📚 Para mais informações, consulte o README.md"
