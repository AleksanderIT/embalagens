# Configurações de Portas - ETMA Soluções

## 🚀 Portas Configuradas

### Backend
- **Porta**: 5002
- **URL**: `http://localhost:5002`
- **API**: `http://localhost:5002/api`
- **Health Check**: `http://localhost:5002/api/health`

### Frontend
- **Porta**: 3002
- **URL**: `http://localhost:3002`
- **Proxy**: Configurado para `http://localhost:5002`

## 📋 Como Iniciar

### Opção 1: Script Automático (Recomendado)
```bash
npm run dev
```

### Opção 2: Manual
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Opção 3: Docker
```bash
docker-compose up -d
```

## 🔧 Configurações Atualizadas

### Backend
- ✅ `backend/src/server.js` - Porta 5002
- ✅ `backend/env.example` - PORT=5002
- ✅ `backend/ecosystem.dev.js` - PORT=5002
- ✅ `backend/ecosystem.config.js` - PORT=5002
- ✅ `backend/Dockerfile` - EXPOSE 5002

### Frontend
- ✅ `frontend/package.json` - Script start com PORT=3002
- ✅ `frontend/Dockerfile` - EXPOSE 3002
- ✅ `frontend/nginx.conf` - listen 3002
- ✅ `frontend/public/` - Arquivos estáticos criados

### Docker
- ✅ `docker-compose.yml` - Portas 5002:5002 e 3002:3002
- ✅ `docker-compose.prod.yml` - Porta 3002:80
- ✅ `Dockerfile` (raiz) - EXPOSE 5002
- ✅ `nginx.conf` - Upstream servers atualizados

### Documentação
- ✅ `README.md` - URLs atualizadas
- ✅ `setup.sh` - Mensagens atualizadas
- ✅ `docs/API.md` - URLs de exemplo atualizadas
- ✅ `docs/DEPLOY.md` - Configurações de deploy atualizadas

## 🌐 URLs de Acesso

### Desenvolvimento
- **Frontend**: http://localhost:3002
- **Backend**: http://localhost:5002
- **API**: http://localhost:5002/api

### Produção (Docker)
- **Frontend**: http://localhost:3002
- **Backend**: http://localhost:5002
- **API**: http://localhost:5002/api

## 📊 Status de Verificação

### Backend
```bash
curl http://localhost:5002/api/health
# Resposta esperada: {"status":"OK","message":"ETMA API está funcionando"}
```

### Frontend
```bash
curl http://localhost:3002
# Resposta esperada: HTML da aplicação React
```

## 🔍 Troubleshooting

### Porta já em uso
```bash
# Verificar processos na porta
lsof -i :5002
lsof -i :3002

# Matar processo se necessário
kill -9 <PID>
```

### Problemas de CORS
- Backend configurado para aceitar requisições de `http://localhost:3002`
- Frontend configurado com proxy para `http://localhost:5002`

### Logs
- **Backend**: `backend.log` (quando usando start-dev.sh)
- **Frontend**: `frontend.log` (quando usando start-dev.sh)

## 📝 Notas Importantes

1. **MongoDB**: Certifique-se de que o MongoDB está rodando na porta 27017
2. **Dependências**: Execute `npm run install:all` se necessário
3. **Variáveis de Ambiente**: Copie `backend/env.example` para `backend/.env`
4. **Arquivos Públicos**: O diretório `frontend/public/` foi criado com arquivos necessários

## 🚀 Próximos Passos

1. Iniciar o ambiente: `npm run dev`
2. Acessar o frontend: http://localhost:3002
3. Verificar a API: http://localhost:5002/api/health
4. Começar o desenvolvimento!

---

**Última atualização**: $(date)
**Versão**: 1.0.0
