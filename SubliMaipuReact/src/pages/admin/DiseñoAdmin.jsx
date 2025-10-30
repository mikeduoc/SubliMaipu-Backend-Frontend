import React from 'react';
import { Outlet } from 'react-router-dom'; 
import AdministracionBarraLateral from '../../components/admin/AdministracionBarraLateral';


function DiseñoAdmin() {
  return (
    <div className="admin-container">
      <AdministracionBarraLateral />
      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default DiseñoAdmin;