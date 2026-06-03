export const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validarVencimiento = (val) => {
  if (!/^\d{2}\/\d{2}$/.test(val)) return false;
  const mes = parseInt(val.slice(0, 2), 10);
  const anio = parseInt("20" + val.slice(3), 10);
  if (mes < 1 || mes > 12) return false;
  const ahora = new Date();
  const expiry = new Date(anio, mes - 1, 1);
  return expiry >= new Date(ahora.getFullYear(), ahora.getMonth(), 1);
};
