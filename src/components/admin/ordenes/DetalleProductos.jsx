import { labelStyle } from "../adminConstants";

const DetalleProductos = ({ items, total }) => (
  <div>
    <p style={{ ...labelStyle, marginBottom: "12px" }}>Productos</p>
    {items?.length > 0 ? items.map((item) => (
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
      <span>${Number(total).toLocaleString()}</span>
    </div>
  </div>
);

export default DetalleProductos;
