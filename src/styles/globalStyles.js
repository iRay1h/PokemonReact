import { StyleSheet } from "react-native";

export const colors = {
  primary: "#DC143C",
  secondary: "#FFD700",
  background: "#F5F5F5",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#808080",
  lightGray: "#D3D3D3",
  darkGray: "#404040",
  success: "#28A745",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  screenPadding: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.black,
    fontSize: 14,
  },
  textMedium: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
  textLarge: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  textXLarge: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 8,
  },
});
