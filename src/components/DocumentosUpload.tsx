import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, User, Building2, Globe, 
  UploadCloud, FileText, ChevronRight, AlertCircle, FileCheck,
} from "lucide-react";

// --- TIPAGEM E REQUISITOS ---
type ProfileType = "PF" | "PJ" | "FOREIGNER";

interface DocRequirement {
  id: string;
  label: string;
  desc: string;
}

const DOCUMENT_REQUIREMENTS: Record<ProfileType, DocRequirement[]> = {
  PF: [
    { id: "id_doc", label: "Identidade (RG/CNH)", desc: "Frente e verso legíveis." },
    { id: "proof_res", label: "Comprovante de Residência", desc: "Contas de luz, água ou telefone." }
  ],
  PJ: [
    { id: "cnpj_card", label: "Cartão CNPJ", desc: "PDF atualizado da Receita Federal." },
    { id: "social_contract", label: "Contrato Social", desc: "Última alteração consolidada." }
  ],
  FOREIGNER: [
    { id: "passport", label: "Passaporte / ID", desc: "Documento oficial do país de origem." },
    { id: "tax_res", label: "Proof of Tax Residency", desc: "Comprovante fiscal internacional." }
  ]
};

const ANALISES_CRIADAS = [
  { id: 1, nome: "Auditoria de Crédito Trimestral - Mar/2026", tipo: "PJ" },
  { id: 2, nome: "Análise de Risco Operacional - Logística", tipo: "PF" }
];

const CADASTROS_EXISTENTES = [
  { id: 101, nome: "Alessandro G2 - PF", tipo: "PF" },
  { id: 102, nome: "G2 Governança LTDA - PJ", tipo: "PJ" },
  { id: 103, nome: "Investidor Internacional - Foreigner", tipo: "FOREIGNER" }
];

const DocumentosUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<ProfileType>("PJ");
  const [uploads, setUploads] = useState<Record<string, File | null>>({});
  const [extraFiles, setExtraFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [objetivo, setObjetivo] = useState("Complementar Cadastro");
  const [itemSelecionado, setItemSelecionado] = useState("");

  const handleSelectionChange = (valor: string) => {
    setItemSelecionado(valor);
    const fonte = objetivo === "Complementar Cadastro" ? CADASTROS_EXISTENTES : ANALISES_CRIADAS;
    const encontrado = fonte.find(i => i.nome === valor);
    
    if (encontrado) {
      setActiveTab(encontrado.tipo as ProfileType);
      setUploads({}); 
    }
  };

  const handleFileChange = (id: string, file: File | null) => {
    setUploads(prev => ({ ...prev, [id]: file }));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setExtraFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleManualUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setExtraFiles(prev => [...prev, ...newFiles]);
      // Reset para permitir subir o mesmo arquivo se for deletado
      e.target.value = ""; 
    }
  };

  const removeFile = (index: number) => {
    setExtraFiles(prev => prev.filter((_, i) => i !== index));
  };

  const profileData = {
    nome: itemSelecionado || "Aguardando Seleção",
    documento: activeTab === "PJ" ? "CNPJ Detectado" : activeTab === "PF" ? "CPF Detectado" : "Passport Detectado",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex flex-col gap-6">
          
          {/* CARD SUPERIOR: CONTEXTO */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-100 rounded-2xl text-slate-500">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-xl font-bold">Contexto do Upload</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Objetivo</label>
                    <select 
                      value={objetivo}
                      onChange={(e) => {
                        setObjetivo(e.target.value);
                        setItemSelecionado("");
                      }}
                      className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm font-bold text-blue-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Complementar Cadastro">Complementar Cadastro</option>
                      <option value="Enviar documento para análise">Enviar documento para análise</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                      {objetivo === "Complementar Cadastro" ? "Cadastro" : "Vincular à Análise"}
                    </label>
                    <select 
                      value={itemSelecionado}
                      onChange={(e) => handleSelectionChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      <option value="">Selecione...</option>
                      {objetivo === "Complementar Cadastro" 
                        ? CADASTROS_EXISTENTES.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)
                        : ANALISES_CRIADAS.map(a => <option key={a.id} value={a.nome}>{a.nome}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <ReadOnlyInput label="Alvo Identificado" value={profileData.nome} />
                  <div className="grid grid-cols-2 gap-4">
                    <ReadOnlyInput label="Tipo de Documento" value={profileData.documento} />
                    <div className="flex flex-col">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Perfil Ativo</label>
                      <div className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg transition-all">
                         {activeTab === "PJ" ? <Building2 size={16}/> : activeTab === "PF" ? <User size={16}/> : <Globe size={16}/>}
                         {activeTab}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CARD INFERIOR: UPLOAD */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-2xl text-blue-600">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-bold">Documentação Obrigatória</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {itemSelecionado ? (
                DOCUMENT_REQUIREMENTS[activeTab].map((doc) => (
                  <div key={doc.id} className="p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl ${uploads[doc.id] ? 'bg-green-100 text-green-600' : 'bg-white text-slate-300'}`}>
                        {uploads[doc.id] ? <FileCheck size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{doc.label}</h4>
                        <p className="text-[10px] text-slate-400">{doc.desc}</p>
                      </div>
                    </div>
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)} />
                      <div className={`px-4 py-2 rounded-xl font-bold text-[10px] transition-colors ${uploads[doc.id] ? 'bg-green-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
                        {uploads[doc.id] ? "Alterar" : "Enviar"}
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 py-10 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400">
                  <AlertCircle size={32} className="mb-2 opacity-20" />
                  <p className="text-sm italic">Selecione um cadastro ou análise para ver os requisitos.</p>
                </div>
              )}
            </div>

            {/* DRAG & DROP ADICIONAIS */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <UploadCloud size={18} className="text-slate-400" />
                Documentos Adicionais ou de Suporte
              </h3>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-3xl p-10 
                  flex flex-col items-center justify-center transition-all duration-200 cursor-pointer
                  ${isDragging 
                    ? "border-blue-500 bg-blue-50 scale-[1.01]" 
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/50"}
                `}
              >
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleManualUpload} 
                />
                
                <div className={`p-4 rounded-full mb-3 ${isDragging ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 shadow-sm"}`}>
                  <UploadCloud size={32} />
                </div>
                
                <p className="text-sm font-bold text-slate-700">Arraste arquivos aqui</p>
                <p className="text-xs text-slate-400 mt-1">ou clique para selecionar do computador</p>
              </div>

              {extraFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  {extraFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-blue-500" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[250px]">{file.name}</span>
                          <span className="text-[9px] text-slate-400 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); // Essencial para não abrir o seletor de arquivos
                          removeFile(index); 
                        }}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate("/visaogeral")} // Atualizado conforme sua correção de rota anterior
              disabled={!itemSelecionado}
              className={`w-full mt-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                itemSelecionado ? "bg-slate-900 text-white hover:bg-blue-600" : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              Concluir e Enviar para Validação
              <ChevronRight size={18} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTES ---

interface ReadOnlyProps {
  label: string;
  value: string;
}

const ReadOnlyInput = ({ label, value }: ReadOnlyProps) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold text-slate-600 cursor-default opacity-80">
      {value}
    </div>
  </div>
);

export default DocumentosUpload;