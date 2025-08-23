import { TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hero } from '@/api';

import { 
  SuperheroPreview, 
  Text, 
  View 
} from '@/components';
import { styles } from './style';
import { useFetchHeroes } from '@/api';
import { useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {
  const { data: heroes, isLoading } = useFetchHeroes();

  const [searchTerm, setSearchTerm] = useState("");

  const renderItem = ({ item: hero }: { item: hero }) => (
    <SuperheroPreview
      key={hero.id}
      heroName={hero.aliases}
      realName={hero.fullName}
      imageUrl={hero.imagePreview}
      powerRate={hero.powerLevel}
    />
  );

  const itemSeparator = () => <View style={{ height: 20, backgroundColor: "transparent" }} />;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const filteredHeroes = useMemo(() => heroes?.filter((hero) =>
    hero.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hero.aliases.slice(0, 1).some((alias) =>
      alias.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ), [heroes, searchTerm]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Superheroes</Text>
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
      <FlatList
        style={styles.superheroesContainer}
        data={filteredHeroes}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
