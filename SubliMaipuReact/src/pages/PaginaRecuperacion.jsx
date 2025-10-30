import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';


function PaginaRecuperacion() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    console.log('Solicitando recuperación para:', email);
    setSuccessMessage('Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.');
    setEmail('');
  };

  return (
    <>
      <PieDePagina />
      <main>
        <section className="form-container">
          <img className="form-logo" src="/images/logo.svg" alt="Logo SubliMaipu" />
          <h2>Recuperar Contraseña</h2>
          <p style={{ color: '#A7A7A7', textAlign: 'center', marginBottom: '20px', lineHeight: '1.6' }}>
            Ingresa tu correo electrónico asociado a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña.
          </p>

          <form id="recuperar-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="mensaje-error">{error}</p>}
            {successMessage && <p style={{ color: '#28a745', textAlign: 'center', marginTop: '10px' }}>{successMessage}</p>}

            <button type="submit" className="btn">Enviar Instrucciones</button>
          </form>
          <div className="form-link">
            <Link to="/login">Volver a Iniciar Sesión</Link>
          </div>
        </section>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaRecuperacion;