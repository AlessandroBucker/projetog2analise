import React, { useState } from "react";
import { ArrowLeft, Send, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "governança"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", formData);
    // Aqui no futuro você pode enviar para o Django salvar no banco
    alert("Obrigado! Entraremos em contato em breve.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        
        {/* Voltar */}
        <button 
          onClick={() => navigate("/")}
          // Hover do botão de voltar com cor dinâmica
          className="flex items-center text-slate-500 hover:text-[var(--primary-color)] mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
          <div className="flex items-center space-x-3 mb-8">
            {/* Ícone principal com cor de fundo dinâmica */}
            <div className="bg-[var(--primary-color)] transition-colors duration-300 p-2 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Tenha o ProjetoG2 no seu escritório</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
              <input 
                type="text" 
                required
                // Borda de Focus dinâmica (quando o usuário clica no input)
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition-all"
                placeholder="Ex: João Silva"
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition-all"
                  placeholder="joao@empresa.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition-all"
                  placeholder="(11) 99999-9999"
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Serviço de Interesse</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] outline-none transition-all bg-white"
                onChange={(e) => setFormData({...formData, servico: e.target.value})}
              >
                <option value="governança">Governança de Documentos</option>
                <option value="ocr">Automação de OCR / IA</option>
                <option value="consultoria">Consultoria Técnica</option>
                <option value="todos">Plataforma Completa</option>
              </select>
            </div>

            <button 
              type="submit"
              // Botão de envio usando a cor primária e efeito brightness no hover
              className="w-full bg-[var(--primary-color)] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:brightness-90 shadow-lg shadow-slate-200 transition-all duration-300 mt-4 active:scale-95"
            >
              Enviar Solicitação <Send className="ml-2" size={18} />
            </button>
          </form>
          
          <p className="text-center text-slate-400 text-xs mt-6">
            Seus dados estão protegidos pela nossa política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leads;