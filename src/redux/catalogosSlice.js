import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchColores, fetchCepas, fetchAzucares, fetchCrianzas, fetchElaboraciones, fetchMedidas } from "../services/catalogosService";

export const getCatalogos = createAsyncThunk(
  "catalogos/getAll",
  (_, { rejectWithValue }) =>
    Promise.all([
      fetchColores(),
      fetchCepas(),
      fetchAzucares(),
      fetchCrianzas(),
      fetchElaboraciones(),
      fetchMedidas(),
    ])
      .then(([colores, cepas, azucares, crianzas, elaboraciones, medidas]) => ({
        colores, cepas, azucares, crianzas, elaboraciones, medidas,
      }))
      .catch((err) => rejectWithValue(err.message))
);

const catalogosSlice = createSlice({
  name: "catalogos",
  initialState: {
    colores:      [],
    cepas:        [],
    azucares:     [],
    crianzas:     [],
    elaboraciones:[],
    medidas:      [],
    status:   "idle",
    error:    null,
    statusAt: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogos.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(getCatalogos.fulfilled, (state, action) => {
        state.status   = "succeeded";
        state.statusAt = Date.now();
        Object.assign(state, action.payload);
      })
      .addCase(getCatalogos.rejected,  (state, action) => { state.status = "failed"; state.error = action.payload ?? "Error al cargar catálogos"; });
  },
});

export default catalogosSlice.reducer;
