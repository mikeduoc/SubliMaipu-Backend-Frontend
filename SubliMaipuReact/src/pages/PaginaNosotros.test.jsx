import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import PaginaNosotros from './PaginaNosotros';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/ContextoAutorizado'; 
import { CartProvider } from '../context/ContextoCarrito';   


describe('PaginaNosotros', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <PaginaNosotros />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  });


  it('muestra el título "Nosotros"', () => {
    const titulo = screen.getByRole('heading', { name: /nosotros/i });
    expect(titulo).toBeInTheDocument();
  });

  it('tiene un enlace hacia /contacto', () => {
    const link = screen.getByRole('link', { name: /contacto/i }); 
    expect(link).toHaveAttribute('href', '/contacto');
  });
});