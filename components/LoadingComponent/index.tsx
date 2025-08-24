import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text } from "@/components";
import { styles } from "./style";

export default function LoadingComponent() {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        </SafeAreaView>
    );
}