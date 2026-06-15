import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";

const BotonLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmarLogout = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Seguro que querés cerrar sesión?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                closeToast();
                dispatch(logout());
                navigate("/");
                toast.success("Sesión cerrada correctamente", { position: "top-center" });
              }}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Cerrar sesión
            </button>
            <button
              onClick={closeToast}
              style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, closeButton: false, toastId: "cerrar-sesion" }
    );
  };

  return (
    <button
      onClick={confirmarLogout}
      style={{ background: "none", border: "none", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)", cursor: "pointer", padding: 0 }}
    >
      Cerrar sesión
    </button>
  );
};

export default BotonLogout;
