import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';


function PaginaRegistro() {
  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!run || !nombre || !email || !direccion || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 4 || password.length > 10) {
      setError('La contraseña debe tener entre 4 y 10 caracteres.');
      return;
    }
    alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
    navigate('/login');
  };

  return (
    <>
      <PieDePagina />
      <main>
        <section className="form-container">
          <img className="form-logo" src="/images/logo.svg" alt="Logo SubliMaipu" />
          <h2>Registro de Usuario</h2>
          <form id="registro-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="run">RUT</label>
              <input type="text" id="run" name="run" value={run} onChange={e => setRun(e.target.value)} placeholder="12345678-K" />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hola@gmail.com" />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Calle Falsa #1234" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña (4-10 caracteres)</label>
              <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn">Registrar</button>
          </form>

          <div className="form-links">
            <p style={{ color: '#A7A7A7' }}>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión aquí</Link>
            </p>
          </div>
        </section>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaRegistro;