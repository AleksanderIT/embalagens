import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Award, 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Leaf, 
  Zap,
  TrendingUp,
  Globe,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Paixão pela Qualidade',
      description: 'Cada produto é desenvolvido com dedicação e atenção aos detalhes.'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Compromisso com o meio ambiente em todas as nossas soluções.'
    },
    {
      icon: Shield,
      title: 'Confiabilidade',
      description: 'Produtos que protegem e duram, garantindo sua satisfação.'
    },
    {
      icon: Zap,
      title: 'Inovação',
      description: 'Sempre buscando as melhores tecnologias e soluções.'
    }
  ];

  const milestones = [
    { year: '2008', title: 'Fundação', description: 'Nascimento da ETMA Soluções' },
    { year: '2012', title: 'Expansão', description: 'Primeira fábrica própria' },
    { year: '2015', title: 'Certificação', description: 'ISO 9001 e 14001' },
    { year: '2018', title: 'Inovação', description: 'Centro de Pesquisa e Desenvolvimento' },
    { year: '2021', title: 'Sustentabilidade', description: '100% de materiais recicláveis' },
    { year: '2024', title: 'Futuro', description: 'Líder em embalagens sustentáveis' }
  ];

  const team = [
    {
      name: 'Maria Silva',
      role: 'CEO & Fundadora',
      description: 'Especialista em embalagens com mais de 20 anos de experiência.'
    },
    {
      name: 'João Santos',
      role: 'Diretor de Operações',
      description: 'Responsável pela qualidade e eficiência operacional.'
    },
    {
      name: 'Ana Costa',
      role: 'Diretora de Inovação',
      description: 'Lidera o desenvolvimento de novos produtos sustentáveis.'
    },
    {
      name: 'Carlos Lima',
      role: 'Diretor Comercial',
      description: 'Especialista em relacionamento com clientes e mercado.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nós - ETMA Soluções</title>
        <meta name="description" content="Conheça a história da ETMA Soluções, nossa missão, valores e compromisso com embalagens sustentáveis." />
      </Helmet>

      <div className="min-h-screen">
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
                Nossa <span className="text-accent-400">História</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Há mais de 15 anos, a ETMA Soluções tem sido referência em embalagens sustentáveis, 
                combinando inovação, qualidade e responsabilidade ambiental.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 h-full">
                  <Target className="w-12 h-12 text-primary-600 mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Desenvolver e fornecer embalagens sustentáveis e inovadoras que protejam 
                    os produtos de nossos clientes enquanto preservam o meio ambiente, 
                    contribuindo para um futuro mais limpo e responsável.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-8 h-full">
                  <Eye className="w-12 h-12 text-accent-600 mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Visão</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Ser a empresa líder em embalagens sustentáveis no Brasil, reconhecida 
                    pela inovação, qualidade e compromisso com a sustentabilidade, 
                    inspirando mudanças positivas na indústria.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Nossos <span className="text-gradient">Valores</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Valores que guiam nossas ações e definem nossa identidade como empresa.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <value.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Nossa <span className="text-gradient">Jornada</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Uma trajetória de crescimento, inovação e compromisso com a sustentabilidade.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Nossa <span className="text-gradient">Equipe</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profissionais experientes e apaixonados por embalagens sustentáveis.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-primary-700 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Números que <span className="text-accent-400">Inspiram</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Resultados que demonstram nosso compromisso com a excelência e sustentabilidade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, number: '15+', label: 'Anos de Experiência' },
                { icon: Globe, number: '500+', label: 'Clientes Satisfeitos' },
                { icon: Star, number: '100%', label: 'Materiais Recicláveis' },
                { icon: TrendingUp, number: '95%', label: 'Taxa de Aprovação' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <p className="text-gray-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Faça Parte da Nossa <span className="text-gradient">História</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Junte-se aos nossos clientes que já confiam na ETMA Soluções para suas necessidades de embalagens.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contato" className="btn-primary">
                  Solicitar Orçamento
                </a>
                <a href="/produtos" className="btn-outline">
                  Ver Produtos
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
