// src/Store/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [isLoading, setIsLoading] = useState(true); // 🔹 to wait before deciding

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");

    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = (token, email) => {
    setToken(token);
    setUserEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const isLoggedIn = !!token;

  // Wait until auth status is known before showing routes
  if (isLoading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider
      value={{ token, userEmail, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
