import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutorizado';


function PaginaUsuarioAdmin() {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const response = await fetch('http://localhost:8080/api/usuarios', {
          headers: authHeaders
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error al cargar usuarios (403 o 401)");
        }
      } catch (error) {
        console.error("Error de red al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    if (!token) return;
    if (window.confirm('¿Estás seguro?')) {
      await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <>
      <h1>Lista de Usuarios</h1>
      <div className="admin-card">
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td>
                  <span className={`status-badge ${user.estado === 'activo' ? 'status-active' : 'status-inactive'}`}>
                    {user.estado}
                  </span>
                </td>
                
                <td>
                  <Link to={`/admin/usuarios/editar/${user.id}`} className="action-btn edit-btn">Editar</Link>
                  <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaginaUsuarioAdmin;