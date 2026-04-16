import { 
  User, Lock, Bell, 
  Save, ShieldCheck, Mail, Camera 
} from "lucide-react";

const Configuracoes = () => {
  return (
    // Reduzimos o padding bottom (pb) e definimos a altura máxima para não gerar scroll
    <div className="max-w-6xl mx-auto px-4 h-full flex flex-col">
      
      {/* Cabeçalho com o botão de Salvar na mesma linha para economizar espaço */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
          <Save size={18} />
          <span>Salvar Alterações</span>
        </button>
      </div>

      {/* Grid divide a tela em 2 colunas no desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* COLUNA ESQUERDA: PERFIL (Ocupa a altura inteira da esquerda) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 flex items-center mb-5 border-b pb-3">
            <User size={20} className="mr-2 text-blue-600" />
            Perfil do Usuário
          </h3>
          
          <div className="flex items-center space-x-5 mb-6">
            <div className="relative">
              <div className="h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                G2
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-md border border-gray-100 text-blue-600 hover:bg-blue-50 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Admin G2</h3>
              <p className="text-sm text-gray-500">Administrador do Sistema</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome Completo</label>
              <input type="text" defaultValue="Admin G2 Governança" className="w-full px-4 py-2.5 border bg-gray-50 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail Profissional</label>
              <input type="email" defaultValue="admin@projetog2.com.br" className="w-full px-4 py-2.5 border bg-gray-50 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: SEGURANÇA E PREFERÊNCIAS (Empilhadas, mas compactas) */}
        <div className="flex flex-col gap-6">
          
          {/* CAIXA: SEGURANÇA */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4 border-b pb-3">
              <Lock size={20} className="mr-2 text-blue-600" />
              Proteção da Conta
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Lock size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Alterar Senha</span>
                </div>
                <span className="text-xs text-gray-400">Há 3 meses</span>
              </button>
              <div className="flex items-center justify-between p-3 border rounded-xl">
                <div className="flex items-center space-x-3">
                  <ShieldCheck size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Autenticação 2 Fatores</span>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CAIXA: PREFERÊNCIAS */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4 border-b pb-3">
              <Bell size={20} className="mr-2 text-blue-600" />
              Preferências do Sistema
            </h3>

            <div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-slate-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">Alertas por E-mail</p>
                    <p className="text-xs text-gray-500">Resumo de auditorias</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Configuracoes;