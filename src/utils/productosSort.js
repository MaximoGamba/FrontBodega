export const sortProductos = (productos) =>
  [...productos].sort((a, b) => {
    if (a.active === b.active) return b.id - a.id;
    return a.active === false ? 1 : -1;
  });
