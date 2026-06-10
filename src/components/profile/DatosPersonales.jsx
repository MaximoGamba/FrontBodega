import CampoEditable from "./CampoEditable";
import CambiarPassword from "./CambiarPassword";
import { labelStyle } from "../../styles/profileStyles";

const DatosPersonales = ({ perfil, cargando, userId, onGuardado, onLogout }) => (
  <div>
    <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "16px" }}>
      {cargando ? (
        <p style={{ color: "var(--gray)", fontSize: "14px" }}>Cargando datos...</p>
      ) : !perfil ? (
        <p style={{ color: "var(--primary)", fontSize: "14px" }}>
          No se pudieron cargar los datos. Cerrá sesión e ingresá nuevamente.
        </p>
      ) : (
        <>
          {[
            { label: "Usuario", valor: perfil.username },
            { label: "Email", valor: perfil.email },
          ].map(({ label, valor }) => (
            <div key={label} style={{ marginBottom: "20px" }}>
              <p style={labelStyle}>{label}</p>
              <p style={{ fontSize: "15px", margin: 0 }}>{valor || "—"}</p>
            </div>
          ))}

          <CampoEditable
            label="Nombre"
            valor={perfil.firstName}
            campo="firstName"
            userId={userId}
            onGuardado={(actualizado) => onGuardado({ firstName: actualizado.firstName })}
          />
          <CampoEditable
            label="Apellido"
            valor={perfil.lastName}
            campo="lastName"
            userId={userId}
            onGuardado={(actualizado) => onGuardado({ lastName: actualizado.lastName })}
          />

          <CambiarPassword userId={userId} />
        </>
      )}
    </div>
    <button
      onClick={onLogout}
      style={{ width: "100%", background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
    >
      Cerrar sesión
    </button>
  </div>
);

export default DatosPersonales;
