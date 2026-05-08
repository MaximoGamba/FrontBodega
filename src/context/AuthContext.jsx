import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "bodega_usuarios";
const SESSION_KEY = "bodega_sesion";

const getUsuarios = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const saveUsuarios = (usuarios) => localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const sesion = localStorage.getItem(SESSION_KEY);
    if (!sesion) return null;
    const usuarios = getUsuarios();
    return usuarios[sesion] || null;
  });

  const login = (email, password) => {
    const usuarios = getUsuarios();
    if (!usuarios[email]) {
      usuarios[email] = { email, nombre: email.split("@")[0], telefono: "", direccion: "" };
      saveUsuarios(usuarios);
    }
    localStorage.setItem(SESSION_KEY, email);
    setUsuario(usuarios[email]);
    return true;
  };

  const registrar = (nombre, email, password) => {
    const usuarios = getUsuarios();
    usuarios[email] = { email, nombre, telefono: "", direccion: "" };
    saveUsuarios(usuarios);
    localStorage.setItem(SESSION_KEY, email);
    setUsuario(usuarios[email]);
    return true;
  };

  const actualizarPerfil = (datos) => {
    const usuarios = getUsuarios();
    const actualizado = { ...usuarios[usuario.email], ...datos };
    usuarios[usuario.email] = actualizado;
    saveUsuarios(usuarios);
    setUsuario(actualizado);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
