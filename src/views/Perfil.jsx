import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pedidosMock = [
  {
    id: 1001,
    fecha: "2025-04-10",
    estado: "Entregado",
    items: [
      { nombre: "Flecha Nueva", cantidad: 2, precio: 900 },
      { nombre: "Rosado de Verano", cantidad: 1, precio: 807.5 },
    ],
    total: 2607.5,
  },
  {
    id: 1002,
    fecha: "2025-04-28",
    estado: "En camino",
    items: [
      { nombre: "Terroir Blanc", cantidad: 1, precio: 1500 },
    ],
    total: 1500,
  },
  {
    id: 1003,
    fecha: "2025-05-03",
    estado: "Pendiente",
    items: [
      { nombre: "Brut Rosé", cantidad: 3, precio: 1785 },
    ],
    total: 5355,
  },
];

const estadoColor = {
  Entregado: "var(--tertiary)",
  "En camino": "#b07d00",
  Pendiente: "var(--gray)",
};

const CampoEditable = ({ label, valor, onGuardar }) => {
  const [editando, setEditando] = useState(false);
  const [input, setInput] = useState(valor || "");

  const guardar = () => {
    if (input.trim()) {
      onGuardar(input.trim());
      setEditando(false);
    }
  };

  const cancelar = () => { 
    setInput(valor || "");
    setEditando(false);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "8px" }}>
        {label}
      </p>

      {editando ? (
        <div>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            style={{ width: "100%", border: "1px solid var(--border)", padding: "10px 12px", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box", marginBottom: "10px" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={guardar}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Guardar
            </button>
            <button
              onClick={cancelar}
              style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : valor ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "15px", margin: 0 }}>{valor}</p>
          <button
            onClick={() => { setInput(valor); setEditando(true); }}
            style={{ background: "none", border: "none", fontSize: "12px", color: "var(--gray)", cursor: "pointer", letterSpacing: "0.5px", textDecoration: "underline" }}
          >
            Editar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditando(true)}
          style={{ background: "none", border: "none", fontSize: "13px", color: "var(--primary)", cursor: "pointer", padding: "0", letterSpacing: "0.5px" }}
        >
          + Agregar {label.toLowerCase()}
        </button>
      )}
    </div>
  );
};

const Perfil = () => {
  const { usuario, logout, actualizarPerfil } = useAuth(); //useAuth es un hook que se usa para obtener el usuario y la funcion para actualizar el perfil
  const navigate = useNavigate(); //useNavigate es un hook que se usa para navegar entre las paginas

  const handleLogout = () => {
    logout(); //logout es la funcion que se usa para cerrar la sesion
    navigate("/");
  };

  useEffect(() => {
    if (!usuario) navigate("/login"); //navigate es la funcion que se usa para navegar entre las paginas
  }, [usuario]);

  if (!usuario) return null;

  return (
    <div style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 40px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>
        Mi perfil
      </h1>
      <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        Datos de tu cuenta
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "48px", alignItems: "start" }}>

        {/* Columna izquierda: datos personales */}
        <div>
          <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "16px" }}>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "6px" }}>
                Nombre
              </p>
              <p style={{ fontSize: "16px" }}>{usuario.nombre}</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "6px" }}>
                Email
              </p>
              <p style={{ fontSize: "16px" }}>{usuario.email}</p>
            </div>
            <CampoEditable
              label="Teléfono"
              valor={usuario.telefono}
              onGuardar={(v) => actualizarPerfil({ telefono: v })}
            />
            <CampoEditable
              label="Dirección"
              valor={usuario.direccion}
              onGuardar={(v) => actualizarPerfil({ direccion: v })}
            />
          </div>
          <button
            onClick={handleLogout}
            style={{ width: "100%", background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Columna derecha: historial de pedidos */}
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "20px" }}>
            Historial de pedidos
          </h2>

          {pedidosMock.length === 0 ? ( //pedidosMock es un array de pedidos
            <p style={{ color: "var(--gray)", fontSize: "14px" }}>
              Todavía no realizaste ningún pedido.
            </p>
          ) : (
            pedidosMock.map((pedido) => ( //map es un metodo que se usa para recorrer un array y devolver un nuevo array con los valores de la funcion
              <div key={pedido.id} style={{ border: "1px solid var(--border)", padding: "24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "2px" }}>
                      Pedido #{pedido.id}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--gray)" }}>
                      {new Date(pedido.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: estadoColor[pedido.estado] || "var(--gray)", fontWeight: "600", border: `1px solid ${estadoColor[pedido.estado] || "var(--gray)"}`, padding: "4px 12px" }}>
                    {pedido.estado}
                  </span>
                </div>

                {pedido.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray)", marginBottom: "6px" }}>
                    <span>{item.nombre} × {item.cantidad}</span>
                    <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                  </div>
                ))}

                <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}>
                  <span>Total</span>
                  <span>${pedido.total.toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Perfil;
