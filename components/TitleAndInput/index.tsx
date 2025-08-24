import { Text, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { styles } from "./style";


export default function TitleAndInput({ title, searchTerm, setSearchTerm }: { title: string, searchTerm: string, setSearchTerm: (text: string) => void }) {
    return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="search" 
              size={24} 
              color="gray" 
              style={styles.inputIcon} 
            />
            <TextInput
              style={styles.superheroInput}
              placeholder='Buscar'
              placeholderTextColor={'gray'}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>
    );
}