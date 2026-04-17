import { useState } from "react"; 
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Settings, 
  LogOut, Bell, ShieldCheck,
  BarChart3, PlusCircle, FileWarning 
} from "lucide-react";

const Layout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getTituloPagina = () => {
    switch (location.pathname.toLowerCase()) {
      case '/visaogeral': return 'Visão Geral';
      case '/cadastros': return 'Cadastrados';
      case '/novaanalise': return 'Configurar Nova Análise';
      case '/pendencias': return 'Central de Pendências';
      case '/relatorios': return 'Relatórios';
      case '/configuracoes': return 'Configurações';
      default: return 'Visão Geral';
    }
  };

  const notifications = [
    { id: 1, text: "Novo lead capturado: João Silva", time: "5 min atrás" },
    { id: 2, text: "OCR concluído: Nota Fiscal #442", time: "1 hora atrás" },
    { id: 3, text: "Alerta: Documento pendente há 2 dias", time: "3 horas atrás" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar Fixa */}
      <aside className="fixed top-0 left-0 h-screen group w-20 hover:w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 z-50 shadow-xl">
        <div className="p-6 h-20 flex items-center border-b border-slate-800 overflow-hidden whitespace-nowrap">
          <ShieldCheck className="text-blue-400 min-w-[32px]" size={32} />
          <span className="ml-4 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            ProjetoG2 <span className="text-blue-400 text-sm italic">AI</span>
          </span>
        </div>
        
        {/* SEQUÊNCIA DE BOTÕES PADRONIZADA */}
        <nav className="flex-1 p-4 space-y-2 overflow-hidden">
            <button onClick={() => navigate('/visaogeral')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              <LayoutDashboard size={24} className="min-w-[24px]" />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Visão Geral</span>
            </button>
            
            <button onClick={() => navigate('/cadastros')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              <Users size={24} className="min-w-[24px]" />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Cadastros</span>
            </button>
            
            <button onClick={() => navigate('/novaanalise')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              <PlusCircle size={24} className="min-w-[24px]" />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Nova Análise</span>
            </button>
            
            <button onClick={() => navigate('/pendencias')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap group relative">
              <div className="relative min-w-[24px]">
                  <FileWarning size={24} className="min-w-[24px]" />
                  {/* O alerta vermelho permanece aqui */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center justify-between flex-1">
                  Pendências
                  {/* O badge numérico vermelho permanece aqui */}
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">3</span>
              </span>
            </button>
            
            <button onClick={() => navigate('/relatorios')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap">
                <BarChart3 size={24} className="min-w-[24px]" />
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Relatórios</span>
            </button>

            <button onClick={() => navigate('/configuracoes')} className="flex items-center w-full p-3 rounded-lg hover:bg-slate-800 transition-all whitespace-nowrap">
                <Settings size={24} className="min-w-[24px]" />
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Configurações</span>
            </button>      
        </nav>

        <button onClick={() => navigate('/')} className="p-6 flex items-center border-t border-slate-800 hover:bg-red-500/10 text-red-400 transition-all">
          <LogOut size={24} className="min-w-[24px]" />
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Sair</span>
        </button>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden ml-20 w-full">
        
        {/* Cabeçalho */}
<header className="bg-white shadow-sm h-20 px-8 flex justify-end items-center z-10 w-full relative">
          
          {/* Título Centralizado Exatamente no Meio */}
          <h1 className="text-slate-800 font-extrabold text-2xl tracking-tight absolute left-1/2 transform -translate-x-1/2">
            {getTituloPagina()}
          </h1>
          
          {/* Lado Direito: Notificações e Perfil (Mantido igual) */}
          <div className="flex items-center space-x-6">
            
            {/* Sino de Notificações */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full relative transition-colors ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
                      <h3 className="font-bold text-gray-800">Notificações</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto bg-white">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-slate-50 transition-colors">
                          <p className="text-sm text-gray-700 leading-tight">{n.text}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block font-semibold">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Nome e Avatar da Pessoa */}
            <div className="flex items-center space-x-3 border-l border-gray-100 pl-6">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800 leading-tight">Admin G2</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                G2
              </div>
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;