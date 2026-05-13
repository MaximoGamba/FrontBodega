export const colores = [
  { id: 1, nombre: "Tinto" },
  { id: 2, nombre: "Blanco" },
  { id: 3, nombre: "Rosado" },
];

export const azucares = [
  { id: 1, nombre: "Seco" },
  { id: 2, nombre: "Semi-seco" },
  { id: 3, nombre: "Dulce" },
];

export const elaboraciones = [
  { id: 1, nombre: "Tradicional" },
  { id: 2, nombre: "Industrial" },
];

export const crianzas = [
  { id: 1, nombre: "Joven" },
  { id: 2, nombre: "Crianza" },
  { id: 3, nombre: "Reserva" },
];

export const cepas = [
  { id: 1, nombre: "Malbec" },
  { id: 2, nombre: "Cabernet Sauvignon" },
  { id: 3, nombre: "Chardonnay" },
];

export const medidas = [
  { id: 1, nombre: "750ml" },
  { id: 2, nombre: "1L" },
];

export const productosIniciales = [
  {
    id: 1,
    name: "Malbec Reserva",
    winery: "Bodega Norton",
    year: 2021,
    price: 1600,
    stock: 10,
    colorId: 1,
    cepaId: 1,
    azucarId: 1,
    crianzaId: 3,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 20,
    imagen: "",
  },
  {
    id: 2,
    name: "Cabernet Sauvignon Gran Reserva",
    winery: "Luigi Bosca",
    year: 2020,
    price: 2200,
    stock: 5,
    colorId: 1,
    cepaId: 2,
    azucarId: 1,
    crianzaId: 3,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 0,
    imagen: "",
  },
  {
    id: 3,
    name: "Chardonnay Clásico",
    winery: "Trapiche",
    year: 2022,
    price: 980,
    stock: 15,
    colorId: 2,
    cepaId: 3,
    azucarId: 2,
    crianzaId: 1,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 0,
    imagen: "",
  },
  {
    id: 4,
    name: "Malbec Rosé",
    winery: "Achaval Ferrer",
    year: 2022,
    price: 1100,
    stock: 8,
    colorId: 3,
    cepaId: 1,
    azucarId: 2,
    crianzaId: 1,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 10,
    imagen: "",
  },
  {
    id: 5,
    name: "Malbec Joven",
    winery: "Zuccardi",
    year: 2023,
    price: 750,
    stock: 20,
    colorId: 1,
    cepaId: 1,
    azucarId: 1,
    crianzaId: 1,
    elaboracionId: 2,
    medidaId: 1,
    discountPercent: 0,
    imagen: "",
  },
  {
    id: 6,
    name: "Chardonnay Reserva",
    winery: "Catena Zapata",
    year: 2021,
    price: 1800,
    stock: 0,
    colorId: 2,
    cepaId: 3,
    azucarId: 1,
    crianzaId: 2,
    elaboracionId: 1,
    medidaId: 2,
    discountPercent: 15,
    imagen: "",
  },
];

