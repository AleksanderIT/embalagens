# Swagger/OpenAPI Documentation - ETMA Soluções

## 📚 Visão Geral

O backend da ETMA Soluções agora possui documentação completa da API usando **Swagger/OpenAPI 3.0**. A documentação é interativa e permite testar os endpoints diretamente no navegador.

## 🌐 Acesso à Documentação

### URLs de Acesso
- **Desenvolvimento**: http://localhost:5002/api-docs/
- **Produção**: https://api.etmasolucoes.com.br/api-docs/

## 📋 Endpoints Documentados

### 🔐 Autenticação
- **POST** `/auth/login` - Autenticar usuário
- **GET** `/auth/verify` - Verificar token de autenticação
- **POST** `/auth/logout` - Fazer logout
- **PUT** `/auth/change-password` - Alterar senha do usuário

### 📦 Produtos (Público)
- **GET** `/products` - Listar produtos com filtros e paginação
- **GET** `/products/{id}` - Buscar produto por ID
- **GET** `/products/slug/{slug}` - Buscar produto por slug
- **GET** `/products/categories/list` - Listar categorias de produtos
- **GET** `/products/featured/list` - Listar produtos em destaque

### 🔧 Admin (Autenticado)
- **GET** `/admin/products` - Listar todos os produtos (admin)
- **POST** `/admin/products` - Criar novo produto
- **PUT** `/admin/products/{id}` - Atualizar produto
- **DELETE** `/admin/products/{id}` - Excluir produto
- **PUT** `/admin/products/reorder` - Reordenar produtos
- **POST** `/admin/upload` - Upload de imagem única
- **POST** `/admin/upload/multiple` - Upload de múltiplas imagens

### 📞 Contato
- **POST** `/contact/send` - Enviar mensagem de contato
- **GET** `/contact/info` - Obter informações de contato da empresa

### ⚙️ Sistema
- **GET** `/health` - Verificar status da API

## 🔧 Schemas Definidos

### Product
```json
{
  "_id": "string",
  "name": "string (2-100 chars)",
  "description": "string (min 10 chars)",
  "category": "enum: [embalagens-plasticas, embalagens-papel, embalagens-metal, embalagens-vidro, outros]",
  "specifications": "object",
  "images": {
    "thumbnail": "string",
    "gallery": ["string"],
    "sizes": {
      "small": "string",
      "medium": "string",
      "large": "string"
    }
  },
  "features": ["string"],
  "applications": ["string"],
  "isActive": "boolean",
  "isFeatured": "boolean",
  "order": "number",
  "slug": "string",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

### User
```json
{
  "_id": "string",
  "name": "string",
  "email": "email",
  "role": "enum: [admin, editor]",
  "isActive": "boolean",
  "lastLogin": "date-time"
}
```

### ContactForm
```json
{
  "name": "string (2-100 chars)",
  "email": "email",
  "phone": "string (opcional)",
  "subject": "string (5-200 chars)",
  "message": "string (10-2000 chars)"
}
```

### LoginForm
```json
{
  "email": "email",
  "password": "string (min 6 chars)"
}
```

## 🔐 Autenticação

### Bearer Token
A API usa autenticação JWT com Bearer Token. Para endpoints protegidos:

1. Faça login em `/auth/login`
2. Use o token retornado no header: `Authorization: Bearer <token>`

### Exemplo de Uso
```bash
# Login
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@etma.com","password":"senha123"}'

# Usar token
curl -X GET http://localhost:5002/api/admin/products \
  -H "Authorization: Bearer <seu-token-aqui>"
```

## 🧪 Testando a API

### 1. Acesse a Documentação
Abra http://localhost:5002/api-docs/ no navegador

### 2. Teste Endpoints Públicos
- Clique em qualquer endpoint público
- Clique em "Try it out"
- Preencha os parâmetros (se necessário)
- Clique em "Execute"

### 3. Teste Endpoints Protegidos
1. Primeiro, faça login em `/auth/login`
2. Copie o token retornado
3. Clique no botão "Authorize" no topo da página
4. Cole o token no formato: `Bearer <seu-token>`
5. Agora você pode testar endpoints protegidos

## 📊 Parâmetros de Query

### Produtos
- `page` (integer, default: 1) - Número da página
- `limit` (integer, default: 12) - Itens por página
- `category` (string) - Filtrar por categoria
- `search` (string) - Buscar por nome ou descrição
- `featured` (boolean) - Filtrar apenas produtos em destaque
- `sort` (string) - Campo para ordenação (name, newest, oldest, order)

### Admin
- `page` (integer, default: 1) - Número da página
- `limit` (integer, default: 20) - Itens por página
- `search` (string) - Buscar por nome ou descrição
- `category` (string) - Filtrar por categoria
- `status` (string) - Filtrar por status (active, inactive)

## 📝 Códigos de Resposta

### Sucesso
- **200** - OK (requisição bem-sucedida)
- **201** - Created (recurso criado)

### Erro do Cliente
- **400** - Bad Request (dados inválidos)
- **401** - Unauthorized (não autenticado)
- **403** - Forbidden (não autorizado)
- **404** - Not Found (recurso não encontrado)

### Erro do Servidor
- **500** - Internal Server Error (erro interno)

## 🔧 Configuração

### Desenvolvimento
```bash
# Instalar dependências
cd backend && npm install

# Iniciar servidor
npm run dev

# Acessar documentação
open http://localhost:5002/api-docs/
```

### Produção
```bash
# Build e deploy
npm run build
npm start

# Acessar documentação
open https://api.etmasolucoes.com.br/api-docs/
```

## 📚 Recursos Adicionais

### Exportar Especificação
```bash
# Obter especificação OpenAPI em JSON
curl http://localhost:5002/api-docs/swagger.json

# Obter especificação OpenAPI em YAML
curl http://localhost:5002/api-docs/swagger.yaml
```

### Integração com Ferramentas
- **Postman**: Importe a especificação OpenAPI
- **Insomnia**: Use a URL da documentação
- **VS Code**: Use extensões como "REST Client"

## 🎯 Benefícios

1. **Documentação Interativa**: Teste endpoints diretamente no navegador
2. **Especificação Padrão**: Compatível com OpenAPI 3.0
3. **Autenticação Integrada**: Teste endpoints protegidos facilmente
4. **Validação Automática**: Validação de parâmetros e respostas
5. **Código de Exemplo**: Gera exemplos de código automaticamente
6. **Versionamento**: Controle de versões da API

## 🔄 Atualizações

Para adicionar novos endpoints:

1. Adicione comentários JSDoc com `@swagger` no arquivo da rota
2. Defina schemas no arquivo `src/config/swagger.js`
3. Reinicie o servidor
4. A documentação será atualizada automaticamente

---

**Última atualização**: $(date)
**Versão**: 1.0.0
**OpenAPI**: 3.0.0
