import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsuario, actualizarUsuario, fetchPedidosUsuario } from "../services/usuariosService";
import { logout } from "./authSlice";
import { procesarCheckout } from "./checkoutSlice";

export const getUsuario = createAsyncThunk(
  "usuario/get",
  async (userId, { rejectWithValue }) => {
    try { return await fetchUsuario(userId); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const putUsuario = createAsyncThunk(
  "usuario/put",
  async ({ userId, datos }, { rejectWithValue }) => {
    try { return await actualizarUsuario(userId, datos); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const getPedidosUsuario = createAsyncThunk(
  "usuario/getPedidos",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchPedidosUsuario(userId);
      return Array.isArray(data) ? [...data].reverse() : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    datos:                null,
    statusDatos:          "idle",
    error:                null,
    pedidos:              [],
    statusPedidos:        "idle",
    errorPedidos:         null,
    newsletterSuscripto:  false,
    emailNewsletter:      null,
  },
  reducers: {
    suscribirNewsletter: (state, action) => {
      state.newsletterSuscripto = true;
      state.emailNewsletter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsuario.pending,   (state) => { state.statusDatos = "loading"; state.error = null; })
      .addCase(getUsuario.fulfilled, (state, action) => { state.statusDatos = "succeeded"; state.datos = action.payload; })
      .addCase(getUsuario.rejected,  (state, action) => { state.statusDatos = "failed"; state.error = action.payload; })

      .addCase(putUsuario.fulfilled, (state, action) => {
        state.datos = { ...state.datos, ...action.payload };
      })

      .addCase(getPedidosUsuario.pending,   (state) => { state.statusPedidos = "loading"; })
      .addCase(getPedidosUsuario.fulfilled, (state, action) => {
        state.statusPedidos = "succeeded";
        state.pedidos = action.payload;
      })
      .addCase(getPedidosUsuario.rejected,  (state, action) => { state.statusPedidos = "failed"; state.errorPedidos = action.payload ?? "Error al cargar pedidos"; })

      .addCase(procesarCheckout.fulfilled, (state) => {
        state.statusPedidos = "idle";
      })

      .addCase(logout, (state) => {
        state.datos                = null;
        state.statusDatos          = "idle";
        state.error                = null;
        state.pedidos              = [];
        state.statusPedidos        = "idle";
        state.errorPedidos         = null;
        state.newsletterSuscripto  = false;
        state.emailNewsletter      = null;
      });
  },
});

export const { suscribirNewsletter } = usuarioSlice.actions;
export default usuarioSlice.reducer;
