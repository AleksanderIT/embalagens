import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Check, Package, Leaf, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(id!);
      setProduct(data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link
            to="/produtos"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar aos produtos
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    product.images?.thumbnail,
    ...(product.images?.gallery || [])
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{product.name} - ETMA Soluções</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b py-4">
          <div className="container-custom">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <span>/</span>
              <Link to="/produtos" className="hover:text-primary-600">Produtos</Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  {/* Main Image */}
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={images[selectedImage] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Images */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index
                              ? 'border-primary-500'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - Imagem ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.isFeatured && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} className="fill-current" />
                        <span className="text-sm font-medium">Destaque</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Aplicações</h3>
                    <ul className="space-y-2">
                      {product.applications.map((application, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Package size={16} className="text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Especificações Técnicas</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <dl className="space-y-2">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <dt className="font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </dt>
                            <dd className="text-gray-600">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefícios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Leaf size={20} className="text-green-500" />
                      <span className="text-sm text-gray-700">Sustentável</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-blue-500" />
                      <span className="text-sm text-gray-700">Proteção Garantida</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package size={20} className="text-orange-500" />
                      <span className="text-sm text-gray-700">Qualidade Premium</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contato"
                    className="btn-primary text-center"
                  >
                    Solicitar Orçamento
                  </Link>
                  <Link
                    to="/produtos"
                    className="btn-outline text-center"
                  >
                    Ver Mais Produtos
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Produtos Relacionados
              </h2>
              <p className="text-gray-600">
                Descubra outras soluções em embalagens que podem interessar você.
              </p>
            </motion.div>

            <div className="text-center">
              <Link
                to="/produtos"
                className="btn-primary inline-flex items-center"
              >
                Ver Todos os Produtos
                <ArrowLeft size={16} className="ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
