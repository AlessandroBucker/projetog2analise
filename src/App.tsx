import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Leads from './components/Leads';
import VisaoGeral from './components/VisaoGeral';
import Layout from './components/Layout';import Relatorios from './components/Relatorios';
import NovaAnalise from './components/NovaAnalise';
import Cadastros from './components/Cadastros';
import Configuracoes from './components/Configuracoes';
import Pendencias from './components/Pendencias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas (Sem o menu lateral) */}
        <Route path="/" element={<Home />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Protegidas (Com o menu lateral) */}
        <Route element={<Layout />}>
          <Route path="/VisaoGeral" element={<VisaoGeral />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/cadastros" element={<Cadastros />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/nova-analise" element={<NovaAnalise />} />
          <Route path="/pendencias" element={<Pendencias />} />
        </Route>
        

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;