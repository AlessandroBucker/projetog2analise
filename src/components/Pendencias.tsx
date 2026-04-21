import { useNavigate } from "react-router-dom";
import { 
  AlertCircle, FileWarning, ArrowRight, 
  UploadCloud, Clock, Search, AlertTriangle,
  ShieldCheck, FileSearch, ArrowLeft,
} from "lucide-react";

const Pendencias = () => {
  const navigate = useNavigate();

  // Dados mesclados: Suas pendências + Status de Auditoria
  const pendencias = [
    { 
      id: 1, 
      cliente: "Atelier Da Verinha", 
      analise: "Auditoria Fiscal (Mar/2026)", 
      motivo: "Baixa resolução: OCR não conseguiu ler o CNPJ da Nota 442.", 
      tipo: "erro", 
      data: "Hoje, 14:30" 
    },
    { 
      id: 2, 
      cliente: "João Silva", 
      analise: "Diagnóstico SCR", 
      motivo: "Aguardando upload do arquivo PDF do Registrato.", 
      tipo: "acao", 
      data: "Ontem, 09:15" 
    },
    { 
      id: 3, 
      cliente: "Logística Avançada", 
      analise: "Gestão de Fluxo de Caixa", 
      motivo: "Inconsistência de R$ 5.430,00 entre notas fiscais e extrato.", 
      tipo: "alerta", 
      data: "12/04/2026" 
    }
  ];

  const renderIcone = (tipo: string) => {
    switch (tipo) {
      case 'erro': return <FileWarning size={24} className="text-red-500" />;
      case 'alerta': return <AlertTriangle size={24} className="text-orange-500" />;
      case 'acao': return <UploadCloud size={24} className="text-[var(--primary-color)]" />;
      default: return <AlertCircle size={24} className="text-gray-500" />;
    }
  };

  const renderBadge = (tipo: string) => {
    switch (tipo) {
      case 'erro': return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">Falha no OCR</span>;
      case 'alerta': return <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">Revisão Necessária</span>;
      case 'acao': return <span className="bg-slate-100 text-[var(--primary-color)] px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Aguardando Arquivo</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Topo com navegação */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center text-slate-500 hover:text-slate-900 font-bold transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Voltar ao Dashboard
          </button>
          
          {/* Badge de Status Global da Conta */}
          <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl border border-yellow-200 shadow-sm">
            <Clock size={16} className="mr-2 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Conta em Auditoria</span>
          </div>
        </div>

        {/* Banner de Aviso de Compliance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <ShieldCheck size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-slate-800">Sua documentação está sendo validada</h3>
            <p className="text-sm text-slate-500 mt-1">
              O Project G2 está analisando seus dados. Resolva as pendências abaixo para acelerar o processo. 
              <span className="text-blue-600 font-semibold ml-1">Prazo estimado: 2h úteis.</span>
            </p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              Itens Pendentes
              <span className="ml-3 bg-red-500 text-white text-sm px-2.5 py-0.5 rounded-full">
                {pendencias.length}
              </span>
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar cliente ou erro..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Lista de Pendências Dinâmica */}
        <div className="space-y-4">
          {pendencias.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              
              <div className="flex items-start space-x-5 flex-1">
                <div className={`p-4 rounded-2xl flex-shrink-0 transition-colors ${
                  item.tipo === 'erro' ? 'bg-red-50' : 
                  item.tipo === 'alerta' ? 'bg-orange-50' : 'bg-slate-50'
                }`}>
                  {renderIcone(item.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{item.cliente}</h3>
                    {renderBadge(item.tipo)}
                  </div>
                  
                  <div className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                    <FileSearch size={16} className="mr-2 text-slate-400" />
                    {item.analise}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <AlertCircle size={16} className="text-slate-400 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800 mr-1">Motivo:</span>
                      {item.motivo}
                    </p>
                  </div>

                  <div className="flex items-center text-xs text-slate-400 mt-4 font-bold uppercase tracking-widest">
                    <Clock size={14} className="mr-1.5" />
                    Registrado em: {item.data}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate("/revisaodados")} // Adicione esta linha
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[var(--primary-color)] transition-all duration-300 active:scale-95 shadow-lg w-full md:w-auto"
              >
                <span>Resolver Agora</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
          {pendencias.length === 0 && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <ShieldCheck size={40} />
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2">Tudo em ordem!</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Nenhuma pendência ou erro de auditoria foi encontrado no momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pendencias;