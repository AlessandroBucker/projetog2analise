import { 
  AlertCircle, FileWarning, ArrowRight, 
  UploadCloud, Clock, Search, AlertTriangle
} from "lucide-react";

const Pendencias = () => {
  // Dados fictícios simulando o retorno do Django
  const pendencias = [
    { 
      id: 1, 
      cliente: "Atelier Da Verinha", 
      analise: "Auditoria Fiscal (Mar/2026)", 
      motivo: "Baixa resolução: OCR não conseguiu ler o CNPJ da Nota 442.", 
      tipo: "erro", // Requer reenvio
      data: "Hoje, 14:30" 
    },
    { 
      id: 2, 
      cliente: "João Silva", 
      analise: "Diagnóstico SCR", 
      motivo: "Aguardando upload do arquivo PDF do Registrato.", 
      tipo: "acao", // Aguardando ação do usuário
      data: "Ontem, 09:15" 
    },
    { 
      id: 3, 
      cliente: "Logística Avançada", 
      analise: "Gestão de Fluxo de Caixa", 
      motivo: "Inconsistência de R$ 5.430,00 entre notas fiscais e extrato.", 
      tipo: "alerta", // Requer revisão humana
      data: "12/04/2026" 
    }
  ];

  const renderIcone = (tipo: string) => {
    switch (tipo) {
      case 'erro': return <FileWarning size={24} className="text-red-500" />;
      case 'alerta': return <AlertTriangle size={24} className="text-orange-500" />;
      // Trocado para cor dinâmica:
      case 'acao': return <UploadCloud size={24} className="text-[var(--primary-color)] transition-colors" />;
      default: return <AlertCircle size={24} className="text-gray-500" />;
    }
  };

  const renderBadge = (tipo: string) => {
    switch (tipo) {
      case 'erro': return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">Falha no OCR</span>;
      case 'alerta': return <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">Revisão Necessária</span>;
      // Fundo neutro, texto e borda dinâmicos:
      case 'acao': return <span className="bg-slate-100 text-[var(--primary-color)] px-3 py-1 rounded-full text-xs font-bold border border-slate-200 transition-colors">Aguardando Arquivo</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Pendências
            <span className="ml-3 bg-red-500 text-white text-sm px-2.5 py-0.5 rounded-full">
              {pendencias.length}
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Análises que exigem sua intervenção para prosseguir.</p>
        </div>

        {/* Barra de Pesquisa Rápida */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por cliente ou análise..." 
            // Focus com cor dinâmica:
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] bg-white transition-all"
          />
        </div>
      </div>

      {/* Lista de Pendências */}
      <div className="space-y-4">
        {pendencias.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            
            <div className="flex items-start space-x-4 flex-1">
              {/* O fundo de "acao" (que antes era azul) agora é neutro (slate-100) para abraçar qualquer cor */}
              <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${item.tipo === 'erro' ? 'bg-red-50' : item.tipo === 'alerta' ? 'bg-orange-50' : 'bg-slate-100'}`}>
                {renderIcone(item.tipo)}
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="font-bold text-gray-800">{item.cliente}</h3>
                  {renderBadge(item.tipo)}
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">{item.analise}</p>
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-700 mr-2">Motivo:</span>
                  {item.motivo}
                </p>
                <div className="flex items-center text-xs text-gray-400 mt-3 font-medium">
                  <Clock size={14} className="mr-1" />
                  Registrado: {item.data}
                </div>
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="flex-shrink-0 flex justify-end">
              <button 
                // Quando passar o mouse, o botão deixa de ser preto e assume a cor primária do sistema
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-[var(--primary-color)] transition-colors duration-300 active:scale-95 w-full md:w-auto justify-center"
              >
                <span>Resolver Agora</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        ))}

        {pendencias.length === 0 && (
          <div className="bg-slate-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <AlertCircle size={32} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Tudo em ordem!</h3>
            <p className="text-gray-500 text-sm">Nenhuma pendência aguardando sua ação no momento.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Pendencias;