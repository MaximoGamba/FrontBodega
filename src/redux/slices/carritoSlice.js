import { createSlice } from "@reduxjs/toolkit";

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    items: [],
  },
  reducers: {
    agregarItem(state, action) {
      const { producto, cantidad = 1 } = action.payload;
      const existe = state.items.find((i) => i.id === producto.id);
      if (existe) {
        const nueva = Math.min(existe.cantidad + cantidad, producto.stock);
        if (nueva !== existe.cantidad) existe.cantidad = nueva;
      } else {
        state.items.push({ ...producto, cantidad: Math.min(cantidad, producto.stock) });
      }
    },
    quitarItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    cambiarCantidad(state, action) {
      const { id, delta } = action.payload;
      state.items = state.items
        .map((item) => {
          if (item.id !== id) return item;
          const nueva = item.cantidad + delta;
          if (nueva > item.stock) return item;
          return { ...item, cantidad: nueva };
        })
        .filter((item) => item.cantidad > 0);
    },
    vaciarCarrito(state) {
      state.items = [];
    },
    limpiarCarritoAlLogout(state) {
      state.items = [];
    },
  },
});

export const { agregarItem, quitarItem, cambiarCantidad, vaciarCarrito, limpiarCarritoAlLogout } = carritoSlice.actions;
export default carritoSlice.reducer;
