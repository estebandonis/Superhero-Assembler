import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});