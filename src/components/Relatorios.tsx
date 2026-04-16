import { useState, useMemo } from "react";
import { 
  FileText, Download, ChevronDown, ChevronUp, 
  Calendar, CheckCircle2, FileSpreadsheet, Filter, Search, X
} from "lucide-react";

const Relatorios = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Estados para os Filtros
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const relatoriosExistentes = [
    { 
      id: 1, 
      titulo: "Auditoria Fiscal - Atelier Da Verinha", 
      cliente: "Atelier Da Verinha",
      data: "2026-04-10", // Formato ISO para facilitar filtro de data
      tipo: "PDF",
      resumo: "Análise de conformidade de notas fiscais de entrada e saída referente ao mês de Março/2026.",
      status: "Finalizado"
    },
    { 
      id: 2, 
      titulo: "Relatório de Governança - João Silva", 
      cliente: "João Silva",
      data: "2026-04-08", 
      tipo: "XLSX",
      resumo: "Cruzamento de dados cadastrais com a base da Receita Federal.",
      status: "Finalizado"
    },
    { 
      id: 3, 
      titulo: "Extração OCR - Logística Avançada", 
      cliente: "Logística Avançada",
      data: "2026-04-05", 
      tipo: "PDF",
      resumo: "Extração automatizada de 150 documentos de transporte.",
      status: "Finalizado"
    }
  ];

  // Lógica de Filtragem Dinâmica
  const relatoriosFiltrados = useMemo(() => {
    return relatoriosExistentes.filter(rel => {
      const bateCliente = rel.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
      const bateTipo = filtroTipo === "" || rel.tipo === filtroTipo;
      const bateDataInicio = dataInicio === "" || rel.data >= dataInicio;
      const bateDataFim = dataFim === "" || rel.data <= dataFim;
      
      return bateCliente && bateTipo && bateDataInicio && bateDataFim;
    });
  }, [filtroCliente, filtroTipo, dataInicio, dataFim]);

  const limparFiltros = () => {
    setFiltroCliente("");
    setFiltroTipo("");
    setDataInicio("");
    setDataFim("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* BARRA DE FILTROS */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center space-x-2 mb-4 text-blue-600">
          <Filter size={20} />
          <span className="font-bold">Filtros de Pesquisa</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca por Cliente */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Nome do cliente..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
            />
          </div>

          {/* Tipo de Relatório */}
          <select 
            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos os Tipos</option>
            <option value="PDF">PDF (Auditoria)</option>
            <option value="XLSX">Excel (Dados)</option>
          </select>

          {/* Intervalo de Datas */}
          <input 
            type="date"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input 
            type="date"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        {(filtroCliente || filtroTipo || dataInicio || dataFim) && (
          <button 
            onClick={limparFiltros}
            className="mt-4 text-xs text-red-500 font-bold flex items-center hover:underline"
          >
            <X size={14} className="mr-1" /> Limpar Filtros
          </button>
        )}
      </div>

      {/* LISTA DE RELATÓRIOS FILTRADOS */}
      <div className="space-y-4">
        {relatoriosFiltrados.length > 0 ? (
          relatoriosFiltrados.map((rel) => (
            <div 
              key={rel.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                expandedId === rel.id ? 'border-blue-500 shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              <div 
                onClick={() => setExpandedId(expandedId === rel.id ? null : rel.id)}
                className="p-5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${rel.tipo === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {rel.tipo === 'PDF' ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{rel.titulo}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1" />
                      {new Date(rel.data).toLocaleDateString('pt-BR')}
                      <span className="mx-2">•</span>
                      <CheckCircle2 size={14} className="mr-1 text-green-500" />
                      {rel.status}
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  {expandedId === rel.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>

              {expandedId === rel.id && (
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-gray-50 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                      {rel.resumo}
                    </p>
                    <div className="mt-5 flex justify-end">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95">
                        <Download size={18} />
                        <span>Download {rel.tipo}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-gray-500 font-medium">Nenhum relatório encontrado para os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Relatorios;