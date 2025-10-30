import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutorizado';


function AdminPaginaProductos() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al cargar productos del backend");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchProducts();
  }, []);


  const handleDelete = async (productId) => {
    if (!token) return;
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
          alert('Producto eliminado con éxito');
        } else {
          alert('Error al eliminar el producto.');
        }
      } catch (error) {
        console.error("Error de red al eliminar:", error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="admin-header">
        <h1>Lista de Productos</h1>
        <button onClick={() => navigate('/admin/productos/crear')} className="btn">
          + Añadir Producto
        </button>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-card">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>${product.precio.toLocaleString('es-CL')}</td>
                <td>{product.stock}</td>
                <td>{product.categoria}</td>
                <td className="admin-table-actions">
                  <Link to={`/admin/productos/editar/${product.id}`} className="action-btn edit-btn">Editar</Link>
                  <button onClick={() => handleDelete(product.id)} className="action-btn delete-btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPaginaProductos;