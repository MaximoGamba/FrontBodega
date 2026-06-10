import ListaResumenItems from "../shared/ListaResumenItems";

const ResumenPedido = ({ carrito, subtotal }) => (
  <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
    <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", marginBottom: "20px" }}>
      Tu pedido
    </p>
    <ListaResumenItems items={carrito} total={subtotal} />
  </div>
);

export default ResumenPedido;
