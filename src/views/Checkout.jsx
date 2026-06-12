import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { procesarCheckout, resetCheckout } from "../redux/slices/pedidosSlice";
import { vaciarCarrito } from "../redux/slices/carritoSlice";
import { validarEmail, validarVencimiento } from "../utils/validators";
import { soloNumeros } from "../utils/formatters";
import IndicadorPasos from "../components/checkout/IndicadorPasos";
import PasoEnvio from "../components/checkout/PasoEnvio";
import PasoPago from "../components/checkout/PasoPago";
import PasoConfirmacion from "../components/checkout/PasoConfirmacion";

const Checkout = () => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito.items);
  const usuario = useSelector((state) => state.auth.usuario);
  const { checkoutLoading: enviando, checkoutExitoso, error: errorCheckout } = useSelector((state) => state.pedidos);
  const [paso, setPaso] = useState(0);
  const [envio, setEnvio] = useState({
    nombre: "", apellido: "", email: "", telefono: "",
    direccion: "", ciudad: "", provincia: "", codigoPostal: "",
  });
  const [pago, setPago] = useState({
    metodo: "tarjeta", nombreTarjeta: "", numeroTarjeta: "", vencimiento: "", cvv: "",
  });
  const [errorEnvio, setErrorEnvio] = useState("");
  const [errorPago, setErrorPago] = useState("");

  useEffect(() => {
    if (checkoutExitoso) {
      dispatch(vaciarCarrito());
      setPaso(2);
    }
  }, [checkoutExitoso, dispatch]);

  useEffect(() => {
    return () => dispatch(resetCheckout());
  }, [dispatch]);

  if (usuario?.rol === "admin") return <Navigate to="/" replace />;

  const subtotal = carrito.reduce((acc, item) => {
    const precioFinal = item.discountPercent > 0
      ? item.price * (1 - item.discountPercent / 100)
      : item.price;
    return acc + precioFinal * item.cantidad;
  }, 0);

  const setE = (campo, valor) => setEnvio((prev) => ({ ...prev, [campo]: valor }));

  const avanzarEnvio = () => {
    const { nombre, apellido, email, telefono, direccion, ciudad, provincia, codigoPostal } = envio;
    if (!nombre || !apellido || !email || !telefono || !direccion || !ciudad || !provincia || !codigoPostal) {
      setErrorEnvio("Completá todos los campos antes de continuar.");
      return;
    }
    if (!validarEmail(email)) { setErrorEnvio("El email no tiene un formato válido."); return; }
    if (soloNumeros(telefono).length < 6) { setErrorEnvio("El teléfono debe tener al menos 6 dígitos."); return; }
    const cp = soloNumeros(codigoPostal);
    if (cp.length < 4 || cp.length > 8) { setErrorEnvio("El código postal debe tener entre 4 y 8 dígitos."); return; }
    setErrorEnvio("");
    setPaso(1);
  };

  const confirmar = () => {
    if (pago.metodo === "tarjeta") {
      const { nombreTarjeta, numeroTarjeta, vencimiento, cvv } = pago;
      if (!nombreTarjeta || !numeroTarjeta || !vencimiento || !cvv) {
        setErrorPago("Completá todos los datos de la tarjeta."); return;
      }
      if (soloNumeros(numeroTarjeta).length !== 16) {
        setErrorPago("El número de tarjeta debe tener 16 dígitos."); return;
      }
      if (!validarVencimiento(vencimiento)) {
        setErrorPago("El vencimiento no es válido (formato MM/AA y fecha futura)."); return;
      }
      const cvvLen = soloNumeros(cvv).length;
      if (cvvLen < 3 || cvvLen > 4) {
        setErrorPago("El CVV debe tener 3 o 4 dígitos."); return;
      }
    }
    setErrorPago("");
    dispatch(procesarCheckout({ carrito, subtotal, envio, pago }));
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
      <IndicadorPasos paso={paso} />

      {paso === 0 && (
        <PasoEnvio
          envio={envio}
          setE={setE}
          errorEnvio={errorEnvio}
          onContinuar={avanzarEnvio}
          carrito={carrito}
          subtotal={subtotal}
        />
      )}

      {paso === 1 && (
        <PasoPago
          pago={pago}
          setPago={setPago}
          errorPago={errorPago || errorCheckout}
          enviando={enviando}
          onVolver={() => setPaso(0)}
          onConfirmar={confirmar}
          carrito={carrito}
          subtotal={subtotal}
        />
      )}

      {paso === 2 && (
        <PasoConfirmacion nombre={envio.nombre} email={envio.email} />
      )}
    </div>
  );
};

export default Checkout;
