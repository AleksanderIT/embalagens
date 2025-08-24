const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ETMA Soluções API',
      version: '1.0.0',
      description: 'API para o site da ETMA Soluções - Especialistas em embalagens sustentáveis',
      contact: {
        name: 'ETMA Soluções',
        email: 'contato@etmasolucoes.com.br',
        url: 'https://etmasolucoes.com.br'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5002/api',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api.etmasolucoes.com.br/api',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticação'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do produto'
            },
            name: {
              type: 'string',
              description: 'Nome do produto',
              minLength: 2,
              maxLength: 100
            },
            description: {
              type: 'string',
              description: 'Descrição do produto',
              minLength: 10
            },
            category: {
              type: 'string',
              enum: ['embalagens-plasticas', 'embalagens-papel', 'embalagens-metal', 'embalagens-vidro', 'outros'],
              description: 'Categoria do produto'
            },
            specifications: {
              type: 'object',
              description: 'Especificações técnicas do produto'
            },
            images: {
              type: 'object',
              properties: {
                thumbnail: { type: 'string' },
                gallery: { type: 'array', items: { type: 'string' } },
                sizes: {
                  type: 'object',
                  properties: {
                    small: { type: 'string' },
                    medium: { type: 'string' },
                    large: { type: 'string' }
                  }
                }
              }
            },
            features: {
              type: 'array',
              items: { type: 'string' },
              description: 'Características do produto'
            },
            applications: {
              type: 'array',
              items: { type: 'string' },
              description: 'Aplicações do produto'
            },
            isActive: {
              type: 'boolean',
              description: 'Status ativo do produto'
            },
            isFeatured: {
              type: 'boolean',
              description: 'Produto em destaque'
            },
            order: {
              type: 'number',
              description: 'Ordem de exibição'
            },
            slug: {
              type: 'string',
              description: 'Slug para URL amigável'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          },
          required: ['name', 'description', 'category']
        },
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            role: {
              type: 'string',
              enum: ['admin', 'editor'],
              description: 'Papel do usuário'
            },
            isActive: {
              type: 'boolean',
              description: 'Status ativo do usuário'
            },
            lastLogin: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ContactForm: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do contato',
              minLength: 2,
              maxLength: 100
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do contato'
            },
            phone: {
              type: 'string',
              description: 'Telefone do contato (opcional)'
            },
            subject: {
              type: 'string',
              description: 'Assunto da mensagem',
              minLength: 5,
              maxLength: 200
            },
            message: {
              type: 'string',
              description: 'Mensagem',
              minLength: 10,
              maxLength: 2000
            }
          },
          required: ['name', 'email', 'subject', 'message']
        },
        LoginForm: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              minLength: 6
            }
          },
          required: ['email', 'password']
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        PaginationInfo: {
          type: 'object',
          properties: {
            currentPage: {
              type: 'number',
              description: 'Página atual'
            },
            totalPages: {
              type: 'number',
              description: 'Total de páginas'
            },
            totalItems: {
              type: 'number',
              description: 'Total de itens'
            },
            itemsPerPage: {
              type: 'number',
              description: 'Itens por página'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            message: {
              type: 'string',
              description: 'Descrição detalhada do erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para autenticação de usuários'
      },
      {
        name: 'Produtos',
        description: 'Endpoints públicos para produtos'
      },
      {
        name: 'Admin',
        description: 'Endpoints administrativos (requer autenticação)'
      },
      {
        name: 'Contato',
        description: 'Endpoints para envio de mensagens de contato'
      },
      {
        name: 'Sistema',
        description: 'Endpoints do sistema'
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
