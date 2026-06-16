import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { procesarCheckout, setPaso, setEnvioField, setPagoField, resetCheckout } from "@/redux/checkoutSlice";
import { validarEmail, validarVencimiento } from "../utils/validators";
import { ROL_ADMIN } from "../utils/roles";
import { soloNumeros, calcularSubtotal } from "../utils/formatters";
import IndicadorPasos from "../components/checkout/IndicadorPasos";
import PasoEnvio from "../components/checkout/PasoEnvio";
import PasoPago from "../components/checkout/PasoPago";
import PasoConfirmacion from "../components/checkout/PasoConfirmacion";

const Checkout = () => {
  const dispatch = useDispatch();
  const usuario  = useSelector((state) => state.auth.usuario);
  const carrito  = useSelector((state) => state.carrito.items);
  const { paso, pedidoId, loading: enviando, error: errorBackend, envio, pago } =
    useSelector((state) => state.checkout);

  const [errorEnvio, setErrorEnvio] = useState("");
  const [errorPago,  setErrorPago]  = useState("");

  useEffect(() => { return () => { dispatch(resetCheckout()); }; }, [dispatch]);

  if (usuario?.rol === ROL_ADMIN) return <Navigate to="/" replace />;
  if (carrito.length === 0) return <Navigate to="/carrito" replace />;

  const subtotal = calcularSubtotal(carrito);

  const setE = (campo, valor) => dispatch(setEnvioField({ campo, valor }));
  const setP = (campo, valor) => dispatch(setPagoField({ campo, valor }));

  const avanzarEnvio = () => {
    const { nombre, apellido, email, telefono, direccion, ciudad, provincia, codigoPostal } = envio;
    if (!nombre || !apellido || !email || !telefono || !direccion || !ciudad || !provincia || !codigoPostal) {
      setErrorEnvio("Completá todos los campos antes de continuar."); return;
    }
    if (!validarEmail(email)) { setErrorEnvio("El email no tiene un formato válido."); return; }
    if (soloNumeros(telefono).length < 6) { setErrorEnvio("El teléfono debe tener al menos 6 dígitos."); return; }
    const cp = soloNumeros(codigoPostal);
    if (cp.length < 4 || cp.length > 8) { setErrorEnvio("El código postal debe tener entre 4 y 8 dígitos."); return; }
    setErrorEnvio("");
    dispatch(setPaso(1));
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
    dispatch(procesarCheckout());
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
          setP={setP}
          errorPago={errorPago || errorBackend}
          enviando={enviando}
          onVolver={() => dispatch(setPaso(0))}
          onConfirmar={confirmar}
          carrito={carrito}
          subtotal={subtotal}
        />
      )}

      {paso === 2 && (
        <PasoConfirmacion nombre={envio.nombre} email={envio.email} pedidoId={pedidoId} />
      )}
    </div>
  );
};

export default Checkout;
