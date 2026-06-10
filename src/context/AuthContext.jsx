import { createContext, useContext, useState } from "react";
import { loginAPI, registrarAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try { return JSON.parse(localStorage.getItem("usuario_sesion")) || null; }
    catch { return null; }
  });

  const login = async (username, password) => {
    try {
      const data = await loginAPI(username, password);
      if (!data?.access_token) return false;

      const sesion = {
        id: data.user_id,
        username,
        nombre: username,
        rol: (data.role || "USER").toLowerCase(),
      };

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("usuario_sesion", JSON.stringify(sesion));
      setUsuario(sesion);
      return sesion;
    } catch {
      return false;
    }
  };

  const registrar = async (firstname, lastname, email, username, password) => {
    try {
      const data = await registrarAPI({ firstname, lastname, email, username, password });
      if (!data?.access_token) return false;

      const sesion = {
        id: data.user_id,
        username,
        nombre: firstname,
        rol: (data.role || "USER").toLowerCase(),
      };

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("usuario_sesion", JSON.stringify(sesion));
      setUsuario(sesion);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("usuario_sesion");
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
