import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutorizado';


function PaginaCrearUsuario() {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente',
    estado: 'activo'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const { nombre, email, password } = userData;

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setError('Debes completar todos los campos: Nombre, Email y Contraseña.');
      return;
    }

    if (nombre.trim().length < 5) {
      setError('El nombre es muy corto. Debe tener al menos 5 caracteres.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El formato del email no es válido (ej: correo@dominio.com).');
      return;
    }

    if (password.length < 6 || password.length > 20) {
      setError('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }

    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const newUser = {
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: userData.rol,
      estado: userData.estado
    };

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert('Usuario Creado con éxito');
        navigate('/admin/usuarios');
      } else {

        const errorData = await response.json();
        setError(errorData.message || 'Error al crear el usuario.');
      }
    } catch (err) {
      setError('Error de red. No se pudo conectar al servidor.');
    }
  };

  return (
    <>
      <h1 className="admin-page-title">Crear Nuevo Usuario</h1>
      <div className="admin-card">
        <form className="form-content" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input type="text" id="nombre" value={userData.nombre} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" value={userData.email} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input type="password" id="password" value={userData.password} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol *</label>
            <select id="rol" value={userData.rol} onChange={handleChange} className="form-input">
              <option value="cliente">Cliente</option>
              <option value="vendedor">Vendedor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado *</label>
            <select id="estado" value={userData.estado} onChange={handleChange} className="form-input">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="btn submit-btn">Guardar Usuario</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PaginaCrearUsuario;