import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Bell,
  ShieldCheck,
  BarChart3,
  PlusCircle,
  FileWarning,
  Sun,
  Moon,
  FileUp,      // Ícone para Upload
  CheckSquare,  // Ícone para Revisão
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Layout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("saas_token");
    navigate("/login");
  };

  // Sincronizado com os caminhos do menu para o título atualizar corretamente
  const getTituloPagina = () => {
    const path = location.pathname.toLowerCase();
    switch (path) {
      case "/visaogeral":
        return "Visão Geral";
      case "/cadastros":
        return "Cadastros";
      case "/analisenova":
        return "Nova Análise";
      case "/documentosupload": 
        return "Central de Documentos";
      case "/CadastroRevisaoDados":    
        return "Revisão de Dados";
      case "/relatorios":
        return "Relatórios";
      default:
        return "Visão Geral";
    }
  };

  const notifications = [
    { id: 1, text: "Novo lead capturado: João Silva", time: "5 min atrás" },
    { id: 2, text: "OCR concluído: Nota Fiscal #442", time: "1 hora atrás" },
    { id: 3, text: "Alerta: Documento pendente há 2 dias", time: "3 horas atrás" },
  ];

  const getNavClass = (path: string, extraClasses: string = "") => {
    const isActive = location.pathname.toLowerCase() === path.toLowerCase();
    return `flex items-center w-full px-3 py-3 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${extraClasses} ${
      isActive
        ? "bg-(--primary-color) text-white font-bold shadow-lg shadow-black/20" 
        : "text-slate-400 hover:bg-white/10 hover:text-(--primary-color) font-medium"
    }`;
  };

  return (
    <div className="flex h-screen bg-(--bg-color) overflow-hidden font-sans transition-colors duration-300">
      
      {/* Sidebar Fixa */}
      <aside className="fixed top-0 left-0 h-screen group w-16 hover:w-64 bg-(--sidebar-bg) text-white flex flex-col transition-all duration-300 z-50 shadow-2xl">
        
        {/* LOGO */}
        <div className="px-4 h-12 flex items-center border-b border-white/10 overflow-hidden whitespace-nowrap">
          <ShieldCheck
            className="text-(--primary-color) min-w-[32px] flex-shrink-0 transition-colors"
            size={32}
          />
          <span className="ml-4 text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            ProjetoG2 <span className="text-(--primary-color) text-sm italic">AI</span>
          </span>
        </div>

        {/* MENU NAVEGAÇÃO */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-hidden mt-2">
          
          <button onClick={() => navigate("/visaogeral")} className={getNavClass("/visaogeral")}>
            <LayoutDashboard size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Visão Geral</span>
          </button>

          <button onClick={() => navigate("/cadastros")} className={getNavClass("/cadastros")}>
            <Users size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Cadastros</span>
          </button>
                    {/* CadastroRevisaoDados */}
          <button onClick={() => navigate("/CadastroRevisaoDados")} className={getNavClass("/CadastroRevisaoDados")}>
            <CheckSquare size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Revisão Cadastro</span>
          </button>

          <button onClick={() => navigate("/analisenova")} className={getNavClass("/analisenova")}>
            <PlusCircle size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Nova Análise</span>
          </button>

          {/* DOCUMENTOS UPLOAD */}
          <button onClick={() => navigate("/documentosupload")} className={getNavClass("/documentosupload")}>
            <FileUp size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Upload de Docs</span>
          </button>

          <button onClick={() => navigate("/relatorios")} className={getNavClass("/relatorios")}>
            <BarChart3 size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Relatórios</span>
          </button>

        </nav>

        {/* LOGOUT */}
        <div className="p-2 mb-4 border-t border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors group/logout whitespace-nowrap overflow-hidden"
          >
            <LogOut size={24} className="min-w-[24px] flex-shrink-0" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden ml-16 w-full transition-all duration-300">
        
        {/* Cabeçalho Superior */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm h-12 px-8 flex justify-end items-center z-10 w-full relative transition-colors duration-300">
          <h1 className="text-slate-800 dark:text-white font-extrabold text-2xl tracking-tight absolute left-1/2 transform -translate-x-1/2 transition-colors duration-300">
            {getTituloPagina()}
          </h1>

          <div className="flex items-center space-x-6">
            {/* Seletor de Temas */}
            <div className="hidden sm:flex items-center space-x-2 mr-4 border-r border-gray-100 dark:border-slate-800 pr-6">
              <button onClick={() => setTheme({ ...theme, primaryColor: "#2563eb" })} className="w-5 h-5 rounded-full bg-blue-600 shadow-sm hover:scale-110 transition-transform" title="Azul"></button>
              <button onClick={() => setTheme({ ...theme, primaryColor: "#16a34a" })} className="w-5 h-5 rounded-full bg-green-600 shadow-sm hover:scale-110 transition-transform" title="Verde"></button>
              <button onClick={() => setTheme({ ...theme, primaryColor: "#9333ea" })} className="w-5 h-5 rounded-full bg-purple-600 shadow-sm hover:scale-110 transition-transform" title="Roxo"></button>
              <button onClick={() => setTheme({ ...theme, primaryColor: "#ea580c" })} className="w-5 h-5 rounded-full bg-orange-600 shadow-sm hover:scale-110 transition-transform" title="Laranja"></button>
            </div>

            <div className="relative flex items-center">
              <button onClick={toggleDarkMode} className="p-2 mr-4 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                {theme.isDarkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} />}
              </button>
              
              <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-full relative transition-colors ${showNotifications ? "bg-slate-100 dark:bg-slate-800 text-(--primary-color)" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>

              {/* Popup de Notificações */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 z-20 overflow-hidden transition-colors duration-300">
                    <div className="p-4 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                      <h3 className="font-bold text-gray-800 dark:text-white">Notificações</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto bg-white dark:bg-slate-900">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-gray-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-tight">{n.text}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block font-semibold">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center space-x-3 border-l border-gray-100 dark:border-slate-800 pl-6">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">Alessandro G2</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
              </div>
              <div className="h-10 w-10 bg-(--sidebar-bg) rounded-xl flex items-center justify-center text-(--primary-color) font-bold shadow-md">G2</div>
            </div>
          </div>
        </header>

        {/* Conteúdo Dinâmico */}
        <div className="flex-1 overflow-y-auto p-8 bg-transparent">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;