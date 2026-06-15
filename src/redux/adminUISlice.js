import { createSlice } from "@reduxjs/toolkit";

const adminUISlice = createSlice({
  name: "adminUI",
  initialState: {
    filtroOrdenesAdmin:  "TODOS",
    tabAdmin:            "productos",
    paginaAdmin:         1,
    productoEditandoId:  null,
    mostrarFormProducto: false,
  },
  reducers: {
    setFiltroOrdenesAdmin: (state, action) => { state.filtroOrdenesAdmin = action.payload; },
    setTabAdmin:    (state, action) => { state.tabAdmin = action.payload; },
    setPaginaAdmin: (state, action) => { state.paginaAdmin = action.payload; },
    setProductoEditando: (state, action) => {
      state.productoEditandoId  = action.payload ?? null;
      state.mostrarFormProducto = true;
    },
    cerrarFormProducto: (state) => {
      state.mostrarFormProducto = false;
      state.productoEditandoId  = null;
    },
  },
});

export const {
  setFiltroOrdenesAdmin,
  setTabAdmin, setPaginaAdmin, setProductoEditando, cerrarFormProducto,
} = adminUISlice.actions;
export default adminUISlice.reducer;
