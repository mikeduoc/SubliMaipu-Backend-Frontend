import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/ContextoAutorizado';
import { useCart } from '../context/ContextoCarrito'


function PieDePagina({ cartItemCount = 0 }) {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <div className="header-container container">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="Logo SubliMaipu" />
        </Link>

        <nav className="menu-principal">
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/nosotros">Nosotros</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>

        <div className="menu-usuario">
          {user ? (
            <>
              {user.role === 'administrador' && (
                <Link to="/admin">Admin Panel</Link>
              )}
              <span style={{ color: 'white' }}>Hola, {user.nombre.split(' ')[0]}</span>
              <button onClick={logout} className="link-button">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/registro">Registrar Usuario</Link>
            </>
          )}
          <Link to="/carrito" className="cart-icon">🛒 Carrito (<span>{totalItems}</span>)</Link>
        </div>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icono">
          <img src="/images/menu.png" alt="Menú" />
        </label>
      </div>
    </header>
  );
}



export default PieDePagina;