import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Building2, 
  Globe, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileCheck, 
  ShieldAlert, // <--- VERIFIQUE SE ESTE ÍCONE ESTÁ AQUI
  CheckCircle2,
  FileText, 
  Camera, 
  Info, 
  X, 
  Search, 
  Database, 
  ShieldCheck 
} from "lucide-react";

// --- CONFIGURAÇÃO DE DOCUMENTOS POR PERFIL ---
const DOCUMENT_CHECKLIST = {
  PF: [
    { id: "id_frente", label: "Identidade (Frente)", icon: <FileText size={18} />, desc: "RG ou CNH legível" },
    { id: "id_verso", label: "Identidade (Verso)", icon: <FileText size={18} />, desc: "Verso do documento" },
    { id: "residencia", label: "Comprovante de Residência", icon: <Globe size={18} />, desc: "Contas de consumo (luz, água)" },
    { id: "selfie", label: "Selfie com Documento", icon: <Camera size={18} />, desc: "Foto do rosto segurando o ID" },
  ],
  PJ: [
    { id: "cnpj_card", label: "Cartão CNPJ", icon: <Building2 size={18} />, desc: "Emitido pela Receita Federal" },
    { id: "contrato_social", label: "Contrato Social / Estatuto", icon: <FileText size={18} />, desc: "Última alteração consolidada" },
    { id: "conta_pj", label: "Comprovante Bancário PJ", icon: <CheckCircle2 size={18} />, desc: "Cabeçalho de extrato ou conta" },
  ],
  FOREIGNER: [
    { id: "passport", label: "Passaporte / ID Nacional", icon: <Globe size={18} />, desc: "Documento oficial do país de origem" },
    { id: "tax_proof", label: "Proof of Tax Residency", icon: <ShieldAlert size={18} />, desc: "Comprovante de residência fiscal" },
    { id: "terms_intl", label: "Termos Internacionais", icon: <FileCheck size={18} />, desc: "Acordo assinado digitalmente" },
  ],
};

type ClientType = "PF" | "PJ" | "FOREIGNER" | null;

const NovoCliente = () => {
  const navigate = useNavigate();
  
  // ESTADOS DO FLUXO
  const [step, setStep] = useState(0); // 0: Perfil, 1: Dados, 2: Documentos
  const [clientType, setClientType] = useState<ClientType>(null);
  const [loadingAPI, setLoadingAPI] = useState(false);
  
  // ESTADOS DE DADOS
  const [formData, setFormData] = useState({
    nome: "", email: "", cpf: "", cnpj: "", razao: "", 
    nascimento: "", ocupacao: "", tin: "", pais: "", 
    moeda: "USD", perfilRisco: "Moderado", origem: "API B3"
  });
  const [uploads, setUploads] = useState<Record<string, File | null>>({});

  // LÓGICA DE NAVEGAÇÃO E VALIDAÇÃO
  const handleFileChange = (id: string, file: File | null) => {
    setUploads(prev => ({ ...prev, [id]: file }));
  };

  const isAllUploaded = () => {
    if (!clientType) return false;
    return DOCUMENT_CHECKLIST[clientType].every(doc => uploads[doc.id]);
  };

  const simulateCNPJLookup = () => {
    setLoadingAPI(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, razao: "EMPRESA DE ANALISE FINANCEIRA LTDA" }));
      setLoadingAPI(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 md:p-12 font-sans">
      
      {/* HEADER DE NAVEGAÇÃO / PROGRESSO */}
      <div className="w-full max-w-4xl mb-10 flex items-center justify-between">
        <button 
          onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} 
          className="flex items-center text-slate-500 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> {step === 0 ? "Cancelar" : "Voltar"}
        </button>
        <div className="flex space-x-2">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`h-2 w-12 rounded-full transition-colors ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl">
        
        {/* PASSO 0: SELEÇÃO DE PERFIL */}
        {step === 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <header className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Novo Cadastro</h1>
              <p className="text-slate-500">Selecione o tipo de conta para começar o onboarding.</p>
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
                desc="Empresas e Holdings com necessidades fiscais."
                onClick={() => { setClientType("PJ"); setStep(1); }} 
              />
              <SelectionCard 
                icon={<Globe size={32} />} 
                title="Estrangeiro" 
                desc="Investidores internacionais (Offshore)."
                onClick={() => { setClientType("FOREIGNER"); setStep(1); }} 
              />
            </div>
          </div>
        )}

        {/* PASSO 1: FORMULÁRIO DINÂMICO */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in slide-in-from-right-8 duration-500 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <ShieldCheck className="text-blue-600" /> Dados Fiscais e Compliance
            </h2>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              {clientType === "PF" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Nome Completo" placeholder="Nome igual ao documento" />
                  <InputGroup label="CPF" placeholder="000.000.000-00" />
                  <InputGroup label="Nascimento" type="date" />
                  <InputGroup label="Ocupação" placeholder="Ex: Analista de Sistemas" />
                </div>
              )}

              {clientType === "PJ" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <InputGroup label="CNPJ" placeholder="00.000.000/0000-00" />
                    <button 
                      type="button" onClick={simulateCNPJLookup}
                      className="absolute right-3 top-10 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold flex items-center gap-1"
                    >
                      {loadingAPI ? "Buscando..." : <><Search size={12} /> Validar</>}
                    </button>
                  </div>
                  <InputGroup label="Razão Social" value={formData.razao} placeholder="Buscando via Receita..." />
                  <InputGroup label="Admin Legal" placeholder="Nome do representante" />
                  <InputGroup label="CNAE Principal" />
                </div>
              )}

              {clientType === "FOREIGNER" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Nome / Entidade" />
                  <InputGroup label="Tax ID (TIN)" placeholder="Documento do país de origem" />
                  <InputGroup label="País de Residência" />
                  <SelectGroup label="Moeda" options={["USD", "EUR", "GBP"]} />
                </div>
              )}

              <div className="pt-6 border-t flex items-center justify-between">
                <SelectGroup label="Origem dos Dados" options={["API B3", "Integração Bancária", "Manual"]} />
                <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                  Próximo: Documentos <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PASSO 2: CENTRAL DE DOCUMENTOS */}
        {step === 2 && clientType && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in slide-in-from-right-8 duration-500 border border-slate-100">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-slate-900">Documentação</h2>
                <span className="bg-yellow-100 text-yellow-800 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase">
                  Aguardando Validação
                </span>
              </div>
              <p className="text-slate-500">O status do perfil será atualizado após análise manual.</p>
            </header>

            <div className="space-y-3 mb-10">
              {DOCUMENT_CHECKLIST[clientType].map((doc) => (
                <DocumentUploadRow 
                  key={doc.id} doc={doc} 
                  file={uploads[doc.id]} 
                  onFileSelect={(f) => handleFileChange(doc.id, f)} 
                />
              ))}
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl flex gap-4 border border-blue-100 mb-8">
              <Info className="text-blue-600 shrink-0" size={20} />
              <p className="text-xs text-blue-900 leading-relaxed">
                Os arquivos serão verificados em conformidade com a <b>LGPD</b> e protocolos <b>KYC</b>. 
                Funcionalidades críticas estarão suspensas durante o período de análise (estimativa: 2h úteis).
              </p>
            </div>

            <button 
                disabled={!isAllUploaded()}
                onClick={() => { 
                    // Aqui fazemos o redirecionamento para a página de pendências
                    navigate("/pendencias"); 
                }}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                    ${isAllUploaded() ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                Concluir Cadastro <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const SelectionCard = ({ icon, title, desc, onClick }: any) => (
  <button onClick={onClick} className="p-8 bg-white border border-slate-100 rounded-3xl text-center flex flex-col items-center hover:border-blue-600 hover:shadow-lg transition-all group">
    <div className="mb-6 p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </button>
);

const DocumentUploadRow = ({ doc, file, onFileSelect }: any) => (
  <div className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${file ? 'border-green-100 bg-green-50/30' : 'border-slate-50 bg-white'}`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${file ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>{doc.icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-800">{doc.label}</h4>
        <p className="text-[11px] text-slate-500">{doc.desc}</p>
      </div>
    </div>
    {file ? (
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-green-600 max-w-[120px] truncate">{file.name}</span>
        <button onClick={() => onFileSelect(null)} className="p-1 text-red-500 hover:bg-red-50 rounded-md"><X size={16} /></button>
      </div>
    ) : (
      <label className="cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
        Upload <input type="file" className="hidden" onChange={(e) => onFileSelect(e.target.files?.[0] || null)} />
      </label>
    )}
  </div>
);

const InputGroup = ({ label, placeholder, type = "text", value }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>
    <input 
      type={type} defaultValue={value} placeholder={placeholder}
      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
    />
  </div>
);

const SelectGroup = ({ label, options }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>
    <select className="px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 text-sm">
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default NovoCliente;