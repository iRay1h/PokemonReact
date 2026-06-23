import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";
import * as pokemonService from "../services/pokemonService";
import { colors, globalStyles } from "../styles/globalStyles";

/**
 * FavoritesScreen - Pantalla de pokémon favoritos
 */
const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos cuando la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, []),
  );

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoriteIds = await AsyncStorage.getItem("favorites");
      const favoriteList = favoriteIds ? JSON.parse(favoriteIds) : [];

      // Obtener detalles de cada pokémon favorito
      const pokemonDetails = [];
      for (const id of favoriteList) {
        try {
          const pokemon = await pokemonService.getPokemonById(id);
          pokemonDetails.push({
            id: pokemon.id,
            name: pokemon.name,
            image:
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default ||
              "",
          });
        } catch (error) {
          console.error(`Error loading favorite pokemon ${id}:`, error);
        }
      }
      setFavorites(pokemonDetails);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonPress = (pokemon) => {
    navigation.navigate("Detail", { pokemonId: pokemon.id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>Sin Favoritos</Text>
      <Text style={styles.emptyMessage}>
        No tienes pokémon favoritos aún. ¡Agrega algunos!
      </Text>
    </View>
  );

  if (loading && favorites.length === 0) {
    return <Loading visible={true} message="Cargando favoritos..." />;
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => handlePokemonPress(item)}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          favorites.length === 0 ? styles.centeredContent : {}
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    ...globalStyles.textLarge,
    marginBottom: 8,
  },
  emptyMessage: {
    ...globalStyles.textMedium,
    color: colors.gray,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default FavoritesScreen;
