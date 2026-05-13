import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "usuarios_registrados";

const getUsuarios = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try { return JSON.parse(localStorage.getItem("usuario_sesion")) || null; }
    catch { return null; }
  });

  const login = (email, password) => {
    const usuarios = getUsuarios();
    const encontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (encontrado) {
      const sesion = { email: encontrado.email, nombre: encontrado.firstname, rol: encontrado.rol || "user" };
      localStorage.setItem("usuario_sesion", JSON.stringify(sesion));
      setUsuario(sesion);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };

  const registrar = (firstname, lastname, email, _username, password) => {
    const usuarios = getUsuarios();
    if (usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return Promise.resolve(false);
    }
    const nuevo = { firstname, lastname, email, password, rol: "user" };
    localStorage.setItem(USERS_KEY, JSON.stringify([...usuarios, nuevo]));
    const sesion = { email: nuevo.email, nombre: nuevo.firstname, rol: "user" };
    localStorage.setItem("usuario_sesion", JSON.stringify(sesion));
    setUsuario(sesion);
    return Promise.resolve(true);
  };

  const logout = () => {
    localStorage.removeItem("usuario_sesion");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
