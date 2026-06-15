import useProductoForm from "./useProductoForm";
import CamposProducto from "./CamposProducto";
import GaleriaImagenesAdmin from "./galeria/GaleriaImagenesAdmin";
import Boton from "../../shared/Boton";

const FormProducto = ({ producto = null, opciones, onGuardado, onCerrar }) => {
  const { form, errores, guardando, handleChange, handleGaleriaChange, confirmarCerrar, guardar } =
    useProductoForm({ producto, opciones, onGuardado, onCerrar });

  if (!form) {
    return (
      <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px", color: "var(--gray)", fontSize: "14px" }}>
        Cargando formulario...
      </div>
    );
  }

  const { colores, cepas, azucares, crianzas, elaboraciones, medidas } = opciones;
  const selectOpciones = [
    { label: "Color",       campo: "colorId",      opciones: colores },
    { label: "Cepa",        campo: "cepaId",        opciones: cepas },
    { label: "Azúcar",      campo: "azucarId",      opciones: azucares },
    { label: "Crianza",     campo: "crianzaId",     opciones: crianzas },
    { label: "Elaboración", campo: "elaboracionId", opciones: elaboraciones },
    { label: "Medida",      campo: "medidaId",      opciones: medidas },
  ];

  return (
    <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
        {producto ? "Editar producto" : "Nuevo producto"}
      </p>
      <CamposProducto form={form} errores={errores} handleChange={handleChange} selectOpciones={selectOpciones} />
      <GaleriaImagenesAdmin
        imagenInicial={producto?.imageUrl || producto?.imagen || ""}
        error={errores.imagen}
        onChange={handleGaleriaChange}
      />
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <Boton variante="primario" tamaño="md" disabled={guardando} onClick={guardar}>
          {guardando ? "Guardando..." : "Guardar"}
        </Boton>
        <Boton variante="secundario" tamaño="md" onClick={confirmarCerrar}>
          Cancelar
        </Boton>
      </div>
    </div>
  );
};

export default FormProducto;
