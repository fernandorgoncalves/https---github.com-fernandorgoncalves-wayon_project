import axios from "axios";
const api = axios.create({
  baseURL: "/api",
});

// GET
export async function getApiData(endpoint) {
  const response = await api.get(`/${endpoint}`);
  return response.data;
}

// POST
export async function postApiData(endpoint, data) {
  const response = await api.post(`/${endpoint}`, data);
  return response.data;
}

export default api;
