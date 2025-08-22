import { TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { 
  SuperheroPreview, 
  Text, 
  View 
} from '@/components';
import { styles } from './style';

export default function TabOneScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Superheroes</Text>
        <TextInput style={styles.superheroInput} placeholder='Buscar' placeholderTextColor={'gray'} />
      </View>
      <ScrollView style={styles.superheroesContainer}>
        <SuperheroPreview heroName='Superman' realName='Clark Kent' powerRate={95} />
      </ScrollView>
    </SafeAreaView>
  );
}
