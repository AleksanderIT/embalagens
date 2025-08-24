const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { auth, editorOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Configuração do Multer para upload de imagens
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  }
});

// Função para processar e salvar imagens
const processAndSaveImage = async (buffer, filename, sizes = ['small', 'medium', 'large']) => {
  const uploadDir = 'uploads';
  const timestamp = Date.now();
  const baseName = path.parse(filename).name;
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  const imageUrls = {};
  
  for (const size of sizes) {
    let width, height;
    
    switch (size) {
      case 'small':
        width = 300;
        height = 300;
        break;
      case 'medium':
        width = 600;
        height = 600;
        break;
      case 'large':
        width = 1200;
        height = 1200;
        break;
      default:
        width = 600;
        height = 600;
    }

    const processedImage = await sharp(buffer)
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const fileName = `${baseName}-${size}-${timestamp}.jpg`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.writeFile(filePath, processedImage);
    imageUrls[size] = `/uploads/${fileName}`;
  }

  return imageUrls;
};

// Middleware de autenticação para todas as rotas
router.use(auth);
router.use(editorOrAdmin);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Listar todos os produtos (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *           default: 20
 *         description: Itens por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nome ou descrição
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [embalagens-plasticas, embalagens-papel, embalagens-metal, embalagens-vidro, outros]
 *         description: Filtrar por categoria
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filtrar por status
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
 *                   $ref: '#/components/schemas/PaginationInfo'
 *       401:
 *         description: Não autorizado
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
// Listar todos os produtos (admin)
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status } = req.query;
    
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (status !== undefined) {
      query.isActive = status === 'active';
    }

    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total
      }
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar novo produto
router.post('/products', [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().isLength({ min: 1 }),
  body('category').isIn(['embalagens-plasticas', 'embalagens-papel', 'embalagens-metal', 'embalagens-vidro', 'outros'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = req.body;
    
    // Definir ordem se não fornecida
    if (!productData.order) {
      const lastProduct = await Product.findOne().sort({ order: -1 });
      productData.order = lastProduct ? lastProduct.order + 1 : 1;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar produto
router.put('/products/:id', [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().isLength({ min: 1 }),
  body('category').isIn(['embalagens-plasticas', 'embalagens-papel', 'embalagens-metal', 'embalagens-vidro', 'outros'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar produto
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Remover imagens do servidor
    if (product.images) {
      const imagePaths = [
        product.images.thumbnail,
        ...product.images.gallery,
        product.images.sizes?.small,
        product.images.sizes?.medium,
        product.images.sizes?.large
      ].filter(Boolean);

      for (const imagePath of imagePaths) {
        try {
          const fullPath = path.join(process.cwd(), imagePath.replace(/^\//, ''));
          await fs.unlink(fullPath);
        } catch (error) {
          console.error('Erro ao remover imagem:', error);
        }
      }
    }

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Upload de imagens
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem fornecida' });
    }

    const imageUrls = await processAndSaveImage(
      req.file.buffer,
      req.file.originalname
    );

    res.json({
      message: 'Imagem enviada com sucesso',
      urls: imageUrls
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Upload múltiplas imagens
router.post('/upload-multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem fornecida' });
    }

    const results = [];
    
    for (const file of req.files) {
      const imageUrls = await processAndSaveImage(
        file.buffer,
        file.originalname
      );
      
      results.push({
        originalName: file.originalname,
        urls: imageUrls
      });
    }

    res.json({
      message: 'Imagens enviadas com sucesso',
      results
    });
  } catch (error) {
    console.error('Erro no upload múltiplo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Reordenar produtos
router.put('/products/reorder', async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Lista de produtos inválida' });
    }

    for (const item of products) {
      await Product.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: 'Ordem atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao reordenar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
