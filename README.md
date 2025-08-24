# ETMA Soluções - Site de Embalagens

## 📋 Análise do Site Atual

Baseado nas imagens analisadas, o site atual possui as seguintes páginas:

### Páginas Identificadas:
1. **Home** - História da empresa (2 partes)
2. **Produtos** - Catálogo de produtos
3. **Produto-Detalhe** - Visualização detalhada de cada produto
4. **Contato** - Informações de contato (email, telefone, endereço)
5. **FAQ** - Perguntas frequentes
6. **A Empresa** - História da empresa

## 🚀 Nova Solução Proposta

### Frontend
- **Framework**: React.js com TypeScript
- **Template Base**: Utica Fluid (Squarespace)
- **Responsividade**: Mobile-first design
- **UI/UX**: Interface moderna e fluida
- **Animações**: Framer Motion
- **Estilização**: Tailwind CSS

### Backend
- **Framework**: Node.js com Express
- **Banco de Dados**: MongoDB
- **API**: RESTful API
- **Upload de Imagens**: Suporte a múltiplos tamanhos
- **Autenticação**: JWT
- **Validação**: Express Validator

### Área Administrativa
- **Dashboard**: Gerenciamento de produtos
- **CRUD**: Create, Read, Update, Delete de produtos
- **Upload**: Sistema de upload de imagens com redimensionamento
- **Autenticação**: Sistema de login seguro
- **Interface**: React com TypeScript

## 📁 Estrutura do Projeto

```
ETMA-Solucao/
├── frontend/          # React.js + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   ├── types/         # Tipos TypeScript
│   │   └── utils/         # Utilitários
│   └── public/            # Arquivos estáticos
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/        # Modelos do MongoDB
│   │   ├── routes/        # Rotas da API
│   │   ├── middleware/    # Middlewares
│   │   └── utils/         # Utilitários
│   └── uploads/           # Imagens enviadas
├── admin/             # Área administrativa (integrada ao frontend)
└── docs/              # Documentação
    ├── API.md         # Documentação da API REST
    ├── SWAGGER.md     # Documentação Swagger/OpenAPI
    ├── DEPLOY.md      # Guias de deploy
    └── REVIEW.md      # Revisão da solução
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Hook Form
- React Hot Toast
- Lucide React (ícones)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (upload de arquivos)
- JWT (autenticação)
- Sharp (redimensionamento de imagens)
- Bcryptjs (hash de senhas)
- Helmet (segurança)
- CORS
- Express Validator

### DevOps
- Docker
- Docker Compose
- PM2 (process manager)

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- MongoDB 6.0+
- npm ou yarn

### Setup Rápido
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd ETMA-Solucao

# Execute o script de setup
./setup.sh
```

### Setup Manual

#### 1. Backend
```bash
cd backend
npm install
cp env.example .env
# Configure as variáveis no arquivo .env
npm run dev
```

#### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```env
# Configurações do Servidor
PORT=5002
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://root:root123@localhost:27017/etma?retryWrites=true&w=majority

# JWT
JWT_SECRET=sua_chave_secreta_jwt_aqui

# Frontend URL
FRONTEND_URL=http://localhost:3002

# Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads
```

## 🐳 Docker

### Desenvolvimento
```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Produção
```bash
# Build das imagens
docker-compose -f docker-compose.prod.yml up -d
```

## 📱 Funcionalidades

### Frontend Público
- ✅ Página inicial responsiva
- ✅ Catálogo de produtos com filtros
- ✅ Detalhes do produto
- ✅ Página sobre a empresa
- ✅ Formulário de contato
- ✅ FAQ
- ✅ Design mobile-first

### Área Administrativa
- ✅ Login seguro
- ✅ Dashboard de produtos
- ✅ CRUD completo de produtos
- ✅ Upload de imagens com redimensionamento
- ✅ Gerenciamento de categorias
- ✅ Interface responsiva

### API
- ✅ RESTful API
- ✅ Autenticação JWT
- ✅ Upload de arquivos
- ✅ Validação de dados
- ✅ Rate limiting
- ✅ CORS configurado

## 🎨 Design System

O projeto utiliza um design system baseado no template Utica Fluid com:

- **Cores**: Paleta de azuis e cinzas com acentos em amarelo
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: Botões, cards, inputs padronizados
- **Animações**: Transições suaves com Framer Motion
- **Responsividade**: Mobile-first com breakpoints do Tailwind

## 🔒 Segurança

- Autenticação JWT
- Hash de senhas com bcrypt
- Validação de entrada
- Rate limiting
- Headers de segurança (Helmet)
- CORS configurado
- Upload seguro de arquivos

## 📊 Performance

- Lazy loading de imagens
- Compressão de imagens automática
- Múltiplos tamanhos de imagem
- Otimização de bundle
- Cache de API
- CDN ready

## 🚀 Deploy

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Heroku (Backend)
```bash
cd backend
heroku create
heroku config:set NODE_ENV=production
git push heroku main
```

### DigitalOcean App Platform
- Conecte o repositório
- Configure as variáveis de ambiente
- Deploy automático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📚 Documentação da API

### Swagger/OpenAPI
A API possui documentação interativa usando Swagger/OpenAPI 3.0:

- **URL**: http://localhost:5002/api-docs/
- **Recursos**:
  - Documentação interativa de todos os endpoints
  - Teste de endpoints diretamente no navegador
  - Autenticação integrada para endpoints protegidos
  - Especificação OpenAPI 3.0 completa
  - Schemas detalhados de todos os modelos

### Como Usar o Swagger
1. Acesse http://localhost:5002/api-docs/
2. Para endpoints públicos: Clique em "Try it out" e execute
3. Para endpoints protegidos: 
   - Faça login em `/auth/login`
   - Clique em "Authorize" e cole o token
   - Teste os endpoints protegidos

### Documentação Detalhada
- **docs/SWAGGER.md** - Guia completo do Swagger
- **docs/API.md** - Documentação da API REST

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para contato@etmasolucoes.com.br ou abra uma issue no repositório.
