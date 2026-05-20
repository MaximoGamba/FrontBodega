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

const fetchJson = (url, options) =>
  fetch(url, options).then(async (r) => {
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      throw new Error(data.error || data.message || `Error ${r.status}`);
    }
    return r.json();
  });

const getToken = () => localStorage.getItem('token');

const authHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const jsonHeaders = () => ({ 'Content-Type': 'application/json' });

// Convierte el objeto Wine del backend al formato del frontend
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

// --- Catálogos  ---

export const fetchColores = () => fetchJson(`${BASE_URL}/colores`);
export const fetchCepas = () => fetchJson(`${BASE_URL}/cepas`);
export const fetchAzucares = () => fetchJson(`${BASE_URL}/azucares`);
export const fetchCrianzas = () => fetchJson(`${BASE_URL}/crianzas`);
export const fetchElaboraciones = () => fetchJson(`${BASE_URL}/elaboraciones`);
export const fetchMedidas = () => fetchJson(`${BASE_URL}/medidas`);

// --- Vinos ---

export const fetchVinos = () =>
  fetchJson(`${BASE_URL}/vinos?size=100`)
    .then((data) => (Array.isArray(data) ? data : data.content ?? []).map(mapVino));

export const fetchVinosAdmin = () =>
  fetchJson(`${BASE_URL}/vinos/admin?size=1000`, { headers: authHeaders() })
    .then((data) => (Array.isArray(data) ? data : data.content ?? []).map(mapVino));

export const fetchVino = (id) =>
  fetchJson(`${BASE_URL}/vinos/${id}`).then(mapVino);

export const crearVino = (datos) =>
  fetchJson(`${BASE_URL}/vinos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });

export const actualizarVino = (id, datos) =>
  fetchJson(`${BASE_URL}/vinos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });

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

// Login
export const loginAPI = (username, password) =>
  fetchJson(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ username, password }),
  });

// Registro
export const registrarAPI = (datos) =>
  fetchJson(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(datos),
  });

export const fetchUsuario = (userId) =>
  fetchJson(`${BASE_URL}/usuarios/${userId}`, { headers: authHeaders() });

export const actualizarUsuario = (userId, datos) =>
  fetchJson(`${BASE_URL}/usuarios/${userId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos),
  });

export const fetchPedidosUsuario = (userId) =>
  fetchJson(`${BASE_URL}/usuarios/${userId}/pedidos`, { headers: authHeaders() });

// --- Pedidos (admin) ---

export const fetchPedidosAdmin = () =>
  fetchJson(`${BASE_URL}/pedidos`, { headers: authHeaders() });

export const actualizarEstadoPedido = (id, status) =>
  fetchJson(`${BASE_URL}/pedidos/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });

// --- Pedidos ---

export const crearPedido = (items = []) =>
  fetchJson(`${BASE_URL}/pedidos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ items }),
  });

export const agregarDetalle = (pedidoId, wineId, quantity) =>
  fetchJson(`${BASE_URL}/pedidos/${pedidoId}/detalles`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ wineId, quantity }),
  });

export const crearEnvio = (pedidoId, address) =>
  fetchJson(`${BASE_URL}/pedidos/${pedidoId}/envios`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ address }),
  });

export const crearPago = (pedidoId, amount, method) =>
  fetchJson(`${BASE_URL}/pedidos/${pedidoId}/pagos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, method }),
  });
