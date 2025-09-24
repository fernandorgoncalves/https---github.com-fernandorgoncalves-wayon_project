// A baseURL aponta para o proxy '/api' configurado no vite.config.js.
const BASE_URL = "/api";

/**
 * Função genérica para realizar requisições com fetch e tratar a resposta.
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers').
 * @param {RequestInit} options - As opções para a requisição fetch.
 * @returns {Promise<any>} A resposta da API em JSON.
 */
async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    // Cria um erro com uma estrutura similar à do Axios para manter a compatibilidade
    const error = new Error(
      `Request failed with status ${response.status}: ${response.statusText}`
    );
    try {
      const errorData = await response.json();
      error.response = {
        data: errorData,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (jsonError) {
      // Se o corpo do erro não for JSON, cria uma resposta de erro padrão
      error.response = {
        data: { message: "An unexpected error occurred." },
        status: response.status,
        statusText: response.statusText,
      };
    }
    throw error;
  }

  // Retorna um objeto vazio se a resposta não tiver corpo (ex: status 201 ou 204)
  return response.text().then((text) => (text ? JSON.parse(text) : {}));
}

/**
 * Busca dados de um endpoint usando a API Fetch. (GET)
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers').
 * @returns {Promise<any>} A resposta da API.
 */
export async function getApiData(endpoint) {
  return fetchApi(endpoint, { method: "GET" });
}

/**
 * Envia dados para um endpoint usando a API Fetch. (POST)
 * @param {string} endpoint - O endpoint da API (ex: 'Transfers/schedule').
 * @param {object} data - O objeto a ser enviado no corpo da requisição.
 * @returns {Promise<any>} A resposta da API.
 */
export async function postApiData(endpoint, data) {
  return fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
