import React, { useState, useEffect } from 'react';
import TarjetaEstadistica from '../../components/admin/TarjetaEstadistica';
import { useAuth } from '../../context/ContextoAutorizado';


function PaginaControl() {
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0 });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        console.log("Dashboard: Esperando token...");
        return;
      }

      const authHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      try {
        const [productsResponse, usersResponse] = await Promise.all([
          fetch('http://localhost:8080/api/productos', { headers: authHeaders }),
          fetch('http://localhost:8080/api/usuarios', { headers: authHeaders })
        ]);

        if (!productsResponse.ok || !usersResponse.ok) {
          console.error("Error al cargar los datos del dashboard (token inválido o permisos insuficientes)");
          return;
        }
        const productsData = await productsResponse.json();
        const usersData = await usersResponse.json();
        const totalProducts = productsData.length;
        const totalUsers = usersData.length;
        const lowStock = productsData.filter(p => p.stock < 5);
        setStats({ totalProducts, totalUsers });
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats-container">
        <TarjetaEstadistica title="Total de Productos" value={stats.totalProducts} />
        <TarjetaEstadistica title="Total de Usuarios" value={stats.totalUsers} />
        <TarjetaEstadistica title="Productos Bajo Stock" value={lowStockProducts.length} />
      </div>

      <h2>Alertas de Stock Crítico</h2>
      <div className="admin-card">
        {lowStockProducts.length > 0 ? (
          <table className="product-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock Actual</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.map(product => (
                <tr key={product.id} className="low-stock-warning">
                  <td>{product.nombre}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : 
        (<p>{stats.totalProducts > 0 ? 'No hay productos con stock bajo. ¡Buen trabajo!' : 'Cargando datos...'}</p>)}
      </div>
    </>
  );
}

export default PaginaControl;