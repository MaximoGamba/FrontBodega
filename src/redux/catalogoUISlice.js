import { createSlice } from "@reduxjs/toolkit";

export const PRECIO_MAX = 100000;

const FILTROS_INICIALES = {
  colorId: [], cepaId: [], azucarId: [], crianzaId: [],
  elaboracionId: [], medidaId: [], precioMin: 0, precioMax: PRECIO_MAX,
};

const catalogoUISlice = createSlice({
  name: "catalogoUI",
  initialState: {
    ordenProductos: "",
    filtros: FILTROS_INICIALES,
    busqueda: "",
    searchAbierto: false,
    ordenSale: "",
  },
  reducers: {
    setBusqueda:      (state, action) => { state.busqueda = action.payload; },
    setSearchAbierto: (state, action) => { state.searchAbierto = action.payload; },
    limpiarBusqueda:  (state) => { state.busqueda = ""; state.searchAbierto = false; },
    setOrdenProductos:(state, action) => { state.ordenProductos = action.payload; },
    toggleCheckbox: (state, action) => {
      const { campo, valor } = action.payload;
      const num = Number(valor);
      const actual = state.filtros[campo];
      if (actual.includes(num)) {
        state.filtros[campo] = actual.filter((v) => v !== num);
      } else {
        state.filtros[campo] = [...actual, num];
      }
    },
    setPrecioFiltro: (state, action) => {
      state.filtros[action.payload.campo] = action.payload.valor;
    },
    limpiarFiltros:     (state) => { state.filtros = FILTROS_INICIALES; },
    setOrdenSale: (state, action) => { state.ordenSale = action.payload; },
  },
});

export const {
  setBusqueda, setSearchAbierto, limpiarBusqueda,
  setOrdenProductos, toggleCheckbox, setPrecioFiltro, limpiarFiltros,
  setOrdenSale,
} = catalogoUISlice.actions;
export default catalogoUISlice.reducer;
