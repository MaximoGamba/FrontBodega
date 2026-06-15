import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {
  fetchVinos, fetchVinosAdmin, fetchVinoById,
  crearVino, actualizarVino, desactivarVinoAPI, reactivarVinoAPI,
} from "../services/vinosService";
import { ordenarProductos } from "../utils/productosSort";
import { calcularPrecioFinal } from "../utils/formatters";

// ─── Adapters ────────────────────────────────────────────────────────────────
const vinosPublicAdapter = createEntityAdapter();
const vinosAdminAdapter  = createEntityAdapter();

// ─── Selectores de colección ─────────────────────────────────────────────────
export const { selectAll: selectAllVinos, selectById: selectVinoById } =
  vinosPublicAdapter.getSelectors((state) => state.vinos.public);

export const { selectAll: selectAllVinosAdmin, selectById: selectVinoAdminById } =
  vinosAdminAdapter.getSelectors((state) => state.vinos.admin);

// ─── Selector memoizado: filtrado + ordenado del catálogo ────────────────────
export const selectVinosFiltrados = createSelector(
  [
    selectAllVinos,
    (state) => state.catalogoUI.filtros,
    (state) => state.catalogoUI.ordenProductos,
    (_, busqueda) => busqueda,
  ],
  (vinos, filtros, orden, busqueda) => {
    const filtrados = vinos.filter((p) => {
      if (busqueda) {
        const q = busqueda.toLowerCase();
        const coincide = [
          p.name, p.winery, p.colorNombre, p.cepaNombre,
          p.azucarNombre, p.crianzaNombre, p.elaboracionNombre,
          p.medidaNombre, String(p.year),
        ].some((c) => c?.toLowerCase().includes(q));
        if (!coincide) return false;
      }
      if (filtros.colorId.length       && !filtros.colorId.includes(p.colorId))             return false;
      if (filtros.cepaId.length        && !filtros.cepaId.includes(p.cepaId))               return false;
      if (filtros.azucarId.length      && !filtros.azucarId.includes(p.azucarId))           return false;
      if (filtros.crianzaId.length     && !filtros.crianzaId.includes(p.crianzaId))         return false;
      if (filtros.elaboracionId.length && !filtros.elaboracionId.includes(p.elaboracionId)) return false;
      if (filtros.medidaId.length      && !filtros.medidaId.includes(p.medidaId))           return false;
      const precioFinal = calcularPrecioFinal(p.price, p.discountPercent);
      if (precioFinal < filtros.precioMin || precioFinal > filtros.precioMax) return false;
      return true;
    });
    return ordenarProductos(filtrados, orden);
  }
);

// ─── Thunks ──────────────────────────────────────────────────────────────────
export const getVinos = createAsyncThunk(
  "vinos/getAll",
  async (_, { rejectWithValue }) => {
    try { return await fetchVinos(); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const getVinosAdmin = createAsyncThunk(
  "vinos/getAllAdmin",
  async (_, { rejectWithValue }) => {
    try { return await fetchVinosAdmin(); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const getVinoById = createAsyncThunk(
  "vinos/getById",
  async (id, { rejectWithValue }) => {
    try { return await fetchVinoById(id); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const postVino = createAsyncThunk(
  "vinos/post",
  async (datos, { rejectWithValue }) => {
    try { return await crearVino(datos); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const putVino = createAsyncThunk(
  "vinos/put",
  async ({ id, datos }, { rejectWithValue }) => {
    try { return await actualizarVino(id, datos); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const desactivarVino = createAsyncThunk(
  "vinos/desactivar",
  async (id, { rejectWithValue }) => {
    try { await desactivarVinoAPI(id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const reactivarVino = createAsyncThunk(
  "vinos/reactivar",
  async (id, { rejectWithValue }) => {
    try { await reactivarVinoAPI(id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────
const vinosSlice = createSlice({
  name: "vinos",
  initialState: {
    public:        vinosPublicAdapter.getInitialState({ status: "idle", error: null, statusAt: null }),
    admin:         vinosAdminAdapter.getInitialState({ status: "idle", error: null, statusAt: null }),
    loadingActual: false,
    errorActual:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVinos.pending,   (state) => { state.public.status = "loading"; state.public.error = null; })
      .addCase(getVinos.fulfilled, (state, action) => {
        state.public.status   = "succeeded";
        state.public.statusAt = Date.now();
        vinosPublicAdapter.setAll(state.public, action.payload);
      })
      .addCase(getVinos.rejected,  (state, action) => { state.public.status = "failed"; state.public.error = action.payload; })

      .addCase(getVinosAdmin.pending,   (state) => { state.admin.status = "loading"; state.admin.error = null; })
      .addCase(getVinosAdmin.fulfilled, (state, action) => {
        state.admin.status   = "succeeded";
        state.admin.statusAt = Date.now();
        vinosAdminAdapter.setAll(state.admin, action.payload);
      })
      .addCase(getVinosAdmin.rejected,  (state, action) => { state.admin.status = "failed"; state.admin.error = action.payload; })

      .addCase(getVinoById.pending,   (state) => { state.loadingActual = true;  state.errorActual = null; })
      .addCase(getVinoById.fulfilled, (state, action) => {
        state.loadingActual = false;
        vinosPublicAdapter.upsertOne(state.public, action.payload);
      })
      .addCase(getVinoById.rejected,  (state, action) => { state.loadingActual = false; state.errorActual = action.payload; })

      .addCase(postVino.fulfilled, (state, action) => {
        vinosAdminAdapter.addOne(state.admin, action.payload);
        if (action.payload.active !== false) {
          vinosPublicAdapter.addOne(state.public, action.payload);
        }
      })

      .addCase(putVino.fulfilled, (state, action) => {
        vinosAdminAdapter.upsertOne(state.admin, action.payload);
        if (action.payload.active !== false) {
          vinosPublicAdapter.upsertOne(state.public, action.payload);
        } else {
          vinosPublicAdapter.removeOne(state.public, action.payload.id);
        }
      })

      .addCase(desactivarVino.fulfilled, (state, action) => {
        vinosAdminAdapter.updateOne(state.admin, { id: action.payload, changes: { active: false } });
        vinosPublicAdapter.removeOne(state.public, action.payload);
      })

      .addCase(reactivarVino.fulfilled, (state, action) => {
        vinosAdminAdapter.updateOne(state.admin, { id: action.payload, changes: { active: true } });
        const vino = state.admin.entities[action.payload];
        if (vino) vinosPublicAdapter.upsertOne(state.public, { ...vino, active: true });
      });
  },
});

export default vinosSlice.reducer;
