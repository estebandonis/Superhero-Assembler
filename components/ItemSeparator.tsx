import { StyleSheet } from "react-native";

import { View } from "./Themed"

export function ItemSeparator() {
  return (
    <View
      style={styles.separator}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: "transparent"
  }
});