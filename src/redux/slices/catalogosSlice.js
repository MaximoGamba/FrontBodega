import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchColores, fetchCepas, fetchAzucares, fetchCrianzas, fetchElaboraciones, fetchMedidas } from "../../services/api";

export const fetchCatalogos = createAsyncThunk("catalogos/fetchCatalogos", async () => {
  const [colores, cepas, azucares, crianzas, elaboraciones, medidas] = await Promise.all([
    fetchColores(), fetchCepas(), fetchAzucares(), fetchCrianzas(), fetchElaboraciones(), fetchMedidas(),
  ]);
  return { colores, cepas, azucares, crianzas, elaboraciones, medidas };
});

const catalogosSlice = createSlice({
  name: "catalogos",
  initialState: {
    colores: [], cepas: [], azucares: [], crianzas: [], elaboraciones: [], medidas: [],
    loading: false, error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogos.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCatalogos.fulfilled, (state, action) => {
        state.loading = false;
        const { colores, cepas, azucares, crianzas, elaboraciones, medidas } = action.payload;
        state.colores = colores; state.cepas = cepas; state.azucares = azucares;
        state.crianzas = crianzas; state.elaboraciones = elaboraciones; state.medidas = medidas;
      })
      .addCase(fetchCatalogos.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default catalogosSlice.reducer;
