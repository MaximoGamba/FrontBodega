import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsuario as fetchUsuarioAPI, actualizarUsuario as actualizarUsuarioAPI } from "../../services/api";

export const fetchUsuario = createAsyncThunk("usuarios/fetchUsuario", async (userId) => {
  const data = await fetchUsuarioAPI(userId);
  return data;
});

export const actualizarUsuario = createAsyncThunk("usuarios/actualizarUsuario", async ({ userId, datos }) => {
  const data = await actualizarUsuarioAPI(userId, datos);
  return data;
});

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    perfil: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuario.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsuario.fulfilled, (state, action) => { state.loading = false; state.perfil = action.payload; })
      .addCase(fetchUsuario.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(actualizarUsuario.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(actualizarUsuario.fulfilled, (state, action) => { state.loading = false; state.perfil = action.payload; })
      .addCase(actualizarUsuario.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default usuariosSlice.reducer;
