import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Building
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const data = await api.getContactInfo();
      setContactInfo(data);
    } catch (error) {
      console.error('Erro ao buscar informações de contato:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      await api.sendContactMessage(formData);
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefone',
      value: contactInfo?.contact?.phone || '(11) 9999-9999',
      description: 'Fale diretamente conosco'
    },
    {
      icon: Mail,
      title: 'Email',
      value: contactInfo?.contact?.email || 'contato@etmasolucoes.com.br',
      description: 'Envie-nos um email'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: contactInfo?.address?.street || 'Rua das Embalagens, 123',
      description: 'Visite nossa sede'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      value: 'Segunda a Sexta: 8h às 18h',
      description: 'Estamos disponíveis para você'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contato - ETMA Soluções</title>
        <meta name="description" content="Entre em contato com a ETMA Soluções. Estamos prontos para atender suas necessidades em embalagens sustentáveis." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Entre em <span className="text-accent-400">Contato</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Estamos prontos para atender suas necessidades em embalagens sustentáveis. 
                Entre em contato conosco e descubra como podemos ajudar sua empresa.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Como nos <span className="text-gradient">Encontrar</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Escolha a forma mais conveniente para entrar em contato conosco.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <method.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-primary-600 font-medium mb-2">{method.value}</p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="w-8 h-8 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Envie sua Mensagem</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="Orçamento">Solicitar Orçamento</option>
                        <option value="Informações">Informações sobre Produtos</option>
                        <option value="Parceria">Proposta de Parceria</option>
                        <option value="Suporte">Suporte Técnico</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Descreva sua necessidade ou dúvida..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Company Description */}
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Building className="w-8 h-8 text-primary-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Sobre a ETMA Soluções</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Somos especialistas em embalagens sustentáveis com mais de 15 anos de experiência. 
                    Nossa missão é oferecer soluções inovadoras que protegem seus produtos e preservam o meio ambiente.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">15+</div>
                      <div className="text-sm text-gray-600">Anos de Experiência</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">500+</div>
                      <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-8 h-8 text-primary-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Nossa Localização</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {contactInfo?.address?.street || 'Rua das Embalagens, 123'}
                      </p>
                      <p className="text-gray-600">
                        {contactInfo?.address?.city || 'São Paulo'} - {contactInfo?.address?.state || 'SP'}
                      </p>
                      <p className="text-gray-600">
                        CEP: {contactInfo?.address?.zipCode || '01234-567'}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Horário de Funcionamento:</strong><br />
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Redes Sociais</h3>
                  <div className="space-y-4">
                    <a
                      href={contactInfo?.social?.linkedin || '#'}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">in</span>
                      </div>
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={contactInfo?.social?.instagram || '#'}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">IG</span>
                      </div>
                      <span>Instagram</span>
                    </a>
                    <a
                      href={contactInfo?.social?.facebook || '#'}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">f</span>
                      </div>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-20 bg-gray-100">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Localização</h2>
              <p className="text-gray-600">Visite nossa sede e conheça nossa estrutura</p>
            </motion.div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Mapa interativo será integrado aqui</p>
                  <p className="text-sm text-gray-500">Rua das Embalagens, 123 - São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
