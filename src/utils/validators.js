export const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validarProducto = (form, imageUrl) => {
  const e = {};
  const anioActual = new Date().getFullYear();
  if (!form.name?.trim()) e.name = "El nombre es obligatorio.";
  else if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres.";
  if (!form.winery?.trim()) e.winery = "La bodega es obligatoria.";
  if (!form.price || Number(form.price) <= 0) e.price = "El precio debe ser mayor a 0.";
  if (form.stock === "" || form.stock === null || form.stock === undefined || Number(form.stock) < 0)
    e.stock = "El stock no puede ser negativo.";
  if (form.year !== "" && form.year !== null && form.year !== undefined) {
    const y = Number(form.year);
    if (!Number.isInteger(y) || y < 1800 || y > anioActual)
      e.year = `El año debe estar entre 1800 y ${anioActual}.`;
  }
  const desc = form.discountPercent === "" || form.discountPercent === null || form.discountPercent === undefined
    ? NaN : Number(form.discountPercent);
  if (isNaN(desc) || desc < 0 || desc > 100) e.discountPercent = "El descuento debe estar entre 0 y 100.";
  if (!imageUrl) e.imagen = "La imagen es obligatoria.";
  return e;
};

export const validarVencimiento = (val) => {
  if (!/^\d{2}\/\d{2}$/.test(val)) return false;
  const mes = parseInt(val.slice(0, 2), 10);
  const anio = parseInt("20" + val.slice(3), 10);
  if (mes < 1 || mes > 12) return false;
  const ahora = new Date();
  const expiry = new Date(anio, mes - 1, 1);
  return expiry >= new Date(ahora.getFullYear(), ahora.getMonth(), 1);
};
