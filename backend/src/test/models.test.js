// const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

describe('Models', () => {
  describe('User Model', () => {
    it('should create user with valid data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'admin'
      };

      const user = new User(userData);
      await user.save();

      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.role).toBe(userData.role);
      expect(user.isActive).toBe(true);
      expect(user.password).not.toBe(userData.password); // Should be hashed

      await User.findByIdAndDelete(user._id);
    });

    it('should hash password before saving', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'admin'
      };

      const user = new User(userData);
      await user.save();

      expect(user.password).not.toBe(userData.password);
      expect(user.password.length).toBeGreaterThan(20); // bcrypt hash length

      await User.findByIdAndDelete(user._id);
    });

    it('should validate email format', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
        role: 'admin'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    it('should validate required fields', async () => {
      const user = new User({});
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    it('should validate role enum', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'invalid-role'
      };

      const user = new User(userData);
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.role).toBeDefined();
    });

    it('should compare passwords correctly', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'admin'
      };

      const user = new User(userData);
      await user.save();

      const isMatch = await user.comparePassword('password123');
      const isNotMatch = await user.comparePassword('wrongpassword');

      expect(isMatch).toBe(true);
      expect(isNotMatch).toBe(false);

      await User.findByIdAndDelete(user._id);
    });
  });

  describe('Product Model', () => {
    it('should create product with valid data', async () => {
      const productData = {
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
      };

      const product = new Product(productData);
      await product.save();

      expect(product.name).toBe(productData.name);
      expect(product.description).toBe(productData.description);
      expect(product.category).toBe(productData.category);
      expect(product.isActive).toBe(true);
      expect(product.isFeatured).toBe(true);
      expect(product.order).toBe(1);
      expect(product.slug).toBe('test-product');

      await Product.findByIdAndDelete(product._id);
    });

    it('should generate slug from name', async () => {
      const productData = {
        name: 'Produto Teste com Acentos',
        description: 'Test description',
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const product = new Product(productData);
      await product.save();

      expect(product.slug).toBe('produto-teste-com-acentos');

      await Product.findByIdAndDelete(product._id);
    });

    it('should validate required fields', async () => {
      const product = new Product({});
      let error;

      try {
        await product.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.description).toBeDefined();
      expect(error.errors.category).toBeDefined();
    });

    it('should validate category enum', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        category: 'invalid-category',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const product = new Product(productData);
      let error;

      try {
        await product.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.category).toBeDefined();
    });

    it('should validate name length', async () => {
      const productData = {
        name: 'A', // Too short
        description: 'Test description',
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const product = new Product(productData);
      let error;

      try {
        await product.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
    });

    it('should validate description length', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Short', // Too short
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const product = new Product(productData);
      let error;

      try {
        await product.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.description).toBeDefined();
    });

    it('should set default values', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        category: 'embalagens-plasticas',
        images: {
          thumbnail: '/uploads/test.jpg',
          gallery: [],
          sizes: {}
        }
      };

      const product = new Product(productData);
      await product.save();

      expect(product.isActive).toBe(true);
      expect(product.isFeatured).toBe(false);
      expect(product.order).toBe(0);
      expect(product.features).toEqual([]);
      expect(product.applications).toEqual([]);

      await Product.findByIdAndDelete(product._id);
    });

    it('should create text indexes for search', async () => {
      const indexes = await Product.collection.getIndexes();
      const textIndexes = Object.values(indexes).filter(index => index.text);

      expect(textIndexes.length).toBeGreaterThan(0);
    });
  });
});
