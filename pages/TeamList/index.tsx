import { SafeAreaView } from 'react-native-safe-area-context';

import { View, Text, RoundedButtonWithIcon, ItemList } from '@/components';
import { styles } from './style';
import { FontAwesome6 } from '@expo/vector-icons';

export default function TeamList() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Team</Text>
          <RoundedButtonWithIcon 
            icon={
                <FontAwesome6 name="plus" size={14} color="white" />
            } 
            onPress={() => {
                console.log("Button pressed");
            }} 
          />
        </View>
        {/* <ItemList items={teams} RenderItem={renderItem} /> */}
    </SafeAreaView>
  );
}
