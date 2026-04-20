import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext'; // Importe o Provider

import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout';
import VisaoGeral from './components/VisaoGeral';
import Configuracoes from './components/Configuracoes';
import Relatorios from './components/Relatorios';
import Pendencias from './components/Pendencias';
import NovaAnalise from './components/NovaAnalise';
import Leads from './components/Leads';
import Cadastros from './components/Cadastros';

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leads" element={<Leads />} />
        
        <Route element={<ProtectedRoute />}>{/* Rotas Privadas: Envolvidas pelo ProtectedRoute */}
          <Route element={<Layout />}>{/* Todas essas rotas aqui DEVEM estar minúsculas */}
              <Route path="/visaogeral" element={<VisaoGeral />} />
              <Route path="/novaanalise" element={<NovaAnalise />} />
              <Route path="/pendencias" element={<Pendencias />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/cadastros" element={<Cadastros />} />
          </Route>
        </Route>

        <Route path="*" element={<Home />} /> {/* Rota de fallback para qualquer caminho não definido */}
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;