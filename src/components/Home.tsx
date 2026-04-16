import {
  ShieldCheck,
  ArrowRight,
  Zap,
  BarChart3,
  FileSearch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="text-blue-600" size={32} />
          <span className="text-2xl font-bold tracking-tight">ProjetoG2</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-all"
        >
          Acessar Sistema
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            Governança Inteligente para
            <br />
            <span className="text-blue-600">Escritórios Contábeis</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Automatize a extração de dados com OCR e IA. Ganhe produtividade e
            segurança na gestão documental dos seus clientes.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/Leads")}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
            >
              Começar Agora <ArrowRight className="ml-2" size={24} />
            </button>
          </div>
        </div>

        {/* Indicador visual de "rolar para baixo" opcional */}
        <div className="mt-12 animate-bounce text-slate-300">
          <div className="w-1 h-12 bg-slate-200 rounded-full mx-auto"></div>
        </div>
      </header>

      {/* Features Rápidas */}
      <section className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 w-full">
          {/* Título da Seção (Opcional, mas ajuda a preencher o espaço) */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="text-lg text-slate-600">
              Tudo o que você precisa para uma governança contábil moderna.
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            {/* Feature 1 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Processamento Instantâneo
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Leitura de documentos em segundos usando nossa engine de OCR
                otimizada para o sistema tributário brasileiro.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BarChart3 size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Dashboards de Auditoria
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Visão clara de pendências, prazos e conformidade de cada CNPJ em
                tempo real, eliminando planilhas manuais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileSearch size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">IA Especializada</h3>
              <p className="text-slate-600 leading-relaxed">
                Inteligência Artificial treinada para identificar
                inconsistências fiscais e sugerir correções antes da auditoria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
