export const soloLetras = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");

export const soloNumerosYSignos = (val) => val.replace(/[^0-9+\-\s]/g, "");

export const soloNumeros = (val) => val.replace(/\D/g, "");

export const formatearTarjeta = (val) => {
  const digits = val.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

export const formatearVencimiento = (val, prev) => {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  if (prev.endsWith("/") && val.length < prev.length) return digits.slice(0, 1);
  return digits;
};

export const calcularPrecioFinal = (price, discountPercent) =>
  discountPercent > 0 ? price * (1 - discountPercent / 100) : price;
