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
    name: "Flecha Nueva",
    winery: "Bodega Norte",
    year: 2024,
    price: 1000.00,
    stock: 400,
    colorId: 1,
    cepaId: 1,
    azucarId: 1,
    crianzaId: 2,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 10.00,
    activo: true,
    imagen: "https://placehold.co/300x400?text=Malbec",
  },
  {
    id: 2,
    name: "Terroir Blanc",
    winery: "Viñedos del Sur",
    year: 2023,
    price: 1500.00,
    stock: 120,
    colorId: 2,
    cepaId: 3,
    azucarId: 1,
    crianzaId: 1,
    elaboracionId: 1,
    medidaId: 1,
    discountPercent: 0,
    activo: true,
    imagen: "https://placehold.co/300x400?text=Chardonnay",
  },
  {
    id: 3,
    name: "Rosado de Verano",
    winery: "Bodega Sol",
    year: 2024,
    price: 850.00,
    stock: 80,
    colorId: 3,
    cepaId: 1,
    azucarId: 2,
    crianzaId: 1,
    elaboracionId: 2,
    medidaId: 1,
    discountPercent: 5.00,
    activo: true,
    imagen: "https://placehold.co/300x400?text=Rosado",
  },
  {
    id: 4,
    name: "Gran Reserva Cabernet",
    winery: "Bodega Norte",
    year: 2020,
    price: 3200.00,
    stock: 0,
    colorId: 1,
    cepaId: 2,
    azucarId: 1,
    crianzaId: 3,
    elaboracionId: 1,
    medidaId: 2,
    discountPercent: 0,
    activo: true,
    imagen: "https://placehold.co/300x400?text=Cabernet",
  },
  {
    id: 5,
    name: "Brut Rosé",
    winery: "Viñedos del Sur",
    year: 2022,
    price: 2100.00,
    stock: 50,
    colorId: 3,
    cepaId: 2,
    azucarId: 1,
    crianzaId: 2,
    elaboracionId: 1,
    medidaId: 2,
    discountPercent: 15.00,
    activo: true,
    imagen: "https://placehold.co/300x400?text=BrutRose",
  },
];
