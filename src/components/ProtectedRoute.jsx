import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedProfiles }) => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuario || !allowedProfiles.includes(usuario.perfil)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
