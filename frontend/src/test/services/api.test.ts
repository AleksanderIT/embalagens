import { api } from '../../services/api';
import { Product, ContactForm, LoginForm } from '../../types';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Products API', () => {
    it('should get products list', async () => {
      const mockProducts = [
        {
          _id: '1',
          name: 'Test Product',
          description: 'Test description',
          category: 'embalagens-plasticas',
          images: { thumbnail: '/test.jpg', gallery: [], sizes: {} },
          isActive: true,
          isFeatured: false,
          order: 1
        }
      ];

      const mockResponse = {
        data: {
          products: mockProducts,
          pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue(mockResponse);

      const result = await api.getProducts();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/products');
      expect(result).toEqual(mockResponse.data);
    });

    it('should get product by ID', async () => {
      const mockProduct = {
        _id: '1',
        name: 'Test Product',
        description: 'Test description',
        category: 'embalagens-plasticas',
        images: { thumbnail: '/test.jpg', gallery: [], sizes: {} }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue({ data: mockProduct });

      const result = await api.getProduct('1');
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/products/1');
      expect(result).toEqual(mockProduct);
    });

    it('should get product by slug', async () => {
      const mockProduct = {
        _id: '1',
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test description',
        category: 'embalagens-plasticas',
        images: { thumbnail: '/test.jpg', gallery: [], sizes: {} }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue({ data: mockProduct });

      const result = await api.getProductBySlug('test-product');
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/products/slug/test-product');
      expect(result).toEqual(mockProduct);
    });

    it('should get categories', async () => {
      const mockCategories = [
        { value: 'embalagens-plasticas', label: 'Embalagens Plásticas' },
        { value: 'embalagens-papel', label: 'Embalagens de Papel' }
      ];

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue({ data: mockCategories });

      const result = await api.getCategories();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/products/categories/list');
      expect(result).toEqual(mockCategories);
    });

    it('should get featured products', async () => {
      const mockFeaturedProducts = [
        {
          _id: '1',
          name: 'Featured Product',
          description: 'Featured description',
          category: 'embalagens-plasticas',
          images: { thumbnail: '/test.jpg', gallery: [], sizes: {} },
          isFeatured: true
        }
      ];

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue({ data: mockFeaturedProducts });

      const result = await api.getFeaturedProducts();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/products/featured/list');
      expect(result).toEqual(mockFeaturedProducts);
    });
  });

  describe('Authentication API', () => {
    it('should login user', async () => {
      const loginData: LoginForm = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: {
            _id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin'
          }
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await api.login(loginData);
      
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/auth/login', loginData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should verify token', async () => {
      const mockResponse = {
        data: {
          valid: true,
          user: {
            _id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin'
          }
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue(mockResponse);

      const result = await api.verifyToken();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/auth/verify');
      expect(result).toEqual(mockResponse.data);
    });

    it('should logout user', async () => {
      const mockResponse = { data: { message: 'Logged out successfully' } };

      const axiosInstance = require('axios').create();
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await api.logout();
      
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/auth/logout');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Contact API', () => {
    it('should send contact message', async () => {
      const contactData: ContactForm = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+55 11 99999-9999',
        subject: 'Test Subject',
        message: 'Test message'
      };

      const mockResponse = {
        data: {
          success: true,
          message: 'Message sent successfully'
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await api.sendContactMessage(contactData);
      
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/contact/send', contactData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should get contact info', async () => {
      const mockContactInfo = {
        company: {
          name: 'ETMA Soluções',
          description: 'Especialistas em embalagens'
        },
        address: {
          street: 'Rua Teste, 123',
          city: 'São Paulo',
          state: 'SP'
        },
        contact: {
          phone: '+55 11 99999-9999',
          email: 'contato@etma.com.br',
          website: 'https://etma.com.br'
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue({ data: mockContactInfo });

      const result = await api.getContactInfo();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/contact/info');
      expect(result).toEqual(mockContactInfo);
    });
  });

  describe('Health Check', () => {
    it('should check API health', async () => {
      const mockResponse = {
        data: {
          status: 'ok',
          timestamp: new Date().toISOString(),
          uptime: 12345
        }
      };

      const axiosInstance = require('axios').create();
      axiosInstance.get.mockResolvedValue(mockResponse);

      const result = await api.healthCheck();
      
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/health');
      expect(result).toEqual(mockResponse.data);
    });
  });
});
