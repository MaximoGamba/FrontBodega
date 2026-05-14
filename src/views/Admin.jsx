import { useState, useEffect } from "react";
import {
  fetchVinosAdmin, crearVino, actualizarVino, desactivarVinoAPI, reactivarVinoAPI, mapVino, uploadImagen,
  fetchColores, fetchCepas, fetchAzucares, fetchCrianzas, fetchElaboraciones, fetchMedidas,
  fetchPedidosAdmin, actualizarEstadoPedido,
} from "../services/api";

const campoVacio = {
  name: "", winery: "", year: "", price: "", stock: "",
  colorId: "", cepaId: "", azucarId: "", crianzaId: "", elaboracionId: "", medidaId: "",
  discountPercent: 0,
};

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "8px 12px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block", marginBottom: "4px",
};

const errorStyle = {
  fontSize: "11px", color: "#c0392b", marginTop: "4px", display: "block",
};

const ORDEN_ESTADO_LABEL = {
  CREATED: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const ORDEN_ESTADO_COLOR = {
  CREATED: { bg: "#f5f5f5", text: "var(--gray)" },
  PAID: { bg: "#e6f4ea", text: "#2d7a2d" },
  SHIPPED: { bg: "#fff8e1", text: "#b07d00" },
  DELIVERED: { bg: "#e8f0fe", text: "#1a56db" },
  CANCELLED: { bg: "#fce8e8", text: "#c0392b" },
};


// ─── Sección Productos ───────────────────────────────────────────────────────

const SeccionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [form, setForm] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [galeria, setGaleria] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bodega_imagenes")) || []; }
    catch { return []; }
  });

  const [colores, setColores] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [azucares, setAzucares] = useState([]);
  const [crianzas, setCrianzas] = useState([]);
  const [elaboraciones, setElaboraciones] = useState([]);
  const [medidas, setMedidas] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchVinosAdmin(), fetchColores(), fetchCepas(),
      fetchAzucares(), fetchCrianzas(), fetchElaboraciones(), fetchMedidas(),
    ]).then(([vinos, cols, ceps, azus, cris, elabs, meds]) => {
      setProductos(vinos);
      setColores(cols); setCepas(ceps); setAzucares(azus);
      setCrianzas(cris); setElaboraciones(elabs); setMedidas(meds);
      setCargando(false);
      const urlsExistentes = vinos.map((v) => v.imagen).filter(Boolean);
      setGaleria((prev) => {
        const todas = [...new Set([...prev, ...urlsExistentes])];
        localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
        return todas;
      });
    }).catch(() => setCargando(false));
  }, []);

  const abrirNuevo = () => {
    setForm({
      ...campoVacio,
      colorId: colores[0]?.id ?? "", cepaId: cepas[0]?.id ?? "",
      azucarId: azucares[0]?.id ?? "", crianzaId: crianzas[0]?.id ?? "",
      elaboracionId: elaboraciones[0]?.id ?? "", medidaId: medidas[0]?.id ?? "",
    });
    setEditandoId(null);
  };

  const abrirEditar = (producto) => { setForm({ ...producto }); setEditandoId(producto.id); setErrores({}); };
  const cerrar = () => { setForm(null); setEditandoId(null); setErrores({}); };
  const handleChange = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = () => {
    const e = {};
    const anioActual = new Date().getFullYear();
    if (!form.name?.trim()) e.name = "El nombre es obligatorio.";
    else if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres.";
    if (!form.winery?.trim()) e.winery = "La bodega es obligatoria.";
    if (!form.price || Number(form.price) <= 0) e.price = "El precio debe ser mayor a 0.";
    if (form.stock === "" || form.stock === null || form.stock === undefined || Number(form.stock) < 0)
      e.stock = "El stock no puede ser negativo.";
    if (form.year !== "" && form.year !== null && form.year !== undefined) {
      const y = Number(form.year);
      if (!Number.isInteger(y) || y < 1800 || y > anioActual)
        e.year = `El año debe estar entre 1800 y ${anioActual}.`;
    }
    const desc = Number(form.discountPercent);
    if (isNaN(desc) || desc < 0 || desc > 100) e.discountPercent = "El descuento debe estar entre 0 y 100.";
    if (!form.imageUrl && !form.imagen) e.imagen = "La imagen es obligatoria.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSubiendoImagen(true);
    try {
      const url = await uploadImagen(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      setGaleria((prev) => {
        const todas = [...new Set([url, ...prev])];
        localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
        return todas;
      });
      setMostrarGaleria(false);
    } catch {
      alert("Error al subir la imagen.");
    } finally {
      setSubiendoImagen(false);
    }
  };

  const guardar = async () => {
    if (!validar()) return;
    const datos = {
      name: form.name, winery: form.winery, year: Number(form.year),
      price: Number(form.price), stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      colorId: Number(form.colorId), cepaId: Number(form.cepaId),
      azucarId: Number(form.azucarId), crianzaId: Number(form.crianzaId),
      elaboracionId: Number(form.elaboracionId), medidaId: Number(form.medidaId),
      imageUrl: form.imageUrl || form.imagen || null,
    };
    setGuardando(true);
    try {
      if (editandoId) {
        const actualizado = await actualizarVino(editandoId, datos);
        setProductos((prev) => prev.map((p) => (p.id === editandoId ? mapVino(actualizado) : p)));
      } else {
        const nuevo = await crearVino(datos);
        setProductos((prev) => [...prev, mapVino(nuevo)]);
      }
      cerrar();
    } catch {
      alert("Error al guardar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  const toggleActivo = async (producto) => {
    const accion = producto.active !== false ? "desactivar" : "reactivar";
    if (!confirm(`¿Desea ${accion} este producto?`)) return;
    try {
      if (producto.active !== false) {
        await desactivarVinoAPI(producto.id);
      } else {
        await reactivarVinoAPI(producto.id);
      }
      setProductos((prev) =>
        prev.map((p) => p.id === producto.id ? { ...p, active: producto.active === false } : p)
      );
    } catch {
      alert(`Error al ${accion} el producto.`);
    }
  };

  const selectOpciones = [
    { label: "Color", campo: "colorId", opciones: colores },
    { label: "Cepa", campo: "cepaId", opciones: cepas },
    { label: "Azúcar", campo: "azucarId", opciones: azucares },
    { label: "Crianza", campo: "crianzaId", opciones: crianzas },
    { label: "Elaboración", campo: "elaboracionId", opciones: elaboraciones },
    { label: "Medida", campo: "medidaId", opciones: medidas },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={abrirNuevo}
          disabled={cargando}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
        >
          + Nuevo producto
        </button>
      </div>

      {form && (
        <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
            {editandoId ? "Editar producto" : "Nuevo producto"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Nombre *</label>
              <input style={{ ...inputStyle, borderColor: errores.name ? "#c0392b" : undefined }} value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errores.name && <span style={errorStyle}>{errores.name}</span>}
            </div>
            <div>
              <label style={labelStyle}>Bodega *</label>
              <input style={{ ...inputStyle, borderColor: errores.winery ? "#c0392b" : undefined }} value={form.winery} onChange={(e) => handleChange("winery", e.target.value)} />
              {errores.winery && <span style={errorStyle}>{errores.winery}</span>}
            </div>
            <div>
              <label style={labelStyle}>Año</label>
              <input style={{ ...inputStyle, borderColor: errores.year ? "#c0392b" : undefined }} type="number" min="1800" max={new Date().getFullYear()} value={form.year} onChange={(e) => handleChange("year", e.target.value)} />
              {errores.year && <span style={errorStyle}>{errores.year}</span>}
            </div>
            <div>
              <label style={labelStyle}>Precio *</label>
              <input style={{ ...inputStyle, borderColor: errores.price ? "#c0392b" : undefined }} type="number" min="1" step="0.01" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
              {errores.price && <span style={errorStyle}>{errores.price}</span>}
            </div>
            <div>
              <label style={labelStyle}>Stock</label>
              <input style={{ ...inputStyle, borderColor: errores.stock ? "#c0392b" : undefined }} type="number" min="0" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} />
              {errores.stock && <span style={errorStyle}>{errores.stock}</span>}
            </div>
            <div>
              <label style={labelStyle}>Descuento (%)</label>
              <input style={{ ...inputStyle, borderColor: errores.discountPercent ? "#c0392b" : undefined }} type="number" min="0" max="100" value={form.discountPercent} onChange={(e) => handleChange("discountPercent", e.target.value)} />
              {errores.discountPercent && <span style={errorStyle}>{errores.discountPercent}</span>}
            </div>
            {selectOpciones.map(({ label, campo, opciones }) => (
              <div key={campo}>
                <label style={labelStyle}>{label}</label>
                <select
                  style={{ ...inputStyle, background: "white" }}
                  value={form[campo]}
                  onChange={(e) => handleChange(campo, e.target.value)}
                >
                  {opciones.map((op) => (
                    <option key={op.id} value={op.id}>{op.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ ...labelStyle, color: errores.imagen ? "#c0392b" : undefined }}>Imagen del producto *</label>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
              {(form.imageUrl || form.imagen) && (
                <img src={form.imageUrl || form.imagen} alt="preview" style={{ height: "64px", width: "64px", objectFit: "cover", border: "1px solid var(--border)" }} />
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="button" onClick={() => setMostrarGaleria((v) => !v)}
                  style={{ background: "white", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
                  {mostrarGaleria ? "Cerrar galería" : "Elegir de galería"}
                </button>
                <label style={{ background: "white", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: subiendoImagen ? "not-allowed" : "pointer", opacity: subiendoImagen ? 0.6 : 1 }}>
                  {subiendoImagen ? "Subiendo..." : "Subir nueva"}
                  <input type="file" accept="image/*" onChange={handleImagen} disabled={subiendoImagen} style={{ display: "none" }} />
                </label>
              </div>
            </div>
            {errores.imagen && <span style={errorStyle}>{errores.imagen}</span>}
            {mostrarGaleria && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px", padding: "12px", border: "1px solid var(--border)", background: "#fafafa", maxHeight: "220px", overflowY: "auto" }}>
                {galeria.length === 0 && (
                  <p style={{ gridColumn: "1/-1", fontSize: "12px", color: "var(--gray)" }}>No hay imágenes guardadas aún.</p>
                )}
                {galeria.map((url) => {
                  const seleccionada = (form.imageUrl || form.imagen) === url;
                  return (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      onClick={() => { setForm((f) => ({ ...f, imageUrl: url })); setMostrarGaleria(false); }}
                      style={{ width: "100%", aspectRatio: "1", objectFit: "cover", cursor: "pointer", border: seleccionada ? "2px solid var(--primary)" : "2px solid transparent", opacity: seleccionada ? 1 : 0.85 }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              onClick={guardar}
              disabled={guardando}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: guardando ? "not-allowed" : "pointer", opacity: guardando ? 0.7 : 1 }}
            >
              {guardando ? "Guardando..." : "Guardar"}
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

      {cargando ? (
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px" }}>Cargando...</p>
      ) : (
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
                <td style={{ padding: "12px" }}>${Number(p.price).toLocaleString()}</td>
                <td style={{ padding: "12px" }}>
                  {p.stock <= 5
                    ? <span className="stock-bajo">{p.stock}</span>
                    : p.stock
                  }
                </td>
                <td style={{ padding: "12px" }}>{p.discountPercent > 0 ? `${p.discountPercent}%` : "—"}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ fontSize: "11px", padding: "3px 10px", background: p.active !== false ? "#e6f4ea" : "#fce8e8", color: p.active !== false ? "#2d7a2d" : "#c0392b" }}>
                    {p.active !== false ? "Activo" : "Inactivo"}
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
                    onClick={() => toggleActivo(p)}
                    style={{
                      background: "none",
                      border: p.active !== false ? "1px solid #e0b0b0" : "1px solid #b0c8b0",
                      color: p.active !== false ? "#c0392b" : "#2d7a2d",
                      padding: "6px 14px", fontSize: "11px", letterSpacing: "1px",
                      textTransform: "uppercase", cursor: "pointer",
                    }}
                  >
                    {p.active !== false ? "Desactivar" : "Reactivar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

// ─── Sección Órdenes ─────────────────────────────────────────────────────────

const FilaOrden = ({ pedido, onEstadoActualizado }) => {
  const [expandida, setExpandida] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(pedido.status);
  const [guardando, setGuardando] = useState(false);

  const estado = pedido.status;
  const colores = ORDEN_ESTADO_COLOR[estado] || { bg: "#f5f5f5", text: "var(--gray)" };
  const fecha = pedido.createdAt
    ? new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  const guardarEstado = async () => {
    if (nuevoEstado === pedido.status) return;
    setGuardando(true);
    try {
      const actualizado = await actualizarEstadoPedido(pedido.id, nuevoEstado);
      onEstadoActualizado(actualizado);
    } catch {
      alert("Error al actualizar el estado.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      <tr
        style={{ borderBottom: expandida ? "none" : "1px solid var(--border)", cursor: "pointer" }}
        onClick={() => setExpandida((v) => !v)}
      >
        <td style={{ padding: "14px 12px", fontSize: "13px", fontWeight: "600" }}>#{pedido.id}</td>
        <td style={{ padding: "14px 12px", fontSize: "13px" }}>
          {pedido.user?.username || "—"}
          {pedido.user?.email && <div style={{ fontSize: "11px", color: "var(--gray)" }}>{pedido.user.email}</div>}
        </td>
        <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--gray)" }}>{fecha}</td>
        <td style={{ padding: "14px 12px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600", background: colores.bg, color: colores.text, padding: "4px 12px", border: `1px solid ${colores.text}` }}>
            {ORDEN_ESTADO_LABEL[estado] || estado}
          </span>
        </td>
        <td style={{ padding: "14px 12px", fontSize: "13px", fontWeight: "600" }}>
          ${Number(pedido.total).toLocaleString()}
        </td>
        <td style={{ padding: "14px 12px", textAlign: "right", fontSize: "18px", color: "var(--gray)", userSelect: "none" }}>
          {expandida ? "▲" : "▼"}
        </td>
      </tr>

      {expandida && (
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <td colSpan={6} style={{ padding: "0 12px 20px 12px", background: "#fafafa" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "24px", paddingTop: "20px" }}>

              {/* Productos del pedido */}
              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Productos</p>
                {pedido.items?.length > 0 ? pedido.items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--neutral)" }}>
                      {item.wine?.name || `Vino #${item.wine?.id}`}
                      <span style={{ color: "var(--gray)", marginLeft: "8px" }}>× {item.quantity}</span>
                    </span>
                    <span style={{ fontWeight: "600" }}>${Number(item.subtotal).toLocaleString()}</span>
                  </div>
                )) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin ítems</p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>
                  <span>Total</span>
                  <span>${Number(pedido.total).toLocaleString()}</span>
                </div>
              </div>

              {/* Envío */}
              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Envío</p>
                {pedido.shipment ? (
                  <>
                    <p style={{ fontSize: "13px", marginBottom: "8px", lineHeight: "1.5" }}>{pedido.shipment.address}</p>
                    <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
                      Estado:{" "}
                      <strong style={{ color: pedido.shipment.status === "DELIVERED" ? "#2d7a2d" : pedido.shipment.status === "CANCELLED" ? "#c0392b" : "var(--neutral)" }}>
                        {{ PENDING: "Pendiente", SHIPPED: "Enviado", DELIVERED: "Entregado", CANCELLED: "Cancelado" }[pedido.shipment.status] || pedido.shipment.status}
                      </strong>
                    </p>
                    {pedido.shipment.trackingNumber && (
                      <p style={{ fontSize: "12px", color: "var(--gray)" }}>
                        Tracking: <strong>{pedido.shipment.trackingNumber}</strong>
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin dirección de envío</p>
                )}
              </div>

              {/* Pago */}
              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Pago</p>
                {pedido.payment ? (
                  <>
                    <p style={{ fontSize: "13px", fontWeight: "600", margin: "0 0 4px" }}>
                      ${Number(pedido.payment.amount).toLocaleString()}
                    </p>
                    {pedido.payment.method && (
                      <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
                        Método: <strong>{{ TARJETA: "Tarjeta", TRANSFERENCIA: "Transferencia" }[pedido.payment.method] || pedido.payment.method}</strong>
                      </p>
                    )}
                    {pedido.payment.createdAt && (
                      <p style={{ fontSize: "12px", color: "var(--gray)" }}>
                        {new Date(pedido.payment.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin pago registrado</p>
                )}
              </div>

              {/* Cambiar estado */}
              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Cambiar estado del pedido</p>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  style={{ ...inputStyle, background: "white", marginBottom: "12px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {Object.entries(ORDEN_ESTADO_LABEL).map(([val, lbl]) => (
                    <option key={val} value={val}>{lbl}</option>
                  ))}
                </select>
                <button
                  onClick={(e) => { e.stopPropagation(); guardarEstado(); }}
                  disabled={guardando || nuevoEstado === pedido.status}
                  style={{
                    background: "var(--primary)", color: "white", border: "none",
                    padding: "9px 24px", fontSize: "12px", letterSpacing: "1px",
                    textTransform: "uppercase", cursor: guardando || nuevoEstado === pedido.status ? "not-allowed" : "pointer",
                    opacity: guardando || nuevoEstado === pedido.status ? 0.5 : 1,
                  }}
                >
                  {guardando ? "Guardando..." : "Actualizar"}
                </button>
              </div>
            </div>

          </td>
        </tr>
      )}
    </>
  );
};

const SeccionOrdenes = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  useEffect(() => {
    fetchPedidosAdmin()
      .then((data) => { setPedidos(Array.isArray(data) ? [...data].reverse() : []); setCargando(false); })
      .catch(() => setCargando(false));
  }, []);

  const pedidosFiltrados = filtroEstado === "TODOS"
    ? pedidos
    : pedidos.filter((p) => p.status === filtroEstado);

  const handleEstadoActualizado = (actualizado) => {
    setPedidos((prev) => prev.map((p) => (p.id === actualizado.id ? { ...p, status: actualizado.status } : p)));
  };

  return (
    <>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["TODOS", ...Object.keys(ORDEN_ESTADO_LABEL)].map((est) => (
          <button
            key={est}
            onClick={() => setFiltroEstado(est)}
            style={{
              background: filtroEstado === est ? "var(--primary)" : "white",
              color: filtroEstado === est ? "white" : "var(--neutral)",
              border: "1px solid var(--border)",
              padding: "6px 16px", fontSize: "11px", letterSpacing: "1px",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {est === "TODOS" ? "Todos" : ORDEN_ESTADO_LABEL[est]}
            {est !== "TODOS" && (
              <span style={{ marginLeft: "6px", opacity: 0.7 }}>
                ({pedidos.filter((p) => p.status === est).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {cargando ? (
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px" }}>Cargando pedidos...</p>
      ) : pedidosFiltrados.length === 0 ? (
        <p style={{ color: "var(--gray)", fontSize: "14px" }}>No hay pedidos en este estado.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
              {["#", "Usuario", "Fecha", "Estado", "Total", ""].map((h) => (
                <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <FilaOrden
                key={pedido.id}
                pedido={pedido}
                onEstadoActualizado={handleEstadoActualizado}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

// ─── Admin principal ──────────────────────────────────────────────────────────

const Admin = () => {
  const [pestana, setPestana] = useState("productos");

  const tabStyle = (activa) => ({
    background: "none", border: "none", borderBottom: activa ? "2px solid var(--primary)" : "2px solid transparent",
    padding: "10px 4px", marginRight: "32px", fontSize: "13px", letterSpacing: "1.5px",
    textTransform: "uppercase", cursor: "pointer",
    color: activa ? "var(--primary)" : "var(--gray)", fontWeight: activa ? "600" : "400",
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "24px" }}>
        Panel de Administración
      </h1>

      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "32px" }}>
        <button style={tabStyle(pestana === "productos")} onClick={() => setPestana("productos")}>
          Productos
        </button>
        <button style={tabStyle(pestana === "ordenes")} onClick={() => setPestana("ordenes")}>
          Órdenes
        </button>
      </div>

      {pestana === "productos" ? <SeccionProductos /> : <SeccionOrdenes />}
    </div>
  );
};

export default Admin;
