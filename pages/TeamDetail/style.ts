import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.dark.background,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    color: Colors.dark.text,
    fontWeight: "bold",
  },
});
