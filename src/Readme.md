# Projeto G2 - Plataforma de Governança e Auditoria AI

O **Projeto G2** é uma solução SaaS B2B focada em governança digital para escritórios de contabilidade. A plataforma utiliza inteligência artificial e OCR para automação de leitura de documentos, geração de relatórios de auditoria e gestão de pendências fiscais/contábeis.

## 🚀 Status do Projeto
- **Prazo de Entrega Final:** 25 de junho (Cronograma Acelerado)
- **Fase Atual:** Desenvolvimento Frontend e Integração de Rotas.

## 🛠️ Stack Tecnológica (Frontend)

O frontend foi construído com foco em performance, segurança de tipos e escalabilidade:

- **Core:** [React v18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Navegação:** [React Router DOM v6](https://reactrouter.com/)
- **Deploy & Hosting:** [Vercel](https://vercel.com/)

### Próximas Implementações (Camada de Dados)
- **Comunicação API:** Axios
- **Gerenciamento de Estado/Cache:** TanStack Query (React Query)
- **Validação de Formulários:** React Hook Form + Zod

## 📂 Estrutura de Pastas

```text
ProjetoG2/
├── frontend/                # Código fonte do React (Vite)
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis (Layout, Login, etc.)
│   │   ├── services/        # Configuração de API e chamadas Axios
│   │   ├── App.tsx          # Gerenciamento de rotas principais
│   │   └── main.tsx         # Ponto de entrada do sistema
│   ├── public/              # Ativos estáticos (Logos, imagens)
│   ├── vercel.json          # Configurações de redirecionamento para o Vercel
│   └── package.json         # Dependências e scripts
└── backend/                 # (Em breve) API Django + PostgreSQL
📅 Planejamento Semanal (Foco Frontend)
Semana 1: Estruturação do Axios, Context API e Proteção de Rotas (Auth).

Semana 2: CRUD de Clientes e Integração de lógica de Upload de arquivos.

Semana 3: Dashboards dinâmicos com Recharts e filtros na Central de Pendências.

Semana 4: Validações de segurança com Zod e otimização de performance (Lazy Loading).

🔧 Como rodar o projeto localmente
Clone o repositório:

Bash
git clone [https://github.com/seu-usuario/ProjetoG2.git](https://github.com/seu-usuario/ProjetoG2.git)
Acesse a pasta do frontend:

Bash
cd frontend
Instale as dependências (necessário após mover pastas):

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
🌐 Deploy
O projeto está configurado para deploy contínuo no Vercel.

Cada git push na branch main dispara automaticamente um novo build.

Configuração Crítica: O Root Directory no Vercel deve estar apontado para a pasta frontend.

© 2026 Projeto G2 - Ambientes Seguros e Auditáveis.


---

### Por que ter este arquivo é importante?
1. **Documentação:** Ele deixa claro que você está usando TypeScript e Tailwind, o que valoriza o projeto.
2. **Guia de Erros:** Explica o comando `npm install`, que resolve aquele problema de "não reconhecer o vite" que tivemos hoje.
3. **Organização:** Mostra a divisão entre frontend e backend, essencial para o planejamento de conexão que faremos nas próximas semanas.

Já pode salvar no seu VS Code e dar aquele `git push` para o Vercel!