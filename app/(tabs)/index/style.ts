import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 12,
  },
  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 16,
    gap: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  superheroInput: {
    width: "100%",
    borderRadius: 20,
    height: 40,
    backgroundColor: Colors.dark.thirdBackground,
    paddingHorizontal: 10,
  },
  superheroesContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
});
