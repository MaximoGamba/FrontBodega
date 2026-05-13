import { useState } from "react";
import { productosIniciales, colores, cepas, azucares, crianzas, elaboraciones, medidas } from "../data/productos";

const campoVacio = {
  name: "", winery: "", year: "", price: "", stock: "",
  colorId: 1, cepaId: 1, azucarId: 1, crianzaId: 1, elaboracionId: 1, medidaId: 1,
  discountPercent: 0, activo: true, imagen: "",
};

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "8px 12px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block", marginBottom: "4px",
};

const Admin = () => {
  const [productos, setProductos] = useState(productosIniciales);

  const agregarProducto = (datos) => {
    const nuevoId = Math.max(...productos.map((p) => p.id), 0) + 1;
    setProductos([...productos, { ...datos, id: nuevoId }]);
  };

  const editarProducto = (id, datos) => {
    setProductos(productos.map((p) => (p.id === id ? { ...datos, id } : p)));
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };
  const [form, setForm] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  const abrirNuevo = () => {
    setForm({ ...campoVacio });
    setEditandoId(null);
  };

  const abrirEditar = (producto) => {
    setForm({ ...producto });
    setEditandoId(producto.id);
  };

  const cerrar = () => {
    setForm(null);
    setEditandoId(null);
  };

  const handleChange = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }));
  };

  const guardar = () => {
    if (!form.name || !form.winery || !form.price) return;
    const datos = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      colorId: Number(form.colorId),
      cepaId: Number(form.cepaId),
      azucarId: Number(form.azucarId),
      crianzaId: Number(form.crianzaId),
      elaboracionId: Number(form.elaboracionId),
      medidaId: Number(form.medidaId),
    };
    if (editandoId) {
      editarProducto(editandoId, datos);
    } else {
      agregarProducto(datos);
    }
    cerrar();
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid var(--primary)", paddingBottom: "16px", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>Panel de Administración</h1>
        <button
          onClick={abrirNuevo}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
        >
          + Nuevo producto
        </button>
      </div>

      {/* Formulario */}
      {form && (
        <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
            {editandoId ? "Editar producto" : "Nuevo producto"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Nombre *</label>
              <input style={inputStyle} value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Bodega *</label>
              <input style={inputStyle} value={form.winery} onChange={(e) => handleChange("winery", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Año</label>
              <input style={inputStyle} type="number" value={form.year} onChange={(e) => handleChange("year", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Precio *</label>
              <input style={inputStyle} type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Stock</label>
              <input style={inputStyle} type="number" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Descuento (%)</label>
              <input style={inputStyle} type="number" min="0" max="100" value={form.discountPercent} onChange={(e) => handleChange("discountPercent", e.target.value)} />
            </div>
            {[
              { label: "Color", campo: "colorId", opciones: colores },
              { label: "Cepa", campo: "cepaId", opciones: cepas },
              { label: "Azúcar", campo: "azucarId", opciones: azucares },
              { label: "Crianza", campo: "crianzaId", opciones: crianzas },
              { label: "Elaboración", campo: "elaboracionId", opciones: elaboraciones },
              { label: "Medida", campo: "medidaId", opciones: medidas },
            ].map(({ label, campo, opciones }) => (
              <div key={campo}>
                <label style={labelStyle}>{label}</label>
                <select
                  style={{ ...inputStyle, background: "white" }}
                  value={form[campo]}
                  onChange={(e) => handleChange(campo, e.target.value)}
                >
                  {opciones.map((op) => (
                    <option key={op.id} value={op.id}>{op.nombre}</option>
                  ))}
                </select>
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>URL de imagen</label>
              <input style={inputStyle} value={form.imagen} onChange={(e) => handleChange("imagen", e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id="activo"
                checked={form.activo}
                onChange={(e) => handleChange("activo", e.target.checked)}
                style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
              />
              <label htmlFor="activo" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer" }}>Activo</label>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              onClick={guardar}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Guardar
            </button>
            <button
              onClick={cerrar}
              style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
            {["Nombre", "Bodega", "Precio", "Stock", "Descuento", "Estado", ""].map((h) => (
              <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "12px" }}>{p.name}</td>
              <td style={{ padding: "12px", color: "var(--gray)" }}>{p.winery}</td>
              <td style={{ padding: "12px" }}>${p.price.toLocaleString()}</td>
              <td style={{ padding: "12px" }}>{p.stock}</td>
              <td style={{ padding: "12px" }}>{p.discountPercent > 0 ? `${p.discountPercent}%` : "—"}</td>
              <td style={{ padding: "12px" }}>
                <span style={{ fontSize: "11px", padding: "3px 10px", background: p.activo ? "#e6f4ea" : "#fce8e8", color: p.activo ? "#2d7a2d" : "#c0392b" }}>
                  {p.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => abrirEditar(p)}
                  style={{ background: "none", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(p.id)}
                  style={{ background: "none", border: "1px solid #e0b0b0", color: "#c0392b", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
