import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/layout/Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('renders logo', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('ETMA')).toBeInTheDocument();
    expect(screen.getByText('Soluções')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('A Empresa')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Solicitar Orçamento')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByLabelText('Abrir menu');
    
    // Menu should be closed initially
    expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Menu should be open
    expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
    
    // Click to close menu
    fireEvent.click(screen.getByLabelText('Fechar menu'));
    
    // Menu should be closed again
    expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
  });

  it('has correct navigation links with proper hrefs', () => {
    renderWithRouter(<Header />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const produtosLink = screen.getByText('Produtos').closest('a');
    const empresaLink = screen.getByText('A Empresa').closest('a');
    const contatoLink = screen.getByText('Contato').closest('a');
    const faqLink = screen.getByText('FAQ').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(produtosLink).toHaveAttribute('href', '/produtos');
    expect(empresaLink).toHaveAttribute('href', '/empresa');
    expect(contatoLink).toHaveAttribute('href', '/contato');
    expect(faqLink).toHaveAttribute('href', '/faq');
  });

  it('CTA button has correct link', () => {
    renderWithRouter(<Header />);
    
    const ctaButton = screen.getByText('Solicitar Orçamento').closest('a');
    expect(ctaButton).toHaveAttribute('href', '/contato');
  });

  it('applies active styles to current page link', () => {
    // Mock useLocation to return current path
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({ pathname: '/produtos' })
    }));

    renderWithRouter(<Header />);
    
    const produtosLink = screen.getByText('Produtos').closest('a');
    expect(produtosLink).toHaveClass('text-primary');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  it('updates accessibility attributes when menu is toggled', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByLabelText('Abrir menu');
    const mobileMenu = screen.getByTestId('mobile-menu');
    
    // Initial state
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    
    // Open menu
    fireEvent.click(menuButton);
    
    // Updated state
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
  });
});
