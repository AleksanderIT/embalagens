import React from 'react';
import { Helmet } from 'react-helmet-async';

const Admin: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin - ETMA Soluções</title>
        <meta name="description" content="Área administrativa da ETMA Soluções" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Área Administrativa
          </h1>
          <p className="text-gray-600 mb-8">
            Esta área está em desenvolvimento. Em breve você poderá gerenciar produtos, 
            usuários e configurações do site.
          </p>
          <div className="bg-white rounded-xl p-8 shadow-sm max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Funcionalidades Planejadas
            </h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Dashboard com estatísticas</li>
              <li>• Gerenciamento de produtos</li>
              <li>• Upload de imagens</li>
              <li>• Controle de usuários</li>
              <li>• Relatórios e análises</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
