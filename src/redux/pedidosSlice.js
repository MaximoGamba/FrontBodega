import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPedidosAdmin, actualizarEstadoPedido } from "../services/pedidosService";
import { logout } from "./authSlice";

// ─── Adapter (pedidos admin) ─────────────────────────────────────────────────
const pedidosAdapter = createEntityAdapter();

export const { selectAll: selectAllPedidos, selectById: selectPedidoById } =
  pedidosAdapter.getSelectors((state) => state.pedidos);

// ─── Thunks ──────────────────────────────────────────────────────────────────
export const getPedidosAdmin = createAsyncThunk(
  "pedidos/getAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPedidosAdmin();
      return Array.isArray(data) ? [...data].reverse() : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const putEstadoPedido = createAsyncThunk(
  "pedidos/putEstado",
  async ({ id, status }, { rejectWithValue }) => {
    try { return await actualizarEstadoPedido(id, status); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────
const pedidosSlice = createSlice({
  name: "pedidos",
  initialState: pedidosAdapter.getInitialState({ status: "idle", error: null, statusAt: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPedidosAdmin.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(getPedidosAdmin.fulfilled, (state, action) => {
        state.status   = "succeeded";
        state.statusAt = Date.now();
        pedidosAdapter.setAll(state, action.payload);
      })
      .addCase(getPedidosAdmin.rejected,  (state, action) => { state.status = "failed"; state.error = action.payload; })

      .addCase(putEstadoPedido.fulfilled, (state, action) => {
        pedidosAdapter.updateOne(state, { id: action.payload.id, changes: { status: action.payload.status } });
      })

      .addCase(logout, (state) => {
        pedidosAdapter.removeAll(state);
        state.status = "idle";
        state.error  = null;
      });
  },
});

export default pedidosSlice.reducer;
