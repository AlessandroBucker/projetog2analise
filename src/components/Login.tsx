import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleEntrar = (e: React.FormEvent) => {
      e.preventDefault(); // Impede a página de recarregar
      
      // 1. Simulamos que o login foi um sucesso e salvamos o token no navegador
      localStorage.setItem('saas_token', 'token-valido-123');
      
      // 2. Redireciona para o painel
      navigate('/visaogeral'); 
    };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      
      {/* Voltar */}
      <div className="w-full max-w-xl">
        <button 
          onClick={() => navigate("/")}
          // Hover do botão Voltar usando a cor dinâmica
          className="flex items-center text-slate-500 hover:text-[var(--primary-color)] mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="ml-10 group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>
      </div>

      <div className="mr-10 max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Cabeçalho do Card Escuro */}
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-2xl mb-4 shadow-inner">
            {/* Ícone e texto "AI" com a cor primária */}
            <ShieldCheck size={40} className="text-[var(--primary-color)] transition-colors" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            ProjetoG2 <span className="text-[var(--primary-color)] italic font-medium transition-colors">AI</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Plataforma de Governança e Auditoria</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleEntrar} className="space-y-6">
            
            {/* Campo E-mail */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="admin@projetog2.com.br"
                  // Borda iluminada (focus) adaptada para o tema
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-gray-800 font-medium transition-all"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Senha de Acesso</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="password" 
                  defaultValue="123456"
                  // Borda iluminada (focus) adaptada para o tema
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-gray-800 font-medium transition-all"
                />
              </div>
            </div>

            {/* Botão de Entrar */}
            <button 
              type="submit"
              // Botão usando cor dinâmica no fundo e `brightness-90` para o efeito de clique/hover
              className="w-full flex items-center justify-center space-x-2 bg-[var(--primary-color)] text-white py-3.5 rounded-xl font-bold hover:brightness-90 transition-all duration-300 active:scale-95 shadow-md"
            >
              <span>Entrar no Sistema</span>
              <ArrowRight size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;