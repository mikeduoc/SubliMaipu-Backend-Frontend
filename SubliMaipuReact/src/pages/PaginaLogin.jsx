import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextoAutorizado';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';


function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password.length < 4 || password.length > 10) {
      setError('La contraseña debe tener entre 4 y 10 caracteres.');
      return;
    }

    try {
      const userData = await login(email, password);

      if (userData.role === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <>
      <PieDePagina />
      <main>
        <section className="form-container">
          <img className="form-logo" src="/images/logo.svg" alt="Logo SubliMaipu" />
          <h2>Iniciar Sesión</h2>
          <form id="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn">Ingresar</button>
          </form>

          <div className="form-links">
            <Link to="/recuperacion">¿Olvidaste tu contraseña?</Link>
            <span>|</span>
            <Link to="/registro">Crear una cuenta</Link>
          </div>
        </section>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaLogin;