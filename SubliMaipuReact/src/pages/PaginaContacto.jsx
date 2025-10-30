import React, { useState } from 'react';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';


function PaginaContacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    if (!nombre || !email || !comentario) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setSuccessMessage('¡Gracias por tu mensaje! Te responderemos pronto.');
    setNombre('');
    setEmail('');
    setComentario('');
  };

  return (
    <>
      <PieDePagina />
      <main>
        <section className="form-container">
          <img className="form-logo" src="/images/logo.svg" alt="Logo SubliMaipu" />
          <h2>Formulario de Contacto</h2>

          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo:</label>
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
              <label htmlFor="comentario">Comentario:</label>
              <textarea
                id="comentario"
                name="comentario"
                rows="4"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
                maxLength="2000"
              ></textarea>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div style={{ color: '#28a745', marginTop: '10px', textAlign: 'center' }}>{successMessage}</div>}

            <button type="submit" className="btn">Enviar Mensaje</button>
          </form>
        </section>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaContacto;