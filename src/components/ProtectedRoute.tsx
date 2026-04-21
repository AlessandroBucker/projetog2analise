import { Navigate, Outlet } from 'react-router-dom';

// Definimos que a rota pode receber uma lista de perfis permitidos
type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('saas_token');
  const userRole = localStorage.getItem('saas_role'); // Ex: 'ADMIN', 'ANALISTA', 'PF', 'PJ'

  // 1. Se não tem token de login, manda pra fora (Home ou Login)
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // 2. Se a rota exige perfis específicos E o perfil do usuário não está na lista
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redireciona para uma tela segura (ex: Visão Geral) e bloqueia o acesso
    alert("Você não tem permissão para acessar esta tela.");
    return <Navigate to="/visaogeral" replace />;
  }

  // 3. Tudo certo! Permite renderizar a tela solicitada
  return <Outlet />;
};

export default ProtectedRoute;