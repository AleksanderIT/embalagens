# API Documentation - ETMA Soluções

## Base URL
```
http://localhost:5002/api
```

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token>
```

## Endpoints

### Autenticação

#### POST /auth/login
Login de usuário.

**Body:**
```json
{
  "email": "admin@etmasolucoes.com.br",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Administrador",
    "email": "admin@etmasolucoes.com.br",
    "role": "admin"
  }
}
```

#### GET /auth/verify
Verificar se o token é válido.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Administrador",
    "email": "admin@etmasolucoes.com.br",
    "role": "admin"
  },
  "valid": true
}
```

### Produtos (Público)

#### GET /products
Listar produtos com filtros e paginação.

**Query Parameters:**
- `page` (number): Página atual (padrão: 1)
- `limit` (number): Itens por página (padrão: 12)
- `category` (string): Filtrar por categoria
- `search` (string): Buscar por nome/descrição
- `featured` (boolean): Apenas produtos em destaque
- `sort` (string): Ordenação (order, name, newest, oldest)

**Response:**
```json
{
  "products": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "Embalagem Plástica Premium",
      "description": "Embalagem sustentável de alta qualidade",
      "category": "embalagens-plasticas",
      "images": {
        "thumbnail": "/uploads/produto-thumbnail.jpg",
        "gallery": ["/uploads/produto1.jpg", "/uploads/produto2.jpg"],
        "sizes": {
          "small": "/uploads/produto-small.jpg",
          "medium": "/uploads/produto-medium.jpg",
          "large": "/uploads/produto-large.jpg"
        }
      },
      "features": ["Sustentável", "Reciclável"],
      "applications": ["Alimentos", "Cosméticos"],
      "isActive": true,
      "isFeatured": true,
      "order": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### GET /products/:id
Buscar produto por ID.

**Response:**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "Embalagem Plástica Premium",
  "description": "Embalagem sustentável de alta qualidade",
  "category": "embalagens-plasticas",
  "specifications": {
    "material": "PET reciclado",
    "capacidade": "500ml",
    "peso": "15g"
  },
  "images": {
    "thumbnail": "/uploads/produto-thumbnail.jpg",
    "gallery": ["/uploads/produto1.jpg", "/uploads/produto2.jpg"],
    "sizes": {
      "small": "/uploads/produto-small.jpg",
      "medium": "/uploads/produto-medium.jpg",
      "large": "/uploads/produto-large.jpg"
    }
  },
  "features": ["Sustentável", "Reciclável"],
  "applications": ["Alimentos", "Cosméticos"],
  "isActive": true,
  "isFeatured": true,
  "order": 1,
  "meta": {
    "title": "Embalagem Plástica Premium - ETMA Soluções",
    "description": "Embalagem sustentável de alta qualidade",
    "keywords": ["embalagem", "plástico", "sustentável"]
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### GET /products/slug/:slug
Buscar produto por slug.

#### GET /products/categories/list
Listar categorias disponíveis.

**Response:**
```json
[
  {
    "value": "embalagens-plasticas",
    "label": "Embalagens Plásticas"
  },
  {
    "value": "embalagens-papel",
    "label": "Embalagens de Papel"
  }
]
```

#### GET /products/featured/list
Listar produtos em destaque.

### Produtos (Admin) - Requer Autenticação

#### GET /admin/products
Listar produtos para administração.

**Query Parameters:**
- `page` (number): Página atual
- `limit` (number): Itens por página
- `search` (string): Buscar por nome/descrição
- `category` (string): Filtrar por categoria
- `status` (string): Filtrar por status (active/inactive)

#### POST /admin/products
Criar novo produto.

**Body:**
```json
{
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "category": "embalagens-plasticas",
  "specifications": {
    "material": "PET",
    "capacidade": "1L"
  },
  "features": ["Sustentável"],
  "applications": ["Alimentos"],
  "isActive": true,
  "isFeatured": false,
  "order": 1,
  "images": {
    "thumbnail": "/uploads/thumbnail.jpg",
    "gallery": ["/uploads/gallery1.jpg"],
    "sizes": {
      "small": "/uploads/small.jpg",
      "medium": "/uploads/medium.jpg",
      "large": "/uploads/large.jpg"
    }
  }
}
```

#### PUT /admin/products/:id
Atualizar produto.

#### DELETE /admin/products/:id
Deletar produto.

#### PUT /admin/products/reorder
Reordenar produtos.

**Body:**
```json
{
  "products": [
    { "id": "60f7b3b3b3b3b3b3b3b3b3b3", "order": 1 },
    { "id": "60f7b3b3b3b3b3b3b3b3b3b4", "order": 2 }
  ]
}
```

### Upload de Imagens (Admin) - Requer Autenticação

#### POST /admin/upload
Upload de uma imagem.

**Body:** FormData com campo `image`

**Response:**
```json
{
  "message": "Imagem enviada com sucesso",
  "urls": {
    "small": "/uploads/imagem-small-1234567890.jpg",
    "medium": "/uploads/imagem-medium-1234567890.jpg",
    "large": "/uploads/imagem-large-1234567890.jpg"
  }
}
```

#### POST /admin/upload-multiple
Upload de múltiplas imagens.

**Body:** FormData com campo `images` (array)

### Contato

#### POST /contact/send
Enviar mensagem de contato.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+55 11 99999-9999",
  "subject": "Solicitação de Orçamento",
  "message": "Gostaria de solicitar um orçamento..."
}
```

#### GET /contact/info
Obter informações de contato da empresa.

**Response:**
```json
{
  "company": {
    "name": "ETMA Soluções",
    "description": "Especialistas em embalagens sustentáveis"
  },
  "address": {
    "street": "Rua das Embalagens, 123",
    "neighborhood": "Centro Industrial",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  },
  "contact": {
    "phone": "+55 (11) 1234-5678",
    "whatsapp": "+55 (11) 98765-4321",
    "email": "contato@etmasolucoes.com.br",
    "website": "www.etmasolucoes.com.br"
  },
  "social": {
    "linkedin": "https://linkedin.com/company/etma-solucoes",
    "instagram": "https://instagram.com/etmasolucoes",
    "facebook": "https://facebook.com/etmasolucoes"
  },
  "businessHours": {
    "monday": "08:00 - 18:00",
    "tuesday": "08:00 - 18:00",
    "wednesday": "08:00 - 18:00",
    "thursday": "08:00 - 18:00",
    "friday": "08:00 - 18:00",
    "saturday": "08:00 - 12:00",
    "sunday": "Fechado"
  }
}
```

### Health Check

#### GET /health
Verificar status da API.

**Response:**
```json
{
  "status": "OK",
  "message": "ETMA API está funcionando"
}
```

## Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Rate Limiting

- API pública: 100 requests por 15 minutos
- Upload de imagens: 10 requests por 15 minutos
- Login: 5 requests por 15 minutos

## Categorias de Produtos

- `embalagens-plasticas` - Embalagens Plásticas
- `embalagens-papel` - Embalagens de Papel
- `embalagens-metal` - Embalagens de Metal
- `embalagens-vidro` - Embalagens de Vidro
- `outros` - Outros

## Exemplos de Uso

### JavaScript/Node.js
```javascript
const axios = require('axios');

// Configurar base URL
const api = axios.create({
  baseURL: 'http://localhost:5002/api'
});

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Buscar produtos
const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Upload de imagem
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
```

### cURL
```bash
# Login
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@etmasolucoes.com.br","password":"senha123"}'

# Buscar produtos
curl http://localhost:5002/api/products?page=1&limit=10

# Upload de imagem
curl -X POST http://localhost:5002/api/admin/upload \
  -H "Authorization: Bearer <token>" \
  -F "image=@imagem.jpg"
```
