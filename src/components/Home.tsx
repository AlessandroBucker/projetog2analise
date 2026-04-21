import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Zap, BarChart3, FileSearch } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // Função para rolagem suave ao clicar nos links da Navbar
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    /* O container pai define o snap-type no eixo Y e a altura total da tela */
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white font-sans text-slate-900">
      
      {/* NAVBAR FIXA */}
      <header className="fixed top-0 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <ShieldCheck className="text-(--primary-color)" size={28} />
            <span className="text-xl font-bold tracking-tight">ProjetoG2</span>
          </div>
          
          {/* Opções da Navbar para navegação interna */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection('hero')} className="hover:text-(--primary-color) transition-colors">Início</button>
            <button onClick={() => scrollToSection('agilidade')} className="hover:text-(--primary-color) transition-colors">Agilidade</button>
            <button onClick={() => scrollToSection('controle')} className="hover:text-(--primary-color) transition-colors">Controle</button>
            <button onClick={() => scrollToSection('precisao')} className="hover:text-(--primary-color) transition-colors">Precisão</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/login")} className="text-slate-600 font-semibold hover:text-slate-900 px-4 py-2 transition-colors">Entrar</button>
            <button onClick={() => navigate("/leads")} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">Cadastrar</button>
          </div>
        </div>
      </header>

      {/* --- TELA 1: GOVERNANÇA (HERO) --- */}
      <section id="hero" className="h-screen w-full snap-start flex flex-col items-center justify-center text-center px-8 bg-gradient-to-b from-white to-slate-50 pt-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            Governança Inteligente para<br />
            <span className="text-(--primary-color)">Escritórios Contábeis</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12">
            Automatize processos, reduza riscos e escale sua operação com tecnologia modular.
          </p>
          <button onClick={() => navigate("/leads")} className="bg-(--primary-color) text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center hover:brightness-90 shadow-2xl shadow-blue-200 transition-all hover:scale-105 mx-auto">
            Falar com Especialista <ArrowRight className="ml-2" size={24} />
          </button>
        </div>
      </section>

      {/* --- TELA 2: AGILIDADE --- */}
      <section id="agilidade" className="h-screen w-full snap-start flex flex-col items-center justify-center px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="p-4 bg-blue-50 rounded-3xl mb-6">
            <Zap className="text-(--primary-color)" size={60} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">Agilidade</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Elimine gargalos manuais. Nossa inteligência artificial processa milhares de documentos em segundos, permitindo que sua equipe foque no que realmente importa: a estratégia do cliente.
          </p>
        </div>
      </section>

      {/* --- TELA 3: CONTROLE --- */}
      <section id="controle" className="h-screen w-full snap-start flex flex-col items-center justify-center px-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="p-4 bg-slate-900 rounded-3xl mb-6">
            <BarChart3 className="text-white" size={60} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Controle</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Tenha uma visão 360º de todos os fluxos. Dashboards em tempo real que monitoram prazos, entregas e conformidade fiscal, garantindo que nenhum detalhe passe despercebido.
          </p>
        </div>
      </section>

      {/* --- TELA 4: PRECISÃO --- */}
      <section id="precisao" className="h-screen w-full snap-start flex flex-col items-center justify-center px-8 bg-white">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <div className="p-4 bg-green-50 rounded-3xl mb-6">
            <FileSearch className="text-green-600" size={60} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Precisão</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Reduza a zero as falhas humanas. Com extração de dados via OCR de alta performance, garantimos que a informação que entra no seu sistema é 100% fiel ao documento original.
          </p>
          <button onClick={() => navigate("/leads")} className="mt-12 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
            Começar Agora
          </button>
          {/* FOOTER SIMPLES */}

        </div>

      </section>
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center px-8 bg-white">
        <div className="max-w-4xl flex flex-col items-center text-center">
            <footer className="w-full border-t border-slate-100 py-10 text-center">
        <p className="text-sm text-slate-400">
          © 2024 ProjetoG2 — Governança e Tecnologia. Todos os direitos reservados.
        </p>
      </footer>
        </div>
      </section>
    </div>
  );
};

export default Home;