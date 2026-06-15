import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registrarAPI } from "../services/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await loginAPI({ username, password });
      if (!data?.access_token) return rejectWithValue("Credenciales inválidas");
      return {
        token: data.access_token,
        usuario: {
          id:      data.user_id,
          username,
          nombre:  username,
          rol:     (data.role || "USER").toLowerCase(),
        },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registrarThunk = createAsyncThunk(
  "auth/registrar",
  async ({ firstname, lastname, email, username, password }, { rejectWithValue }) => {
    try {
      const data = await registrarAPI({ firstname, lastname, email, username, password });
      if (!data?.access_token) return rejectWithValue("Error al registrarse");
      return {
        token: data.access_token,
        usuario: {
          id:      data.user_id,
          username,
          nombre:  firstname,
          rol:     (data.role || "USER").toLowerCase(),
        },
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: null,
    token:   null,
    loading: false,
    error:   null,
  },
  reducers: {
    logout:       (state) => { state.usuario = null; state.token = null; state.loading = false; state.error = null; },
    limpiarError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token   = action.payload.token;
        state.usuario = action.payload.usuario;
      })
      .addCase(loginThunk.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? "Error al iniciar sesión"; })

      .addCase(registrarThunk.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(registrarThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token   = action.payload.token;
        state.usuario = action.payload.usuario;
      })
      .addCase(registrarThunk.rejected,  (state, action) => { state.loading = false; state.error = action.payload ?? "Error al registrarse"; });
  },
});

export const { logout, limpiarError } = authSlice.actions;
export default authSlice.reducer;
