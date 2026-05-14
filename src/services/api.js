const BASE_URL = 'http://localhost:4002';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadImagen = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Error al subir la imagen');
  const data = await res.json();
  return data.secure_url;
};

const getToken = () => localStorage.getItem('token');

const authHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const jsonHeaders = () => ({ 'Content-Type': 'application/json' });

// Convierte el objeto Wine del backend (con relaciones anidadas) al formato del frontend
export const mapVino = (v) => ({
  id: v.id,
  name: v.name,
  winery: v.winery,
  year: v.year,
  price: Number(v.price),
  stock: v.stock,
  discountPercent: Number(v.discountPercent || 0),
  active: v.active,
  imagen: v.imageUrl || '',
  colorId: v.color?.id,
  cepaId: v.cepa?.id,
  azucarId: v.azucar?.id,
  crianzaId: v.crianza?.id,
  elaboracionId: v.elaboracion?.id,
  medidaId: v.medida?.id,
  colorNombre: v.color?.name || '',
  cepaNombre: v.cepa?.name || '',
  azucarNombre: v.azucar?.name || '',
  crianzaNombre: v.crianza?.name || '',
  elaboracionNombre: v.elaboracion?.name || '',
  medidaNombre: v.medida?.name || '',
});

// --- Catálogos (públicos) ---

export const fetchColores = () => fetch(`${BASE_URL}/colores`).then((r) => r.json());
export const fetchCepas = () => fetch(`${BASE_URL}/cepas`).then((r) => r.json());
export const fetchAzucares = () => fetch(`${BASE_URL}/azucares`).then((r) => r.json());
export const fetchCrianzas = () => fetch(`${BASE_URL}/crianzas`).then((r) => r.json());
export const fetchElaboraciones = () => fetch(`${BASE_URL}/elaboraciones`).then((r) => r.json());
export const fetchMedidas = () => fetch(`${BASE_URL}/medidas`).then((r) => r.json());

// --- Vinos ---

export const fetchVinos = () =>
  fetch(`${BASE_URL}/vinos?size=100`)
    .then((r) => r.json())
    .then((data) => (Array.isArray(data) ? data : data.content ?? []).map(mapVino));

export const fetchVinosAdmin = () =>
  fetch(`${BASE_URL}/vinos/admin?size=1000`, { headers: authHeaders() })
    .then((r) => r.json())
    .then((data) => (Array.isArray(data) ? data : data.content ?? []).map(mapVino));

export const fetchVino = (id) =>
  fetch(`${BASE_URL}/vinos/${id}`)
    .then((r) => r.json())
    .then(mapVino);

export const crearVino = (datos) =>
  fetch(`${BASE_URL}/vinos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  }).then((r) => r.json());

export const actualizarVino = (id, datos) =>
  fetch(`${BASE_URL}/vinos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  }).then((r) => r.json());

export const desactivarVinoAPI = (id) =>
  fetch(`${BASE_URL}/vinos/${id}/eliminar`, {
    method: 'PUT',
    headers: authHeaders(),
  });

export const reactivarVinoAPI = (id) =>
  fetch(`${BASE_URL}/vinos/${id}/activar`, {
    method: 'PUT',
    headers: authHeaders(),
  });

// --- Auth ---

// Login: POST /auth/login con { username, password }
export const loginAPI = (username, password) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ username, password }),
  }).then((r) => r.json());

// Registro: POST /api/v1/auth/register con { firstname, lastname, email, username, password }
export const registrarAPI = (datos) =>
  fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(datos),
  }).then((r) => r.json());

export const fetchUsuario = (userId) =>
  fetch(`${BASE_URL}/usuarios/${userId}`, { headers: authHeaders() })
    .then((r) => r.json());

export const actualizarUsuario = (userId, datos) =>
  fetch(`${BASE_URL}/usuarios/${userId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  }).then((r) => r.json());

export const fetchPedidosUsuario = (userId) =>
  fetch(`${BASE_URL}/usuarios/${userId}/pedidos`, { headers: authHeaders() })
    .then((r) => r.json());

// --- Pedidos (admin) ---

export const fetchPedidosAdmin = () =>
  fetch(`${BASE_URL}/pedidos`, { headers: authHeaders() }).then((r) => r.json());

export const actualizarEstadoPedido = (id, status) =>
  fetch(`${BASE_URL}/pedidos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  }).then(async (r) => {
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Error al actualizar el estado');
    return data;
  });

// --- Pedidos ---

export const crearPedido = (items = []) =>
  fetch(`${BASE_URL}/pedidos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ items }),
  }).then(async (r) => {
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Error al crear el pedido');
    return data;
  });

export const agregarDetalle = (pedidoId, wineId, quantity) =>
  fetch(`${BASE_URL}/pedidos/${pedidoId}/detalles`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ wineId, quantity }),
  }).then((r) => r.json());

export const crearEnvio = (pedidoId, address) =>
  fetch(`${BASE_URL}/pedidos/${pedidoId}/envios`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ address }),
  }).then((r) => r.json());

export const crearPago = (pedidoId, amount, method) =>
  fetch(`${BASE_URL}/pedidos/${pedidoId}/pagos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, method }),
  }).then((r) => r.json());
