const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar produtos
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Itens por página
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [embalagens-plasticas, embalagens-papel, embalagens-metal, embalagens-vidro, outros]
 *         description: Filtrar por categoria
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nome ou descrição
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas produtos em destaque
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, newest, oldest, order]
 *           default: order
 *         description: Campo para ordenação
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalProducts:
 *                       type: integer
 *                     hasNext:
 *                       type: boolean
 *                     hasPrev:
 *                       type: boolean
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Listar todos os produtos ativos
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      featured, 
      page = 1, 
      limit = 12,
      sort = 'order'
    } = req.query;

    const query = { isActive: true };
    
    // Filtros
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Opções de ordenação
    let sortOptions = {};
    switch (sort) {
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { order: 1, name: 1 };
    }

    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-specifications -meta');

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      isActive: true 
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /products/slug/{slug}:
 *   get:
 *     summary: Buscar produto por slug
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Buscar produto por slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    const product = products.find(p => p.slug === req.params.slug);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto por slug:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /products/categories/list:
 *   get:
 *     summary: Listar categorias de produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     description: Valor da categoria
 *                   label:
 *                     type: string
 *                     description: Nome da categoria
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Buscar categorias
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    
    const categoryNames = {
      'embalagens-plasticas': 'Embalagens Plásticas',
      'embalagens-papel': 'Embalagens de Papel',
      'embalagens-metal': 'Embalagens de Metal',
      'embalagens-vidro': 'Embalagens de Vidro',
      'outros': 'Outros'
    };

    const formattedCategories = categories.map(cat => ({
      value: cat,
      label: categoryNames[cat] || cat
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /products/featured/list:
 *   get:
 *     summary: Listar produtos em destaque
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos em destaque
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Produtos em destaque
router.get('/featured/list', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ 
      isActive: true, 
      isFeatured: true 
    })
    .sort({ order: 1, name: 1 })
    .limit(6)
    .select('-specifications -meta');

    res.json(featuredProducts);
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
