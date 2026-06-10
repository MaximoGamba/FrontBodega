import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchUsuario, fetchPedidosUsuario } from "../services/api";
import DatosPersonales from "../components/profile/DatosPersonales";
import HistorialPedidos from "../components/user/HistorialPedidos";

const Perfil = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const esAdmin = usuario?.rol === "admin";

  useEffect(() => {
    if (!usuario) { navigate("/login"); return; }
    if (!usuario.id) { logout(); navigate("/login"); return; }

    const peticiones = [fetchUsuario(usuario.id)];
    if (!esAdmin) peticiones.push(fetchPedidosUsuario(usuario.id));

    Promise.all(peticiones)
      .then(([datos, historial]) => {
        setPerfil(datos && !datos.error ? datos : null);
        if (!esAdmin) setPedidos(Array.isArray(historial) ? [...historial].reverse() : []);
        setCargando(false);
      })
      .catch(() => { setPerfil(null); setCargando(false); });
  }, [usuario]);

  if (!usuario) return null;

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div style={{ margin: "60px 160px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>
        Mi perfil
      </h1>
      <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        {esAdmin ? "Panel de administración" : "Datos de tu cuenta"}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: esAdmin ? "1fr" : "320px 1fr", gap: "48px", alignItems: "start" }}>
        <DatosPersonales
          perfil={perfil}
          cargando={cargando}
          userId={usuario.id}
          onGuardado={(cambios) => setPerfil((prev) => ({ ...prev, ...cambios }))}
          onLogout={handleLogout}
        />

        {!esAdmin && (
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "20px" }}>
              Historial de pedidos
            </h2>
            <HistorialPedidos pedidos={pedidos} cargando={cargando} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
