import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Importando componentes fixos (Estes NÃO devem ter lazy load, pois são a base de segurança e layout)
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

// ---------------------------------------------------------
// 1. IMPORTAÇÕES PREGUIÇOSAS (LAZY LOADING)
// ---------------------------------------------------------
// Em vez de importar tudo de uma vez, o React só vai "puxar" este código quando a rota for acedida.
const Home = lazy(() => import('../components/Home'));
const Login = lazy(() => import('../components/Login'));
const Leads = lazy(() => import('../components/Leads'));
const VisaoGeral = lazy(() => import('../components/VisaoGeral'));
const NovaAnalise = lazy(() => import('../components/NovaAnalise'));
const Pendencias = lazy(() => import('../components/Pendencias'));
const Relatorios = lazy(() => import('../components/Relatorios'));
const Cadastros = lazy(() => import('../components/Cadastros'));
const Configuracoes = lazy(() => import('../components/Configuracoes'));
const NovoCliente = lazy(() => import('../components/NovoCliente'));
const RevisaoDados = lazy(() => import('../components/RevisaoDados'));

    
// ---------------------------------------------------------
// 2. COMPONENTE DE CARREGAMENTO (FALLBACK)
// ---------------------------------------------------------
// O que o utilizador vê durante os milissegundos em que a nova página está a ser descarregada
const LoadingSpinner = () => (
  <div className="flex w-full h-[60vh] items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-(--primary-color)"></div>
  </div>
);

// Função auxiliar para embrulhar as telas com o Suspense de forma limpa
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

// ---------------------------------------------------------
// 3. CONFIGURAÇÃO DAS ROTAS
// ---------------------------------------------------------
export const router = createBrowserRouter([
  // --- ROTAS PÚBLICAS ---
  { path: '/', element: withSuspense(Home) },
  { path: '/login', element: withSuspense(Login) },
  { path: '/leads', element: withSuspense(Leads) },

  // --- ROTAS PRIVADAS (Requerem Login) ---
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <Layout />, 
        children: [
          // Rota que TODOS os logados acedem
          { path: '/visaogeral', element: withSuspense(VisaoGeral) },
          { path: '/relatorios', element: withSuspense(Relatorios) },
          { path: '/pendencias', element: withSuspense(Pendencias) },
          { path: '/novaanalise', element: withSuspense(NovaAnalise) },
          { path: '/novocliente', element: withSuspense(NovoCliente) },
          { path: '/revisaodados', element: withSuspense(RevisaoDados) },
          


          // Rotas EXCLUSIVAS para ADMIN e ANALISTA
          {
            element: <ProtectedRoute allowedRoles={['ADMIN', 'ANALISTA']} />,
            children: [
              { path: '/cadastros', element: withSuspense(Cadastros) },
              { path: '/novaanalise', element: withSuspense(NovaAnalise) },
            ]
          },

          // Rota EXCLUSIVA apenas para ADMIN
          {
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [
              { path: '/configuracoes', element: withSuspense(Configuracoes) },
            ]
          }
        ]
      }
    ]
  },

  // Rota de Fallback: Se digitar um endereço que não existe, volta para a Home
  { path: '*', element: <Navigate to="/" replace /> }
]);