import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Layout from './components/Layout';
import VisaoGeral from './components/VisaoGeral';
import Configuracoes from './components/Configuracoes';
import Relatorios from './components/Relatorios';
import Pendencias from './components/Pendencias';
import NovaAnalise from './components/NovaAnalise';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Todas essas rotas aqui DEVEM estar minúsculas */}
        <Route element={<Layout />}>
          <Route path="/visao-geral" element={<VisaoGeral />} />
          <Route path="/nova-analise" element={<NovaAnalise />} />
          <Route path="/pendencias" element={<Pendencias />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;