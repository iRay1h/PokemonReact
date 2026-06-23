import { useEffect, useState } from "react";
import * as pokemonService from "../services/pokemonService";

/**
 * Hook personalizado para gestionar el estado y lógica de pokémon
 * @param {number} pokemonId - ID del pokémon a obtener
 * @returns {Object} { pokemon, loading, error }
 */
export const usePokemon = (pokemonId) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) {
      setPokemon(null);
      return;
    }

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pokemonService.getPokemonById(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError(err.message || "Error al cargar el pokémon");
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  return { pokemon, loading, error };
};
