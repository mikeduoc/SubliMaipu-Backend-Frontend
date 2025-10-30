import React from 'react';
import { NavLink, Link } from 'react-router-dom';


function AdministracionBarraLateral() {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/productos">Listar Productos</NavLink></li>
          <li><NavLink to="/admin/productos/crear">Crear Producto</NavLink></li>
          <li><NavLink to="/admin/usuarios">Listar Usuarios</NavLink></li>
          <li><NavLink to="/admin/usuarios/crear">Crear Usuario</NavLink></li>
        </ul>
        <Link to="/" className="back-to-site">← Volver a la Tienda</Link>
      </nav>
    </aside>
  );
}

export default AdministracionBarraLateral;