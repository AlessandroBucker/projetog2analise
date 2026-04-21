import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  ArrowRight,
  LogIn
} from "lucide-react";

const Leads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    comentarios: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", formData);
    alert("Solicitação enviada com sucesso! Nossa equipe entrará em contato.");
    navigate("/"); // Redireciona para home após o envio
  };
  return (
    <div className="h-screen w-full flex overflow-hidden bg-white font-sans">
      
      {/* LADO ESQUERDO: VISUAL (IDÊNTICO AO LOGIN) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-8">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Sua jornada para a eficiência começa aqui.
          </h2>
          <p className="text-slate-300 text-base lg:text-lg">
            Solicite uma demonstração e descubra como o ProjetoG2 pode transformar sua governança.
          </p>
        </div>
      </div>

      {/* LADO DIREITO: FORMULÁRIO */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-white relative">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="text-(--primary-color)" size={28} />
            <span className="text-xl font-bold tracking-tighter text-slate-800">ProjetoG2</span>
          </div>
          
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-(--primary-color) transition-colors border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50"
          >
            <LogIn size={18} />
            <span>Já sou cliente</span>
          </button>
        </div>
        <div className="max-w-sm w-full">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-slate-900">Solicitar Acesso</h1>
            <p className="text-sm text-slate-500">Preencha os dados e entraremos em contato.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NOME */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-3 text-slate-400" size={16} />
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome aqui"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm"
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-slate-400" size={16} />
                <input 
                  type="email" 
                  required
                  placeholder="exemplo@empresa.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* TELEFONE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Telefone / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3 text-slate-400" size={16} />
                <input 
                  type="tel" 
                  required
                  placeholder="(00) 00000-0000"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm"
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
            </div>

            {/* COMENTÁRIOS */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Como podemos ajudar?</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3 text-slate-400" size={16} />
                <textarea 
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-(--primary-color) transition-all text-sm resize-none"
                  placeholder="Conte-nos sua necessidade..."
                  onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-(--primary-color) text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              <span>Enviar Solicitação</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-6 text-center w-full px-6 flex flex-col space-y-2">
          <div className="flex justify-center space-x-4 text-[11px] font-medium text-slate-500 underline underline-offset-4">
            <button onClick={() => navigate("/privacidade")} className="hover:text-(--primary-color)">Políticas de Privacidade</button>
            <button onClick={() => navigate("/termos")} className="hover:text-(--primary-color)">Termos de Uso</button>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
            © 2024 ProjetoG2 — Todos os direitos reservados.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Leads;