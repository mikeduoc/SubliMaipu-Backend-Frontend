import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaInicio from './pages/PaginaInicio';
import PaginaProductos from './pages/PaginaProductos';
import PaginaLogin from './pages/PaginaLogin';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaContacto from './pages/PaginaContacto';
import PaginaNosotros from './pages/PaginaNosotros';
import PaginaCarrito from './pages/PaginaCarrito';
import DiseñoAdmin from './pages/admin/DiseñoAdmin';
import PaginaControl from './pages/admin/PaginaControl';
import AdminPaginaProductos from './pages/admin/AdminPaginaProductos';
import PaginaCreacionProducto from './pages/admin/PaginaCreacionProducto';
import PaginaEditarProducto from './pages/admin/PaginaEditarProducto';
import PaginaUsuarioAdmin from './pages/admin/PaginaUsuarioAdmin';
import PaginaCrearUsuario from './pages/admin/PaginaCrearUsuario';
import PaginaEditarUsuario from './pages/admin/PaginaEditarUsuario';
import PaginaRecuperacion from './pages/PaginaRecuperacion';
import RutaProtegida from './components/RutaProtegida'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/productos" element={<PaginaProductos />} />
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/registro" element={<PaginaRegistro />} />
      <Route path="/contacto" element={<PaginaContacto />} />
      <Route path="/nosotros" element={<PaginaNosotros />} />
      <Route path="/carrito" element={<PaginaCarrito />} />
      <Route path="/recuperacion" element={<PaginaRecuperacion />} />

      <Route element={<RutaProtegida />}>
        <Route path="/admin" element={<DiseñoAdmin />}>
          <Route index element={<PaginaControl />} /> 
          <Route path="productos" element={<AdminPaginaProductos />} />
          <Route path="productos/crear" element={<PaginaCreacionProducto />} />
          <Route path="productos/editar/:productId" element={<PaginaEditarProducto />} />
          <Route path="usuarios" element={<PaginaUsuarioAdmin />} />
          <Route path="usuarios/crear" element={<PaginaCrearUsuario />} />
          <Route path="usuarios/editar/:userId" element={<PaginaEditarUsuario />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;