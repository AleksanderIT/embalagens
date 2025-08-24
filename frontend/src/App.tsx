import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Admin from './pages/Admin';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <>
      <Helmet>
        <title>ETMA Soluções - Especialistas em Embalagens</title>
        <meta name="description" content="ETMA Soluções é especialista em embalagens sustentáveis e inovadoras. Oferecemos soluções personalizadas para sua empresa." />
        <meta name="keywords" content="embalagens, sustentabilidade, plástico, papel, metal, vidro, ETMA" />
        <meta name="author" content="ETMA Soluções" />
        <meta property="og:title" content="ETMA Soluções - Especialistas em Embalagens" />
        <meta property="og:description" content="Soluções inovadoras em embalagens sustentáveis para sua empresa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://etmasolucoes.com.br" />
        <link rel="canonical" href="https://etmasolucoes.com.br" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/empresa" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
      
      <ScrollToTop />
    </>
  );
}

export default App;
