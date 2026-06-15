import api from "@/redux/api";

const BASE = import.meta.env.VITE_CATALOGOS_URL;

export const fetchColores       = () => api.get(`${BASE}/colores`);
export const fetchCepas         = () => api.get(`${BASE}/cepas`);
export const fetchAzucares      = () => api.get(`${BASE}/azucares`);
export const fetchCrianzas      = () => api.get(`${BASE}/crianzas`);
export const fetchElaboraciones = () => api.get(`${BASE}/elaboraciones`);
export const fetchMedidas       = () => api.get(`${BASE}/medidas`);
