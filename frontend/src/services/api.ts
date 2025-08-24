import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Product, 
  ProductsResponse, 
  CategoryOption, 
  AuthResponse, 
  LoginForm, 
  ContactForm, 
  ContactInfo,
  ProductForm,
  UploadResponse
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token de autenticação
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para tratar erros de resposta
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Produtos
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
    sort?: string;
  }): Promise<ProductsResponse> {
    const response = await this.api.get('/products', { params });
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await this.api.get(`/products/slug/${slug}`);
    return response.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await this.api.get('/products/featured/list');
    return response.data;
  }

  async getCategories(): Promise<CategoryOption[]> {
    const response = await this.api.get('/products/categories/list');
    return response.data;
  }

  // Autenticação
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async verifyToken(): Promise<{ user: any; valid: boolean }> {
    const response = await this.api.get('/auth/verify');
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
  }

  // Admin - Produtos
  async getAdminProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<ProductsResponse> {
    const response = await this.api.get('/admin/products', { params });
    return response.data;
  }

  async createProduct(productData: ProductForm): Promise<Product> {
    const response = await this.api.post('/admin/products', productData);
    return response.data;
  }

  async updateProduct(id: string, productData: Partial<ProductForm>): Promise<Product> {
    const response = await this.api.put(`/admin/products/${id}`, productData);
    return response.data;
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const response = await this.api.delete(`/admin/products/${id}`);
    return response.data;
  }

  async reorderProducts(products: Array<{ id: string; order: number }>): Promise<{ message: string }> {
    const response = await this.api.put('/admin/products/reorder', { products });
    return response.data;
  }

  // Upload de imagens
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await this.api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async uploadMultipleImages(files: File[]): Promise<{
    message: string;
    results: Array<{
      originalName: string;
      urls: {
        small: string;
        medium: string;
        large: string;
      };
    }>;
  }> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await this.api.post('/admin/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Contato
  async sendContactMessage(message: ContactForm): Promise<{ message: string; success: boolean }> {
    const response = await this.api.post('/contact/send', message);
    return response.data;
  }

  async getContactInfo(): Promise<ContactInfo> {
    const response = await this.api.get('/contact/info');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const api = new ApiService();
export default api;
