import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutorizado';


function PaginaEditarUsuario() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [userData, setUserData] = useState({ nombre: '', email: '', rol: 'cliente', estado: 'activo' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        setError('No autenticado.');
        return;
      }
      const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
          headers: authHeaders
        });
        if (response.ok) {
          const data = await response.json();
          setUserData({
            nombre: data.nombre || '',
            email: data.email || '',
            rol: data.rol || 'cliente',
            estado: data.estado || 'activo'
          });
        } else {
          setError('No se pudo cargar el usuario.');
        }
      } catch (err) {
        setError('Error de red al cargar.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const { nombre, email } = userData;

    if (!nombre.trim() || !email.trim()) {
      setError('El nombre y el email no pueden estar vacíos.');
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

    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const updatedUser = {
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      estado: userData.estado
    };

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser)
      });
      if (response.ok) {
        alert('Usuario Actualizado con éxito');
        navigate('/admin/usuarios');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Error al actualizar el usuario.');
      }
    } catch (err) {
      setError('Error de red. No se pudo conectar al servidor.');
    }
  };

  if (loading) return <h2 className="loading-message">Cargando datos del usuario...</h2>;

  return (
    <>
      <h1 className="admin-page-title">Editar Usuario (ID: {userId})</h1>
      <div className="admin-card">
        <form className="eval1-style-form" onSubmit={handleSubmit} noValidate>
          <div className="eval1-form-info">
            <h2>Editar Información</h2>
            <p>Modifica los detalles de la cuenta y los permisos del usuario. Los cambios se aplicarán inmediatamente.</p>
          </div>

          <div className="eval1-form-fields">

            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input type="text" id="nombre" value={userData.nombre} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" value={userData.email} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="rol">Rol</label>
              <select
                id="rol"
                value={userData.rol}
                onChange={handleChange}
                className="form-input">
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select id="estado" value={userData.estado} onChange={handleChange} className="form-input">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-actions-edit">
              <button type="submit" className="btn submit-btn-main">GUARDAR CAMBIOS</button>
              <button type="button" className="btn cancel-btn-side" onClick={() => navigate('/admin/usuarios')}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PaginaEditarUsuario;