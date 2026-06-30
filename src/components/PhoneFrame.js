import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import { colors } from "../styles/globalStyles";

const PhoneFrame = ({ children }) => {
  const { height, width } = useWindowDimensions();

  if (Platform.OS !== "web") {
    return <View style={styles.nativeContainer}>{children}</View>;
  }

  const frameWidth = Math.min(Math.max(width - 36, 320), 430);
  const frameHeight = Math.min(Math.max(height - 36, 560), 920);

  return (
    <View style={styles.stage}>
      <View
        style={[
          styles.shadowLayer,
          { width: frameWidth, height: frameHeight },
        ]}
      >
        <View style={styles.phone}>
          <View style={styles.sideButtonLeft} />
          <View style={styles.sideButtonRightTop} />
          <View style={styles.sideButtonRightBottom} />
          <View style={styles.screen}>
            <View style={styles.sensorBar} pointerEvents="none">
              <View style={styles.speaker} />
              <View style={styles.camera} />
            </View>
            <View style={styles.appSurface}>{children}</View>
            <View style={styles.homeIndicator} pointerEvents="none" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
  },
  stage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECEFF3",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  shadowLayer: {
    borderRadius: 48,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.28,
    shadowRadius: 34,
    elevation: 18,
  },
  phone: {
    flex: 1,
    backgroundColor: "#111318",
    borderRadius: 48,
    borderWidth: 10,
    borderColor: "#171A20",
    padding: 8,
  },
  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.background,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#2B2F36",
  },
  sensorBar: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  speaker: {
    width: 72,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#111318",
  },
  camera: {
    position: "absolute",
    right: "33%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F3642",
  },
  appSurface: {
    flex: 1,
    overflow: "hidden",
    paddingTop: 22,
    paddingBottom: 14,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 7,
    alignSelf: "center",
    width: 116,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#111318",
    opacity: 0.82,
  },
  sideButtonLeft: {
    position: "absolute",
    left: -13,
    top: 132,
    width: 4,
    height: 78,
    borderRadius: 6,
    backgroundColor: "#171A20",
  },
  sideButtonRightTop: {
    position: "absolute",
    right: -13,
    top: 118,
    width: 4,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#171A20",
  },
  sideButtonRightBottom: {
    position: "absolute",
    right: -13,
    top: 190,
    width: 4,
    height: 82,
    borderRadius: 6,
    backgroundColor: "#171A20",
  },
});

export default PhoneFrame;
