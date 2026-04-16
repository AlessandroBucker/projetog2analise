import { Play, ShieldCheck, Clock, AlertCircle, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cadastros = () => { // Nome alterado para combinar com o arquivo
  const navigate = useNavigate();

  const clientes = [
    { id: 1, nome: "Atelier Da Verinha", tipo: "PJ", documento: "12.345.678/0001-99", status: "Concluído" },
    { id: 2, nome: "João Silva Auditoria", tipo: "PF", documento: "123.456.789-00", status: "Pendente" },
    { id: 3, nome: "Logística Avançada", tipo: "PJ", documento: "98.765.432/0001-11", status: "Em Análise" },
    { id: 4, nome: "Consultoria Contábil G2", tipo: "PJ", documento: "55.444.333/0001-00", status: "Atenção" },
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "Concluído":
        return <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold"><ShieldCheck size={14} className="mr-1"/> Auditado</span>;
      case "Em Análise":
        return <span className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold"><Clock size={14} className="mr-1"/> Processando</span>;
      case "Atenção":
        return <span className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold"><AlertCircle size={14} className="mr-1"/> Inconsistência</span>;
      default:
        return <span className="flex items-center text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold">Aguardando</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"> {/* Garante que a tabela não quebre em telas menores */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-600 text-sm">Nome / Razão Social</th>
                <th className="p-4 font-bold text-gray-600 text-sm text-center">Tipo</th>
                <th className="p-4 font-bold text-gray-600 text-sm">CPF / CNPJ</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Status da Análise</th>
                <th className="p-4 font-bold text-gray-600 text-sm text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3 font-bold text-xs uppercase">
                        {cliente.nome.substring(0, 2)}
                      </div>
                      <span className="font-medium text-gray-800">{cliente.nome}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {cliente.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-sm">{cliente.documento}</td>
                  <td className="p-4">
                    {renderStatus(cliente.status)}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate('/nova-analise')}
                      className="flex items-center justify-center mx-auto space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-sm active:scale-95 group"
                    >
                      <Play size={14} className="fill-current" />
                      <span>Iniciar Análise</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botão de Cadastro alinhado à direita */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center space-x-2 bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm">
          <PlusCircle size={18} />
          <span>Cadastrar Novo Cliente</span>
        </button>
      </div>
    </div>
  );
};

export default Cadastros; // Export atualizado