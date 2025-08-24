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
import { useEffect, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const renderItem = ({ item }: { item: hero }) => (
  <SuperheroPreview
    hero={item}
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

interface SuperheroListProps {
    title: string;
    heroes: hero[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export function SuperheroList({ title, heroes, isLoading, isError }: SuperheroListProps) {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredHeroes = useMemo(() => heroes?.filter((hero) =>
      hero.fullName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      hero.alias.toLowerCase().startsWith(searchTerm.toLowerCase())
    ), [heroes, searchTerm]);
  
    const HeroesList = () => {
      if (filteredHeroes && filteredHeroes.length === 0) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>No results found</Text>
              <Text style={{ color: 'white', fontSize: 16 }}>Try searching for another name</Text>
            </View>
          );
      }
  
      return (
        <FlatList
          style={styles.superheroesContainer}
          data={filteredHeroes}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      );
    }
  
    if (isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
            <Text style={{ color: 'white' }}>Loading...</Text>
          </View>
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
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
        <HeroesList />
      </SafeAreaView>
    );
}
