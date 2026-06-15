import api from "@/redux/api";

const BASE = import.meta.env.VITE_VINOS_URL;

export const VINOS_PAGE_SIZE       = 100;
export const VINOS_ADMIN_PAGE_SIZE = 1000;

export const estaActivo = (producto) => producto.active !== false;

export const mapVino = (v) => ({
  id:                  v.id,
  name:                v.name,
  winery:              v.winery,
  year:                v.year,
  price:               Number(v.price),
  stock:               v.stock,
  discountPercent:     Number(v.discountPercent || 0),
  active:              v.active,
  imagen:              v.imageUrl || "",
  colorId:             v.color?.id,
  cepaId:              v.cepa?.id,
  azucarId:            v.azucar?.id,
  crianzaId:           v.crianza?.id,
  elaboracionId:       v.elaboracion?.id,
  medidaId:            v.medida?.id,
  colorNombre:         v.color?.name         || "",
  cepaNombre:          v.cepa?.name          || "",
  azucarNombre:        v.azucar?.name        || "",
  crianzaNombre:       v.crianza?.name       || "",
  elaboracionNombre:   v.elaboracion?.name   || "",
  medidaNombre:        v.medida?.name        || "",
});

const mapLista = (data) => (Array.isArray(data) ? data : data.content ?? []).map(mapVino);

export const fetchVinos        = ()          => api.get(`${BASE}/vinos?size=${VINOS_PAGE_SIZE}`).then(mapLista);
export const fetchVinosAdmin   = ()          => api.get(`${BASE}/vinos/admin?size=${VINOS_ADMIN_PAGE_SIZE}`).then(mapLista);
export const fetchVinoById     = (id)        => api.get(`${BASE}/vinos/${id}`).then(mapVino);
export const crearVino         = (datos)     => api.post(`${BASE}/vinos`, datos).then(mapVino);
export const actualizarVino    = (id, datos) => api.put(`${BASE}/vinos/${id}`, datos).then(mapVino);
export const desactivarVinoAPI = (id)        => api.put(`${BASE}/vinos/${id}/eliminar`);
export const reactivarVinoAPI  = (id)        => api.put(`${BASE}/vinos/${id}/activar`);
