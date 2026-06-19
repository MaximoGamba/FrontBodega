import { createSlice } from "@reduxjs/toolkit";

const adminUISlice = createSlice({
  name: "adminUI",
  initialState: {
    filtroOrdenesAdmin:  "TODOS",
    tabAdmin:            "productos",
    paginaAdmin:         1,
    productoEditandoId:  null,
    mostrarFormProducto: false,
    ordenesExpandidas:   [],
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
    toggleOrdenExpandida: (state, action) => {
      const id  = action.payload;
      const idx = state.ordenesExpandidas.indexOf(id);
      if (idx >= 0) state.ordenesExpandidas.splice(idx, 1);
      else state.ordenesExpandidas.push(id);
    },
  },
});

export const {
  setFiltroOrdenesAdmin,
  setTabAdmin, setPaginaAdmin, setProductoEditando, cerrarFormProducto,
  toggleOrdenExpandida,
} = adminUISlice.actions;
export default adminUISlice.reducer;
