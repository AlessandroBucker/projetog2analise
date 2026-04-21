import { useState } from "react";
import { 
  Search, Plus, Filter, FileBarChart, 
  CheckCircle2, Clock, AlertTriangle, ArrowUpRight, Download,
  Building2, Calendar
} from "lucide-react";

// --- TIPAGEM ---
type StatusType = "Concluído" | "Em Revisão" | "Pendente" | "Crítico";

interface Analises {
  id: string;
  titulo: string;
  empresa: string;
  data: string;
  status: StatusType;
  score: number;
}

const MOCK_ANALISES: Analises[] = [
  { id: "1", titulo: "Auditoria de Crédito Trimestral", empresa: "G2 Governança LTDA", data: "12/04/2026", status: "Concluído", score: 95 },
  { id: "2", titulo: "Análise de Risco Operacional", empresa: "Logística Express", data: "18/04/2026", status: "Em Revisão", score: 72 },
  { id: "3", titulo: "Conformidade Tributária Anual", empresa: "Varejo Plus SA", data: "20/04/2026", status: "Crítico", score: 45 },
  { id: "4", titulo: "Validação de Folha de Pagamento", empresa: "Tech Inovação", data: "21/04/2026", status: "Pendente", score: 0 },
];

const Analises = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* HEADER DA PÁGINA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Análises</h1>
            <p className="text-slate-500 text-sm mt-1">Monitore e gerencie os fluxos de governança e auditoria.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
            <Plus size={20} />
            Nova Análise
          </button>
        </div>

        {/* GRID DE MÉTRICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<FileBarChart size={20}/>} label="Total de Análises" value="48" color="text-blue-600" />
          <StatCard icon={<Clock size={20}/>} label="Em Aberto" value="12" color="text-orange-500" />
          <StatCard icon={<CheckCircle2 size={20}/>} label="Concluídas" value="32" color="text-green-600" />
          <StatCard icon={<AlertTriangle size={20}/>} label="Alertas Críticos" value="04" color="text-red-600" />
        </div>

        {/* ÁREA DE FILTROS E TABELA */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* BARRA DE FERRAMENTAS */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Buscar por análise ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter size={18} /> Filtros
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Download size={18} /> Exportar
              </button>
            </div>
          </div>

          {/* TABELA DE ANÁLISES */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Análise / Cliente</th>
                  <th className="px-8 py-5">Data de Início</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">G2 Score</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_ANALISES.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{item.titulo}</span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <Building2 size={12} /> {item.empresa}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {item.data}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.score > 70 ? 'bg-green-500' : item.score > 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{item.score}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-blue-600">
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTES AUXILIARES ---

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
    <div className={`p-3 rounded-2xl bg-slate-50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900 leading-none mt-1">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: StatusType }) => {
  const styles = {
    "Concluído": "bg-green-50 text-green-700 border-green-100",
    "Em Revisão": "bg-blue-50 text-blue-700 border-blue-100",
    "Pendente": "bg-slate-100 text-slate-600 border-slate-200",
    "Crítico": "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default Analises;