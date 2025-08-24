import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">ETMA Soluções</h3>
                <p className="text-sm text-gray-400">Especialistas em Embalagens</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Soluções inovadoras em embalagens sustentáveis para sua empresa. 
              Qualidade, responsabilidade ambiental e excelência em cada projeto.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/produtos" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link 
                  to="/empresa" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  A Empresa
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Produtos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/produtos?category=embalagens-plasticas" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Embalagens Plásticas
                </Link>
              </li>
              <li>
                <Link 
                  to="/produtos?category=embalagens-papel" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Embalagens de Papel
                </Link>
              </li>
              <li>
                <Link 
                  to="/produtos?category=embalagens-metal" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Embalagens de Metal
                </Link>
              </li>
              <li>
                <Link 
                  to="/produtos?category=embalagens-vidro" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Embalagens de Vidro
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400" />
                <span className="text-gray-300 text-sm">+55 (11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <span className="text-gray-300 text-sm">contato@etmasolucoes.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  Rua das Embalagens, 123<br />
                  Centro Industrial<br />
                  São Paulo - SP
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-medium mb-3">Siga-nos</h5>
              <div className="flex space-x-3">
                <a 
                  href="https://linkedin.com/company/etma-solucoes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://instagram.com/etmasolucoes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="https://facebook.com/etmasolucoes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ETMA Soluções. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos-uso" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
