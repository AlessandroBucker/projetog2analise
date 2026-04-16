import React, { useState } from "react";
import { Lock, User, ArrowLeft } from "lucide-react"; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      console.log("Resposta do servidor:", response.data);
      navigate('/VisaoGeral');
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Não foi possível conectar ou credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Botão para voltar à Home antes do card de login */}
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Bem-vindo
          </h2>
          <p className="text-center text-gray-500 mb-8">Introduza os seus dados para acessar</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isLoading ? "A carregar..." : "Entrar no Sistema"}
          </button>
        </form>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
          style={{ padding: "10px", marginTop: "20px" }}
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
      </div>
    </div>
    
  );
};

export default Login;