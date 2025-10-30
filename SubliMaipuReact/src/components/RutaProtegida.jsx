import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/ContextoAutorizado';


function RutaProtegida() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'administrador') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default RutaProtegida;