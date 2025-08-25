// src/context/AuthContext.js

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      // Cek jika token sudah expired
      if (decodedToken.exp * 1000 < Date.now()) {
        logout(); // Logout jika expired
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem('accessToken', token);
    setUser(decodedToken);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk mempermudah penggunaan context
export const useAuth = () => {
  return useContext(AuthContext);
};