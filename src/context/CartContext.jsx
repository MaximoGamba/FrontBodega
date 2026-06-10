import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { usuario } = useAuth();
  const prevUserIdRef = useRef(usuario?.id);

  const [carrito, setCarrito] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("bodega_carrito")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    if (prevUserIdRef.current !== usuario?.id) {
      setCarrito([]);
      sessionStorage.removeItem("bodega_carrito");
      prevUserIdRef.current = usuario?.id;
    }
  }, [usuario]);

  useEffect(() => {
    sessionStorage.setItem("bodega_carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarItem = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        const nueva = Math.min(existe.cantidad + cantidad, producto.stock);
        if (nueva === existe.cantidad) return prev;
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: nueva } : item
        );
      }
      return [...prev, { ...producto, cantidad: Math.min(cantidad, producto.stock) }];
    });
  };

  const quitarItem = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nueva = item.cantidad + delta;
          if (nueva > item.stock) return item;
          return { ...item, cantidad: nueva };
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, agregarItem, quitarItem, cambiarCantidad, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
