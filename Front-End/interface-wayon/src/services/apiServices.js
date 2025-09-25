// A baseURL aponta para o proxy '/api' configurado no vite.config.js.
const BASE_URL = "/api";

/**
 * Função genérica para realizar requisições com fetch e tratar a resposta.
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers').
 * @param {RequestInit} options - As opções para a requisição fetch.
 * @returns {Promise<any>} A resposta da API em JSON.
 */

  /**
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers').
 * @returns {Promise<any>} A resposta da API.
 */
export async function getApiData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.response = { data: errorData, status: response.status };
      throw error;
    }
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so TanStack Query can handle it
  }
}

/**
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers/schedule').
 * @param {object} data - O objeto a ser enviado no corpo da requisição.
 * @returns {Promise<any>} A resposta da API.
 */
export async function postApiData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.response = { data: errorData, status: response.status };
      throw error;
    }
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    console.error("Error posting data:", error);
    throw error; // Re-throw the error so TanStack Query can handle it
  }
}
