import { labelStyle } from "../adminConstants";

const PAGO_METODO_LABEL = {
  TARJETA: "Tarjeta",
  TRANSFERENCIA: "Transferencia",
};

const DetallePago = ({ payment }) => (
  <div>
    <p style={{ ...labelStyle, marginBottom: "12px" }}>Pago</p>
    {payment ? (
      <>
        <p style={{ fontSize: "13px", fontWeight: "600", margin: "0 0 4px" }}>
          ${Number(payment.amount).toLocaleString()}
        </p>
        {payment.method && (
          <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
            Método: <strong>{PAGO_METODO_LABEL[payment.method] || payment.method}</strong>
          </p>
        )}
        {payment.createdAt && (
          <p style={{ fontSize: "12px", color: "var(--gray)" }}>
            {new Date(payment.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </>
    ) : (
      <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin pago registrado</p>
    )}
  </div>
);

export default DetallePago;
