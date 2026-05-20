import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchUsuario, fetchPedidosUsuario, actualizarUsuario } from "../services/api";

const ESTADO_LABEL = {
  CREATED: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const ESTADO_COLOR = {
  CREATED: "var(--gray)",
  PAID: "var(--tertiary)",
  SHIPPED: "#b07d00",
  DELIVERED: "#1a56db",
  CANCELLED: "#c0392b",
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "var(--gray)",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  padding: "10px 12px",
  fontSize: "14px",
  fontFamily: "var(--font-sans)",
  outline: "none",
  boxSizing: "border-box",
};

const CampoEditable = ({ label, valor, campo, userId, onGuardado }) => {
  const [editando, setEditando] = useState(false);
  const [input, setInput] = useState(valor || "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const guardar = async () => {
    if (!input.trim()) return;
    setGuardando(true);
    setError("");
    try {
      const actualizado = await actualizarUsuario(userId, { [campo]: input.trim() });
      if (actualizado?.error) { setError("Error al guardar."); return; }
      onGuardado(actualizado);
      setEditando(false);
    } catch {
      setError("Error al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  const cancelar = () => {
    setInput(valor || "");
    setError("");
    setEditando(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={labelStyle}>{label}</p>
      {editando ? (
        <div>
          <input
            autoFocus
            style={{ ...inputStyle, marginBottom: "8px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={guardar}
              disabled={guardando}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", opacity: guardando ? 0.7 : 1 }}
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={cancelar}
              style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "15px", margin: 0 }}>{valor || "—"}</p>
          <button
            onClick={() => { setInput(valor || ""); setEditando(true); }}
            style={{ background: "none", border: "none", fontSize: "12px", color: "var(--gray)", cursor: "pointer", textDecoration: "underline" }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

const CambiarPassword = ({ userId }) => {
  const [abierto, setAbierto] = useState(false);
  const [form, setForm] = useState({ actual: "", nueva: "", confirmar: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const guardar = async () => {
    if (!form.actual) { setError("Ingresá tu contraseña actual."); return; }
    if (!form.nueva || !form.confirmar) { setError("Completá todos los campos."); return; }
    if (form.nueva !== form.confirmar) { setError("Las contraseñas nuevas no coinciden."); return; }
    if (form.nueva.length < 6) { setError("La contraseña nueva debe tener al menos 6 caracteres."); return; }
    setGuardando(true);
    setError("");
    try {
      const res = await actualizarUsuario(userId, { currentPassword: form.actual, password: form.nueva });
      if (res?.error || res?.message?.toLowerCase().includes("incorrecta") || res?.message?.toLowerCase().includes("actual")) {
        setError(res.message || "La contraseña actual es incorrecta.");
        return;
      }
      setExito(true);
      setForm({ actual: "", nueva: "", confirmar: "" });
      setTimeout(() => { setExito(false); setAbierto(false); }, 2000);
    } catch {
      setError("Error al cambiar la contraseña.");
    } finally {
      setGuardando(false);
    }
  };

  if (!abierto) {
    return (
      <div style={{ marginTop: "8px" }}>
        <button
          onClick={() => setAbierto(true)}
          style={{ background: "none", border: "none", fontSize: "13px", color: "var(--primary)", cursor: "pointer", padding: 0, textDecoration: "underline" }}
        >
          Cambiar contraseña
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
      <p style={{ ...labelStyle, marginBottom: "16px" }}>Cambiar contraseña</p>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Contraseña actual</p>
        <input
          style={inputStyle}
          type="password"
          value={form.actual}
          autoComplete="current-password"
          onChange={(e) => setForm({ ...form, actual: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Nueva contraseña</p>
        <input
          style={inputStyle}
          type="password"
          value={form.nueva}
          autoComplete="new-password"
          onChange={(e) => setForm({ ...form, nueva: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Confirmar contraseña</p>
        <input
          style={inputStyle}
          type="password"
          value={form.confirmar}
          autoComplete="new-password"
          onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
        />
      </div>
      {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
      {exito && <p style={{ fontSize: "12px", color: "green", marginBottom: "8px" }}>Contraseña actualizada.</p>}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={guardar}
          disabled={guardando}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", opacity: guardando ? 0.7 : 1 }}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={() => { setAbierto(false); setError(""); setForm({ actual: "", nueva: "", confirmar: "" }); }}
          style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

const Perfil = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const esAdmin = usuario?.rol === "admin";

  useEffect(() => {
    if (!usuario) { navigate("/login"); return; }

    if (!usuario.id) {
      logout();
      navigate("/login");
      return;
    }

    const peticiones = [fetchUsuario(usuario.id)];
    if (!esAdmin) peticiones.push(fetchPedidosUsuario(usuario.id));

    Promise.all(peticiones)
      .then(([datos, historial]) => {
        setPerfil(datos && !datos.error ? datos : null);
        if (!esAdmin) setPedidos(Array.isArray(historial) ? [...historial].reverse() : []);
        setCargando(false);
      })
      .catch(() => {
        setPerfil(null);
        setCargando(false);
      });
  }, [usuario]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!usuario) return null;

  return (
    <div style={{ margin: "60px 160px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>
        Mi perfil
      </h1>
      <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        {esAdmin ? "Panel de administración" : "Datos de tu cuenta"}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: esAdmin ? "1fr" : "320px 1fr", gap: "48px", alignItems: "start" }}>

        {/* Datos personales */}
        <div>
          <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "16px" }}>
            {cargando ? (
              <p style={{ color: "var(--gray)", fontSize: "14px" }}>Cargando datos...</p>
            ) : !perfil ? (
              <p style={{ color: "var(--primary)", fontSize: "14px" }}>
                No se pudieron cargar los datos. Cerrá sesión e ingresá nuevamente.
              </p>
            ) : (
              <>
                {/* Campos de solo lectura */}
                {[
                  { label: "Usuario", valor: perfil.username },
                  { label: "Email", valor: perfil.email },
                ].map(({ label, valor }) => (
                  <div key={label} style={{ marginBottom: "20px" }}>
                    <p style={labelStyle}>{label}</p>
                    <p style={{ fontSize: "15px", margin: 0 }}>{valor || "—"}</p>
                  </div>
                ))}

                {/* Campos editables */}
                <CampoEditable
                  label="Nombre"
                  valor={perfil.firstName}
                  campo="firstName"
                  userId={usuario.id}
                  onGuardado={(actualizado) => setPerfil({ ...perfil, firstName: actualizado.firstName })}
                />
                <CampoEditable
                  label="Apellido"
                  valor={perfil.lastName}
                  campo="lastName"
                  userId={usuario.id}
                  onGuardado={(actualizado) => setPerfil({ ...perfil, lastName: actualizado.lastName })}
                />

                <CambiarPassword userId={usuario.id} />
              </>
            )}
          </div>
          <button
            onClick={handleLogout}
            style={{ width: "100%", background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Historial de pedidos — solo usuarios normales */}
        {!esAdmin && (
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "20px" }}>
              Historial de pedidos
            </h2>

            {cargando && (
              <p style={{ color: "var(--gray)", fontSize: "14px" }}>Cargando pedidos...</p>
            )}

            {!cargando && pedidos.length === 0 && (
              <p style={{ color: "var(--gray)", fontSize: "14px" }}>
                Todavía no realizaste ningún pedido.
              </p>
            )}

            {!cargando && pedidos.map((pedido) => {
              const estado = pedido.status;
              const color = ESTADO_COLOR[estado] || "var(--gray)";
              const label = ESTADO_LABEL[estado] || estado;
              const fecha = pedido.createdAt
                ? new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
                : "—";

              return (
                <div key={pedido.id} style={{ border: "1px solid var(--border)", padding: "24px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "2px" }}>
                        Pedido #{pedido.id}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--gray)" }}>{fecha}</p>
                    </div>
                    <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color, fontWeight: "600", border: `1px solid ${color}`, padding: "4px 12px" }}>
                      {label}
                    </span>
                  </div>

                  {pedido.items?.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray)", marginBottom: "6px" }}>
                      <span>{item.wine?.name} × {item.quantity}</span>
                      <span>${Number(item.subtotal).toLocaleString()}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}>
                    <span>Total</span>
                    <span>${Number(pedido.total).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Perfil;
