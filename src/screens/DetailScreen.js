import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Loading from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import * as pokemonService from "../services/pokemonService";
import { colors, globalStyles } from "../styles/globalStyles";

/**
 * DetailScreen - Pantalla de detalle del pokémon
 */
const DetailScreen = ({ route }) => {
  const { pokemonId } = route.params;
  const { pokemon, loading, error } = usePokemon(pokemonId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [evolutionLoading, setEvolutionLoading] = useState(false);
  const [evolutionError, setEvolutionError] = useState("");

  // Verificar si el pokémon es favorito
  useEffect(() => {
    checkIfFavorite();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemon) {
      loadEvolutionChain();
    }
  }, [pokemon]);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteList.includes(pokemonId));
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoriteList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoriteList = favoriteList.filter((id) => id !== pokemonId);
      } else {
        if (!favoriteList.includes(pokemonId)) {
          favoriteList.push(pokemonId);
        }
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const loadEvolutionChain = async () => {
    if (!pokemon) return;

    try {
      setEvolutionLoading(true);
      setEvolutionError("");
      const species = await pokemonService.getPokemonSpecies(pokemonId);
      const evolutionData = await pokemonService.getEvolutionChain(
        species.evolution_chain.url,
      );
      setEvolutionChain(
        parseEvolutionChain(evolutionData.chain, pokemon.species.name),
      );
    } catch (error) {
      console.error("Error loading evolution chain:", error);
      setEvolutionError("No se pudo cargar la línea evolutiva.");
    } finally {
      setEvolutionLoading(false);
    }
  };

  const parseEvolutionChain = (node, currentName, chain = []) => {
    const speciesName = node.species.name;
    const speciesId = getSpeciesId(node.species.url);
    const evolutionDetails = node.evolution_details?.[0] || {};
    chain.push({
      id: speciesId,
      name: speciesName,
      trigger: evolutionDetails.trigger?.name || "base",
      minLevel: evolutionDetails.min_level || null,
      isCurrent: speciesName === currentName,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
    });

    node.evolves_to.forEach((next) =>
      parseEvolutionChain(next, currentName, chain),
    );
    return chain;
  };

  const getSpeciesId = (url) => {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : null;
  };

  if (loading) {
    return <Loading visible={true} message="Cargando detalles..." />;
  }

  if (error || !pokemon) {
    return (
      <View style={globalStyles.containerCenter}>
        <Text style={globalStyles.textMedium}>
          {error || "No se pudo cargar el pokémon"}
        </Text>
      </View>
    );
  }

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "";
  const types = pokemon.types || [];
  const height = pokemon.height || 0;
  const weight = pokemon.weight || 0;

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        style={globalStyles.screenPadding}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagen */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.largeImage}
            resizeMode="contain"
          />
        </View>

        {/* Nombre e ID */}
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <Text style={styles.pokemonId}>#{pokemon.id}</Text>

        {/* Tipos */}
        {types.length > 0 && (
          <View style={styles.typesContainer}>
            {types.map((type, index) => (
              <View key={index} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type.type.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Separador */}
        <View style={globalStyles.separator} />

        {/* Información física */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información Física</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura:</Text>
            <Text style={styles.infoValue}>{(height / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso:</Text>
            <Text style={styles.infoValue}>{(weight / 10).toFixed(1)} kg</Text>
          </View>
        </View>

        {/* Estadísticas base */}
        {pokemon.stats && pokemon.stats.length > 0 && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Estadísticas Base</Text>
            {pokemon.stats.map((stat, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.stat.name}:</Text>
                <View style={styles.statBarContainer}>
                  <View
                    style={[
                      styles.statBar,
                      { width: `${(stat.base_stat / 255) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            ))}
          </View>
        )}

        {evolutionLoading ? (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Línea Evolutiva</Text>
            <Text style={styles.infoLabel}>Cargando evolución...</Text>
          </View>
        ) : (
          evolutionChain.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Línea Evolutiva</Text>
              {evolutionChain.map((stage, index) => (
                <View
                  key={`${stage.id}-${index}`}
                  style={[
                    styles.evolutionRow,
                    stage.isCurrent && styles.evolutionRowCurrent,
                  ]}
                >
                  <View style={styles.evolutionBadge}>
                    <Text style={styles.evolutionBadgeText}>{index + 1}</Text>
                  </View>
                  <View style={styles.evolutionContent}>
                    <Text style={styles.evolutionName}>{stage.name}</Text>
                    <Text style={styles.evolutionDetail}>
                      {stage.trigger === "base"
                        ? "Estado base"
                        : `Evoluciona con ${stage.trigger}${stage.minLevel ? ` al nivel ${stage.minLevel}` : ""}`}
                    </Text>
                    <Text style={styles.evolutionStatus}>
                      {stage.isCurrent ? "Estado actual" : "No es el actual"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )
        )}

        {/* Botón de favoritos */}
        <TouchableOpacity
          style={[
            globalStyles.button,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={toggleFavorite}
        >
          <Text style={globalStyles.buttonText}>
            {isFavorite ? "❤️ Quitar de Favoritos" : "🤍 Agregar a Favoritos"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 20,
  },
  largeImage: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    ...globalStyles.textXLarge,
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  pokemonId: {
    ...globalStyles.text,
    textAlign: "center",
    color: colors.gray,
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  typeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  infoSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    ...globalStyles.textLarge,
    marginBottom: 12,
    color: colors.primary,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  infoLabel: {
    ...globalStyles.textMedium,
    color: colors.gray,
  },
  infoValue: {
    ...globalStyles.textMedium,
    color: colors.black,
    fontWeight: "600",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    ...globalStyles.text,
    width: 70,
    textTransform: "capitalize",
    color: colors.gray,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  statValue: {
    ...globalStyles.text,
    width: 35,
    textAlign: "right",
    color: colors.black,
    fontWeight: "600",
  },
  favoriteButtonActive: {
    backgroundColor: colors.success,
  },
  evolutionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    marginBottom: 10,
  },
  evolutionRowCurrent: {
    backgroundColor: colors.primary,
  },
  evolutionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  evolutionBadgeText: {
    color: colors.black,
    fontWeight: "700",
  },
  evolutionContent: {
    flex: 1,
  },
  evolutionName: {
    ...globalStyles.textMedium,
    textTransform: "capitalize",
    color: colors.black,
    fontWeight: "700",
  },
  evolutionDetail: {
    ...globalStyles.text,
    color: colors.darkGray,
    marginTop: 2,
  },
  evolutionStatus: {
    ...globalStyles.text,
    color: colors.gray,
    marginTop: 2,
  },
});

export default DetailScreen;
