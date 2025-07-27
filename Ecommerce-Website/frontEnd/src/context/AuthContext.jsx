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

  // Debug function to log auth state changes
  const logAuthState = (message, token = null) => {
    console.log(`[AuthContext] ${message}`, {
      hasToken: !!token,
      token: token ? `${token.substring(0, 10)}...` : 'none',
      currentAuthState: { ...auth }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    logAuthState('Checking initial auth state', token);

    if (token) {
      try {
        console.log('[AuthContext] Decoding token...');
        const decoded = jwtDecode(token);
        console.log('[AuthContext] Decoded token:', decoded);

        if (decoded.exp * 1000 < Date.now()) {
          console.log('[AuthContext] Token expired');
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setAuth({ isLoggedIn: false, role: null, id: null, token: null });
          return;
        }

        console.log('[AuthContext] Setting auth state from token');
        setAuth({
          isLoggedIn: true,
          role: decoded.role,
          id: decoded.id,
          token,
        });
      } catch (err) {
        console.error("[AuthContext] Invalid token:", err);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    } else {
      console.log('[AuthContext] No token found in storage');
    }
  }, []);

  const login = (token, rememberMe = false) => {
    try {
      console.log('[AuthContext] Login called with token:', token ? `${token.substring(0, 10)}...` : 'none');
      const decoded = jwtDecode(token);
      console.log('[AuthContext] Decoded token:', decoded);
      
      // Store token in appropriate storage
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      // Update auth state
      const newAuthState = {
        isLoggedIn: true,
        role: decoded.role,
        id: decoded.id,
        token,
      };
      
      console.log('[AuthContext] Setting auth state:', newAuthState);
      setAuth(newAuthState);
      
      // Only redirect if we're not already on a page that requires auth
      if (!window.location.pathname.startsWith('/shopping')) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error('[AuthContext] Error during login:', error);
      throw error; // Re-throw to allow handling in the login component
    }
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
