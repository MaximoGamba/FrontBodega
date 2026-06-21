import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPedidosAdmin, crearPedido, actualizarEstadoPedido } from "../services/pedidosService";
import { fetchPedidosUsuario } from "../services/usuariosService";
import { crearEnvio } from "../services/enviosService";
import { crearPago } from "../services/pagosService";
import { calcularSubtotal } from "../utils/formatters";
import { vaciarCarrito } from "./carritoSlice";
import { logout } from "./usersSlice";

// ─── Adapter (vista admin) ────────────────────────────────────────────────────
const pedidosAdapter = createEntityAdapter();

export const { selectAll: selectAllPedidos, selectById: selectPedidoById } =
  pedidosAdapter.getSelectors((state) => state.pedidos.admin);

// ─── Thunks admin ─────────────────────────────────────────────────────────────
export const getPedidosAdmin = createAsyncThunk(
  "pedidos/getAdmin",
  (_, { rejectWithValue }) =>
    fetchPedidosAdmin()
      .then((data) => Array.isArray(data) ? [...data].reverse() : [])
      .catch((err) => rejectWithValue(err.message))
);

export const putEstadoPedido = createAsyncThunk(
  "pedidos/putEstado",
  ({ id, status }, { rejectWithValue }) =>
    actualizarEstadoPedido(id, status)
      .then(() => ({ id, status }))
      .catch((err) => rejectWithValue(err.message))
);

// ─── Thunk propios (vista usuario) ────────────────────────────────────────────
export const getPedidosUsuario = createAsyncThunk(
  "pedidos/getPropios",
  (userId, { rejectWithValue }) =>
    fetchPedidosUsuario(userId)
      .then((data) => Array.isArray(data) ? [...data].reverse() : [])
      .catch((err) => rejectWithValue(err.message))
);

// ─── Thunk creación (checkout) ────────────────────────────────────────────────
export const procesarCheckout = createAsyncThunk(
  "pedidos/procesar",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { envio, pago } = getState().checkout;
    const carritoItems    = getState().carrito.items;
    const items           = carritoItems.map((i) => ({ wineId: i.id, quantity: i.cantidad }));
    const subtotal        = calcularSubtotal(carritoItems);

    // Fase 1: crear pedido
    let pedidoId;
    try {
      const orden = await crearPedido(items);
      if (!orden?.id) return rejectWithValue({ message: "No se pudo crear el pedido", pedidoId: null });
      pedidoId = orden.id;
    } catch (err) {
      return rejectWithValue({ message: err.message ?? "Error al procesar el pedido", pedidoId: null });
    }

    // Fase 2: envío + pago (con cancelación best-effort si fallan)
    try {
      await crearEnvio(pedidoId, `${envio.direccion}, ${envio.ciudad}, ${envio.provincia}`);
      await crearPago(pedidoId, subtotal, pago.metodo.toUpperCase());
      if (pago.metodo === "tarjeta") await actualizarEstadoPedido(pedidoId, "PAID");
    } catch (err) {
      let rollbackFallido = false;
      await actualizarEstadoPedido(pedidoId, "CANCELLED").catch(() => { rollbackFallido = true; });
      return rejectWithValue({
        message:  err.message ?? "Error al procesar el pedido",
        pedidoId: rollbackFallido ? pedidoId : null,
      });
    }

    dispatch(vaciarCarrito());
    return pedidoId;
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const pedidosSlice = createSlice({
  name: "pedidos",
  initialState: {
    admin: pedidosAdapter.getInitialState({
      status:          "idle",
      error:           null,
      statusAt:        null,
      loadingMutacion: false,
      errorMutacion:   null,
    }),
    propios: {
      items:  [],
      status: "idle",
      error:  null,
    },
    creacion: {
      loading:         false,
      error:           null,
      pedidoIdFallido: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ── admin ──────────────────────────────────────────────────────────────
      .addCase(getPedidosAdmin.pending,   (state) => { state.admin.status = "loading"; state.admin.error = null; })
      .addCase(getPedidosAdmin.fulfilled, (state, action) => {
        state.admin.status   = "succeeded";
        state.admin.statusAt = Date.now();
        pedidosAdapter.setAll(state.admin, action.payload);
      })
      .addCase(getPedidosAdmin.rejected,  (state, action) => { state.admin.status = "failed"; state.admin.error = action.payload; })

      .addCase(putEstadoPedido.pending,   (state) => { state.admin.loadingMutacion = true;  state.admin.errorMutacion = null; })
      .addCase(putEstadoPedido.fulfilled, (state, action) => {
        state.admin.loadingMutacion = false;
        pedidosAdapter.updateOne(state.admin, { id: action.payload.id, changes: { status: action.payload.status } });
      })
      .addCase(putEstadoPedido.rejected,  (state, action) => { state.admin.loadingMutacion = false; state.admin.errorMutacion = action.payload; })

      // ── propios ────────────────────────────────────────────────────────────
      .addCase(getPedidosUsuario.pending,   (state) => { state.propios.status = "loading"; state.propios.error = null; })
      .addCase(getPedidosUsuario.fulfilled, (state, action) => { state.propios.status = "succeeded"; state.propios.items = action.payload; })
      .addCase(getPedidosUsuario.rejected,  (state, action) => { state.propios.status = "failed"; state.propios.error = action.payload ?? "Error al cargar pedidos"; })

      // ── creacion ───────────────────────────────────────────────────────────
      .addCase(procesarCheckout.pending,   (state) => { state.creacion.loading = true;  state.creacion.error = null; state.creacion.pedidoIdFallido = null; })
      .addCase(procesarCheckout.fulfilled, (state) => {
        state.creacion.loading         = false;
        state.creacion.pedidoIdFallido = null;
        state.propios.status           = "idle"; // invalidar para que se refetchee el historial
      })
      .addCase(procesarCheckout.rejected,  (state, action) => {
        const { message, pedidoId } = action.payload ?? {};
        state.creacion.loading         = false;
        state.creacion.error           = message ?? "Error al procesar el pedido";
        state.creacion.pedidoIdFallido = pedidoId ?? null;
      })

      // ── logout ─────────────────────────────────────────────────────────────
      .addCase(logout, (state) => {
        pedidosAdapter.removeAll(state.admin);
        state.admin.status          = "idle";
        state.admin.error           = null;
        state.admin.loadingMutacion = false;
        state.admin.errorMutacion   = null;
        state.propios.items         = [];
        state.propios.status        = "idle";
        state.propios.error         = null;
        state.creacion.loading         = false;
        state.creacion.error           = null;
        state.creacion.pedidoIdFallido = null;
      });
  },
});

export default pedidosSlice.reducer;
