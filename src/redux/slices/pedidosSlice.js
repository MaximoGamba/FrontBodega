import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  crearPedido as crearPedidoAPI,
  crearEnvio as crearEnvioAPI,
  crearPago as crearPagoAPI,
  actualizarEstadoPedido as actualizarEstadoPedidoAPI,
  fetchPedidosAdmin as fetchPedidosAdminAPI,
  fetchPedidosUsuario as fetchPedidosUsuarioAPI,
} from "../../services/api";

export const fetchPedidosAdmin = createAsyncThunk("pedidos/fetchPedidosAdmin", async () => {
  const data = await fetchPedidosAdminAPI();
  return data;
});

export const fetchPedidosUsuario = createAsyncThunk("pedidos/fetchPedidosUsuario", async (userId) => {
  const data = await fetchPedidosUsuarioAPI(userId);
  return data;
});

export const procesarCheckout = createAsyncThunk(
  "pedidos/procesarCheckout",
  async ({ carrito, subtotal, envio, pago }) => {
    const items = carrito.map((item) => ({ wineId: item.id, quantity: item.cantidad }));
    const orden = await crearPedidoAPI(items);
    if (!orden?.id) throw new Error("No se pudo crear el pedido");
    const pedidoId = orden.id;
    await crearEnvioAPI(pedidoId, `${envio.direccion}, ${envio.ciudad}, ${envio.provincia}`);
    await crearPagoAPI(pedidoId, subtotal, pago.metodo.toUpperCase());
    if (pago.metodo === "tarjeta") await actualizarEstadoPedidoAPI(pedidoId, "PAID");
    return pedidoId;
  }
);

export const actualizarEstadoPedido = createAsyncThunk(
  "pedidos/actualizarEstado",
  async ({ id, status }) => {
    const data = await actualizarEstadoPedidoAPI(id, status);
    return data;
  }
);

const pedidosSlice = createSlice({
  name: "pedidos",
  initialState: {
    pedidosAdmin: [],
    pedidosUsuario: [],
    loading: false,
    checkoutLoading: false,
    checkoutExitoso: false,
    error: null,
  },
  reducers: {
    resetCheckout(state) {
      state.checkoutExitoso = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidosAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPedidosAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidosAdmin = Array.isArray(action.payload) ? [...action.payload].reverse() : [];
      })
      .addCase(fetchPedidosAdmin.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(fetchPedidosUsuario.pending, (state) => { state.loading = true; })
      .addCase(fetchPedidosUsuario.fulfilled, (state, action) => { state.loading = false; state.pedidosUsuario = action.payload; })
      .addCase(fetchPedidosUsuario.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(procesarCheckout.pending, (state) => { state.checkoutLoading = true; state.error = null; state.checkoutExitoso = false; })
      .addCase(procesarCheckout.fulfilled, (state) => { state.checkoutLoading = false; state.checkoutExitoso = true; })
      .addCase(procesarCheckout.rejected, (state, action) => { state.checkoutLoading = false; state.error = action.error.message; })

      .addCase(actualizarEstadoPedido.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(actualizarEstadoPedido.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.pedidosAdmin.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.pedidosAdmin[idx] = { ...state.pedidosAdmin[idx], status: action.payload.status };
      })
      .addCase(actualizarEstadoPedido.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { resetCheckout } = pedidosSlice.actions;
export default pedidosSlice.reducer;
