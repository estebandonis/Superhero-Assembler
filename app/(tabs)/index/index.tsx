import { TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { 
  SuperheroPreview, 
  Text, 
  View 
} from '@/components';
import { styles } from './style';
import { useFetchHeroes } from '@/api';
import { use, useEffect } from 'react';

export default function TabOneScreen() {
  const { data: heroes, isLoading } = useFetchHeroes();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }


  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Superheroes</Text>
        <TextInput style={styles.superheroInput} placeholder='Buscar' placeholderTextColor={'gray'} />
      </View>
      <FlatList
        style={styles.superheroesContainer}
        data={heroes}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 20, backgroundColor: "transparent"}} />}
        renderItem={({ item: hero }) => (
          <SuperheroPreview
            key={hero.id}
            heroName={hero.aliases}
            realName={hero.fullName}
            powerRate={hero.powerLevel}
          />
        )}
      />
    </SafeAreaView>
  );
}
