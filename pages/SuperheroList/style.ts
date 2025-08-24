import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 12,
  },
  superheroesContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
});
