import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Aqui verificamos se existe um token (ou alguma flag) no localStorage
  // Em uma aplicação real, você pode usar um Contexto de Autenticação
  const isAuthenticated = !!localStorage.getItem('saas_token');

  // Se o usuário não estiver logado, redireciona para a tela de Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, permite que as rotas filhas (como o Layout) sejam renderizadas
  return <Outlet />;
};

export default ProtectedRoute;