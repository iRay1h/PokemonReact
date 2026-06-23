import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import * as pokemonService from "../services/pokemonService";
import { colors, globalStyles } from "../styles/globalStyles";

const PAGE_SIZE = 20;

/**
 * HomeScreen - Pantalla principal con lista de pokémon
 */
const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadPage(1);
    loadAllPokemonNames();
  }, []);

  const loadAllPokemonNames = async () => {
    try {
      const data = await pokemonService.getPokemonList(0, 1200);
      setAllPokemon(
        data.results.map((p, index) => ({
          id: index + 1,
          name: p.name,
        })),
      );
    } catch (error) {
      console.error("Error loading pokemon names:", error);
    }
  };

  const loadPage = async (nextPage) => {
    try {
      setLoading(true);
      setSearchActive(false);
      setSearchError("");
      const offset = (nextPage - 1) * PAGE_SIZE;
      const data = await pokemonService.getPokemonList(offset, PAGE_SIZE);
      setPokemonList(
        data.results.map((p, index) => ({
          id: offset + index + 1,
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            offset + index + 1
          }.png`,
        })),
      );
      setTotalCount(data.count);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading pokemon:", error);
      setSearchError("No se pudo cargar la lista. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSearchActive(false);
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const query = text.toLowerCase();
    const matches = allPokemon
      .filter(
        (pokemon) =>
          pokemon.name.includes(query) || pokemon.id.toString() === query,
      )
      .slice(0, PAGE_SIZE)
      .map((pokemon) => ({
        ...pokemon,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      }));

    setSearchResults(matches);
    setSearchActive(true);
    setSearchError(matches.length === 0 ? "No se encontraron resultados." : "");
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() === "") {
      setSearchActive(false);
      setSearchResults([]);
      setSearchError("");
      return;
    }

    if (searchResults.length === 0) {
      setSearchError("No se encontraron resultados. Usa nombre o ID válido.");
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchResults([]);
    setSearchActive(false);
    setSearchError("");
  };

  const handlePokemonPress = (pokemon) => {
    navigation.navigate("Detail", { pokemonId: pokemon.id });
  };

  const handleChangePage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages || loading) return;
    loadPage(nextPage);
  };

  const currentList = searchActive ? searchResults : pokemonList;
  const dashboardMessage = searchActive
    ? "Resultados de búsqueda mostrando pokémon por nombre o ID."
    : "Bienvenido al Pokédex. Revisa la selección de esta página y navega entre cada grupo de 20 pokémon.";

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchError || "No se encontraron pokémon"}
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.dashboardTitle}>Pokédex</Text>
        <Text style={styles.dashboardSubtitle}>
          Hola entrenador, esta es tu guía de pokémon.
        </Text>
        <Text style={styles.dashboardMessage}>{dashboardMessage}</Text>
        <View style={styles.dashboardInfo}>
          <Text style={styles.dashboardInfoText}>
            Página {page} / {totalPages || 1}
          </Text>
          <Text style={styles.dashboardInfoText}>
            {totalCount} pokémon registrados
          </Text>
        </View>
      </View>

      <SearchBar
        value={searchText}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSearchSubmit}
        onClear={clearSearch}
        placeholder="Busca por nombre o ID"
      />

      <FlatList
        data={currentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => handlePokemonPress(item)}
          />
        )}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={
          currentList.length === 0 ? styles.centeredContent : styles.listContent
        }
      />

      {!searchActive && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
            onPress={() => handleChangePage(page - 1)}
            disabled={page === 1 || loading}
          >
            <Text style={styles.pageButtonText}>Anterior</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Página {page} de {totalPages || 1}
          </Text>
          <TouchableOpacity
            style={[
              styles.pageButton,
              page === totalPages && styles.pageButtonDisabled,
            ]}
            onPress={() => handleChangePage(page + 1)}
            disabled={page === totalPages || loading}
          >
            <Text style={styles.pageButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && <Loading visible={true} message="Cargando pokémon..." />}
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    backgroundColor: colors.primary,
    padding: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12,
  },
  dashboardTitle: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  dashboardSubtitle: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 8,
  },
  dashboardMessage: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  dashboardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dashboardInfoText: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.9,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  pageButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  pageButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
  pageText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    ...globalStyles.textMedium,
    color: colors.gray,
    textAlign: "center",
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
