import { calcularPrecioFinal } from "./formatters";

export const sortProductos = (productos) =>
  [...productos].sort((a, b) => {
    if (a.active === b.active) return b.id - a.id;
    return a.active === false ? 1 : -1;
  });

export const ordenarProductos = (lista, orden) => {
  const c = [...lista];
  const precio = (p) => calcularPrecioFinal(p.price, p.discountPercent);
  if (orden === "precio-asc")  c.sort((a, b) => precio(a) - precio(b));
  if (orden === "precio-desc") c.sort((a, b) => precio(b) - precio(a));
  if (orden === "nuevo")       c.sort((a, b) => b.id - a.id);
  if (orden === "antiguo")     c.sort((a, b) => a.id - b.id);
  return c.sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));
};

