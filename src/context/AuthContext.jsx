import { createContext, useContext, useState } from "react";

const URL = "http://localhost:4002";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { username: payload.sub, rol: payload.role?.toLowerCase() };
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    return fetch(`${URL}/api/v1/auth/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Credenciales incorrectas");
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        setUsuario({ username: payload.sub, rol: payload.role?.toLowerCase() });
        return true;
      })
      .catch((error) => {
        console.error(error.message);
        return false;
      });
  };

  const registrar = (firstname, lastname, username, email, password) => {
    return fetch(`${URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, username, email, password, role: "USER" }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al registrarse");
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        setUsuario({ username: payload.sub, rol: payload.role?.toLowerCase() });
        return true;
      })
      .catch((error) => {
        console.error(error.message);
        return false;
      });
  };

  const logout = () => {
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
