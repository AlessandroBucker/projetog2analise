import { 
  Users, FileCheck, AlertCircle, Activity, 
  ArrowRight, FileText, Clock 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VisaoGeral = () => {
  const navigate = useNavigate();

  // Dados fictícios para os cards de resumo
  const metricas = [
    { titulo: "Clientes Ativos", valor: "24", icone: <Users size={24} />, cor: "text-blue-600", bg: "bg-blue-50" },
    { titulo: "Docs. Processados", valor: "1.284", icone: <FileCheck size={24} />, cor: "text-green-600", bg: "bg-green-50" },
    { titulo: "Pendências", valor: "3", icone: <AlertCircle size={24} />, cor: "text-red-600", bg: "bg-red-50" },
    { titulo: "Precisão da IA", valor: "98.5%", icone: <Activity size={24} />, cor: "text-purple-600", bg: "bg-purple-50" },
  ];

  // Atividades recentes fictícias
  const atividades = [
    { id: 1, cliente: "Atelier Da Verinha", acao: "Auditoria Fiscal concluída", tempo: "Há 2 horas", status: "sucesso" },
    { id: 2, cliente: "Logística Avançada", acao: "Inconsistência de R$ 5.430,00", tempo: "Há 4 horas", status: "alerta" },
    { id: 3, cliente: "João Silva", acao: "Extração OCR de 45 notas", tempo: "Ontem", status: "sucesso" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map((metrica, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${metrica.bg} ${metrica.cor}`}>
                {metrica.icone}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-gray-800 mb-1">{metrica.valor}</h3>
              <p className="text-sm font-medium text-gray-500">{metrica.titulo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Área Dividida: Atividades e Atalhos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Principal: Atividades Recentes (Ocupa 2 espaços) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Clock size={20} className="mr-2 text-blue-600" />
              Atividades Recentes
            </h3>
            <button 
              onClick={() => navigate('/relatorios')}
              className="text-sm text-blue-600 font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>
          
          <div className="space-y-4">
            {atividades.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'sucesso' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.cliente}</p>
                    <p className="text-xs text-gray-500">{item.acao}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {item.tempo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Secundária: Ações Rápidas (Ocupa 1 espaço) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-3">Atalhos</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/cadastros')}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 border border-transparent rounded-2xl transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-xl text-gray-500 group-hover:text-blue-600 shadow-sm">
                  <Users size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700">Adicionar Cliente</span>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate('/pendencias')}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-red-50 hover:border-red-100 border border-transparent rounded-2xl transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-xl text-gray-500 group-hover:text-red-600 shadow-sm relative">
                  <AlertCircle size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-red-700">Resolver Pendências</span>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              onClick={() => navigate('/relatorios')}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-green-50 hover:border-green-100 border border-transparent rounded-2xl transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-xl text-gray-500 group-hover:text-green-600 shadow-sm">
                  <FileText size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-green-700">Baixar Relatórios</span>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-green-600 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisaoGeral;