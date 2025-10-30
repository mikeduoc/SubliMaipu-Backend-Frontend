import React from 'react';
import { Link } from 'react-router-dom';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';

function PaginaNosotros() {
  return (
    <>
      <PieDePagina />
      <main>
        <section className="info container">
          <div className="info-img">
            <img src="/images/botellap.png" alt="Botella personalizada de SubliMaipu" />
          </div>
          <div className="info-txt">
            <h2>Nosotros</h2>
            <p>
              Somos una mini empresa dedicada a la sublimación de una variedad de productos.
            </p>
            <Link to="/contacto" className="btn-2">Más información</Link>
          </div>
        </section>
      </main>
      <Encabezado />
    </>
  );
}

export default PaginaNosotros;