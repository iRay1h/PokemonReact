import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

/**
 * Componente PokemonCard - Tarjeta reutilizable de pokémon
 * @param {Object} pokemon - Datos del pokémon
 * @param {Function} onPress - Callback al presionar la tarjeta
 */
const PokemonCard = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{pokemon.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    marginHorizontal: 8,
    marginVertical: 6,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    ...globalStyles.textLarge,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  id: {
    ...globalStyles.text,
    color: colors.gray,
  },
});

export default PokemonCard;
