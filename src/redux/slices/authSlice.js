import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registrarAPI } from "../../services/api";

export const loginThunk = createAsyncThunk("auth/login", async ({ username, password }) => {
  const data = await loginAPI(username, password);
  if (!data?.access_token) throw new Error("Credenciales inválidas");
  localStorage.setItem("token", data.access_token);
  return {
    id: data.user_id,
    username,
    nombre: username,
    rol: (data.role || "USER").toLowerCase(),
  };
});

export const registrarThunk = createAsyncThunk("auth/registrar", async (datos) => {
  const data = await registrarAPI(datos);
  if (!data?.access_token) throw new Error("Error al registrar");
  localStorage.setItem("token", data.access_token);
  return {
    id: data.user_id,
    username: datos.username,
    nombre: datos.firstname,
    rol: (data.role || "USER").toLowerCase(),
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.usuario = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    limpiarErrorAuth(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginThunk.fulfilled, (state, action) => { state.loading = false; state.usuario = action.payload; })
      .addCase(loginThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(registrarThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registrarThunk.fulfilled, (state, action) => { state.loading = false; state.usuario = action.payload; })
      .addCase(registrarThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { logout, limpiarErrorAuth } = authSlice.actions;
export default authSlice.reducer;
