import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import NovaOportunidade from './pages/NovaOportunidade';
import ListaOportunidades from './pages/ListaOportunidades';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowedProfiles={['vendedor', 'gestor']}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nova-oportunidade"
            element={
              <ProtectedRoute allowedProfiles={['vendedor', 'gestor']}>
                <NovaOportunidade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/oportunidades"
            element={
              <ProtectedRoute allowedProfiles={['vendedor', 'gestor']}>
                <ListaOportunidades />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
