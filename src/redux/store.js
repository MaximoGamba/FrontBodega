import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/es/storage";
import authReducer from "./slices/authSlice";
import carritoReducer from "./slices/carritoSlice";
import vinosReducer from "./slices/vinosSlice";
import pedidosReducer from "./slices/pedidosSlice";
import usuariosReducer from "./slices/usuariosSlice";
import catalogosReducer from "./slices/catalogosSlice";

const authPersistConfig = { key: "auth", storage, whitelist: ["usuario"] };
const carritoPersistConfig = { key: "carrito", storage, whitelist: ["items"] };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    carrito: persistReducer(carritoPersistConfig, carritoReducer),
    vinos: vinosReducer,
    pedidos: pedidosReducer,
    usuarios: usuariosReducer,
    catalogos: catalogosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
