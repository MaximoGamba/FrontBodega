import { LuTruck, LuCreditCard, LuMessageCircle } from "react-icons/lu";

const SERVICIOS = [
  { icono: <LuTruck size={40} strokeWidth={1} />,        titulo: "Métodos de envío", texto: "Hacemos envíos a todo el país" },
  { icono: <LuCreditCard size={40} strokeWidth={1} />,   titulo: "Métodos de pago",  texto: "3 cuotas sin interés" },
  { icono: <LuMessageCircle size={40} strokeWidth={1} />, titulo: "Escribínos",       texto: "Atención personalizada por Whatsapp" },
];

const ServiciosSection = () => (
  <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px 40px" }}>
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px", textAlign: "center" }}>
      {SERVICIOS.map(({ icono, titulo, texto }) => (
        <div key={titulo}>
          <div style={{ color: "var(--gray)", marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            {icono}
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--neutral)", marginBottom: "8px" }}>{titulo}</p>
          <p style={{ fontSize: "14px", color: "var(--gray)", lineHeight: "1.6" }}>{texto}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServiciosSection;
