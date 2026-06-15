import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* PersistGate retarda el render hasta que redux-persist rehidrate auth y carrito */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-center" autoClose={4500} hideProgressBar={false} closeOnClick pauseOnHover style={{ fontSize: "1.2rem", width: "460px" }} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
