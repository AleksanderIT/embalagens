import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  Leaf, 
  Award, 
  Users, 
  Globe,
  Play
} from 'lucide-react';
import apiService from '../services/api';
import { Product } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [productsRef, productsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await apiService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const stats = [
    { icon: Award, value: '15+', label: 'Anos de Experiência' },
    { icon: Users, value: '500+', label: 'Clientes Satisfeitos' },
    { icon: Globe, value: '50+', label: 'Países Atendidos' },
    { icon: Leaf, value: '100%', label: 'Sustentável' },
  ];

  const features = [
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Compromisso com o meio ambiente através de embalagens eco-friendly e processos sustentáveis.'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Materiais de alta qualidade e processos rigorosos garantem produtos excepcionais.'
    },
    {
      icon: Users,
      title: 'Atendimento Personalizado',
      description: 'Soluções customizadas para cada cliente, com suporte técnico especializado.'
    },
    {
      icon: Globe,
      title: 'Inovação Constante',
      description: 'Pesquisa e desenvolvimento contínuos para oferecer as melhores soluções do mercado.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>ETMA Soluções - Especialistas em Embalagens Sustentáveis</title>
        <meta name="description" content="ETMA Soluções oferece embalagens sustentáveis e inovadoras. 15+ anos de experiência, 500+ clientes satisfeitos. Solicite seu orçamento hoje!" />
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Soluções{' '}
                <span className="text-accent-400">Inovadoras</span>
                <br />
                em Embalagens
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Especialistas em embalagens sustentáveis que protegem seu produto 
                e preservam o planeta. Qualidade e responsabilidade ambiental em cada projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/produtos"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center group"
                >
                  Conheça Nossos Produtos
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contato"
                  className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-700"
                >
                  Solicitar Orçamento
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                    <p className="text-white/80 text-sm">Conheça nossa história</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher a{' '}
              <span className="text-gradient">ETMA Soluções</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em embalagens sustentáveis com mais de 15 anos de experiência. 
              Nossa missão é oferecer soluções inovadoras que protegem seus produtos e preservam o meio ambiente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Produtos em <span className="text-gradient">Destaque</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos nossos produtos mais populares e inovadores
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={productsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card group overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200 overflow-hidden">
                    <img
                      src={product.images.thumbnail}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <Link
                      to={`/produto/${product._id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group/link"
                    >
                      Ver detalhes
                      <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/produtos"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Ver Todos os Produtos
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar suas embalagens?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar sua empresa 
              com soluções sustentáveis e inovadoras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Solicitar Orçamento
              </Link>
              <Link
                to="/empresa"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4"
              >
                Conheça Nossa História
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
