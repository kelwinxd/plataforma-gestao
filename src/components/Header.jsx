import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Logo from '../imgs/Logo.svg'

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4 relative">
      <img src={Logo} alt="" />

      {/* Botão hambúrguer */}
      <button className="sm:hidden text-2xl" onClick={() => setDrawerOpen(true)}>
        <HiMenu />
      </button>

      {/* Menu principal desktop */}
      <nav className="hidden sm:flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/nova-oportunidade" className="hover:underline">Nova Oportunidade</Link>
        <Link to="/oportunidades" className="hover:underline">Lista</Link>
        <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700">Sair</button>
      </nav>

      {/* Drawer menu lateral */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          {/* Overlay */}
<div
  className="fixed inset-0 bg-black bg-opacity-70 z-40"
  onClick={() => setDrawerOpen(false)}
></div>

{/* Drawer vindo da direita */}
<div
  className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-6 z-50   transform transition-all duration-1000 ${
    drawerOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  <button className="mb-6 text-2xl" onClick={() => setDrawerOpen(false)}>
    <HiX />
  </button>
  <nav className="flex flex-col space-y-4">
    <Link to="/" onClick={() => setDrawerOpen(false)} className="hover:underline">Home</Link>
    <Link to="/nova-oportunidade" onClick={() => setDrawerOpen(false)} className="hover:underline">Nova Oportunidade</Link>
    <Link to="/oportunidades" onClick={() => setDrawerOpen(false)} className="hover:underline">Lista</Link>
    <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 w-max">Sair</button>
  </nav>
</div>
        </>
      )}
    </header>
  );
};

export default Header;
