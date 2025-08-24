import { TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import { View, Text } from "../Themed";
import { styles } from "./style";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

interface TeamPreviewProps {
  id: number;
  title: string;
  membersCount: number;
}

export default function TeamPreview({ id, title, membersCount }: TeamPreviewProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push({
      pathname: "/team_details",
      params: {
        id: id
      }
    })}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.membersText}>{membersCount} members</Text>
        </View>

        <FontAwesome6 name="chevron-right" size={16} color={Colors.dark.text} />
    </TouchableOpacity>
  );
}