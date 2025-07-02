import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoggedIn: true,
    role: "customer", //Change from "customer", "seller", "admin" to test
    id: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          isLoggedIn: true,
          role: decoded.role,
          id: decoded.id,
          token,
        });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    localStorage.setItem("token", token);
    setAuth({
      isLoggedIn: true,
      role: decoded.role,
      id: decoded.id,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isLoggedIn: false,
      role: null,
      id: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
