import React, { useState, useEffect } from 'react';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';
import RegistroProductos from '../components/RegistroProductos';
import { useCart } from '../context/ContextoCarrito'


function PaginaProductos() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('tazones');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.categoria && p.categoria.toLowerCase() === activeCategory);

  return (
    <>
      <PieDePagina />
      <main className="products">
        <div className="tabs container">
          <label
            className={activeCategory === 'tazones' ? 'active' : ''}
            onClick={() => setActiveCategory('tazones')}
          >
            Tazones
          </label>
          <label
            className={activeCategory === 'llaveros' ? 'active' : ''}
            onClick={() => setActiveCategory('llaveros')}
          >
            Llaveros
          </label>
          <label
            className={activeCategory === 'rocas' ? 'active' : ''}
            onClick={() => setActiveCategory('rocas')}
          >
            Roca Fotográfica
          </label>

          <div className="tab" style={{ display: 'block' }}>
            <div className="product-grid">
              {filteredProducts.map(product => (
                <RegistroProductos
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaProductos;