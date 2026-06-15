import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { injectStore } from "./redux/api";

injectStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-center" autoClose={4500} hideProgressBar={false} closeOnClick pauseOnHover style={{ fontSize: "1.2rem", width: "460px" }} />
    </BrowserRouter>
  </Provider>
);
