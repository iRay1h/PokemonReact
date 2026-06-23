import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../styles/globalStyles";

/**
 * Componente SearchBar - Buscador reutilizable
 * @param {string} value - Valor actual del input
 * @param {Function} onChangeText - Callback al cambiar el texto
 * @param {Function} onSubmitEditing - Callback al enviar la búsqueda
 * @param {Function} onClear - Callback para limpiar el campo
 * @param {string} placeholder - Placeholder del input
 */
const SearchBar = ({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  placeholder = "Buscar pokémon...",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={() => onSubmitEditing && onSubmitEditing(value)}
      />
      {value ? (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    fontSize: 14,
    color: colors.black,
  },
  clearButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  clearText: {
    fontWeight: "700",
    color: colors.darkGray,
  },
});

export default SearchBar;
