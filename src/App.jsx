import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/shared/ErrorBoundary";

const Home          = lazy(() => import("./views/Home"));
const Products      = lazy(() => import("./views/Products"));
const ProductDetail = lazy(() => import("./views/ProductDetail"));
const Cart          = lazy(() => import("./views/Cart"));
const Checkout      = lazy(() => import("./views/Checkout"));
const Admin         = lazy(() => import("./views/Admin"));
const Login         = lazy(() => import("./views/Login"));
const Registro      = lazy(() => import("./views/Registro"));
const Perfil        = lazy(() => import("./views/Perfil"));
const Sale          = lazy(() => import("./views/Sale"));
const Historia      = lazy(() => import("./views/Historia"));
const Contacto      = lazy(() => import("./views/Contacto"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const FallbackCarga = () => (
  <div style={{ textAlign: "center", padding: "60px 24px" }}>
    <div style={{
      width: "32px", height: "32px", margin: "0 auto",
      border: "3px solid var(--border)",
      borderTopColor: "var(--primary)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<FallbackCarga />}>
          <Routes>
            <Route path="/" element={
              <ErrorBoundary mensaje="No se pudo cargar la página principal.">
                <Home />
              </ErrorBoundary>
            } />

            <Route path="/productos" element={
              <ErrorBoundary mensaje="No se pudo cargar el catálogo de productos.">
                <Products />
              </ErrorBoundary>
            } />

            <Route path="/productos/:id" element={
              <ErrorBoundary mensaje="No se pudo cargar el producto.">
                <ProductDetail />
              </ErrorBoundary>
            } />

            <Route path="/ofertas" element={
              <ErrorBoundary mensaje="No se pudo cargar las ofertas.">
                <Sale />
              </ErrorBoundary>
            } />

            <Route path="/carrito"  element={<Cart />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route path="/perfil" element={
              <PrivateRoute>
                <ErrorBoundary mensaje="No se pudo cargar tu perfil.">
                  <Perfil />
                </ErrorBoundary>
              </PrivateRoute>
            } />

            <Route path="/checkout" element={
              <PrivateRoute>
                <ErrorBoundary mensaje="El servicio de pago no está disponible en este momento.">
                  <Checkout />
                </ErrorBoundary>
              </PrivateRoute>
            } />

            <Route path="/admin" element={
              <AdminRoute>
                <ErrorBoundary mensaje="El panel de administración no está disponible.">
                  <Admin />
                </ErrorBoundary>
              </AdminRoute>
            } />

            <Route path="*" element={
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "20px" }}>
                  404 — Página no encontrada
                </h1>
                <Link to="/" style={{ color: "var(--primary)", fontSize: "14px", letterSpacing: "1px" }}>
                  Volver al inicio
                </Link>
              </div>
            } />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
