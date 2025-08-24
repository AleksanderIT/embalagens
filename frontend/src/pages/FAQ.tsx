import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, HelpCircle, Package, Leaf, Shield, Zap } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: Package,
      title: 'Produtos e Soluções',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          question: 'Quais tipos de embalagens vocês oferecem?',
          answer: 'Oferecemos uma ampla variedade de embalagens sustentáveis, incluindo embalagens plásticas, de papel, metal, vidro e soluções personalizadas. Cada tipo é desenvolvido pensando na sustentabilidade e na proteção do produto.'
        },
        {
          question: 'Vocês fazem embalagens personalizadas?',
          answer: 'Sim! Desenvolvemos embalagens personalizadas de acordo com as necessidades específicas de cada cliente. Nossa equipe de design trabalha em conjunto com você para criar soluções únicas e eficientes.'
        },
        {
          question: 'Quais são os materiais sustentáveis utilizados?',
          answer: 'Utilizamos materiais 100% recicláveis como plásticos biodegradáveis, papel certificado FSC, metais reciclados e vidro. Todos os nossos materiais são selecionados pensando no impacto ambiental.'
        },
        {
          question: 'Como garantem a qualidade dos produtos?',
          answer: 'Possuímos certificações ISO 9001 e 14001, além de rigorosos controles de qualidade em todas as etapas do processo. Realizamos testes de resistência, durabilidade e compatibilidade com os produtos.'
        }
      ]
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        {
          question: 'Como vocês contribuem para a sustentabilidade?',
          answer: 'Nossa missão é reduzir o impacto ambiental através de embalagens sustentáveis. Utilizamos materiais recicláveis, processos de produção otimizados e apoiamos iniciativas de reciclagem e reflorestamento.'
        },
        {
          question: 'Os produtos são realmente recicláveis?',
          answer: 'Sim! Todos os nossos produtos são 100% recicláveis. Fornecemos informações detalhadas sobre como descartar corretamente cada embalagem e apoiamos programas de coleta seletiva.'
        },
        {
          question: 'Vocês têm certificações ambientais?',
          answer: 'Possuímos certificação ISO 14001 (Gestão Ambiental) e trabalhamos constantemente para obter novas certificações que comprovem nosso compromisso com a sustentabilidade.'
        },
        {
          question: 'Como calculam a pegada de carbono?',
          answer: 'Realizamos estudos de ciclo de vida (LCA) para calcular a pegada de carbono de nossos produtos. Utilizamos metodologias reconhecidas internacionalmente e publicamos relatórios de sustentabilidade anuais.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Qualidade e Segurança',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        {
          question: 'Quais são os padrões de qualidade seguidos?',
          answer: 'Seguimos rigorosos padrões de qualidade, incluindo ISO 9001, normas da ANVISA para embalagens de alimentos, e regulamentações específicas de cada setor. Realizamos testes contínuos para garantir a excelência.'
        },
        {
          question: 'Como garantem a segurança dos produtos?',
          answer: 'Todos os nossos produtos passam por testes de segurança rigorosos, incluindo testes de migração, resistência mecânica e compatibilidade química. Trabalhamos apenas com materiais aprovados pelas autoridades competentes.'
        },
        {
          question: 'Vocês oferecem garantia?',
          answer: 'Sim! Oferecemos garantia de qualidade em todos os nossos produtos. Caso haja qualquer problema, nossa equipe técnica está pronta para resolver rapidamente.'
        },
        {
          question: 'Como funciona o controle de qualidade?',
          answer: 'Possuímos laboratório próprio para testes de qualidade e trabalhamos com laboratórios externos certificados. Realizamos inspeções em todas as etapas da produção, desde a matéria-prima até o produto final.'
        }
      ]
    },
    {
      icon: Zap,
      title: 'Atendimento e Suporte',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      items: [
        {
          question: 'Como solicitar um orçamento?',
          answer: 'Você pode solicitar um orçamento através do nosso site, por telefone ou email. Nossa equipe comercial entrará em contato em até 24 horas para entender suas necessidades e apresentar a melhor solução.'
        },
        {
          question: 'Qual o prazo de entrega?',
          answer: 'O prazo de entrega varia de acordo com a complexidade do produto e quantidade. Produtos padrão são entregues em 5-10 dias úteis, enquanto produtos personalizados podem levar 15-30 dias úteis.'
        },
        {
          question: 'Vocês atendem todo o Brasil?',
          answer: 'Sim! Atendemos todo o território nacional com uma rede de distribuição eficiente. Para clientes internacionais, também oferecemos soluções de exportação.'
        },
        {
          question: 'Como funciona o suporte técnico?',
          answer: 'Nossa equipe técnica está disponível para auxiliar com dúvidas sobre produtos, aplicações e especificações técnicas. Oferecemos suporte por telefone, email e visitas técnicas quando necessário.'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - ETMA Soluções</title>
        <meta name="description" content="Perguntas frequentes sobre embalagens sustentáveis, produtos, sustentabilidade e atendimento da ETMA Soluções." />
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
              <div className="flex items-center justify-center mb-6">
                <HelpCircle className="w-16 h-16 text-accent-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Perguntas <span className="text-accent-400">Frequentes</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Encontre respostas para as principais dúvidas sobre nossos produtos, 
                sustentabilidade e atendimento. Se não encontrar o que procura, entre em contato conosco.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={`${category.bgColor} p-8`}>
                    <div className="flex items-center gap-4">
                      <category.icon className={`w-12 h-12 ${category.color}`} />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                        <p className="text-gray-600 mt-1">
                          {categoryIndex === 0 && 'Tudo sobre nossos produtos e soluções'}
                          {categoryIndex === 1 && 'Nosso compromisso com a sustentabilidade'}
                          {categoryIndex === 2 && 'Garantias de qualidade e segurança'}
                          {categoryIndex === 3 && 'Como atendemos nossos clientes'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Items */}
                  <div className="divide-y divide-gray-200">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                      >
                        <button
                          onClick={() => toggleItem(categoryIndex * 100 + itemIndex)}
                          className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {item.question}
                            </h3>
                            <ChevronDown 
                              className={`w-6 h-6 text-gray-400 transition-transform ${
                                openItems.includes(categoryIndex * 100 + itemIndex) ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openItems.includes(categoryIndex * 100 + itemIndex) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-6">
                                <p className="text-gray-600 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ainda tem dúvidas?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Nossa equipe está pronta para ajudar você. Entre em contato conosco 
                  e receba atendimento personalizado para suas necessidades.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contato" className="btn-primary">
                    Entre em Contato
                  </a>
                  <a href="/produtos" className="btn-outline">
                    Ver Produtos
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dicas <span className="text-gradient">Importantes</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Informações úteis para aproveitar ao máximo nossos produtos e serviços.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Package,
                  title: 'Escolha Certa',
                  description: 'Considere o tipo de produto, condições de armazenamento e impacto ambiental ao escolher sua embalagem.'
                },
                {
                  icon: Leaf,
                  title: 'Descarte Responsável',
                  description: 'Separe corretamente os materiais para reciclagem e siga as orientações de descarte fornecidas.'
                },
                {
                  icon: Shield,
                  title: 'Armazenamento',
                  description: 'Mantenha as embalagens em local seco e arejado, protegido da luz solar direta e umidade.'
                }
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <tip.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
