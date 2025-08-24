import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

// Mock components
jest.mock('../components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('../components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

// Mock pages
jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('../pages/Products', () => {
  return function MockProducts() {
    return <div data-testid="products-page">Products Page</div>;
  };
});

jest.mock('../pages/ProductDetail', () => {
  return function MockProductDetail() {
    return <div data-testid="product-detail-page">Product Detail Page</div>;
  };
});

jest.mock('../pages/About', () => {
  return function MockAbout() {
    return <div data-testid="about-page">About Page</div>;
  };
});

jest.mock('../pages/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact-page">Contact Page</div>;
  };
});

jest.mock('../pages/FAQ', () => {
  return function MockFAQ() {
    return <div data-testid="faq-page">FAQ Page</div>;
  };
});

jest.mock('../pages/Admin', () => {
  return function MockAdmin() {
    return <div data-testid="admin-page">Admin Page</div>;
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('App Component', () => {
  it('renders header and footer', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('has correct document title', () => {
    renderWithProviders(<App />);
    
    expect(document.title).toBe('ETMA Soluções - Embalagens Sustentáveis');
  });

  it('has correct meta description', () => {
    renderWithProviders(<App />);
    
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute(
      'content',
      'ETMA Soluções - Especialistas em embalagens sustentáveis e inovadoras. Soluções personalizadas para sua empresa.'
    );
  });

  it('has correct meta keywords', () => {
    renderWithProviders(<App />);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toHaveAttribute(
      'content',
      'embalagens, sustentáveis, plástico, papel, vidro, metal, personalizadas, inovação, qualidade, ETMA'
    );
  });

  it('has correct Open Graph tags', () => {
    renderWithProviders(<App />);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogType = document.querySelector('meta[property="og:type"]');
    
    expect(ogTitle).toHaveAttribute('content', 'ETMA Soluções - Embalagens Sustentáveis');
    expect(ogDescription).toHaveAttribute(
      'content',
      'Especialistas em embalagens sustentáveis e inovadoras. Soluções personalizadas para sua empresa.'
    );
    expect(ogType).toHaveAttribute('content', 'website');
  });

  it('has correct Twitter Card tags', () => {
    renderWithProviders(<App />);
    
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    expect(twitterTitle).toHaveAttribute('content', 'ETMA Soluções - Embalagens Sustentáveis');
    expect(twitterDescription).toHaveAttribute(
      'content',
      'Especialistas em embalagens sustentáveis e inovadoras. Soluções personalizadas para sua empresa.'
    );
  });
});
