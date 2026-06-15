const PADDING = { sm: "8px 20px", md: "12px 32px", lg: "14px 40px" };
const SPACING = { sm: "1px", md: "1.5px", lg: "1.5px" };

const Boton = ({ variante = "primario", tamaño = "md", disabled, onClick, children, type = "button", title, style = {} }) => {
  const esPrimario = variante === "primario";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: esPrimario ? "var(--primary)" : "white",
        color: esPrimario ? "white" : "var(--neutral)",
        border: esPrimario ? "none" : "1px solid var(--border)",
        padding: PADDING[tamaño],
        fontSize: "12px",
        letterSpacing: SPACING[tamaño],
        textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Boton;
