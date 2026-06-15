import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import carritoReducer from "./carritoSlice";
import vinosReducer from "./vinosSlice";
import catalogosReducer from "./catalogosSlice";
import pedidosReducer from "./pedidosSlice";
import usuarioReducer from "./usuarioSlice";
import checkoutReducer from "./checkoutSlice";
import catalogoUIReducer from "./catalogoUISlice";
import adminUIReducer from "./adminUISlice";
import galeriaReducer from "./galeriaSlice";

const authPersistConfig    = { key: "auth",    storage, whitelist: ["usuario", "token"] };
const carritoPersistConfig = { key: "carrito", storage, whitelist: ["items"] };

export const store = configureStore({
  reducer: {
    auth:       persistReducer(authPersistConfig, authReducer),
    carrito:    persistReducer(carritoPersistConfig, carritoReducer),
    vinos:      vinosReducer,
    catalogos:  catalogosReducer,
    pedidos:    pedidosReducer,
    usuario:    usuarioReducer,
    checkout:   checkoutReducer,
    catalogoUI: catalogoUIReducer,
    adminUI:    adminUIReducer,
    galeria:    galeriaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
