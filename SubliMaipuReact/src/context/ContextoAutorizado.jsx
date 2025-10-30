import React, { createContext, useState, useContext, useEffect } from 'react';


const ContextoAutorizado = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user, token]);


  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });

      if (response.ok) {
        const backendData = await response.json();
        setToken(backendData.token);

        const frontendUser = {
          email: backendData.email,
          nombre: backendData.nombre,
          role: backendData.rol
        };

        setUser(frontendUser);
        return frontendUser;

      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error("Error de conexión al intentar iniciar sesión:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

  };

  const value = {
    user,
    token,
    login,
    logout,
  };
  return <ContextoAutorizado.Provider value={value}>{children}</ContextoAutorizado.Provider>;
}

export function useAuth() {
  return useContext(ContextoAutorizado);
}