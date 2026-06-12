import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchVinos as fetchVinosAPI,
  fetchVinosAdmin as fetchVinosAdminAPI,
  fetchVino as fetchVinoAPI,
  crearVino as crearVinoAPI,
  actualizarVino as actualizarVinoAPI,
  desactivarVinoAPI,
  reactivarVinoAPI,
} from "../../services/api";

export const fetchVinos = createAsyncThunk("vinos/fetchVinos", async () => {
  const data = await fetchVinosAPI();
  return data;
});

export const fetchVinosAdmin = createAsyncThunk("vinos/fetchVinosAdmin", async () => {
  const data = await fetchVinosAdminAPI();
  return data;
});

export const fetchVino = createAsyncThunk("vinos/fetchVino", async (id) => {
  const data = await fetchVinoAPI(id);
  return data;
});

export const crearVino = createAsyncThunk("vinos/crearVino", async (datos) => {
  const data = await crearVinoAPI(datos);
  return data;
});

export const actualizarVino = createAsyncThunk("vinos/actualizarVino", async ({ id, datos }) => {
  const data = await actualizarVinoAPI(id, datos);
  return data;
});

export const desactivarVino = createAsyncThunk("vinos/desactivarVino", async (id) => {
  await desactivarVinoAPI(id);
  return id;
});

export const reactivarVino = createAsyncThunk("vinos/reactivarVino", async (id) => {
  await reactivarVinoAPI(id);
  return id;
});

const vinosSlice = createSlice({
  name: "vinos",
  initialState: {
    items: [],
    itemsAdmin: [],
    detalle: null,
    loading: false,
    error: null,
  },
  reducers: {
    limpiarDetalle(state) { state.detalle = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVinos.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchVinos.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchVinos.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(fetchVinosAdmin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchVinosAdmin.fulfilled, (state, action) => { state.loading = false; state.itemsAdmin = action.payload; })
      .addCase(fetchVinosAdmin.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(fetchVino.pending, (state) => { state.loading = true; state.error = null; state.detalle = null; })
      .addCase(fetchVino.fulfilled, (state, action) => { state.loading = false; state.detalle = action.payload; })
      .addCase(fetchVino.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(crearVino.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(crearVino.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsAdmin = [...state.itemsAdmin, action.payload];
      })
      .addCase(crearVino.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(actualizarVino.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(actualizarVino.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.itemsAdmin.findIndex((v) => v.id === action.payload.id);
        if (idx !== -1) state.itemsAdmin[idx] = action.payload;
      })
      .addCase(actualizarVino.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(desactivarVino.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(desactivarVino.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.itemsAdmin.findIndex((v) => v.id === action.payload);
        if (idx !== -1) state.itemsAdmin[idx].active = false;
      })
      .addCase(desactivarVino.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(reactivarVino.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(reactivarVino.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.itemsAdmin.findIndex((v) => v.id === action.payload);
        if (idx !== -1) state.itemsAdmin[idx].active = true;
      })
      .addCase(reactivarVino.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { limpiarDetalle } = vinosSlice.actions;
export default vinosSlice.reducer;
