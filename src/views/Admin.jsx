import { useDispatch, useSelector } from "react-redux";
import { setTabAdmin } from "@/redux/adminUISlice";
import SeccionProductos from "../components/admin/productos/SeccionProductos";
import SeccionOrdenes from "../components/admin/ordenes/SeccionOrdenes";

const Admin = () => {
  const dispatch = useDispatch();
  const pestana = useSelector((state) => state.adminUI.tabAdmin);

  const tabStyle = (activa) => ({
    background: "none", border: "none", borderBottom: activa ? "2px solid var(--primary)" : "2px solid transparent",
    padding: "10px 4px", marginRight: "32px", fontSize: "13px", letterSpacing: "1.5px",
    textTransform: "uppercase", cursor: "pointer",
    color: activa ? "var(--primary)" : "var(--gray)", fontWeight: activa ? "600" : "400",
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "24px" }}>
        Panel de Administración
      </h1>
      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "32px" }}>
        <button style={tabStyle(pestana === "productos")} onClick={() => dispatch(setTabAdmin("productos"))}>Productos</button>
        <button style={tabStyle(pestana === "ordenes")}  onClick={() => dispatch(setTabAdmin("ordenes"))}>Órdenes</button>
      </div>
      {pestana === "productos" ? <SeccionProductos /> : <SeccionOrdenes />}
    </div>
  );
};

export default Admin;
