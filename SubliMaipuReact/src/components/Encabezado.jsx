import React from 'react';


function Encabezado() {
  return (
    <footer className="Encabezado container">
      <img className="logo-2" src="/images/logo.svg" alt="Logo SubliMaipu al pie de página" />
      <div className="links">
        <h4>Tiendas de Ropa</h4>
        <ul>
          <li><a href="https://www.paris.cl/" target="_blank" rel="noopener noreferrer">Paris</a></li>
          <li><a href="https://simple.ripley.cl/" target="_blank" rel="noopener noreferrer">Ripley</a></li>
          <li><a href="https://www.lapolar.cl/" target="_blank" rel="noopener noreferrer">La Polar</a></li>
          <li><a href="https://www.falabella.com/falabella-cl" target="_blank" rel="noopener noreferrer">Falabella</a></li>
        </ul>
      </div>

      <div className="links">
        <h4>Tiendas y Mas</h4>
        <ul>
          <li><a href="https://www.hites.com/" target="_blank" rel="noopener noreferrer">Hites</a></li>
          <li><a href="https://www.tricot.cl/" target="_blank" rel="noopener noreferrer">Tricot</a></li>
          <li><a href="https://www.abcdin.cl/" target="_blank" rel="noopener noreferrer">AbcDin</a></li>
          <li><a href="https://fashionspark.com/" target="_blank" rel="noopener noreferrer">Fashion Park</a></li>
        </ul>
      </div>

      <div className="links">
        <h4>Construcción y Casa</h4>
        <ul>
          <li><a href="https://www.easy.cl/" target="_blank" rel="noopener noreferrer">Easy</a></li>
          <li><a href="https://www.sodimac.cl/" target="_blank" rel="noopener noreferrer">Sodimac</a></li>
          <li><a href="https://www.casaideas.cl/" target="_blank" rel="noopener noreferrer">Casa Ideas</a></li>
          <li><a href="https://www.construmart.cl/" target="_blank" rel="noopener noreferrer">Construmart</a></li>
        </ul>
      </div>

      <div className="links">
        <h4>Redes Sociales</h4>
        <div className="socials">
          <a href="https://www.facebook.com/profile.php?id=61559828730140" target="_blank" rel="noopener noreferrer">
            <div className="social">
              <img src="/images/s1.svg" alt="Facebook SubliMaipu" />
            </div>
          </a>
          <a href="https://www.instagram.com/sublimaipu/" target="_blank" rel="noopener noreferrer">
            <div className="social">
              <img src="/images/s3.svg" alt="Instagram SubliMaipu" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Encabezado;