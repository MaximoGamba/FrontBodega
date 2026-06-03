import FiltroCheckbox from "./FiltroCheckbox";
import FiltroRangoPrecio from "./FiltroRangoPrecio";

const GRUPOS = [
  { label: "Color",       campo: "colorId" },
  { label: "Cepa",        campo: "cepaId" },
  { label: "Azúcar",      campo: "azucarId" },
  { label: "Crianza",     campo: "crianzaId" },
  { label: "Elaboración", campo: "elaboracionId" },
  { label: "Medida",      campo: "medidaId" },
];

const FiltrosProductos = ({ filtros, catalogos, onCheckbox, onPrecio, onLimpiar }) => (
  <aside style={{ width: "260px", minWidth: "260px", borderRight: "1px solid var(--border)", padding: "32px 24px" }}>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "24px" }}>
      Filtrar por
    </p>

    {GRUPOS.map(({ label, campo }) => (
      <FiltroCheckbox
        key={campo}
        label={label}
        campo={campo}
        opciones={catalogos[campo] || []}
        filtros={filtros}
        onCheckbox={onCheckbox}
      />
    ))}

    <FiltroRangoPrecio
      precioMin={filtros.precioMin}
      precioMax={filtros.precioMax}
      onChange={onPrecio}
    />

    <button
      onClick={onLimpiar}
      style={{ width: "100%", background: "var(--primary)", color: "white", border: "none", padding: "12px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
    >
      Limpiar filtros
    </button>
  </aside>
);

export default FiltrosProductos;
