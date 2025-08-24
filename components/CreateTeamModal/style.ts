import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    sheetWrapper: {
      flex: 1,
      justifyContent: "flex-end",
    },
    sheetContainer: {
      backgroundColor: Colors.dark.secondBackground,
      paddingHorizontal: 20,
      paddingTop: 28,
      paddingBottom: 32,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      gap: 16,
    },
    title: {
      fontSize: 34,
      fontWeight: "800",
      color: "#fff",
    },
    fieldGroup: {
      marginTop: 8,
      gap: 10,
      backgroundColor: "transparent",
    },
    label: {
      fontSize: 20,
      fontWeight: "700",
      color: "#fff",
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: "500",
    },
    createButton: {
      backgroundColor: Colors.dark.tint,
      borderRadius: 22,
      paddingVertical: 18,
      alignItems: "center",
    },
    createButtonText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "800",
    },
  });