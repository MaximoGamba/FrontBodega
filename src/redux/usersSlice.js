import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registrarAPI } from "../services/authService";
import { fetchUsuario, actualizarUsuario } from "../services/usuariosService";

// ─── Auth thunks ─────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
  "users/login",
  ({ username, password }, { rejectWithValue }) =>
    loginAPI({ username, password })
      .then((data) => {
        if (!data?.access_token) return rejectWithValue("Credenciales inválidas");
        return {
          token:   data.access_token,
          usuario: { id: data.user_id, rol: (data.role || "USER").toLowerCase() },
        };
      })
      .catch((err) => rejectWithValue(err.message))
);

export const registrarThunk = createAsyncThunk(
  "users/registrar",
  ({ firstname, lastname, email, username, password }, { rejectWithValue }) =>
    registrarAPI({ firstname, lastname, email, username, password })
      .then((data) => {
        if (!data?.access_token) return rejectWithValue("Error al registrarse");
        return {
          token:   data.access_token,
          usuario: { id: data.user_id, rol: (data.role || "USER").toLowerCase() },
        };
      })
      .catch((err) => rejectWithValue(err.message))
);

// ─── Perfil thunks ────────────────────────────────────────────────────────────
export const getUsuario = createAsyncThunk(
  "users/get",
  (userId, { rejectWithValue }) =>
    fetchUsuario(userId).catch((err) => rejectWithValue(err.message))
);

export const putUsuario = createAsyncThunk(
  "users/put",
  ({ userId, datos }, { rejectWithValue }) =>
    actualizarUsuario(userId, datos).catch((err) => rejectWithValue(err.message))
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const usersSlice = createSlice({
  name: "users",
  initialState: {
    // Auth (sesión JWT)
    usuario:     null,    // { id, rol }
    token:       null,
    loadingAuth: false,
    errorAuth:   null,
    // Perfil completo
    datos:               null,
    statusDatos:         "idle",
    statusAt:            null,
    errorDatos:          null,
    newsletterSuscripto: false,
    loadingMutacion:     false,
    errorMutacion:       null,
  },
  reducers: {
    logout: (state) => {
      state.usuario            = null;
      state.token              = null;
      state.loadingAuth        = false;
      state.errorAuth          = null;
      state.datos              = null;
      state.statusDatos        = "idle";
      state.statusAt           = null;
      state.errorDatos         = null;
      state.newsletterSuscripto = false;
      state.loadingMutacion    = false;
      state.errorMutacion      = null;
    },
    limpiarError:        (state) => { state.errorAuth = null; },
    suscribirNewsletter: (state) => { state.newsletterSuscripto = true; },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginThunk.pending,   (state) => { state.loadingAuth = true;  state.errorAuth = null; })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.token       = action.payload.token;
        state.usuario     = action.payload.usuario;
      })
      .addCase(loginThunk.rejected,  (state, action) => { state.loadingAuth = false; state.errorAuth = action.payload ?? "Error al iniciar sesión"; })

      // registrar
      .addCase(registrarThunk.pending,   (state) => { state.loadingAuth = true;  state.errorAuth = null; })
      .addCase(registrarThunk.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.token       = action.payload.token;
        state.usuario     = action.payload.usuario;
      })
      .addCase(registrarThunk.rejected,  (state, action) => { state.loadingAuth = false; state.errorAuth = action.payload ?? "Error al registrarse"; })

      // getUsuario
      .addCase(getUsuario.pending,   (state) => { state.statusDatos = "loading"; state.errorDatos = null; })
      .addCase(getUsuario.fulfilled, (state, action) => { state.statusDatos = "succeeded"; state.statusAt = Date.now(); state.datos = action.payload; })
      .addCase(getUsuario.rejected,  (state, action) => { state.statusDatos = "failed"; state.errorDatos = action.payload; })

      // putUsuario
      .addCase(putUsuario.pending,   (state) => { state.loadingMutacion = true;  state.errorMutacion = null; })
      .addCase(putUsuario.fulfilled, (state, action) => {
        state.loadingMutacion = false;
        state.datos = { ...state.datos, ...action.payload };
      })
      .addCase(putUsuario.rejected,  (state, action) => { state.loadingMutacion = false; state.errorMutacion = action.payload; });
  },
});

export const { logout, limpiarError, suscribirNewsletter } = usersSlice.actions;
export default usersSlice.reducer;
