import React from 'react';


function RegistroProductos({ product, onAddToCart }) {
  const { nombre, precio, imagen, stock } = product;
  return (
    <div className="product"> 
      <div className="product-img">
        <h4>Nuevo</h4>
        <img src={imagen} alt={nombre} />
      </div>
      <div className="product-txt">
        <h4>{nombre}</h4>
        <p>Calidad Premium</p>
        <span className="price">${precio.toLocaleString('es-CL')}</span>
        {stock > 0 ? (
          <button 
            className="add-to-cart-btn btn-3" 
            onClick={() => onAddToCart(product)} 
          >
            Añadir al Carrito
          </button>
        ) : (
          <button className="btn-3" disabled>
            Sin Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistroProductos;