import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';
import { useCart } from '../context/ContextoCarrito';


function PaginaCarrito() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  const navigate = useNavigate();
  const handleFinalizarCompra = () => {
    alert('¡Gracias por tu compra!');
    clearCart();
    navigate('/');
  };

  return (
    <>
      <PieDePagina />
      <main className="container">
        <div className="cart-container">
          <h2>Carrito de Compras</h2>
          {cartItems.length === 0 ? (
            <div id="empty-cart-message">
              <p>Tu carrito está vacío.</p>
              <Link to="/productos" className="btn-2">Ver Productos</Link>
            </div>)
            : (
              <>

                <div id="cart-items-container">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.imagen} alt={item.nombre} />
                      <div className="item-details">
                        <h4>{item.nombre}</h4>
                        <p>Cantidad: {item.quantity}</p>
                        <span className="price">${(item.precio * item.quantity).toLocaleString('es-CL')}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="remove-item-btn btn-3">Eliminar</button>
                    </div>))}
                </div>

                <div id="cart-summary">
                  <h3>Resumen de la Compra</h3>
                  <div className="summary-total">
                    <span>Total:</span>
                    <span id="cart-total-price">${totalPrice.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="summary-actions">
                    <button className="btn" onClick={handleFinalizarCompra}>Finalizar Compra</button>
                    <button className="btn-3" onClick={clearCart}>Vaciar Carrito</button>
                  </div>
                </div>
              </>
            )}
        </div>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaCarrito;