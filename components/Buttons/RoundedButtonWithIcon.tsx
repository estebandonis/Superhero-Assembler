import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface RoundedButtonWithIconProps {
    icon: React.ReactNode;
    onPress: () => void;
    style?: ViewStyle;
}

export default function RoundedButtonWithIcon({ icon, onPress, style }: RoundedButtonWithIconProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...styles.favoriteButton, ...style }}
        >
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    favoriteButton: {
        backgroundColor: Colors.dark.tint,
        padding: 12,
        borderRadius: 9999,
    },
});
