import { calcularPrecioFinal } from "../../utils/formatters";

const ListaResumenItems = ({ items, total }) => (
  <>
    {items.map((item) => (
      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px", color: "var(--gray)" }}>
        <span>{item.name} × {item.cantidad}</span>
        <span>${(calcularPrecioFinal(item.price, item.discountPercent) * item.cantidad).toLocaleString()}</span>
      </div>
    ))}
    <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontWeight: "600", fontSize: "16px" }}>
      <span>Total</span>
      <span>${total.toLocaleString()}</span>
    </div>
  </>
);

export default ListaResumenItems;
