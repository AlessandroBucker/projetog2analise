import axios from 'axios';

// Criamos a instância do Axios
const api = axios.create({
  // Aqui colocaremos a URL do seu backend Django no futuro
  // Por enquanto, usamos uma porta padrão de desenvolvimento
  baseURL: 'http://127.0.0.1:8000/api',
});

// INTERCEPTOR: Envia o token automaticamente em cada requisição
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('@ProjetoG2:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// INTERCEPTOR: Trata erros globais (ex: se o token expirar, desloga o usuário)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se o backend retornar "Não Autorizado", limpamos o acesso
      localStorage.removeItem('@ProjetoG2:token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;