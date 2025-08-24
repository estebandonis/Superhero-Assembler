import { TextInput, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

import { 
  ItemList,
  SuperheroRenderComponent,
  Text, 
  View,
  LoadingComponent
} from '@/components';
import { hero } from '@/types';
import { styles } from './style';

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
        <LoadingComponent />
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
        <ItemList items={filteredHeroes} RenderItem={SuperheroRenderComponent} />
      </SafeAreaView>
    );
}
