const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');
const User = require('../models/User');

describe('Admin Routes', () => {
  let adminToken;
  let testProduct;

  beforeAll(async () => {
    // Criar usuário admin
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();

    // Login para obter token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });
    adminToken = loginResponse.body.token;

    // Criar produto de teste
    testProduct = new Product({
      name: 'Admin Test Product',
      description: 'Admin test product description',
      category: 'embalagens-plasticas',
      images: {
        thumbnail: '/uploads/admin-test-thumbnail.jpg',
        gallery: [],
        sizes: {}
      },
      isActive: true,
      isFeatured: false,
      order: 1
    });
    await testProduct.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  describe('GET /api/admin/products', () => {
    it('should return all products for admin', async () => {
      const response = await request(app)
        .get('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('pagination');
    });

    it('should filter products by status', async () => {
      const response = await request(app)
        .get('/api/admin/products?status=active')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.products.every(p => p.isActive)).toBe(true);
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/admin/products');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/admin/products', () => {
    it('should create new product', async () => {
      const newProduct = {
        name: 'New Test Product',
        description: 'New test product description',
        category: 'embalagens-papel',
        images: {
          thumbnail: '/uploads/new-test-thumbnail.jpg',
          gallery: [],
          sizes: {}
        },
        isActive: true,
        isFeatured: false,
        order: 2
      };

      const response = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Test Product');
      expect(response.body.category).toBe('embalagens-papel');
    });

    it('should validate required fields', async () => {
      const invalidProduct = {
        name: 'Invalid Product'
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidProduct);

      expect(response.status).toBe(400);
    });

    it('should validate category enum', async () => {
      const invalidProduct = {
        name: 'Invalid Category Product',
        description: 'Test description',
        category: 'invalid-category',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const response = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidProduct);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/admin/products/:id', () => {
    it('should update product', async () => {
      const updateData = {
        name: 'Updated Product Name',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/admin/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Product Name');
      expect(response.body.description).toBe('Updated description');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/admin/products/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/admin/products/:id', () => {
    it('should delete product', async () => {
      const productToDelete = new Product({
        name: 'Product to Delete',
        description: 'Will be deleted',
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/delete-test.jpg',
          gallery: [],
          sizes: {}
        },
        isActive: true
      });
      await productToDelete.save();

      const response = await request(app)
        .delete(`/api/admin/products/${productToDelete._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');

      // Verify product was deleted
      const deletedProduct = await Product.findById(productToDelete._id);
      expect(deletedProduct).toBeNull();
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/admin/products/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/admin/products/reorder', () => {
    it('should reorder products', async () => {
      const product1 = new Product({
        name: 'Product 1',
        description: 'First product',
        category: 'embalagens-plasticas',
        images: { thumbnail: '/uploads/p1.jpg', gallery: [], sizes: {} },
        order: 1
      });
      const product2 = new Product({
        name: 'Product 2',
        description: 'Second product',
        category: 'embalagens-plasticas',
        images: { thumbnail: '/uploads/p2.jpg', gallery: [], sizes: {} },
        order: 2
      });
      await product1.save();
      await product2.save();

      const reorderData = {
        products: [
          { id: product1._id.toString(), order: 2 },
          { id: product2._id.toString(), order: 1 }
        ]
      };

      const response = await request(app)
        .put('/api/admin/products/reorder')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(reorderData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');

      // Clean up
      await Product.findByIdAndDelete(product1._id);
      await Product.findByIdAndDelete(product2._id);
    });
  });
});
