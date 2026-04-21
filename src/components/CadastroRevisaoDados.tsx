import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Edit3, Upload, CheckCircle2, HelpCircle, 
  FileText, MessageSquare, AlertCircle, ArrowRight, Clock 
} from "lucide-react";

// --- CONFIGURAÇÃO DE DOCUMENTOS EXIGIDOS ---
const REQUIREMENTS = {
  PF: [
    { id: "rg", label: "Identidade (RG/CNH)", desc: "Faça upload da frente e verso legíveis.", help: "Necessário para validação de identidade e KYC." },
    { id: "residencia", label: "Comprovante de Residência", desc: "Contas de luz, água ou telefone fixo.", help: "Valida a jurisdição fiscal do investidor." }
  ],
  PJ: [
    { id: "cartao_cnpj", label: "Cartão CNPJ", desc: "Baixe o PDF atualizado no site da Receita.", help: "Valida se a empresa está ativa e regular." },
    { id: "contrato_social", label: "Contrato Social", desc: "Envie a última alteração consolidada.", help: "Necessário para validar o poder de assinatura." },
    { id: "comprovante_bancario", label: "Comprovante Bancário PJ", desc: "Extrato ou cabeçalho de conta.", help: "Evita fraudes em repasses financeiros." }
  ],
  FOREIGNER: [
    { id: "passport", label: "Passaporte / ID Nacional", desc: "Documento oficial do país de origem.", help: "Identificação internacional obrigatória." },
    { id: "tax_residency", label: "Proof of Tax Residency", desc: "Comprovante de residência fiscal externa.", help: "Define o regime de tributação internacional." }
  ]
};

type ProfileType = "PF" | "PJ" | "FOREIGNER";

const CadastroRevisaoDados = () => {
  const navigate = useNavigate();
  const [activeTab] = useState<ProfileType>("PJ"); // Definido fixo para exemplo, ou use tabs para trocar
  const [isEditing, setIsEditing] = useState(false);
  const [uploads, setUploads] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    razaoSocial: "G2 Governança LTDA",
    cnpj: "00.000.000/0001-00",
    inscricaoEstadual: "123.456.789.000",
    telefone: "(11) 98888-7777",
    email: "contato@g2governanca.com"
  });

  const isComplete = REQUIREMENTS[activeTab].every(doc => uploads[doc.id]);

  const handleUpload = (id: string) => {
    setUploads(prev => ({ ...prev, [id]: `arquivo_${id}.pdf` }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          
          {/* COLUNA A: DADOS CADASTRAIS */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Dados Cadastrais</h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 text-sm font-bold transition-colors ${isEditing ? 'text-green-600' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  <Edit3 size={16} />
                  {isEditing ? "Salvar Alterações" : "Editar Dados"}
                </button>
              </div>

              <div className="space-y-4">
                <ReviewField label="Razão Social" value={formData.razaoSocial} isEditing={isEditing} 
                  onChange={(v: string) => setFormData({...formData, razaoSocial: v})} />
                <ReviewField label="CNPJ" value={formData.cnpj} isEditing={isEditing} 
                  onChange={(v: string) => setFormData({...formData, cnpj: v})} />
                <ReviewField label="Inscrição Estadual" value={formData.inscricaoEstadual} isEditing={isEditing} 
                  onChange={(v: string) => setFormData({...formData, inscricaoEstadual: v})} />
                <ReviewField label="Telefone Comercial" value={formData.telefone} isEditing={isEditing} 
                  onChange={(v: string) => setFormData({...formData, telefone: v})} />
              </div>

              {/* HISTÓRICO */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-red-500 mb-3">
                  <MessageSquare size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Histórico de Validação</span>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                  <p className="text-xs text-red-700 leading-relaxed">
                    <span className="font-bold">Admin (12/04):</span> "A Inscrição Estadual informada não consta no cadastro do Sintegra. Favor revisar."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* COLUNA B: UPLOAD DE DOCUMENTOS */}
          <section className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-slate-400" size={20} />
                <h2 className="text-xl font-bold">Central de Documentos</h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">Documento / Instrução</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {REQUIREMENTS[activeTab].map((doc) => (
                      <tr key={doc.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-slate-800">{doc.label}</span>
                              <div className="relative group/help">
                                <HelpCircle size={14} className="text-slate-300 cursor-help" />
                                <div className="absolute left-0 bottom-6 hidden group-hover/help:block w-48 p-3 bg-slate-800 text-white text-[10px] rounded-xl shadow-xl z-20">
                                  {doc.help}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500">{doc.desc}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {uploads[doc.id] ? (
                            <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase">
                              <CheckCircle2 size={14} /> Enviado
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase">
                              <Clock size={14} /> Pendente
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => handleUpload(doc.id)}
                            className={`p-2.5 rounded-xl border transition-all ${uploads[doc.id] ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                          >
                            <Upload size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* BOTÃO FINAL */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center">
                {!isComplete && (
                  <div className="flex items-center gap-2 text-orange-500 mb-4 animate-pulse">
                    <AlertCircle size={16} />
                    <span className="text-xs font-bold">Aguardando todos os documentos obrigatórios</span>
                  </div>
                )}
                
                <button 
                  disabled={!isComplete}
                  onClick={() => navigate("/pendencias")}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isComplete ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                >
                  Enviar para Validação
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTES ---

const ReviewField = ({ label, value, isEditing, onChange }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <input 
      type="text"
      value={value}
      readOnly={!isEditing}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-xl border transition-all text-sm font-medium ${isEditing ? 'border-blue-500 bg-white shadow-sm outline-none' : 'border-slate-100 bg-slate-50 text-slate-500 cursor-default'}`}
    />
  </div>
);

export default CadastroRevisaoDados;