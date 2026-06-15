import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vaciarCarrito } from "./carritoSlice";
import { calcularSubtotal } from "../utils/formatters";
import { crearPedido, actualizarEstadoPedido } from "../services/pedidosService";
import { crearEnvio } from "../services/enviosService";
import { crearPago } from "../services/pagosService";

const ENVIO_INICIAL = {
  nombre: "", apellido: "", email: "", telefono: "",
  direccion: "", ciudad: "", provincia: "", codigoPostal: "",
};

const PAGO_INICIAL = {
  metodo: "tarjeta", nombreTarjeta: "", numeroTarjeta: "", vencimiento: "", cvv: "",
};

export const procesarCheckout = createAsyncThunk(
  "checkout/procesar",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { envio, pago } = getState().checkout;
    const carritoItems    = getState().carrito.items;
    const items           = carritoItems.map((i) => ({ wineId: i.id, quantity: i.cantidad }));
    const subtotal        = calcularSubtotal(carritoItems);
    let pedidoId = null;
    try {
      const orden = await crearPedido(items);
      if (!orden?.id) throw new Error("No se pudo crear el pedido");
      pedidoId = orden.id;

      try {
        await crearEnvio(pedidoId, `${envio.direccion}, ${envio.ciudad}, ${envio.provincia}`);
        await crearPago(pedidoId, subtotal, pago.metodo.toUpperCase());
        if (pago.metodo === "tarjeta") await actualizarEstadoPedido(pedidoId, "PAID");
      } catch (err) {
        try { await actualizarEstadoPedido(pedidoId, "CANCELLED"); } catch {}
        throw err;
      }

      dispatch(vaciarCarrito());
      return pedidoId;
    } catch (err) {
      return rejectWithValue(err.message ?? "Error al procesar el pedido");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    pedidoId: null,
    paso:     0,
    loading:  false,
    error:    null,
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
      state.loading  = false;
      state.error    = null;
      state.exitoso  = false;
      state.envio    = ENVIO_INICIAL;
      state.pago     = PAGO_INICIAL;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(procesarCheckout.pending,   (state) => { state.loading = true;  state.error = null; state.exitoso = false; })
      .addCase(procesarCheckout.fulfilled, (state, action) => {
        state.loading  = false;
        state.pedidoId = action.payload;
        state.exitoso  = true;
        state.paso     = 2;
      })
      .addCase(procesarCheckout.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload ?? "Error al procesar el pedido";
      });
  },
});

export const { setPaso, setEnvioField, setPagoField, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
