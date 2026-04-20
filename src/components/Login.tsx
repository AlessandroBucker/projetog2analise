import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";
import { UserPlus } from "lucide-react"; // Usando ícone de cadastro para variar

const Login = () => {
  const navigate = useNavigate();
  // 1. Email e Senha pré-preenchidos
  const [email, setEmail] = useState("admin@projetog2.com");
  const [password, setPassword] = useState("senha123");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('saas_token', 'token-valido-123');
    navigate('/visaogeral');
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      
      {/* LADO ESQUERDO: VISUAL */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-8">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Governança Inteligente.
          </h2>
          <p className="text-slate-300 text-base lg:text-lg">
            Módulos integrados para escalar seu escritório com segurança.
          </p>
        </div>
      </div>

      {/* LADO DIREITO: FORMULÁRIO */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative">
              {/* LOGO */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="text-(--primary-color)" size={28} />
          <span className="text-xl font-bold tracking-tighter text-slate-800">ProjetoG2</span>
        </div>
        </div>
      <div className="absolute top-8 right-8">
        <button 
          onClick={() => navigate("/leads")}
          className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-(--primary-color) transition-colors bg-white/50 py-2 px-4 rounded-full border border-slate-200 shadow-sm"
        >
          <UserPlus size={18} />
          <span>Não tem uma conta? Crie aqui</span>
        </button>
      </div>


        <div className="max-w-sm w-full">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Login</h1>
            <p className="text-sm text-slate-500">Acesse sua conta para continuar.</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-slate-400" size={16} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Senha</label>
                <button type="button" className="text-xs font-bold text-(--primary-color) hover:underline">Esqueceu?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-slate-400" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* BOTÃO VISUALIZAR/ESCONDER SENHA */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Entrar</span>
              <ArrowRight size={16} />
            </button>


            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-white px-3 text-slate-400">Ou</span></div>
            </div>

            <button 
              type="button"
              className="w-full border border-slate-200 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
              <span>Entrar com Google</span>
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Ainda não é cliente?{" "}
            <button 
              onClick={() => navigate("/leads")} 
              className="text-(--primary-color) font-bold hover:underline ml-1"
            >
              Crie sua conta aqui.
            </button>
          </p>
        </div>

        {/* FOOTER COM POLÍTICAS E TERMOS */}
        <div className="absolute bottom-6 text-center w-full px-6 flex flex-col space-y-2">
          <div className="flex justify-center space-x-4 text-[11px] font-medium text-slate-500 underline underline-offset-4">
            <a href="#" className="hover:text-(--primary-color)">Políticas de Privacidade</a>
            <a href="#" className="hover:text-(--primary-color)">Termos de Uso</a>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
            © 2024 ProjetoG2 — Governança e Tecnologia
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;