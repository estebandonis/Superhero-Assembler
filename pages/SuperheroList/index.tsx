import { TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

import { 
  ItemList,
  SuperheroPreview, 
  Text, 
  View 
} from '@/components';
import { hero } from '@/types';
import { styles } from './style';

const renderItem = ({ item }: { item: hero }) => (
  <SuperheroPreview
    hero={item}
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
        <ItemList items={filteredHeroes} RenderItem={renderItem} />
      </SafeAreaView>
    );
}
