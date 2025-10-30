import React from 'react';
import PieDePagina from '../components/PieDePagina';
import Encabezado from '../components/Encabezado';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function PaginaInicio() {
  return (
    <>
      <PieDePagina />
      <main>
        <div className="header-content container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} 
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="mySwiper-1" 
          >
            <SwiperSlide>
              <div className="slider">
                <div className="slider-txt">
                  <h1>Tazones</h1>
                  <p>Una variedad de tazones de 320CC. Totalmente personalizados a tu gusto.</p>
                  <div className="prices">
                    <p className="price-1">$6500</p>
                  </div>
                  <div className="botones">
                    <a href="/productos" className="btn-1">Comprar</a>
                  </div>
                </div>
                <div className="slider-img">
                  <img src="/images/TazonP.png" alt="Tazón personalizado" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slider">
                <div className="slider-txt">
                  <h1>Llaveros</h1>
                  <p>Variedad de llaveros personalizados a tu gusto, elige el tuyo para una ocasión especial.</p>
                  <div className="prices">
                    <p className="price-1">$8000</p>
                  </div>
                  <div className="botones">
                    <a href="/productos" className="btn-1">Comprar</a>
                  </div>
                </div>
                <div className="slider-img">
                  <img src="/images/LlaveroP.png" alt="Llavero personalizado" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slider">
                <div className="slider-txt">
                  <h1>Roca</h1>
                  <p>Es una roca fotográfica en la que se puede colocar fotos personalizadas.</p>
                  <div className="prices">
                    <p className="price-1">$10000</p>
                  </div>
                  <div className="botones">
                    <a href="/productos" className="btn-1">Comprar</a>
                  </div>
                </div>
                <div className="slider-img">
                  <img src="/images/RocafotoP.png" alt="Roca fotográfica personalizada" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <section className="horario">
          <div className="horario-info container">
            <h2>Horario</h2>
            <div className="horario-txt">
              <div className="txt">
                <h4>Dirección</h4>
                <p>Santiago, Maipú</p>
              </div>
              <div className="txt">
                <h4>Horario</h4>
                <p>Lunes a Viernes: 9 am - 23 pm</p>
                <p>Sábado y Domingo: 10 am - 19 pm</p>
              </div>
              <div className="txt">
                <h4>Teléfono</h4>
                <p>958884360</p>
                <p>+56958884360</p>
              </div>
              <div className="txt">
                <h4>Redes Sociales</h4>
                <div className="socials">
                  <a href="https://www.facebook.com/profile.php?id=61559828730140" target="_blank" rel="noopener noreferrer">
                    <div className="social">
                      <img src="/images/s1.svg" alt="Facebook" />
                    </div>
                  </a>
                  <a href="https://www.instagram.com/sublimaipu/" target="_blank" rel="noopener noreferrer">
                    <div className="social">
                      <img src="/images/s3.svg" alt="Instagram" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <iframe 
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106466.55357874701!2d-70.86156232952683!3d-33.49930089625455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662dd285b2c673f%3A0xfcd19ca5936c866d!2sMaip%C3%BA%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1718504641410!5m2!1ses!2scl"
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de SubliMaipu"
          ></iframe>
        </section>
      </main>

      <Encabezado />
    </>
  );
}

export default PaginaInicio;