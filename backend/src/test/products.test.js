const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');

describe('Products Routes', () => {
  let testProduct;

  beforeAll(async () => {
    // Criar produto de teste
    testProduct = new Product({
      name: 'Test Product',
      description: 'Test product description',
      category: 'embalagens-plasticas',
      specifications: {
        material: 'PET',
        capacidade: '500ml'
      },
      images: {
        thumbnail: '/uploads/test-thumbnail.jpg',
        gallery: ['/uploads/test1.jpg', '/uploads/test2.jpg'],
        sizes: {
          small: '/uploads/test-small.jpg',
          medium: '/uploads/test-medium.jpg',
          large: '/uploads/test-large.jpg'
        }
      },
      features: ['Sustentável', 'Reciclável'],
      applications: ['Alimentos', 'Cosméticos'],
      isActive: true,
      isFeatured: true,
      order: 1
    });
    await testProduct.save();
  });

  afterAll(async () => {
    await Product.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('should return all active products', async () => {
      const response = await request(app)
        .get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.products)).toBe(true);
    });

    it('should filter by category', async () => {
      const response = await request(app)
        .get('/api/products?category=embalagens-plasticas');

      expect(response.status).toBe(200);
      expect(response.body.products.every(p => p.category === 'embalagens-plasticas')).toBe(true);
    });

    it('should search products', async () => {
      const response = await request(app)
        .get('/api/products?search=Test');

      expect(response.status).toBe(200);
      expect(response.body.products.some(p => p.name.includes('Test'))).toBe(true);
    });

    it('should return featured products only', async () => {
      const response = await request(app)
        .get('/api/products?featured=true');

      expect(response.status).toBe(200);
      expect(response.body.products.every(p => p.isFeatured)).toBe(true);
    });

    it('should handle pagination', async () => {
      const response = await request(app)
        .get('/api/products?page=1&limit=5');

      expect(response.status).toBe(200);
      expect(response.body.pagination).toHaveProperty('currentPage', 1);
      expect(response.body.pagination).toHaveProperty('totalPages');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by ID', async () => {
      const response = await request(app)
        .get(`/api/products/${testProduct._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testProduct._id.toString());
      expect(response.body.name).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/products/${fakeId}`);

      expect(response.status).toBe(404);
    });

    it('should return 404 for inactive product', async () => {
      const inactiveProduct = new Product({
        name: 'Inactive Product',
        description: 'Inactive product description',
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/inactive-thumbnail.jpg',
          gallery: [],
          sizes: {}
        },
        isActive: false
      });
      await inactiveProduct.save();

      const response = await request(app)
        .get(`/api/products/${inactiveProduct._id}`);

      expect(response.status).toBe(404);
      await Product.findByIdAndDelete(inactiveProduct._id);
    });
  });

  describe('GET /api/products/categories/list', () => {
    it('should return list of categories', async () => {
      const response = await request(app)
        .get('/api/products/categories/list');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('value');
      expect(response.body[0]).toHaveProperty('label');
    });
  });

  describe('GET /api/products/featured/list', () => {
    it('should return featured products', async () => {
      const response = await request(app)
        .get('/api/products/featured/list');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.every(p => p.isFeatured)).toBe(true);
    });
  });
});
