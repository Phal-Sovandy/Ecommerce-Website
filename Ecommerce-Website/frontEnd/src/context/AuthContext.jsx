import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null,
    id: null,
    token: null,
  });

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setAuth({ isLoggedIn: false, role: null, id: null, token: null });
          return;
        }

        setAuth({
          isLoggedIn: true,
          role: decoded.role,
          id: decoded.id,
          token,
        });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setAuth({
      isLoggedIn: true,
      role: decoded.role,
      id: decoded.id,
      token,
    });
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setAuth({
      isLoggedIn: false,
      role: null,
      id: null,
      token: null,
    });
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
