import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.secondBackground,
    flexDirection: "row",
    borderRadius: 10,
  },
  imagePreview: {
    flex: 2 / 5,
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 100,
    right: 240,
    zIndex: 1,
    padding: 8,
    borderRadius: 9999,
    backgroundColor: Colors.dark.tint,
  },
  informationContainer: {
    flex: 3 / 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingVertical: 12,
    gap: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  realName: {
    fontSize: 12,
    color: Colors.dark.secondText,
  },
  powerLevelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },
  powerLevel: {
    fontSize: 12,
    color: Colors.dark.text,
  },
  percentage: {
    fontSize: 12,
    color: Colors.dark.secondText,
  },
});
