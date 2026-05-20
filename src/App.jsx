import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Admin from "./views/Admin";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Perfil from "./views/Perfil";
import Sale from "./views/Sale";
import Historia from "./views/Historia";
import Contacto from "./views/Contacto";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/ofertas" element={<Sale />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
