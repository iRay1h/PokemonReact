import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

/**
 * Componente Loading - Indicador de carga reutilizable
 * @param {boolean} visible - Si debe mostrarse el indicador
 * @param {string} message - Mensaje opcional a mostrar
 */
const Loading = ({ visible = true, message = "Cargando..." }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.containerCenter,
    backgroundColor: colors.white,
  },
  message: {
    ...globalStyles.textMedium,
    marginTop: 12,
    color: colors.gray,
  },
});

export default Loading;
