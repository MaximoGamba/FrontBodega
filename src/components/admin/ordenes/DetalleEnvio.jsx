import { labelStyle } from "../../../styles/adminStyles";
import { ENVIO_ESTADO_LABEL } from "../../../utils/pedidoUtils";

const DetalleEnvio = ({ shipment }) => (
  <div>
    <p style={{ ...labelStyle, marginBottom: "12px" }}>Envío</p>
    {shipment ? (
      <>
        <p style={{ fontSize: "13px", marginBottom: "8px", lineHeight: "1.5" }}>{shipment.address}</p>
        <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
          Estado:{" "}
          <strong style={{ color: shipment.status === "DELIVERED" ? "#2d7a2d" : shipment.status === "CANCELLED" ? "#c0392b" : "var(--neutral)" }}>
            {ENVIO_ESTADO_LABEL[shipment.status] || shipment.status}
          </strong>
        </p>
        {shipment.trackingNumber && (
          <p style={{ fontSize: "12px", color: "var(--gray)" }}>
            Tracking: <strong>{shipment.trackingNumber}</strong>
          </p>
        )}
      </>
    ) : (
      <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin dirección de envío</p>
    )}
  </div>
);

export default DetalleEnvio;
