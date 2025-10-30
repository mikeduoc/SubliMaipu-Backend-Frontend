import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/ContextoAutorizado';


function PaginaEditarProducto() {
  const [productData, setProductData] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    stockCritical: '',
    category: '',
    image: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProductData({
            code: data.code || '',
            name: data.nombre || '',
            description: data.descripcion || '',
            price: data.precio || '',
            stock: data.stock || '',
            stockCritical: data.stockCritical || 0,
            category: data.categoria || '',
            image: data.imagen || ''
          });
        } else {
          setError('Error: No se pudo cargar el producto.');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error de red:", error);
        setError('Error de red al cargar el producto.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const { name, price, stock, category, code, description, stockCritical, image } = productData;
    // --- VALIDACIÓN OBLIGATORIA ---
    if (!name.trim() || !String(price).trim() || !String(stock).trim() || !category || !String(stockCritical).trim()) {
      setError('Campos obligatorios: Nombre, Precio, Stock, Categoría y Stock Crítico.');
      return;
    }
    if (name.trim().length < 4) {
      setError('El nombre del producto debe tener al menos 4 caracteres.');
      return;
    }
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('El precio debe ser un número positivo.');
      return;
    }
    const numericStock = parseInt(stock, 10);
    if (isNaN(numericStock) || numericStock < 0) {
      setError('El stock debe ser un número igual o mayor a 0.');
      return;
    }
    const numericStockCritical = parseInt(stockCritical, 10);
    if (isNaN(numericStockCritical) || numericStockCritical < 0) {
      setError('El Stock Crítico debe ser un número igual o mayor a 0.');
      return;
    }

    // --- VALIDACIÓN OPCIONAL ---
    if (code.trim() && code.trim().length < 3) {
      setError('El Código (SKU) es muy corto, debe tener al menos 3 caracteres.');
      return;
    }
    if (description.trim() && (description.trim().length < 10 || description.trim().length > 500)) {
      setError('La descripción debe tener entre 10 y 500 caracteres.');
      return;
    }
    if (image.trim() && !/^https?:\/\/.+/.test(image)) {
      setError('La URL de la imagen no es válida. Debe empezar con http:// o https://');
      return;
    }

    if (!token) {
      setError('No estás autenticado.');
      return;
    }

    const productoActualizado = {
      nombre: productData.name,
      descripcion: productData.description,
      precio: numericPrice,
      stock: numericStock,
      code: productData.code || null,
      stockCritical: numericStockCritical,
      categoria: productData.category,
      imagen: productData.image || null,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productoActualizado)
      });

      if (response.ok) {
        navigate('/admin/productos');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Error al actualizar el producto.');
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  if (loading) {
    return <h2 className="loading-message">Cargando datos del producto...</h2>;
  }

  return (
    <>
      <h1 className="admin-page-title">Editar Producto (ID: {productId})</h1>
      <div className="admin-card">
        <form className="eval1-style-form" onSubmit={handleSubmit} noValidate>
          <div className="eval1-form-info">
            <h2>Detalles del Producto</h2>
            <p>Actualiza la información del producto. Los campos con * son obligatorios.</p>
          </div>

          <div className="eval1-form-fields">

            <div className="form-group">
              <label htmlFor="code">Código del Producto (Interno)</label>
              <input type="text" id="code" value={productData.code} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre del Producto *</label>
              <input type="text" id="name" value={productData.name} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción (Opcional)</label>
              <textarea id="description" value={productData.description} onChange={handleChange} className="form-input textarea-resize"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                value={productData.category}
                onChange={handleChange}
                className="form-input">
                <option value="">Selecciona una categoría</option>
                <option value="tazones">Tazones</option>
                <option value="llaveros">Llaveros</option>
                <option value="rocas">Rocas Fotográficas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio *</label>
              <input type="number" id="price" value={productData.price} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock (Inventario) *</label>
              <input type="number" id="stock" value={productData.stock} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="stockCritical">Stock Crítico *</label>
              <input type="number" id="stockCritical" value={productData.stockCritical} onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="image">URL de Imagen (Opcional)</label>
              <input type="text" id="image" value={productData.image} onChange={handleChange} className="form-input" placeholder="https://ejemplo.com/imagen.jpg" />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-actions-edit">
              <button type="submit" className="btn submit-btn-main">GUARDAR CAMBIOS</button>
              <button type="button" className="btn cancel-btn-side" onClick={() => navigate('/admin/productos')}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PaginaEditarProducto;