import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.dark.secondBackground,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  membersText: {
    fontSize: 14,
    color: Colors.dark.text,
  },
});
