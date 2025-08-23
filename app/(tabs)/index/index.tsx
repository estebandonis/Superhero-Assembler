import { TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hero } from '@/types';

import { 
  SuperheroPreview, 
  Text, 
  View 
} from '@/components';
import { styles } from './style';
import { useFetchHeroes } from '@/api';
import { useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function SuperHeroesScreen() {
  const { data: heroes, isLoading } = useFetchHeroes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = useMemo(() => heroes?.filter((hero) =>
    hero.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hero.alias.toLowerCase().includes(searchTerm.toLowerCase())
  ), [heroes, searchTerm]);

  const renderItem = ({ item: hero }: { item: hero }) => (
    <SuperheroPreview
      key={hero.id}
      heroName={hero.alias}
      realName={hero.fullName}
      imageUrl={hero.imagePreview}
      powerRate={hero.powerLevel}
    />
  );

  const itemSeparator = () => (
    <View
      style={{
        height: 20,
        backgroundColor: "transparent"
      }}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
