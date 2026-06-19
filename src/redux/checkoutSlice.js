import { createSlice } from "@reduxjs/toolkit";
import { procesarCheckout } from "./pedidosSlice";

const ENVIO_INICIAL = {
  nombre: "", apellido: "", email: "", telefono: "",
  direccion: "", ciudad: "", provincia: "", codigoPostal: "",
};

const PAGO_INICIAL = {
  metodo: "tarjeta", nombreTarjeta: "", numeroTarjeta: "", vencimiento: "", cvv: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    pedidoId: null,
    paso:     0,
    exitoso:  false,
    envio:    ENVIO_INICIAL,
    pago:     PAGO_INICIAL,
  },
  reducers: {
    setPaso:       (state, action) => { state.paso = action.payload; },
    setEnvioField: (state, action) => { state.envio[action.payload.campo] = action.payload.valor; },
    setPagoField:  (state, action) => { state.pago[action.payload.campo]  = action.payload.valor; },
    resetCheckout: (state) => {
      state.pedidoId = null;
      state.paso     = 0;
      state.exitoso  = false;
      state.envio    = ENVIO_INICIAL;
      state.pago     = PAGO_INICIAL;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(procesarCheckout.fulfilled, (state, action) => {
      state.pedidoId = action.payload;
      state.exitoso  = true;
      state.paso     = 2;
    });
  },
});

export const { setPaso, setEnvioField, setPagoField, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
