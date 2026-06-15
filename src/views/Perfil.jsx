import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import usePerfil from "../hooks/usePerfil";
import { ROL_ADMIN } from "../utils/roles";
import DatosPersonales from "../components/profile/DatosPersonales";
import HistorialPedidos from "../components/profile/HistorialPedidos";

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);
  const esAdmin = usuario?.rol === ROL_ADMIN;
  const { perfil, pedidos, cargando, actualizarPerfil } = usePerfil(usuario?.id, esAdmin);

  useEffect(() => {
    if (!usuario) { navigate("/login"); return; }
    if (!usuario.id) { dispatch(logout()); navigate("/login"); }
  }, [usuario, dispatch, navigate]);

  if (!usuario) return null;

  const handleLogout = () => { dispatch(logout()); navigate("/"); };

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
          onGuardado={actualizarPerfil}
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
