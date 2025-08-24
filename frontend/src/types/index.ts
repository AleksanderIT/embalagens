export interface Product {
  _id: string;
  name: string;
  description: string;
  category: ProductCategory;
  specifications: Record<string, string>;
  images: {
    thumbnail: string;
    gallery: string[];
    sizes: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  features: string[];
  applications: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
  slug?: string;
}

export type ProductCategory = 
  | 'embalagens-plasticas'
  | 'embalagens-papel'
  | 'embalagens-metal'
  | 'embalagens-vidro'
  | 'outros';

export interface CategoryOption {
  value: ProductCategory;
  label: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ContactInfo {
  company: {
    name: string;
    description: string;
  };
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    website: string;
  };
  social: {
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ProductForm {
  name: string;
  description: string;
  category: ProductCategory;
  specifications: Record<string, string>;
  features: string[];
  applications: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  images: {
    thumbnail: string;
    gallery: string[];
    sizes: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface UploadResponse {
  message: string;
  urls: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
