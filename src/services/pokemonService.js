import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Obtiene una lista de pokémon con paginación
 * @param {number} offset - Número de pokémon a saltar
 * @param {number} limit - Número de pokémon a obtener
 * @returns {Promise<Object>} Lista de pokémon
 */
export const getPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await apiClient.get(
      `/pokemon?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw error;
  }
};

/**
 * Obtiene los detalles completos de un pokémon por ID
 * @param {number} id - ID del pokémon
 * @returns {Promise<Object>} Detalles del pokémon
 */
export const getPokemonById = async (id) => {
  try {
    const response = await apiClient.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    throw error;
  }
};

/**
 * Busca un pokémon por nombre
 * @param {string} name - Nombre del pokémon
 * @returns {Promise<Object>} Detalles del pokémon
 */
export const getPokemonByName = async (name) => {
  try {
    const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error("Error searching pokemon:", error);
    throw error;
  }
};

export const getPokemonSpecies = async (id) => {
  try {
    const response = await apiClient.get(`/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon species:", error);
    throw error;
  }
};

export const getEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    throw error;
  }
};

/**
 * Obtiene información de un tipo de pokémon
 * @param {string} type - Nombre del tipo
 * @returns {Promise<Object>} Información del tipo
 */
export const getPokemonType = async (type) => {
  try {
    const response = await apiClient.get(`/type/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching type:", error);
    throw error;
  }
};
