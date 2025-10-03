import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!perfil) return alert('Selecione um perfil');
    if (!email || !senha) return alert('Preencha email e senha');

    // Aqui poderia ser validação real com backend
    const usuario = { perfil, email };
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    navigate('/'); // redireciona para Home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow rounded p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label className="block mb-2 font-semibold">Perfil</label>
        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Selecione o perfil</option>
          <option value="vendedor">Vendedor</option>
          <option value="gestor">Gestor</option>
        </select>

        {/* Mostrar campos de email/senha apenas após escolher perfil */}
        {perfil && (
          <>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="email@exemplo.com"
              required
            />

            <label className="block mb-2 font-semibold">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="********"
              required
            />
          </>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
