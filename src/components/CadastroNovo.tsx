import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Building2, Globe, ArrowRight, ArrowLeft, 
  Search, ShieldCheck, Database,
} from "lucide-react";

type ClientType = "PF" | "PJ" | "FOREIGNER" | null;

const CadastroNovo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Seleção, 1: Dados
  const [clientType, setClientType] = useState<ClientType>(null);
  const [loadingAPI, setLoadingAPI] = useState(false);

  const [formData, setFormData] = useState({
    razao: "", cnae: "", cnpj: "", email: ""
  });


  const simulateCNPJLookup = () => {
    setLoadingAPI(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, razao: "EMPRESA EXEMPLO LTDA", cnae: "6462-0/00" }));
      setLoadingAPI(false);
    }, 1200);
  };

  // Função centralizada para finalizar o cadastro
  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integraria a chamada de API para salvar os dados
    navigate("/AnaliseNova");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 md:p-12 font-sans overflow-y-auto">
      
      {/* HEADER DE PROGRESSO */}
      <div className="w-full max-w-4xl mb-12 flex items-center justify-between">
        <button 
          onClick={() => step === 0 ? navigate(-1) : setStep(0)} 
          className="flex items-center text-slate-500 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> {step === 0 ? "Cancelar" : "Voltar"}
        </button>
        <div className="flex space-x-2">
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 0 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        
        {/* ETAPA 0: SELEÇÃO DE PERFIL */}
        {step === 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Novo Cadastro</h1>
              <p className="text-slate-500 text-lg">Selecione o perfil para iniciar a coleta de dados financeiros.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectionCard 
                icon={<User size={32} />}
                title="Pessoa Física"
                desc="Investidor individual buscando análise de ativos."
                onClick={() => { setClientType("PF"); setStep(1); }}
              />
              <SelectionCard 
                icon={<Building2 size={32} />}
                title="Pessoa Jurídica"
                desc="Empresas, holdings e tesourarias."
                onClick={() => { setClientType("PJ"); setStep(1); }}
              />
              <SelectionCard 
                icon={<Globe size={32} />}
                title="Estrangeiro"
                desc="Investidores offshore ou entidades internacionais."
                onClick={() => { setClientType("FOREIGNER"); setStep(1); }}
              />
            </div>
          </div>
        )}

        {/* ETAPA 1: FORMULÁRIO DINÂMICO */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 animate-in slide-in-from-right-8 duration-500">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center">
                <ShieldCheck className="text-blue-600 mr-3" size={32} /> 
                Dados de Cadastro
              </h2>
              <p className="text-slate-500 mt-2">Preencha as informações para finalizar a inclusão no sistema.</p>
            </header>

            <form onSubmit={handleFinalize} className="space-y-8">
              {/* FORM PF */}
              {clientType === "PF" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Nome Completo" placeholder="Ex: João Silva" />
                  <InputGroup label="CPF" placeholder="000.000.000-00" />
                  <InputGroup label="Data de Nascimento" type="date" />
                  <SelectGroup label="Perfil de Risco" options={["Conservador", "Moderado", "Arrojado"]} />
                </div>
              )}

              {/* FORM PJ */}
              {clientType === "PJ" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <InputGroup label="CNPJ" placeholder="00.000.000/0000-00" />
                    <button 
                      type="button" onClick={simulateCNPJLookup}
                      className="absolute right-3 top-10 text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-md"
                    >
                      {loadingAPI ? "Buscando..." : <><Search size={14} className="mr-1" /> Validar</>}
                    </button>
                  </div>
                  <InputGroup label="Razão Social" value={formData.razao} />
                  <InputGroup label="Admin Legal" placeholder="Nome do Responsável" />
                  <InputGroup label="CNAE Principal" value={formData.cnae} />
                </div>
              )}

              {/* FORM ESTRANGEIRO */}
              {clientType === "FOREIGNER" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Nome / Entidade" />
                  <InputGroup label="Tax ID (TIN)" />
                  <InputGroup label="País de Residência" />
                  <SelectGroup label="Moeda" options={["USD", "EUR", "GBP"]} />
                </div>
              )}

              {/* RODAPÉ DO FORMULÁRIO */}
              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-slate-400">
                   <Database size={16} />
                   <span className="text-xs font-bold uppercase tracking-widest">Sincronização via API B3 habilitada</span>
                </div>
                
                {/* BOTÃO DIRECIONADO PARA /CADASTROS */}
                <button 
                  type="submit" 
                  className="w-full md:w-auto bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center"
                >
                  Concluir Cadastro <ArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const SelectionCard = ({ icon, title, desc, onClick }: any) => (
  <button 
    onClick={onClick}
    className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-blue-600 hover:shadow-2xl transition-all group flex flex-col items-center text-center h-full"
  >
    <div className="mb-6 p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </button>
);

const InputGroup = ({ label, placeholder, type = "text", value }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <input 
      type={type} defaultValue={value} placeholder={placeholder}
      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium"
    />
  </div>
);

const SelectGroup = ({ label, options }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium">
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default CadastroNovo;