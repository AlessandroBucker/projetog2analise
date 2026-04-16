import { useState } from "react";
import { ClipboardCheck, Database, FileSearch, Save } from "lucide-react";


const NovaAnalise = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cadastro: "",
    tipo: "",
    reutilizar: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados da Análise:", formData);
    alert("Análise iniciada com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          
          {/* Campo: Nome da Análise */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <ClipboardCheck size={18} className="mr-2 text-blue-500" />
              Nome da Análise
            </label>
            <input
              type="text"
              placeholder="Ex: Auditoria Trimestral - Empresa X"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo: Seleção do Cadastro (Empresa/Cliente) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Database size={18} className="mr-2 text-blue-500" />
                Seleção do Cadastro
              </label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                value={formData.cadastro}
                onChange={(e) => setFormData({...formData, cadastro: e.target.value})}
                required
              >
                <option value="">Selecione a empresa...</option>
                <option value="1">Atelier Da Verinha</option>
                <option value="2">Escritório Central LTDA</option>
                <option value="3">Logística Avançada</option>
              </select>
            </div>

            {/* Campo: Tipo de Análise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileSearch size={18} className="mr-2 text-blue-500" />
                Tipo de Análise
              </label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                required
              >
                <option value="">Selecione o tipo...</option>
                <option value="ocr_fiscal">Extração OCR Fiscal</option>
                <option value="governanca">Conformidade Contábil</option>
                <option value="auditoria">Auditoria de Documentos</option>
                <optgroup label="Serviços PJ (Empresarial)">
                <option value="pj_fluxo">Gestão de Fluxo de Caixa</option>
                <option value="pj_valuation">Avaliação de Empresa (Valuation)</option>
                <option value="pj_restruturacao">Redução de Custos e Reestruturação</option>
                </optgroup>
                <optgroup label="Serviços PF (Pessoal)">
                <option value="pf_patrimonio">Balanço Patrimonial Pessoal</option>
                <option value="pf_dividas">Diagnóstico Financeiro (SCR/Registrato)</option>
                <option value="pf_investimentos">Consultoria de Investimentos</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Campo: Reutilizar Dados Anteriores (Switch) */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">Reutilizar dados anteriores?</span>
              <span className="text-xs text-gray-500">Aproveita parâmetros e históricos de auditorias passadas.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={formData.reutilizar}
                onChange={(e) => setFormData({...formData, reutilizar: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="flex justify-center">
          <button 
            type="submit"
            className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 hover:shadow-lg transition-all transform active:scale-95"
          >
            <Save size={20} />
            <span>Iniciar Processamento</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaAnalise;