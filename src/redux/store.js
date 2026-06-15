import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
const storage = {
  getItem:    (key)        => Promise.resolve(window.localStorage.getItem(key)),
  setItem:    (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key)        => Promise.resolve(window.localStorage.removeItem(key)),
};
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

const rootReducer = combineReducers({
  auth:       authReducer,
  carrito:    carritoReducer,
  vinos:      vinosReducer,
  catalogos:  catalogosReducer,
  pedidos:    pedidosReducer,
  usuario:    usuarioReducer,
  checkout:   checkoutReducer,
  catalogoUI: catalogoUIReducer,
  adminUI:    adminUIReducer,
  galeria:    galeriaReducer,
});

const persistConfig = {
  key:       "root",
  storage,
  whitelist: ["auth", "carrito"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
