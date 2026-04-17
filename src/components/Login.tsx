import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
//import api from '../services/api'; // Importe nossa nova configuração

const Login = () => {
  const navigate = useNavigate();

  // Função simplificada e direta para o frontend
  const handleEntrar = (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    navigate('/visaogeral'); // Vai direto para o painel, sem esperar
  };

  return (

    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      {/* Voltar */}
      <div className=" w-full max-w-xl" >
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors group">
              <ArrowLeft size={20} className="ml-10 group-hover:-translate-x-1 transition-transform" />
              Voltar para a Home
            </button>
        </div>
      <div className="mr-10 max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-2xl mb-4 shadow-inner">
            <ShieldCheck size={40} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ProjetoG2 <span className="text-blue-400 italic font-medium">AI</span></h1>
          <p className="text-slate-400 text-sm mt-2">Plataforma de Governança e Auditoria</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleEntrar} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="admin@projetog2.com.br"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-800 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Senha de Acesso</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="password" 
                  defaultValue="123456"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-800 font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-md"
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