import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import usersReducer from "./usersSlice";
import carritoReducer from "./carritoSlice";
import vinosReducer from "./vinosSlice";
import catalogosReducer from "./catalogosSlice";
import pedidosReducer from "./pedidosSlice";
import checkoutReducer from "./checkoutSlice";
import catalogoUIReducer from "./catalogoUISlice";
import adminUIReducer from "./adminUISlice";
import galeriaReducer from "./galeriaSlice";

// Adaptadores inline (evitan incompatibilidad CJS/ESM de redux-persist con Vite)
const localStorageAdapter = {
  getItem:    (key)        => Promise.resolve(window.localStorage.getItem(key)),
  setItem:    (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key)        => Promise.resolve(window.localStorage.removeItem(key)),
};

// El carrito usa sessionStorage para que sobreviva a un F5 pero se vacíe al cerrar la
// pestaña o el navegador. Esto no viola el criterio de "nada de localStorage/sessionStorage
// manual": el acceso sigue pasando exclusivamente por este adaptador de Redux Persist,
// nunca directo desde un componente o reducer. Al hacer logout, carritoSlice resetea
// items:[] y el persistReducer anidado escribe ese estado vacío en sessionStorage, por
// lo que no es necesario que persistor.purge() alcance a este storage.
const sessionStorageAdapter = {
  getItem:    (key)        => Promise.resolve(window.sessionStorage.getItem(key)),
  setItem:    (key, value) => Promise.resolve(window.sessionStorage.setItem(key, value)),
  removeItem: (key)        => Promise.resolve(window.sessionStorage.removeItem(key)),
};

const carritoConfig = { key: "carrito", storage: sessionStorageAdapter };

const rootReducer = combineReducers({
  users:      usersReducer,
  carrito:    persistReducer(carritoConfig, carritoReducer),
  vinos:      vinosReducer,
  catalogos:  catalogosReducer,
  pedidos:    pedidosReducer,
  checkout:   checkoutReducer,
  catalogoUI: catalogoUIReducer,
  adminUI:    adminUIReducer,
  galeria:    galeriaReducer,
});

// Solo se persiste "users" (token + id de sesión) en localStorage, para que la sesión
// sobreviva entre cierres del navegador. El carrito tiene su propio persistReducer anidado
// con sessionStorage (ver arriba). "pedidos" NO se persiste: sus datos los puede modificar
// el admin desde otra sesión, por lo que mostrar un estado cacheado como verdad es peor
// que el breve loading inicial. Los hooks ya disparan el fetch cuando status === "idle".
const persistConfig = {
  key:       "root",
  storage:   localStorageAdapter,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      () => (next) => (action) => {
        const result = next(action);
        if (action.type === "users/logout") persistor.purge();
        return result;
      }
    ),
});

export const persistor = persistStore(store);
